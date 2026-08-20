'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ProgressModal } from '../../components/shared/ProgressModal';
import {
  trackFormStarted,
  trackFormStepCompleted,
  trackFormValidationError,
  trackFormSubmitClicked,
  trackFormSubmitProcessing,
  trackFormSubmitSuccess,
  trackFormSubmitFailure,
  trackFormAbandonedDuringSubmission,
} from '@/lib/posthog';

interface FAQ {
  q: string;
  a: string;
}

export default function FiveFreeCollectionsClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkingArea, setCheckingArea] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [isSorryOpen, setIsSorryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [serviceable, setServiceable] = useState(true);

  const formStartedRef = useRef(false);
  const submitStartTimeRef = useRef<number | null>(null);
  const isSubmittingRef = useRef(false);

  /* ── Tab close / abandonment listener during pending submit ─ */
  useEffect(() => {
    const handleAbandonment = () => {
      if (isSubmittingRef.current && submitStartTimeRef.current) {
        const waitDuration = performance.now() - submitStartTimeRef.current;
        trackFormAbandonedDuringSubmission('5_free_collections', waitDuration);
      }
    };
    window.addEventListener('beforeunload', handleAbandonment);
    window.addEventListener('pagehide', handleAbandonment);
    return () => {
      window.removeEventListener('beforeunload', handleAbandonment);
      window.removeEventListener('pagehide', handleAbandonment);
    };
  }, []);

  const addressInputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    city: string;
    state: string;
    zip: string;
    street: string;
  } | null>(null);
  const [addressError, setAddressError] = useState(false);

  const [formFields, setFormFields] = useState({
    fname: '',
    lname: '',
    company: '',
    email: '',
    phone: '',
    volume: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const autocompleteInitialized = useRef(false);

  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return;
    if (!window.google?.maps?.places) return;
    if (!addressInputRef.current) return;
    autocompleteInitialized.current = true;

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      fields: ['geometry', 'address_components'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location && place.address_components) {
        let streetNumber = '';
        let route = '';
        let city = '';
        let state = '';
        let zip = '';
        for (const component of place.address_components) {
          const types = component.types;
          if (types.includes('street_number')) streetNumber = component.long_name;
          if (types.includes('route')) route = component.long_name;
          if (types.includes('locality')) city = component.long_name;
          if (types.includes('administrative_area_level_1')) state = component.long_name;
          if (types.includes('postal_code')) zip = component.long_name;
        }

        const street = [streetNumber, route].filter(Boolean).join(' ');
        if (addressInputRef.current) {
          addressInputRef.current.value =
            place.formatted_address || [street, city, state, zip].filter(Boolean).join(', ');
        }
        setAddressError(false);

        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          city,
          state,
          zip,
          street: street || place.formatted_address || '',
        });
      }
    });
  }, []);

  useEffect(() => {
    let placesInterval: ReturnType<typeof setInterval>;
    const checkAndInit = () => {
      if (window.google?.maps?.places) {
        initAutocomplete();
        if (placesInterval) clearInterval(placesInterval);
      }
    };
    checkAndInit();
    if (!window.google?.maps?.places) {
      placesInterval = setInterval(checkAndInit, 500);
    }
    return () => {
      if (placesInterval) clearInterval(placesInterval);
    };
  }, [initAutocomplete]);

  const handleCheckArea = async () => {
    if (!addressInputRef.current?.value.trim()) {
      setAddressError(true);
      if (addressInputRef.current) addressInputRef.current.style.borderColor = '#E5484D';
      trackFormValidationError('5_free_collections', ['address_input']);
      return;
    }

    if (!location || !location.zip || !location.city) {
      setAddressError(true);
      if (addressInputRef.current) addressInputRef.current.style.borderColor = '#E5484D';
      alert('Please select a business address from the suggestions dropdown.');
      trackFormValidationError('5_free_collections', ['address_suggestion_unselected']);
      return;
    }

    setAddressError(false);
    if (addressInputRef.current) addressInputRef.current.style.borderColor = '';

    setCheckingArea(true);
    try {
      const res = await fetch('/api/territory/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode: location.zip, city: location.city }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Territory check API returned error status:', res.status, errorData);
        throw new Error('Territory check failed');
      }

      const data = await res.json();
      setCheckingArea(false);

      if (data.serviceable) {
        setServiceable(true);
        setSelectedService('five-free');
        setStep(3); // Go straight to step 3 details
        trackFormStepCompleted('5_free_collections', 1, 'address_check_serviceable', {
          postcode: location.zip,
          suburb: location.city,
        });
      } else {
        setServiceable(false);
        setStep(2);
        trackFormStepCompleted('5_free_collections', 1, 'address_check_unserviceable', {
          postcode: location.zip,
          suburb: location.city,
        });
      }
    } catch (err) {
      console.error('Territory check error:', err);
      setCheckingArea(false);
      setServiceable(false);
      setStep(2);
      trackFormStepCompleted('5_free_collections', 1, 'address_check_error');
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormStarted('5_free_collections');
    }
    const { id, value } = e.target;
    const fieldName = id.replace('f-', '');
    setFormFields((prev) => ({ ...prev, [fieldName]: value }));
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: false }));
      e.target.style.borderColor = '';
    }
  };

  const handleSubmit = async () => {
    trackFormSubmitClicked('5_free_collections', {
      selected_service: selectedService,
      serviceable,
      postcode: location?.zip,
      suburb: location?.city,
    });

    const requiredIds = ['f-fname', 'f-lname', 'f-company', 'f-email', 'f-phone', 'f-volume'];
    let ok = true;
    const newErrors: Record<string, boolean> = {};

    requiredIds.forEach((id) => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
      if (!el || !el.value.trim()) {
        if (el) el.style.borderColor = '#E5484D';
        newErrors[id] = true;
        ok = false;
      } else {
        if (el) el.style.borderColor = '';
      }
    });

    setFieldErrors(newErrors);
    if (!ok) {
      trackFormValidationError('5_free_collections', newErrors);
      return;
    }

    setSubmitting(true);
    isSubmittingRef.current = true;
    const startTime = performance.now();
    submitStartTimeRef.current = startTime;
    trackFormSubmitProcessing('5_free_collections');

    try {
      const { submitLead } = await import('@/utils/submitLead');

      const payload = {
        companyName: formFields.company,
        customerPhone: formFields.phone,
        customerServiceEmail: formFields.email,
        interestedIn: selectedService === 'five-free' ? '5-free' : selectedService,
        selectedServiceOption: selectedService,
        weeklyParcels: formFields.volume,
        bucket: selectedService === 'five-free' ? '5-free-trial' : 'inbound',
        isFiveFreeCollections: selectedService === 'five-free',
        noFranchisees: !serviceable,
        sourcePage: '5 Free Collections',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        address: {
          address1: '',
          street: location?.street || addressInputRef.current?.value || '',
          city: location?.city || '',
          state: location?.state || '',
          zip: location?.zip || '',
          latitude: location?.lat || 0,
          longitude: location?.lng || 0,
        },
        contacts: [
          {
            name: `${formFields.fname} ${formFields.lname}`,
            email: formFields.email,
            phone: formFields.phone,
          },
        ],
      };

      const result = await submitLead(payload);
      const duration = performance.now() - startTime;
      isSubmittingRef.current = false;
      submitStartTimeRef.current = null;
      setSubmitting(false);

      if (result.success) {
        trackFormSubmitSuccess('5_free_collections', duration, {
          outOfTerritory: result.outOfTerritory,
          interestedIn: payload.interestedIn,
        });
        sessionStorage.setItem('lead_submission_data', JSON.stringify({ result, payload }));
        sessionStorage.setItem('lead_submit_timestamp', startTime.toString());
        window.location.href = '/confirmation';
      } else {
        trackFormSubmitFailure('5_free_collections', duration, result.message || 'Submission unsuccesful');
        setIsSorryOpen(true);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      const duration = performance.now() - startTime;
      isSubmittingRef.current = false;
      submitStartTimeRef.current = null;
      trackFormSubmitFailure('5_free_collections', duration, err instanceof Error ? err.message : 'Unknown exception');
      setSubmitting(false);
      setIsSorryOpen(true);
    }
  };


  const faqs: FAQ[] = [
    {
      q: 'What are MailPlus 5 free collections?',
      a: "It's a free trial for new business customers: five parcel collections, completely free. A local MailPlus owner-operator comes to your premises and lodges your parcels at the Post Office for you. There's no credit card, no invoice, and no obligation to continue.",
    },
    {
      q: 'Is there really no catch with the free collections?',
      a: "No catch. MailPlus has worked with Licensed Post Offices across Australia for almost 30 years, so we'd rather show you the service than try to convince you. Five collections are on us, with nothing on your card and nothing to cancel. If it doesn't save your team time, you haven't lost a thing.",
    },
    {
      q: 'Do I need a credit card to start the free trial?',
      a: "No. You don't enter any card details to claim your five free collections. Just enter your business address on this page to check your area, and if there's a local owner-operator near you, register on LocalMile and book your first collection. There is no invoice and no obligation during the trial.",
    },
    {
      q: 'What happens after the 5 free collections?',
      a: "Most businesses choose to keep going. If you book as you need it, ad hoc collections are $15 + GST each. If you'd rather a scheduled, regular service, your Account Manager tailors the pricing to your business during the trial. There's no lock-in, and the choice is entirely yours once you've seen the service for yourself.",
    },
    {
      q: 'How soon will my parcels be collected?',
      a: "During the trial, same-day collections need to be booked before 12pm, so your local owner-operator has plenty of time to fit you into their run. Book after that and your collection rolls to the next business day. Either way, you'll see it confirmed in LocalMile, so you always know a pickup is on the way.",
    },
    {
      q: 'What if I already use another courier?',
      a: "That's no problem — this isn't about replacing your courier. The free trial covers the trip to the Post Office that you're doing yourself. If you're still doing that run, your owner-operator can take it off your hands, alongside whatever courier you already use.",
    },
    {
      q: 'How does MailPlus collection work with my local Post Office?',
      a: 'MailPlus is the collection arm for selected Licensed Post Offices across Australia. Your local owner-operator comes to your business, collects your parcels and mail, and lodges them at the Post Office for you. It bridges the gap between your business and the Post Office, on a schedule that suits you, so your team never has to make the run themselves.',
    },
    {
      q: 'What is LocalMile and how do I book my collections?',
      a: 'LocalMile is the free MailPlus platform for booking your local pickups online. Once your area is confirmed, you register on LocalMile and book each collection in a few taps. Your local owner-operator is sent the job automatically, accepts it, and comes to your premises to collect — so you can manage everything from one simple dashboard. It is a separate platform from ShipMate: LocalMile is for regular local pickups and deliveries, while ShipMate is for Australia-wide express shipping.',
    },
  ];

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  return (
    <div className="five-free-page">
      {/* ============= HERO (elevated — scoped .hero--offer) ============= */}
      <section className="hero hero--offer">
        <span className="hero-watermark" aria-hidden="true">
          5
        </span>
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/#services">Services</Link>
            <span className="sep">/</span>
            <span>5 Free Collections</span>
          </nav>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="offer-badge">
                <span className="ob-dot"></span>
                New offer
                <span className="ob-tag">5 on us</span>
              </div>
              <h1>
                Five <span className="free-pop">free</span> collections.
                <br />
                <span className="hl">No card. No catch.</span>
              </h1>
              <p className="hero-lead hero-lead-hook">
                Skip the Post Office run. Your local MailPlus owner-operator comes to you, collects and lodges your
                parcels — no queue, no trip. Book each one in <strong>LocalMile</strong>, our free online platform for local pickups.
              </p>
              <div className="hero-cta-row">
                <a href="#enquire" className="btn btn-primary">
                  Claim my 5 free collections &rarr;
                </a>
                <a href="tel:1300656595" className="btn btn-secondary">
                  Call 1300 65 65 95
                </a>
              </div>
              <div className="hero-trust-row">
                <span className="ht-item">
                  <span className="ht-tick">&#10003;</span> No credit card
                </span>
                <span className="ht-sep"></span>
                <span className="ht-item">
                  <span className="ht-tick">&#10003;</span> No obligation
                </span>
                <span className="ht-sep"></span>
                <span className="ht-item">
                  <span className="ht-tick">&#10003;</span> Almost 30 years of local experience
                </span>
              </div>
            </div>

            <div className="hero-side">
              <img className="hero-img" src="/images/final-5-free-collections.png" alt="5 Free Collections" />
            </div>
          </div>
        </div>
      </section>

      {/* ============= HERE'S THE DEAL ============= */}
      <section className="deal-section">
        <div className="wrap">
          <div className="deal-card">
            <div className="deal-head">
              <h2>Here&apos;s the deal</h2>
              <p>Free collections for your Post Office lodgements — no queue, no trip.</p>
            </div>
            <div className="deal-grid">
              <div className="deal-fact">
                <span className="deal-num">5</span>
                <span className="deal-label">
                  free collections
                  <br />
                  for new business customers
                </span>
              </div>
              <div className="deal-fact">
                <span className="deal-num">$0</span>
                <span className="deal-label">
                  to try the full service
                  <br />
                  no card required
                </span>
              </div>
              <div className="deal-fact">
                <span className="deal-num">Free</span>
                <span className="deal-label">
                  register & book
                  <br />
                  online in LocalMile
                </span>
              </div>
              <div className="deal-fact">
                <span className="deal-num">~300</span>
                <span className="deal-label">
                  vehicles on the road
                  <br />
                  nationwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= INTRO BAND ============= */}
      <section className="intro-band">
        <div className="wrap">
          <div className="intro-band-inner">
            <div className="intro-band-label">
              5 free <span className="hl">collections</span>
            </div>
            <div className="intro-band-copy">
              <p>
                <strong>
                  New MailPlus business customers get five free parcel collections — a local owner-operator collects
                  from your premises and lodges your parcels at the Post Office for you, with no card and no obligation to
                  continue.
                </strong>{' '}
                It removes the Post Office run entirely: nobody on your team has to queue or leave the office.
              </p>
              <div
                className={`intro-more ${introOpen ? 'open' : ''}`}
                style={{
                  maxHeight: introOpen ? '1000px' : '0',
                  opacity: introOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                }}
              >
                <p>
                  MailPlus is the collection arm for selected Licensed Post Offices across Australia. Your collection
                  is always handled by a local owner-operator who services your specific suburb — not a random driver
                  from a national logistics giant. They come to you, collect your parcels and mail, and lodge them on your
                  behalf.
                </p>
                <p>
                  The trial is genuinely free because we&apos;re confident, not desperate. We&apos;d rather show you
                  the service than pitch it — five collections, completely on us. Once a business tries it, most don&apos;t
                  go back to driving parcels in themselves, so we&apos;re happy to let the service speak for itself.
                </p>
                <p>
                  Getting started takes just a few minutes. Enter your business address on this page and we&apos;ll check
                  for a local owner-operator in your area. If there&apos;s a driver near you, we take you straight to{' '}
                  <strong>LocalMile</strong> — our free platform for booking local pickups — to register and book your
                  first collection. MailPlus is a reliable, independent alternative to Australia Post and traditional
                  couriers, backed by a local owner-operator and an Australian-based head-office support team.
                </p>
              </div>
              <button
                className={`intro-toggle ${introOpen ? 'open' : ''}`}
                onClick={() => setIntroOpen(!introOpen)}
                aria-expanded={introOpen}
              >
                <span className="it-text">{introOpen ? 'Read less' : 'Read more'}</span>{' '}
                <span className="it-icon">{introOpen ? '－' : '＋'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============= HOW IT WORKS ============= */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">How the free trial works</div>
            <h2>From enquiry to first collection, in four steps.</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-head">
                <span className="step-no">1</span>
                <span className="sc-emoji">📍</span>
              </div>
              <h3>Check your area</h3>
              <p>
                Enter your business address below and we&apos;ll instantly check for a local MailPlus owner-operator in
                your territory. It takes just a few seconds to see if you&apos;re covered.
              </p>
            </div>
            <div className="step-card">
              <div className="step-head">
                <span className="step-no">2</span>
                <span className="sc-emoji">📝</span>
              </div>
              <h3>Register on LocalMile</h3>
              <p>
                If there&apos;s a driver in your area, we take you straight to LocalMile — our free booking platform —
                to set up your account. It only takes a minute to get started.
              </p>
            </div>
            <div className="step-card">
              <div className="step-head">
                <span className="step-no">3</span>
                <span className="sc-emoji">🚚</span>
              </div>
              <h3>Book your collection</h3>
              <p>
                Book your first collection in LocalMile and the job goes straight to your local owner-operator. They
                accept it and come to your premises — no trip to the Post Office required.
              </p>
            </div>
            <div className="step-card">
              <div className="step-head">
                <span className="step-no">4</span>
                <span className="sc-emoji">🎉</span>
              </div>
              <h3>Collected & delivered</h3>
              <p>
                Your owner-operator collects your parcels and lodges them for you. That&apos;s one free collection done
                — four more on us, with nothing on your card.
              </p>
            </div>
          </div>
          <p className="platform-note">
            <span className="hn-ic" aria-hidden="true">ⓘ</span>
            <span className="hn-tx">
              You book these local pickups in <strong>LocalMile</strong>. It’s a separate platform from{' '}
              <strong>ShipMate</strong>, which handles Australia-wide express shipping.
            </span>
          </p>
        </div>
      </section>

      {/* ============= WHY SAY YES ============= */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="coverage-band">
            <h2>Free because we&apos;re confident — not because we&apos;re desperate.</h2>
            <p>
              We&apos;ve been collecting and lodging for Australian businesses long enough to know how this goes: once a
              business tries having parcels picked up and lodged for them, they rarely go back to doing the run themselves.
              So rather than ask you to take our word for it, we&apos;d rather just show you. Five collections, completely
              on us.
            </p>
            <div className="chip-group">
              <span className="chip-label">What you get</span>
              <div className="city-chips">
                <span className="city-chip">
                  <span className="cc-dot"></span> 5 free collections
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> No credit card
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> No invoice
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> No contract
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> Nothing to cancel
                </span>
              </div>
            </div>
            <div className="chip-group">
              <span className="chip-label">Why businesses say yes</span>
              <div className="city-chips">
                <span className="city-chip">
                  <span className="cc-dot"></span> Removes the Post Office run
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> Saves your team time
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> A genuinely local driver
                </span>
                <span className="city-chip">
                  <span className="cc-dot"></span> Australian-based support
                </span>
              </div>
            </div>
            <p className="coverage-note">Enter your details below and we&apos;ll check for a local MailPlus owner-operator in your area.</p>
            <div className="cta-band-actions" style={{ marginTop: '22px' }}>
              <a href="#enquire" className="btn btn-primary">
                Claim my 5 free collections &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============= PLATE TARIFFS ============= */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">The Post Office run, gone</div>
            <h2>What the free trial takes off your plate.</h2>
          </div>
          <div className="svc-grid">
            <div className="svc-card">
              <div className="svc-icon v-collect">⏳</div>
              <h3>The lost time</h3>
              <p>
                Driving parcels to the Post Office quietly eats hours out of someone&apos;s week. During your trial,
                your local owner-operator comes to you instead — so that time goes back into running your business.
              </p>
            </div>
            <div className="svc-card">
              <div className="svc-icon v-auspost">😫</div>
              <h3>The queue</h3>
              <p>
                No more finding a park and waiting in line to lodge a stack of parcels. Your local owner-operator
                collects from your premises and lodges them for you — so you skip the queue entirely.
              </p>
            </div>
            <div className="svc-card">
              <div className="svc-icon v-pobox">💳</div>
              <h3>The risk of trying something new</h3>
              <p>
                There&apos;s nothing to weigh up. Your five collections are completely free, with nothing to sign and
                nothing to cancel. If it doesn&apos;t save your team time, you haven&apos;t lost a thing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============= MID CTA ============= */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-text">
              <h3>
                Ready to skip the Post Office run? <span className="hl">Your first five are free.</span>
              </h3>
              <p>Check your area in seconds and start your free trial — no card, no catch.</p>
            </div>
            <div className="cta-band-actions">
              <a href="#enquire" className="btn btn-primary">
                Claim my 5 free collections &rarr;
              </a>
              <a href="tel:1300656595" className="btn btn-ghost-dark">
                Call 1300 65 65 95
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============= DETAILS CARD ============= */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">The details</div>
            <h2>Everything the offer includes.</h2>
          </div>
          <div className="spec-card">
            <div className="spec-row">
              <div className="sr-key">
                <span className="sr-ic">💰</span> The offer
              </div>
              <div className="sr-val">
                <span className="spec-val-strong">Five free parcel collections</span>for new MailPlus business customers.
              </div>
            </div>
            <div className="spec-row">
              <div className="sr-key">
                <span className="sr-ic">💳</span> Cost to you
              </div>
              <div className="sr-val">
                <span className="spec-val-strong">$0 during the trial.</span>Your five collections are completely on us
                — no card needed to start.
              </div>
            </div>
            <div className="spec-row">
              <div className="sr-key">
                <span className="sr-ic">🚚</span> What happens
              </div>
              <div className="sr-val">
                Your local owner-operator collects your parcels from your premises and lodges them at the Post Office for
                you.
              </div>
            </div>
            <div className="spec-row">
              <div className="sr-key">
                <span className="sr-ic">📍</span> Where we collect
              </div>
              <div className="sr-val">
                From your business address, by the owner-operator who services your specific suburb. Enter your address
                above to check there&apos;s a driver in your area.
              </div>
            </div>
            <div className="spec-row">
              <div className="sr-key">
                <span className="sr-ic">📱</span> Getting started
              </div>
              <div className="sr-val">
                Check your area on this page, register on LocalMile, then book your first collection — all online.
              </div>
            </div>
            <div className="spec-row">
              <div className="sr-key">
                <span className="sr-ic">📄</span> Commitment
              </div>
              <div className="sr-val">
                No lock-in contract and nothing to cancel. After the five free collections, continuing is entirely your
                choice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= FAQ SECTION ============= */}
      <section className="section faq-section" id="faq">
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">Frequently asked questions</div>
            <h2>The free trial, answered.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item ${faqOpenIndex === i ? 'open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => toggleFaq(i)}>
                  {f.q} <span className="faq-toggle">+</span>
                </button>
                <div
                  className="faq-a"
                  style={{
                    maxHeight: faqOpenIndex === i ? '1000px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.25s ease',
                  }}
                >
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= ENQUIRY FORM ============= */}
      <section className="section" id="enquire" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="enquiry-band">
            <div className="enquiry-grid">
              <div className="enquiry-left">
                <h2>Claim your 5 free collections.</h2>
                <p>
                  Enter your details and we&apos;ll instantly check for a local MailPlus owner-operator in your area.
                  If there&apos;s a driver near you, we&apos;ll take you straight to LocalMile to register and start
                  your trial. Prefer to talk? Our Aussie-based team is here Monday to Friday.
                </p>
                <div className="enquiry-contacts">
                  <a href="tel:1300656595" className="enquiry-contact">
                    <div className="ec-ic">📞</div>
                    <div>
                      <div className="ec-lbl">Call us</div>
                      <div className="ec-val mono">1300 65 65 95</div>
                    </div>
                  </a>
                  <div className="enquiry-contact">
                    <div className="ec-ic">🕘</div>
                    <div>
                      <div className="ec-lbl">Hours</div>
                      <div className="ec-val">Mon–Fri, 9am–5pm AEST</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="enquiry-form">
                {/* Progressive enquiry: Step 1 address gate -> Step 3 details (Step 2 skipped) */}
                <div className="ef-progress" aria-hidden="true">
                  <span className={`ef-dot ${step === 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`} data-s="1"></span>
                  <span className={`ef-bar ${step > 1 ? 'done' : ''}`}></span>
                  <span className={`ef-dot ${step === 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`} data-s="2"></span>
                  <span className={`ef-bar ${step > 2 ? 'done' : ''}`}></span>
                  <span className={`ef-dot ${step === 3 ? 'active' : ''}`} data-s="3"></span>
                </div>

                {/* STEP 1: Address gate */}
                <div className={`ef-pane ${step === 1 && !checkingArea ? 'show' : ''}`}>
                  <p className="ef-intro">
                    Pop in your pickup address and we&apos;ll instantly check for a local MailPlus driver in your area.
                  </p>
                  <div className="field-group">
                    <label className="field-label">
                      Pickup address <span className="req">*</span>
                    </label>
                    <div className="addr-wrap">
                      <span className="addr-pin" aria-hidden="true">
                        📍
                      </span>
                      <input
                        type="text"
                        className="field-input addr-input"
                        id="f-address"
                        ref={addressInputRef}
                        placeholder="Start typing your business address…"
                        autoComplete="off"
                        style={{ borderColor: addressError ? '#E5484D' : '' }}
                        onChange={() => {
                          if (addressError) {
                            setAddressError(false);
                          }
                        }}
                      />
                    </div>
                    <p className="field-hint">We use this to find your local driver.</p>
                  </div>
                  <button className="form-submit" type="button" onClick={handleCheckArea}>
                    Check my area &rarr;
                  </button>
                </div>

                {/* CHECKING INTERSTITIAL */}
                <div className={`form-success ${checkingArea ? 'show' : ''}`} id="enquiryChecking">
                  <div className="fs-ic checking">📍</div>
                  <h3>Checking your area…</h3>
                  <p>
                    Looking for a local MailPlus driver near your pickup address. This will only take a moment.
                  </p>
                </div>

                {/* STEP 2: Service selection */}
                <div className={`ef-pane ${step === 2 ? 'show' : ''}`} id="efStep2">
                  {serviceable ? (
                    <div className="ef-instep-head">
                      <span className="ef-badge"><span className="efb-tick">✓</span> You’re in our patch</span>
                      <p className="ef-instep-note" style={{ fontWeight: 600, color: 'var(--ink)' }}>
                        There’s a local driver covering your area. Which sounds like you?
                      </p>
                      <p className="ef-instep-subnote" style={{ fontSize: '14px', color: 'var(--muted, #6B7280)', marginTop: '3px' }}>
                        We do two different things — pick the one you came for.
                      </p>
                    </div>
                  ) : (
                    <div className="ef-instep-head">
                      <span className="ef-badge" style={{ backgroundColor: '#FFFBEB', color: '#B45309', borderColor: '#FDE68A', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ display: 'inline-flex', gap: '3px' }}>
                          <span style={{ width: '6px', height: '6px', backgroundColor: '#D97706', borderRadius: '50%' }}></span>
                          <span style={{ width: '6px', height: '6px', backgroundColor: '#D97706', borderRadius: '50%' }}></span>
                        </span>
                        Almost there
                      </span>
                      <p className="ef-instep-note">
                        Your address sits right on the edge of a local driver’s run. Choose a service and add your details — we’ll confirm coverage with our drivers and come straight back to you.
                      </p>
                    </div>
                  )}
                  <div className="svc-cards" role="radiogroup" aria-label="Which sounds like you?">
                    <button 
                      type="button" 
                      className={`svc-card ${selectedService === 'five-free' ? 'selected' : ''}`} 
                      onClick={() => setSelectedService('five-free')}
                      role="radio" 
                      aria-checked={selectedService === 'five-free'}
                    >
                      <span className="svc-ic">🏣</span>
                      <span className="svc-txt">
                        <span className="svc-title-row">
                          <span className="svc-name">We run your parcels and mail to the Post Office</span>
                          <span className="svc-badge-free">First 5 free</span>
                        </span>
                        <span className="svc-desc">
                          For eParcel, MyPost Business or general mail items on an Aus Post account — your local driver collects and lodges for you. No card, no catch.
                        </span>
                      </span>
                      <span className="svc-check">✓</span>
                    </button>
                    <button 
                      type="button" 
                      className={`svc-card ${selectedService === 'express' ? 'selected' : ''}`} 
                      onClick={() => setSelectedService('express')}
                      role="radio" 
                      aria-checked={selectedService === 'express'}
                    >
                      <span className="svc-ic">⚡</span>
                      <span className="svc-txt">
                        <span className="svc-title-row">
                          <span className="svc-name">We deliver your parcels door-to-door</span>
                          <span className="svc-badge-shipmate">ShipMate</span>
                        </span>
                        <span className="svc-desc">
                          1–2 day express delivery Australia-wide, with Shopify &amp; WooCommerce plugins.
                        </span>
                      </span>
                      <span className="svc-check">✓</span>
                    </button>
                    <button 
                      type="button" 
                      className={`svc-card ${selectedService === 'not-sure' ? 'selected' : ''}`} 
                      onClick={() => setSelectedService('not-sure')}
                      role="radio" 
                      aria-checked={selectedService === 'not-sure'}
                    >
                      <span className="svc-ic">📅</span>
                      <span className="svc-txt">
                        <span className="svc-name">Not sure, or need both?</span>
                        <span className="svc-desc">
                          Book a quick call and we’ll find the setup that fits how your business sends.
                        </span>
                      </span>
                      <span className="svc-check">✓</span>
                    </button>

                    <div className="svc-divider">
                      <span>Something bigger?</span>
                    </div>

                    <button 
                      type="button" 
                      className={`svc-card svc-card-corporate ${selectedService === 'corporate' ? 'selected' : ''}`} 
                      onClick={() => setSelectedService('corporate')}
                      role="radio" 
                      aria-checked={selectedService === 'corporate'}
                    >
                      <span className="svc-ic">📮</span>
                      <span className="svc-txt" style={{ flexDirection: 'row', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                        <span className="svc-name" style={{ fontSize: '14.5px' }}>Corporate mail, PO box clearing, or multi-site</span>
                        <span className="svc-desc" style={{ fontSize: '14.5px', color: 'var(--muted, #6B7280)' }}>— book a call with our corporate team</span>
                      </span>
                      <span className="svc-check">✓</span>
                    </button>
                  </div>
                  <div className="ef-nav">
                    <button className="ef-back" type="button" onClick={() => setStep(1)}>&larr; Back</button>
                    <button 
                      className="form-submit ef-inline" 
                      type="button" 
                      id="toStep3Btn" 
                      onClick={() => setStep(3)} 
                      disabled={!selectedService}
                    >
                      Continue &rarr;
                    </button>
                  </div>
                </div>

                {/* STEP 3: Details */}
                <div className={`ef-pane ${step === 3 ? 'show' : ''}`} id="efStep3">
                  <p className="ef-intro" id="efStep3Intro">
                    Last step to create your free account.
                  </p>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">
                        First name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="field-input"
                        id="f-fname"
                        style={{ borderColor: fieldErrors['f-fname'] ? '#E5484D' : '' }}
                        value={formFields.fname}
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div className="field-group">
                      <label className="field-label">
                        Last name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="field-input"
                        id="f-lname"
                        style={{ borderColor: fieldErrors['f-lname'] ? '#E5484D' : '' }}
                        value={formFields.lname}
                        onChange={handleFieldChange}
                      />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">
                      Business name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="field-input"
                      id="f-company"
                      style={{ borderColor: fieldErrors['f-company'] ? '#E5484D' : '' }}
                      value={formFields.company}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">
                        Email <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        className="field-input"
                        id="f-email"
                        style={{ borderColor: fieldErrors['f-email'] ? '#E5484D' : '' }}
                        value={formFields.email}
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div className="field-group">
                      <label className="field-label">
                        Phone <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        className="field-input"
                        id="f-phone"
                        style={{ borderColor: fieldErrors['f-phone'] ? '#E5484D' : '' }}
                        value={formFields.phone}
                        onChange={handleFieldChange}
                      />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">
                      Roughly how many parcels do you send a week? <span className="req">*</span>
                    </label>
                    <select
                      className="field-select"
                      id="f-volume"
                      style={{ borderColor: fieldErrors['f-volume'] ? '#E5484D' : '' }}
                      value={formFields.volume}
                      onChange={handleFieldChange}
                    >
                      <option value="">Please select…</option>
                      <option value="1-10">1–10 a week</option>
                      <option value="11-50">11–50 a week</option>
                      <option value="51-200">51–200 a week</option>
                      <option value="201-500">201–500 a week</option>
                      <option value="500+">500+ a week</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="ef-nav">
                    <button className="ef-back" type="button" onClick={() => setStep(serviceable ? 1 : 2)}>
                      &larr; Back
                    </button>
                    <button
                      className="form-submit ef-inline"
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit enquiry →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SORRY MODAL OVERLAY */}
      <div
        className={`mp-modal-overlay ${isSorryOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mpSorryTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsSorryOpen(false);
        }}
      >
        <div className="mp-modal is-sorry">
          <button className="mp-close" onClick={() => setIsSorryOpen(false)} aria-label="Close">
            ✕
          </button>
          <div className="mp-modal-top">
            <div className="mp-icon">📍</div>
            <h3 id="mpSorryTitle">We’re not in your area just yet.</h3>
          </div>
          <div className="mp-modal-body">
            <p>
              We couldn’t find a local MailPlus driver covering your address right now — so we can’t start your
              enquiry here today. You’re welcome to check back any time.
            </p>
          </div>
        </div>
      </div>
      <ProgressModal isOpen={submitting} />
    </div>
  );
}
