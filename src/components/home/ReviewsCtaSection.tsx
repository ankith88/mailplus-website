'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Script from 'next/script'
import { ProgressModal } from '../shared/ProgressModal'

interface ReviewsCtaSectionProps {
  defaultSelectedService?: string
  initialStep?: 1 | 2 | 3
}

export function ReviewsCtaSection({ defaultSelectedService = '', initialStep = 1 }: ReviewsCtaSectionProps) {
  const [step, setStep] = useState<1 | 2 | 3>(initialStep)
  const [checkingArea, setCheckingArea] = useState(false)
  const [selectedService, setSelectedService] = useState<string>(defaultSelectedService)
  const [isSorryOpen, setIsSorryOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serviceable, setServiceable] = useState(true)
  
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [location, setLocation] = useState<{lat: number, lng: number, city: string, state: string, zip: string, street: string} | null>(null)
  const [addressError, setAddressError] = useState(false)

  const [formFields, setFormFields] = useState({
    fname: '',
    lname: '',
    company: '',
    email: '',
    phone: '',
    volume: ''
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})

  const autocompleteInitialized = useRef(false)

  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return
    if (!window.google?.maps?.places) return
    if (!addressInputRef.current) return
    autocompleteInitialized.current = true

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      fields: ['geometry', 'address_components']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
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
        setAddressError(false)

        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          city,
          state,
          zip,
          street: street || place.formatted_address || ''
        })
      }
    })
  }, [])

  useEffect(() => {
    let placesInterval: ReturnType<typeof setInterval>
    const checkAndInit = () => {
      if (window.google?.maps?.places) {
        initAutocomplete()
        if (placesInterval) clearInterval(placesInterval)
      }
    }
    checkAndInit()
    if (!window.google?.maps?.places) {
      placesInterval = setInterval(checkAndInit, 500)
    }
    return () => {
      if (placesInterval) clearInterval(placesInterval)
    }
  }, [initAutocomplete])

  const handleCheckArea = async () => {
    if (!addressInputRef.current?.value.trim()) {
      setAddressError(true)
      if (addressInputRef.current) addressInputRef.current.style.borderColor = '#E5484D'
      return
    }

    if (!location || !location.zip || !location.city) {
      setAddressError(true)
      if (addressInputRef.current) addressInputRef.current.style.borderColor = '#E5484D'
      alert('Please select a business address from the suggestions dropdown.')
      return
    }

    setAddressError(false)
    if (addressInputRef.current) addressInputRef.current.style.borderColor = ''

    setCheckingArea(true)
    try {
      const res = await fetch('/api/territory/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode: location.zip, city: location.city })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Territory check API returned error status:', res.status, errorData);
        throw new Error('Territory check failed')
      }

      const data = await res.json()
      setCheckingArea(false)

      if (data.serviceable) {
        setServiceable(true)
        setStep(2)
      } else {
        setServiceable(false)
        setStep(2)
      }
    } catch (err) {
      console.error('Territory check error:', err)
      setCheckingArea(false)
      setServiceable(false)
      setStep(2)
    }
  }

  const handleSelectService = (svc: string) => {
    setSelectedService(svc)
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    const fieldName = id.replace('f-', '')
    setFormFields(prev => ({ ...prev, [fieldName]: value }))
    if (fieldErrors[id]) {
      setFieldErrors(prev => ({ ...prev, [id]: false }))
      e.target.style.borderColor = ''
    }
  }

  const handleSubmit = async () => {
    const requiredIds = ['f-fname', 'f-lname', 'f-company', 'f-email', 'f-phone', 'f-volume']
    let ok = true
    const newErrors: Record<string, boolean> = {}

    requiredIds.forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement
      if (!el || !el.value.trim()) {
        if (el) el.style.borderColor = '#E5484D'
        newErrors[id] = true
        ok = false
      } else {
        if (el) el.style.borderColor = ''
      }
    })

    setFieldErrors(newErrors)
    if (!ok) return

    setSubmitting(true)
    try {
      const { submitLead } = await import('@/utils/submitLead')

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
        sourcePage: typeof window !== 'undefined'
          ? (window.location.pathname.includes('express-delivery')
            ? 'Express Delivery'
            : (window.location.pathname.includes('shipmate-platform')
              ? 'ShipMate Platform'
              : (window.location.pathname.includes('mailplus-api')
                ? 'MailPlus API Integration'
                : (window.location.pathname.includes('about') ? 'About' : 'Home Page'))))
          : 'Home Page',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
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
      }

      const result = await submitLead(payload)
      setSubmitting(false)

      if (result.success) {
        sessionStorage.setItem('lead_submission_data', JSON.stringify({ result, payload }));
        window.location.href = '/confirmation'
      } else {
        setIsSorryOpen(true)
      }
    } catch (err) {
      console.error('Error submitting lead:', err)
      setSubmitting(false)
      setIsSorryOpen(true)
    }
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
          onLoad={initAutocomplete}
        />
      )}

      {/* Enquiry & Progressive Form Section */}
      <section className="section" id="enquire" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="enquiry-band">
            <div className="enquiry-grid">
              <div className="enquiry-left">
                <h2>Get your time back — starting this week.</h2>
                <p>Send with Australia Post? Start with five free collections — no card, no catch. Enter your address and we'll instantly check for a local MailPlus driver in your area, then connect you with your account manager. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
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

                {/* STEP 1: Address gate */}
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
                            setAddressError(false)
                            if (addressInputRef.current) addressInputRef.current.style.borderColor = ''
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
                      onClick={() => handleSelectService('five-free')}
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
                      onClick={() => handleSelectService('express')}
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
                      onClick={() => handleSelectService('not-sure')}
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
                      onClick={() => handleSelectService('corporate')}
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

      {/* SORRY MODAL OVERLAY */}
      <div 
        className={`mp-modal-overlay ${isSorryOpen ? 'open' : ''}`} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="mpSorryTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsSorryOpen(false)
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
      <ProgressModal isOpen={submitting} />
    </>
  )
}
