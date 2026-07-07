"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import Link from 'next/link';

const postOfficeFaqs = [
  {
    question: "What is MailPlus Post Office collect & lodge?",
    answer: "It's the service that runs your Post Office trips for you. Each morning, your local owner-operator brings in your incoming mail and parcels from Australia Post and clears your business PO Boxes; each afternoon, they collect your outgoing mail and parcels and lodge them for same-day processing. Your team never has to queue or leave the office."
  },
  {
    question: "Does MailPlus lodge Australia Post mail and parcels?",
    answer: "Yes — and it means no one on your team ever queues at the Post Office again. We pick up your Australia Post mail and parcels and lodge them on your behalf, same-day. Your local owner-operator handles it as part of their daily run, bridging the gap between your business and the Post Office."
  },
  {
    question: "Can MailPlus clear my business PO Box?",
    answer: "Yes. PO Box clearing is part of our Post Office Solutions service. Your local owner-operator collects and lodges your parcels and mail and clears your business PO Boxes, all with same-day collection. It's one service that bridges your business and the Post Office, so nobody on your team has to make the run."
  },
  {
    question: "How is MailPlus different from going to the Post Office yourself?",
    answer: "Doing it yourself means finding a park, waiting in the queue, and losing half a morning — every time. MailPlus comes to you instead: your local owner-operator collects and lodges your mail and parcels as part of their daily run, no trip required. We're an independent alternative to Australia Post and traditional couriers."
  }
];

