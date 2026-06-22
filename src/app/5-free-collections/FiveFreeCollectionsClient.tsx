'use client';

import React, { useState, useEffect } from 'react';

interface FAQ {
  q: string;
  a: string;
}

export default function FiveFreeCollectionsClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVersion, setActiveVersion] = useState<'success' | 'sorry'>('success');
  const [introOpen, setIntroOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [enquiryState, setEnquiryState] = useState<'form' | 'checking'>('form');

  const [formFields, setFormFields] = useState({
    fname: '',
    lname: '',
    company: '',
    address: '',
    email: '',
    phone: '',
    interest: '',
    volume: ''
  });

  const [addressDetails, setAddressDetails] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    lat: 0,
    lng: 0,
  });

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  const openModal = (version: 'success' | 'sorry') => {
    setActiveVersion(version);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let placesInterval: ReturnType<typeof setInterval>;
    const initPlaces = () => {
      const addressInput = document.getElementById('f-address') as HTMLInputElement;
      if (!addressInput) return;
      if (window.google && window.google.maps && window.google.maps.places) {
        if (placesInterval) clearInterval(placesInterval);
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
          componentRestrictions: { country: 'au' },
          types: ['address'],
          fields: ['address_components', 'geometry', 'formatted_address'],
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place || !place.address_components || !place.geometry) return;
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
          const formattedAddress = place.formatted_address || '';

          setFormFields(prev => ({ ...prev, address: formattedAddress }));
          setAddressDetails({
            street: street || formattedAddress,
            city,
            state,
            zip,
            lat: place.geometry.location?.lat() || 0,
            lng: place.geometry.location?.lng() || 0,
          });
        });
      }
    };
    initPlaces();
    if (!(window.google && window.google.maps && window.google.maps.places)) {
      placesInterval = setInterval(initPlaces, 500);
    }
    return () => {
      if (placesInterval) clearInterval(placesInterval);
    };
  }, []);

  const submitEnquiry = async () => {
    const required = ['fname', 'lname', 'company', 'address', 'email', 'phone', 'interest', 'volume'];
    let ok = true;
    const errors: Record<string, boolean> = {};
    required.forEach(field => {
      if (!formFields[field as keyof typeof formFields].trim()) {
        errors[field] = true;
        ok = false;
      }
    });

    setFormErrors(errors);
    if (!ok) return;

    setEnquiryState('checking');
    try {
      const { submitLead } = await import('@/utils/submitLead');
      const payload = {
        companyName: formFields.company,
        customerPhone: formFields.phone,
        customerServiceEmail: formFields.email,
        interestedIn: formFields.interest,
        weeklyParcels: formFields.volume,
        bucket: '5-free-trial',
        address: {
          address1: '',
          street: addressDetails.street || formFields.address,
          city: addressDetails.city,
          state: addressDetails.state,
          zip: addressDetails.zip,
          latitude: addressDetails.lat,
          longitude: addressDetails.lng,
        },
        contacts: [{
          name: `${formFields.fname} ${formFields.lname}`,
          email: formFields.email,
          phone: formFields.phone,
        }]
      };

      const result = await submitLead(payload);
      setEnquiryState('form');

      if (result.success && !result.outOfTerritory) {
        openModal('success');
      } else {
        openModal('sorry');
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setEnquiryState('form');
      openModal('sorry');
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: false });
    }
  };

  const faqs: FAQ[] = [
    { q: "What are MailPlus 5 free collections?", a: "It's a free trial for new business customers: five parcel collections, completely free. A local MailPlus owner-operator comes to your premises and lodges your parcels at the Post Office for you. You can also use your free collections for hand-to-hand local deliveries. There's no credit card, no invoice, and no obligation to continue." },
    { q: "Is there really no catch with the free collections?", a: "No catch. MailPlus has worked with Licensed Post Offices across Australia for almost 30 years, so we'd rather show you the service than try to convince you. Five collections are on us, with nothing on your card and nothing to cancel. If it doesn't save your team time, you haven't lost a thing." },
    { q: "Do I need a credit card to start the free trial?", a: "No. You don't enter any card details to claim your five free collections. Just enter your business address on this page to check your area, and if there's a local owner-operator near you, register on LocalMile and book your first collection. There is no invoice and no obligation during the trial." },
    { q: "What happens after the 5 free collections?", a: "Most businesses choose to keep going. If you book as you need it, ad hoc collections are $15 + GST each. If you'd rather a scheduled, regular service, your Account Manager tailors the pricing to your business during the trial. There's no lock-in, and the choice is entirely yours once you've seen the service for yourself." },
    { q: "Can I use the trial for local deliveries, not just the Post Office?", a: "Yes. As well as Post Office lodgements, your free collections can be used for hand-to-hand local deliveries — your owner-operator collects and delivers goods straight to a local recipient. You choose what each job is when you book it in LocalMile, so the trial fits the way your business actually sends." },
    { q: "How soon will my parcels be collected?", a: "During the trial, same-day collections need to be booked before 12pm, so your local owner-operator has plenty of time to fit you into their run. Book after that and your collection rolls to the next business day. Either way, you'll see it confirmed in LocalMile, so you always know a pickup is on the way." },
    { q: "What if I already use another courier?", a: "That's no problem — this isn't about replacing your courier. The free trial covers the trip to the Post Office that you're doing yourself. If you're still driving parcels in or dropping things across town, your owner-operator can take that off your hands, alongside whatever courier you already use." },
    { q: "How does MailPlus collection work with my local Post Office?", a: "MailPlus is the collection arm for Licensed Post Offices across Australia. Your local owner-operator comes to your business, collects your parcels and mail, and lodges them at the Post Office for you. It bridges the gap between your business and the Post Office, on a schedule that suits you, so your team never has to make the run themselves." },
    { q: "What is LocalMile and how do I book my collections?", a: "LocalMile is the free MailPlus platform for booking your local pickups online. Once your area is confirmed, you register on LocalMile and book each collection in a few taps. Your local owner-operator is sent the job automatically, accepts it, and comes to your premises to collect — so you can manage everything from one simple dashboard." }
  ];

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  return (
    <div className="five-free-page">
      <section className="hero hero--offer">
  <span className="hero-watermark" aria-hidden="true">5</span>
  <div className="wrap">
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a><span className="sep">/</span><a href="/#services">Services</a><span className="sep">/</span><span>5 Free Collections</span>
    </nav>
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="offer-badge">
          <span className="ob-dot"></span>
          New offer
          <span className="ob-tag">5 on us</span>
        </div>
        <h1>Five <span className="free-pop">free</span> collections.<br/><span className="hl">No card. No catch.</span></h1>
        <p className="hero-lead hero-lead-hook">
          Skip the Post Office run. Your local MailPlus owner-operator comes to you, collects and lodges your parcels — no queue, no trip. Book each one in <strong>LocalMile</strong>, our free online platform.
        </p>
        <div className="hero-cta-row">
          <a href="#enquire" className="btn btn-primary">Claim my 5 free collections →</a>
          <a href="tel:1300656595" className="btn btn-secondary">Call 1300 65 65 95</a>
        </div>
        <div className="hero-trust-row">
          <span className="ht-item"><span className="ht-tick">&#10003;</span> No credit card</span>
          <span className="ht-sep"></span>
          <span className="ht-item"><span className="ht-tick">&#10003;</span> No obligation</span>
          <span className="ht-sep"></span>
          <span className="ht-item"><span className="ht-tick">&#10003;</span> Almost 30 years of local experience</span>
        </div>
      </div>

            <div className="hero-side">
        <img className="hero-img" src="/images/final-5-free-collections.png" alt="5 Free Collections" />
      </div>
    </div>
  </div>
</section>


<section className="deal-section">
  <div className="wrap">
    <div className="deal-card">
      <div className="deal-head">
        <h2>Here's the deal</h2>
        <p>Free local collections — for Post Office lodgements or local deliveries.</p>
      </div>
      <div className="deal-grid">
        <div className="deal-fact">
          <span className="deal-num">5</span>
          <span className="deal-label">free collections<br/>for new business customers</span>
        </div>
        <div className="deal-fact">
          <span className="deal-num">$0</span>
          <span className="deal-label">to try the full service<br/>no card required</span>
        </div>
        <div className="deal-fact">
          <span className="deal-num">Free</span>
          <span className="deal-label">register & book<br/>online in LocalMile</span>
        </div>
        <div className="deal-fact">
          <span className="deal-num">~300</span>
          <span className="deal-label">vehicles on the road<br/>nationwide</span>
        </div>
      </div>
    </div>
  </div>
</section>




<section className="intro-band">
  <div className="wrap">
    <div className="intro-band-inner">
      <div className="intro-band-label">5 free <span className="hl">collections</span></div>
      <div className="intro-band-copy">
        <p><strong>New MailPlus business customers get five free parcel collections — a local owner-operator collects from your premises and lodges your parcels at the Post Office for you, with no card and no obligation to continue.</strong> It removes the Post Office run entirely: nobody on your team has to queue or leave the office.</p>
        <div className={`intro-more ${introOpen ? 'open' : ''}`} style={{ maxHeight: introOpen ? '1000px' : '0' }}>
                <p>MailPlus is the collection arm for Licensed Post Offices across Australia, a role it has held for decades. Your collection is always handled by a local owner-operator who services your specific suburb — not a random driver from a national logistics giant. They come to you, collect your parcels and mail, and lodge them on your behalf.</p>
                <p>The trial is genuinely free because we're confident, not desperate. We'd rather show you the service than pitch it — five collections, completely on us. Once a business tries it, most don't go back to driving parcels in themselves, so we're happy to let the service speak for itself.</p>
                <p>Getting started takes just a few minutes. Enter your business address on this page and we'll check for a local owner-operator in your area. If there's a driver near you, we take you straight to <strong>LocalMile</strong> — our free platform for booking local pickups — to register and book your first collection. MailPlus is a reliable, independent alternative to Australia Post and traditional couriers, backed by a local owner-operator and an Australian-based head-office support team.</p>
              </div>
              <button className={`intro-toggle ${introOpen ? 'open' : ''}`} onClick={() => setIntroOpen(!introOpen)} aria-expanded={introOpen}>
                <span className="it-text">{introOpen ? 'Read less' : 'Read more'}</span> <span className="it-icon">＋</span>
              </button>
      </div>
    </div>
  </div>
</section>



<section className="section">
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">How the free trial works</div>
      <h2>From enquiry to first collection, in four steps.</h2>
    </div>
    <div className="steps-grid">
      <div className="step-card">
        <div className="step-head"><span className="step-no">1</span><span className="sc-emoji">&#128205;</span></div>
        <h3>Check your area</h3>
        <p>Enter your business address below and we'll instantly check for a local MailPlus owner-operator in your territory. It takes just a few seconds to see if you're covered.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">2</span><span className="sc-emoji">&#128221;</span></div>
        <h3>Register on LocalMile</h3>
        <p>If there's a driver in your area, we take you straight to LocalMile — our free booking platform — to set up your account. It only takes a minute to get started.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">3</span><span className="sc-emoji">&#128666;</span></div>
        <h3>Book your collection</h3>
        <p>Book your first collection in LocalMile and the job goes straight to your local owner-operator. They accept it and come to your premises — no trip to the Post Office required.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">4</span><span className="sc-emoji">&#127881;</span></div>
        <h3>Collected & delivered</h3>
        <p>Your owner-operator collects your parcels and lodges them for you. That's one free collection done — four more on us, with nothing on your card.</p>
      </div>
    </div>
  </div>
</section>



<section className="section" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="coverage-band">
      <h2>Free because we're confident — not because we're desperate.</h2>
      <p>We've been collecting and lodging for Australian businesses long enough to know how this goes: once a business tries having parcels picked up and lodged for them, they rarely go back to doing the run themselves. So rather than ask you to take our word for it, we'd rather just show you. Five collections, completely on us.</p>
      <div className="chip-group">
        <span className="chip-label">What you get</span>
        <div className="city-chips">
          <span className="city-chip"><span className="cc-dot"></span> 5 free collections</span>
          <span className="city-chip"><span className="cc-dot"></span> No credit card</span>
          <span className="city-chip"><span className="cc-dot"></span> No invoice</span>
          <span className="city-chip"><span className="cc-dot"></span> No contract</span>
          <span className="city-chip"><span className="cc-dot"></span> Nothing to cancel</span>
        </div>
      </div>
      <div className="chip-group">
        <span className="chip-label">Why businesses say yes</span>
        <div className="city-chips">
          <span className="city-chip"><span className="cc-dot"></span> Removes the Post Office run</span>
          <span className="city-chip"><span className="cc-dot"></span> Saves your team time</span>
          <span className="city-chip"><span className="cc-dot"></span> A genuinely local driver</span>
          <span className="city-chip"><span className="cc-dot"></span> Australian-based support</span>
        </div>
      </div>
      <p className="coverage-note">Enter your details below and we'll check for a local MailPlus owner-operator in your area.</p>
      <div className="cta-band-actions" style={{"marginTop":"22px"}}>
        <a href="#enquire" className="btn btn-primary">Claim my 5 free collections →</a>
      </div>
    </div>
  </div>
</section>



<section className="section" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">The Post Office run, gone</div>
      <h2>What the free trial takes off your plate.</h2>
    </div>
    <div className="svc-grid">
      <div className="svc-card">
        <div className="svc-icon v-collect">&#9203;</div>
        <h3>The lost time</h3>
        <p>Driving parcels to the Post Office quietly eats hours out of someone's week. During your trial, your local owner-operator comes to you instead — so that time goes back into running your business.</p>
      </div>
      <div className="svc-card">
        <div className="svc-icon v-auspost">&#128553;</div>
        <h3>The queue</h3>
        <p>No more finding a park and waiting in line to lodge a stack of parcels. Your local owner-operator collects from your premises and lodges them for you — so you skip the queue entirely.</p>
      </div>
      <div className="svc-card">
        <div className="svc-icon v-pobox">&#128179;</div>
        <h3>The risk of trying something new</h3>
        <p>There's nothing to weigh up. Your five collections are completely free, with nothing to sign and nothing to cancel. If it doesn't save your team time, you haven't lost a thing.</p>
      </div>
    </div>
  </div>
</section>



<section className="section" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="cta-band">
      <div className="cta-band-text">
        <h3>Ready to skip the Post Office run? <span className="hl">Your first five are free.</span></h3>
        <p>Check your area in seconds and start your free trial — no card, no catch.</p>
      </div>
      <div className="cta-band-actions">
        <a href="#enquire" className="btn btn-primary">Claim my 5 free collections →</a>
        <a href="tel:1300656595" className="btn btn-ghost-dark">Call 1300 65 65 95</a>
      </div>
    </div>
  </div>
</section>



<section className="section" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">The details</div>
      <h2>Everything the offer includes.</h2>
    </div>
    <div className="spec-card">
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">&#128176;</span> The offer</div>
        <div className="sr-val"><span className="spec-val-strong">Five free parcel collections</span>for new MailPlus business customers.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">&#128179;</span> Cost to you</div>
        <div className="sr-val"><span className="spec-val-strong">$0 during the trial.</span>Your five collections are completely on us — no card needed to start.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">&#128666;</span> What happens</div>
        <div className="sr-val">Your local owner-operator collects your parcels from your premises and lodges them at the Post Office for you. You can also book hand-to-hand local deliveries with your free collections.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">&#128205;</span> Where we collect</div>
        <div className="sr-val">From your business address, by the owner-operator who services your specific suburb. Enter your address above to check there's a driver in your area.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">&#128241;</span> Getting started</div>
        <div className="sr-val">Check your area on this page, register on LocalMile, then book your first collection — all online.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">&#128196;</span> Commitment</div>
        <div className="sr-val">No lock-in contract and nothing to cancel. After the five free collections, continuing is entirely your choice.</div>
      </div>
    </div>
  </div>
</section>



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
                <div className="faq-a" style={{ maxHeight: faqOpenIndex === i ? '1000px' : '0' }}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section" id="enquire" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="enquiry-band">
      <div className="enquiry-grid">
        <div className="enquiry-left">
          <h2>Claim your 5 free collections.</h2>
          <p>Enter your details and we'll instantly check for a local MailPlus owner-operator in your area. If there's a driver near you, we'll take you straight to LocalMile to register and start your trial. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
          <div className="enquiry-contacts">
            <a href="tel:1300656595" className="enquiry-contact">
              <div className="ec-ic">&#128222;</div>
              <div>
                <div className="ec-lbl">Call us</div>
                <div className="ec-val mono">1300 65 65 95</div>
              </div>
            </a>
            <div className="enquiry-contact">
              <div className="ec-ic">&#128336;</div>
              <div>
                <div className="ec-lbl">Hours</div>
                <div className="ec-val">Mon&#8211;Fri, 9am&#8211;5pm AEST</div>
              </div>
            </div>
          </div>
        </div>

        <div className="enquiry-form">
          {enquiryState === 'form' && (
            <div id="enquiryFormInner">
              <p className="ef-intro">Pop in your business details and we'll check for a local MailPlus owner-operator in your area — if there's one near you, we'll take you straight to LocalMile to register.</p>

              <div className="field-row">
                <div className="field-group">
                  <label className="field-label" htmlFor="f-fname">First name <span className="req">*</span></label>
                  <input id="f-fname" name="fname" type="text" className="field-input" style={{ borderColor: formErrors.fname ? '#E5484D' : '' }} value={formFields.fname} onChange={handleFieldChange} />
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="f-lname">Last name <span className="req">*</span></label>
                  <input id="f-lname" name="lname" type="text" className="field-input" style={{ borderColor: formErrors.lname ? '#E5484D' : '' }} value={formFields.lname} onChange={handleFieldChange} />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="f-company">Business name <span className="req">*</span></label>
                <input id="f-company" name="company" type="text" className="field-input" style={{ borderColor: formErrors.company ? '#E5484D' : '' }} value={formFields.company} onChange={handleFieldChange} />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="f-address">Pickup address <span className="req">*</span></label>
                <div className="addr-wrap">
                  <span className="addr-pin" aria-hidden="true">📍</span>
                  <input id="f-address" name="address" type="text" className="field-input addr-input" placeholder="Start typing your business address..." autoComplete="off" style={{ borderColor: formErrors.address ? '#E5484D' : '' }} value={formFields.address} onChange={handleFieldChange} />
                </div>
                <p className="field-hint">We use this to find your local owner-operator.</p>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label className="field-label" htmlFor="f-email">Email <span className="req">*</span></label>
                  <input id="f-email" name="email" type="email" className="field-input" style={{ borderColor: formErrors.email ? '#E5484D' : '' }} value={formFields.email} onChange={handleFieldChange} />
                </div>
                <div className="field-group">
                  <label className="field-label" htmlFor="f-phone">Phone <span className="req">*</span></label>
                  <input id="f-phone" name="phone" type="tel" className="field-input" style={{ borderColor: formErrors.phone ? '#E5484D' : '' }} value={formFields.phone} onChange={handleFieldChange} />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="f-interest">What do you need collected? <span className="req">*</span></label>
                <select id="f-interest" name="interest" className="field-select" style={{ borderColor: formErrors.interest ? '#E5484D' : '' }} value={formFields.interest} onChange={handleFieldChange}>
                  <option value="">Please select...</option>
                  <option>eCommerce parcels</option>
                  <option>Regular mail and parcels</option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="f-volume">Roughly how many parcels do you send a week? <span className="req">*</span></label>
                <select id="f-volume" name="volume" className="field-select" style={{ borderColor: formErrors.volume ? '#E5484D' : '' }} value={formFields.volume} onChange={handleFieldChange}>
                  <option value="">Please select...</option>
                  <option>Just a few a week</option>
                  <option>1–10 a week</option>
                  <option>11–50 a week</option>
                  <option>51–200 a week</option>
                  <option>200+ a week</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <button className="form-submit" onClick={submitEnquiry}>Claim my 5 free collections →</button>
              <p className="form-note">No credit card required. No obligation to continue after your free collections.</p>
            </div>
          )}

          {enquiryState === 'checking' && (
            <div className="form-success show" id="enquiryChecking">
              <div className="fs-ic checking">📍</div>
              <h3>Checking your area...</h3>
              <p>Looking for a local MailPlus owner-operator near your business. This will only take a moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</section>

{/* MODAL OVERLAY */}
      <div 
        className={`mp-modal-overlay ${modalOpen ? 'open' : ''}`} 
        role="dialog" 
        aria-modal="true" 
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {activeVersion === 'success' ? (
          <div className="mp-modal is-success">
            <button className="mp-close" onClick={closeModal} aria-label="Close">✕</button>
            <div className="mp-modal-top">
              <div className="mp-icon">🎉</div>
              <h3>Great news — <span className="hl">you're in our patch.</span></h3>
            </div>
            <div className="mp-modal-body">
              <p>There's a local MailPlus driver covering your area, so your five free collections are ready to go. The last step is quick: register on LocalMile, and you can book your first pickup straight away.</p>
              <div className="mp-actions">
                <a href="https://localmile.plus/register" className="btn btn-primary">Register now on LocalMile →</a>
              </div>
              <p className="mp-foot">Rather talk it through first? Call <a href="tel:1300656595">1300 65 65 95</a>, Mon–Fri 9am–5pm AEST.</p>
            </div>
          </div>
        ) : (
          <div className="mp-modal is-sorry">
            <button className="mp-close" onClick={closeModal} aria-label="Close">✕</button>
            <div className="mp-modal-top">
              <div className="mp-icon">📍</div>
              <h3>We're not in your area just yet.</h3>
            </div>
            <div className="mp-modal-body">
              <p>We couldn't find a local MailPlus driver covering your address right now — so we can't start your free trial here today. You're welcome to check back any time.</p>
              <div className="mp-actions">
                <a href="tel:1300656595" className="btn btn-secondary">Call 1300 65 65 95</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