export default function PostOfficeClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkingArea, setCheckingArea] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('corporate');
  const [isSorryOpen, setIsSorryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [serviceable, setServiceable] = useState(true);

  const addressInputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<{lat: number, lng: number, city: string, state: string, zip: string, street: string} | null>(null);
  const [addressError, setAddressError] = useState(false);

  const [formFields, setFormFields] = useState({
    fname: '',
    lname: '',
    company: '',
    email: '',
    phone: '',
    volume: ''
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
      fields: ['geometry', 'address_components']
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
          addressInputRef.current.value = place.formatted_address || [street, city, state, zip].filter(Boolean).join(', ');
        }
        setAddressError(false);

        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          city,
          state,
          zip,
          street: street || place.formatted_address || ''
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
      return;
    }

    if (!location || !location.zip || !location.city) {
      setAddressError(true);
      if (addressInputRef.current) addressInputRef.current.style.borderColor = '#E5484D';
      alert('Please select a business address from the suggestions dropdown.');
      return;
    }

    setAddressError(false);
    if (addressInputRef.current) addressInputRef.current.style.borderColor = '';

    setCheckingArea(true);
    try {
      const res = await fetch('/api/territory/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode: location.zip, city: location.city })
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
        setStep(2);
      } else {
        setServiceable(false);
        setStep(2);
      }
    } catch (err) {
      console.error('Territory check error:', err);
      setCheckingArea(false);
      setServiceable(false);
      setStep(2);
    }
  };

  const handleSelectService = (svc: string) => {
    setSelectedService(svc);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('f-', '');
    setFormFields(prev => ({ ...prev, [fieldName]: value }));
    if (fieldErrors[id]) {
      setFieldErrors(prev => ({ ...prev, [id]: false }));
      e.target.style.borderColor = '';
    }
  };

  const handleSubmit = async () => {
    const requiredIds = ['f-fname', 'f-lname', 'f-company', 'f-email', 'f-phone', 'f-volume'];
    let ok = true;
    const newErrors: Record<string, boolean> = {};

    requiredIds.forEach(id => {
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
    if (!ok) return;

    setSubmitting(true);
    try {
      const { submitLead } = await import('@/utils/submitLead');

      const payload = {
        companyName: formFields.company,
        customerPhone: formFields.phone,
        customerServiceEmail: formFields.email,
        interestedIn: selectedService === 'five-free' ? '5-free' : selectedService,
        weeklyParcels: formFields.volume,
        bucket: selectedService === 'five-free' ? '5-free-trial' : 'inbound',
        isFiveFreeCollections: selectedService === 'five-free',
        noFranchisees: !serviceable,
        sourcePage: 'Post Office Collect & Lodge',
        address: {
          address1: '',
          street: location?.street || addressInputRef.current?.value || '',
          city: location?.city || '',
          state: location?.state || '',
          zip: location?.zip || '',
          latitude: location?.lat || 0,
          longitude: location?.lng || 0
        },
        contacts: [{
          name: `${formFields.fname} ${formFields.lname}`,
          email: formFields.email,
          phone: formFields.phone
        }]
      };

      const result = await submitLead(payload);
      setSubmitting(false);

      if (result.success) {
        sessionStorage.setItem('lead_submission_data', JSON.stringify({ result, payload }));
        window.location.href = '/confirmation';
      } else {
        setIsSorryOpen(true);
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      setSubmitting(false);
      setIsSorryOpen(true);
    }
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
          onLoad={initAutocomplete}
        />
      )}

      <div className="post-office-page">
        {/* ============= BREADCRUMB ============= */}
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep">/</span><Link href="/#services">Services</Link><span className="sep">/</span><span>Post Office Collect &amp; Lodge</span>
          </nav>
        </div>

        {/* ============= HERO ============= */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-eyebrow"><span className="dot"></span> Post Office collect &amp; lodge</div>
                <h1>Your Post Office<br /><span className="hl">run, handled.</span></h1>
                <p className="hero-lead hero-lead-hook">
                  <strong>No park. No queue. No fuel. No wasted morning.</strong> Your local owner-operator brings your mail in each morning and lodges everything you send each afternoon — collecting, lodging and clearing your PO Boxes for you.
                </p>
                <div className="hero-cta-row">
                  <a href="#enquire" className="btn btn-primary">Hand over your Post Office run →</a>
                  <a href="tel:1300656595" className="btn btn-secondary">Call 1300 65 65 95</a>
                </div>
              </div>

              <div className="hero-side">
                <img className="hero-img" src="/images/post-office-hero.png" alt="A MailPlus van collecting parcels and running them between a business and the Australia Post office, with route markers showing the trip handled for you." />
              </div>
            </div>
          </div>
        </section>

        {/* ============= FACT BANNER ============= */}
        <section className="fact-banner-section">
          <div className="wrap">
            <div className="fact-banner">
              <div className="fact">
                <span className="fact-num">AM</span>
                <span className="fact-label">mail in,<br />first thing</span>
              </div>
              <div className="fact">
                <span className="fact-num">PM</span>
                <span className="fact-label">lodged for you,<br />same day</span>
              </div>
              <div className="fact">
                <span className="fact-num">0</span>
                <span className="fact-label">Post Office trips<br />for your team</span>
              </div>
              <div className="fact">
                <span className="fact-num">1</span>
                <span className="fact-label">service: collect,<br />lodge &amp; clear</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============= ANSWER-FIRST INTRO BAND ============= */}
        <section className="intro-band">
          <div className="wrap">
            <div className="intro-band-inner">
              <div className="intro-band-label">Collect &amp; <span className="hl">lodge</span></div>
              <div className="intro-band-copy">
                <p><strong>MailPlus bridges the gap between businesses and the Post Office — we collect and lodge your parcels and mail, and clear your business PO Boxes, with same-day collection.</strong> Your local owner-operator handles the run, so your team never has to queue or travel.</p>
                <div className={`intro-more ${isIntroOpen ? 'open' : ''}`} id="introMore" style={{ maxHeight: isIntroOpen ? '600px' : '0px', opacity: isIntroOpen ? 1 : 0, transition: 'all 0.3s ease' }}>
                  <p>We pick up and lodge your Australia Post mail and parcels for you — no more queuing or trips to the Post Office. It's one service that bridges your business and the Post Office: same-day collect &amp; lodge and PO Box clearing, all handled by your local owner-operator.</p>
                  <p>Many businesses run it as a daily rhythm. Our Daily Morning Service collects and delivers all your incoming mail and parcels from Australia Post on an early-morning pickup, so you start each day with everything you need. Our Daily Afternoon Service then collects your outbound mail and parcels at end of day for same-day lodgement — so everything you send today gets processed today.</p>
                  <p>Pickup is handled by a local owner-operator in your area — part of a network of approximately 300 vehicles on the road across all metro areas and selected regional areas. You get a dedicated person who knows your business, backed by a local head-office support team that answers fast: real Australian people, no long hold times, no bots.</p>
                  <p>Set up a scheduled service so your regular collections just happen — a set-and-forget model that gives your team genuine time back, with no need to book each time. MailPlus is a reliable, independent alternative to Australia Post and traditional couriers.</p>
                </div>
                <button className={`intro-toggle ${isIntroOpen ? 'open' : ''}`} id="introToggle" onClick={() => setIsIntroOpen(!isIntroOpen)} aria-expanded={isIntroOpen} aria-controls="introMore">
                  <span className="it-text">{isIntroOpen ? 'Read less' : 'Read more'}</span>
                  <span className="it-icon">{isIntroOpen ? '−' : '+'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============= HOW IT WORKS ============= */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">How collect &amp; lodge works</div>
              <h2>Your Post Office run, handled.</h2>
            </div>
            <div className="steps-grid steps-grid-3">
              <div className="step-card">
                <div className="step-head"><span className="sc-emoji">🌅</span></div>
                <h3>Morning: mail in</h3>
                <p>Your local owner-operator collects your incoming mail and parcels from Australia Post on an early-morning pickup, clears your business PO Boxes, and delivers it all to you — so you start the day with everything you need.</p>
              </div>
              <div className="step-card">
                <div className="step-head"><span className="sc-emoji">🌆</span></div>
                <h3>Afternoon: lodged for you</h3>
                <p>An end-of-day pickup collects your outbound mail and parcels for same-day lodgement — so everything you send today gets processed today, with no trip to the Post Office.</p>
              </div>
              <div className="step-card">
                <div className="step-head"><span className="sc-emoji">🤝</span></div>
                <h3>One local point of contact</h3>
                <p>A dedicated owner-operator who knows your business, backed by a local head-office team that answers fast when you need a hand — real people, no hold queues, no bots.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= MEET YOUR DRIVER ============= */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="diff-band">
              <div className="diff-grid">
                <div className="diff-photo">
                  <img src="/images/post-office-sally.jpg" alt="Sally, a local MailPlus owner-operator, smiling in a MailPlus branded polo shirt" />
                  <span className="photo-tag"><span className="dot"></span> Sally · MailPlus owner-operator</span>
                </div>
                <div className="diff-content">
                  <div className="diff-intro">
                    <h2>Meet your <span className="hl">local owner-operator.</span></h2>
                    <p>The person running your Post Office trips isn't a faceless depot or a different driver each week — it's a local owner-operator like Sally, who knows your business and turns up like clockwork. Behind her, a local head-office team answers fast whenever you need a hand.</p>
                  </div>
                  <div className="diff-items">
                    <div className="diff-item">
                      <div className="di-ic">🤝</div>
                      <div>
                        <h4>The same driver, every time</h4>
                        <p>A dedicated owner-operator who services your area and knows how your business runs — not a stranger from a national depot each week.</p>
                      </div>
                    </div>
                    <div className="diff-item">
                      <div className="di-ic">👩‍💻</div>
                      <div>
                        <h4>A real person answers</h4>
                        <p>When you need a hand, you reach a local head-office team that responds fast — no long hold times, no bots, no being bounced around.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= ALL YOU NEED TO KNOW ============= */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">The essentials</div>
              <h2>All you need to know.</h2>
            </div>
            <div className="spec-card">
              <div className="spec-row">
                <div className="sr-key"><span className="sr-ic">🔁</span> Booking</div>
                <div className="sr-val">Set and forget — your collect &amp; lodge services run on a schedule, fitted into your local owner-operator's daily run, with convenient drop-off and collection times that suit your business.</div>
              </div>
              <div className="spec-row">
                <div className="sr-key"><span className="sr-ic">💰</span> Pricing</div>
                <div className="sr-val">Competitive, flat-rate pricing that stacks up against couriers like Australia Post. We'll tailor a solution to your business needs, across one site or many.</div>
              </div>
              <div className="spec-row">
                <div className="sr-key"><span className="sr-ic">⚡</span> Urgent items</div>
                <div className="sr-val">For time-critical items we offer priority 1–2 day delivery anywhere in Australia, with 95% of shipments arriving overnight on business days — and we'll collect and lodge those for you on the same run, too.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= LOCAL DRIVER CHECK BAND ============= */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="coverage-band">
              <h2>Is there a MailPlus driver near you?</h2>
              <p>With approximately 300 vehicles on the road across all metro areas and selected regional areas, there's a good chance your local owner-operator is just around the corner — ready to run your morning and afternoon collections. Enter your address and we'll check in seconds.</p>
              <a href="#enquire" className="btn btn-primary" style={{ marginTop: '4px' }}>Check my area →</a>
            </div>
          </div>
        </section>

        {/* ============= FAQ ============= */}
        <section className="section faq-section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Frequently asked questions</div>
              <h2>Collect &amp; lodge, answered.</h2>
            </div>

            <div className="faq-list">
              {postOfficeFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button className="faq-q" onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                      {faq.question} <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div className="faq-a" style={{ maxHeight: isOpen ? '200px' : '0px', transition: 'max-height 0.3s ease' }}>
                      <div className="faq-a-inner">{faq.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============= ENQUIRY FORM ============= */}
        <section className="section" id="enquire" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="enquiry-band">
              <div className="enquiry-grid">
                <div className="enquiry-left">
                  <h2>Hand us your Post Office run — this week.</h2>
                  <p>Enter your address and we'll instantly check for a local MailPlus driver in your area, then connect you with your account manager to get set up. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
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
                  {/* Progressive enquiry: Step 1 address gate -> Step 2 service -> Step 3 details */}
                  <div className="ef-progress" aria-hidden="true">
                    <span className={`ef-dot ${step === 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`} data-s="1"></span>
                    <span className={`ef-bar ${step > 1 ? 'done' : ''}`}></span>
                    <span className={`ef-dot ${step === 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`} data-s="2"></span>
                    <span className={`ef-bar ${step > 2 ? 'done' : ''}`}></span>
                    <span className={`ef-dot ${step === 3 ? 'active' : ''}`} data-s="3"></span>
                  </div>

                  {/* STEP 1: address gate */}
                  <div className={`ef-pane ${step === 1 && !checkingArea ? 'show' : ''}`}>
                    <p className="ef-intro">Pop in your pickup address and we’ll instantly check for a local MailPlus driver in your area.</p>
                    <div className="field-group">
                      <label className="field-label">Pickup address <span className="req">*</span></label>
                      <div className="addr-wrap">
                        <span className="addr-pin" aria-hidden="true">📍</span>
                        <input 
                          type="text" 
                          className="field-input addr-input" 
                          id="f-address" 
                          ref={addressInputRef}
                          placeholder="Start typing your business address…" 
                          autoComplete="off"
                          onChange={() => {
                            if (addressError) {
                              setAddressError(false);
                              if (addressInputRef.current) addressInputRef.current.style.borderColor = '';
                            }
                          }}
                        />
                      </div>
                      <p className="field-hint">We use this to find your local driver.</p>
                    </div>
                    <button className="form-submit" type="button" onClick={handleCheckArea}>Check my area &rarr;</button>
                  </div>

                  {/* CHECKING INTERSTITIAL */}
                  <div className={`form-success ${checkingArea ? 'show' : ''}`} id="enquiryChecking">
                    <div className="fs-ic checking">📍</div>
                    <h3>Checking your area…</h3>
                    <p>Looking for a local MailPlus driver near your pickup address. This will only take a moment.</p>
                  </div>

                  {/* STEP 2: service selection */}
                  <div className={`ef-pane ${step === 2 ? 'show' : ''}`} id="efStep2">
                  {serviceable ? (
                    <div className="ef-instep-head">
                      <span className="ef-badge"><span className="efb-tick">✓</span> You’re in our patch</span>
                      <p className="ef-instep-note">There’s a local driver covering your area. What can we help you with?</p>
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
                    <div className="svc-cards" role="radiogroup" aria-label="What are you interested in?">
                      <button 
                        type="button" 
                        className={`svc-card ${selectedService === 'five-free' ? 'selected' : ''}`} 
                        onClick={() => handleSelectService('five-free')}
                        role="radio" 
                        aria-checked={selectedService === 'five-free'}
                      >
                        <span className="svc-ic">🎁</span>
                        <span className="svc-txt">
                          <span className="svc-name">5 Free Collections</span>
                          <span className="svc-desc">We’ll deliver your items to the Post Office. Five free pickups, no card, no catch.</span>
                        </span>
                        <span className="svc-check">✓</span>
                      </button>
                      <button 
                        type="button" 
                        className={`svc-card ${selectedService === 'express' ? 'selected' : ''}`} 
                        onClick={() => handleSelectService('express')}
                        role="radio" 
                        aria-checked={selectedService === 'express'}
                      >
                        <span className="svc-ic">⚡</span>
                        <span className="svc-txt">
                          <span className="svc-name">Express Delivery &amp; ShipMate</span>
                          <span className="svc-desc">1–2 day delivery + Shopify &amp; WooCommerce plugins.</span>
                        </span>
                        <span className="svc-check">✓</span>
                      </button>
                      <button 
                        type="button" 
                        className={`svc-card ${selectedService === 'corporate' ? 'selected' : ''}`} 
                        onClick={() => handleSelectService('corporate')}
                        role="radio" 
                        aria-checked={selectedService === 'corporate'}
                      >
                        <span className="svc-ic">🏢</span>
                        <span className="svc-txt">
                          <span className="svc-name">Corporate / Multi-site</span>
                          <span className="svc-desc">Tailored Post Office services for business.</span>
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

                  {/* STEP 3: details */}
                  <div className={`ef-pane ${step === 3 ? 'show' : ''}`} id="efStep3">
                    <p className="ef-intro" id="efStep3Intro">
                      {selectedService === 'five-free' ? 'Last step to create your free account.' : 'Last step — tell us where to reach you.'}
                    </p>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">First name <span className="req">*</span></label>
                        <input type="text" className="field-input" id="f-fname" value={formFields.fname} onChange={handleFieldChange} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Last name <span className="req">*</span></label>
                        <input type="text" className="field-input" id="f-lname" value={formFields.lname} onChange={handleFieldChange} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Business name <span className="req">*</span></label>
                      <input type="text" className="field-input" id="f-company" value={formFields.company} onChange={handleFieldChange} />
                    </div>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Email <span className="req">*</span></label>
                        <input type="email" className="field-input" id="f-email" value={formFields.email} onChange={handleFieldChange} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Phone <span className="req">*</span></label>
                        <input type="tel" className="field-input" id="f-phone" value={formFields.phone} onChange={handleFieldChange} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Roughly how many parcels do you send a week? <span className="req">*</span></label>
                      <select className="field-select" id="f-volume" value={formFields.volume} onChange={handleFieldChange}>
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
                      <button className="ef-back" type="button" onClick={() => setStep(2)}>&larr; Back</button>
                      <button className="form-submit ef-inline" type="button" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit enquiry →'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

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
          <button className="mp-close" onClick={() => setIsSorryOpen(false)} aria-label="Close">✕</button>
          <div className="mp-modal-top">
            <div className="mp-icon">📍</div>
            <h3 id="mpSorryTitle">We’re not in your area just yet.</h3>
          </div>
          <div className="mp-modal-body">
            <p>We couldn’t find a local MailPlus driver covering your address right now — so we can’t start your enquiry here today. You’re welcome to check back any time.</p>
          </div>
        </div>
      </div>
    </>
  );
}
