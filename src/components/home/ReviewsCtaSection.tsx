'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Script from 'next/script'
import { CustomSelect } from '../shared/CustomSelect'

export function ReviewsCtaSection() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [location, setLocation] = useState<{lat: number, lng: number, city: string, state: string, zip: string, street: string} | null>(null)

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
        if (addressInputRef.current) addressInputRef.current.value = street;

        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          city,
          state,
          zip,
          street
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Dynamic import
    const { submitLead } = await import('@/utils/submitLead');

    const fname = (document.getElementById('fname') as HTMLInputElement).value;
    const lname = (document.getElementById('lname') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    const payload = {
      companyName: (document.getElementById('businessName') as HTMLInputElement).value,
      customerPhone: phone,
      customerServiceEmail: email,
      interestedIn: (document.getElementById('interest') as HTMLInputElement).value,
      weeklyParcels: (document.getElementById('volume') as HTMLInputElement).value,
      bucket: 'inbound',
      address: {
        address1: '',
        street: location?.street || (addressInputRef.current?.value || ''),
        city: location?.city || '',
        state: location?.state || '',
        zip: location?.zip || '',
        latitude: location?.lat || 0,
        longitude: location?.lng || 0
      },
      contacts: [{
        name: `${fname} ${lname}`,
        email: email,
        phone: phone
      }]
    };

    const result = await submitLead(payload);
    setSubmitting(false)

    if (result.success) {
      sessionStorage.setItem('lead_submission_data', JSON.stringify({ result, payload }));
      window.location.href = '/confirmation';
    } else {
      setSuccess(true)
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
      <section className="section" id="enquire">
        <div className="wrap">
          <div className="enquiry-band reveal">
            <div className="enquiry-grid">
              <div className="enquiry-left">
                <h2>Get your time back — starting this week.</h2>
                <p>Start with five free collections — no card, no catch. Enter your address and we&apos;ll instantly check for a local MailPlus driver in your area, then connect you with your account manager. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
                
                <div className="enquiry-contacts">
                  <a href="tel:1300656595" className="enquiry-contact">
                    <div className="ec-ic">📞</div>
                    <div className="ec-text">
                      <div className="ec-lbl">CALL US</div>
                      <div className="ec-val mono">1300 65 65 95</div>
                    </div>
                  </a>
                  <a href="https://customer.mailplus.com.au/" className="enquiry-contact" target="_blank" rel="noopener noreferrer">
                    <div className="ec-ic">🔑</div>
                    <div className="ec-text">
                      <div className="ec-lbl">EXISTING CUSTOMER</div>
                      <div className="ec-val">ShipMate Login</div>
                    </div>
                  </a>
                  <div className="enquiry-contact">
                    <div className="ec-ic">🕐</div>
                    <div className="ec-text">
                      <div className="ec-lbl">HOURS</div>
                      <div className="ec-val">Mon-Fri, 9am–5pm AEST</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="enquiry-form">
                {!success ? (
                  <form id="enquiryForm" onSubmit={handleSubmit}>
                    <div className="ef-intro" style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--line)', color: 'var(--ink-2)', marginBottom: '32px' }}>
                      Pop in your pickup address and we&apos;ll check for a local MailPlus driver in your area — then take you to the next step.
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <label htmlFor="fname" className="field-label">First name <span className="req">*</span></label>
                        <input type="text" id="fname" className="field-input" required />
                      </div>
                      <div className="field-group">
                        <label htmlFor="lname" className="field-label">Last name <span className="req">*</span></label>
                        <input type="text" id="lname" className="field-input" required />
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="businessName" className="field-label">Business name <span className="req">*</span></label>
                      <input type="text" id="businessName" className="field-input" required />
                    </div>

                    <div className="field-group">
                      <label htmlFor="address" className="field-label">Pickup address <span className="req">*</span></label>
                      <div className="addr-wrap">
                        <span className="addr-pin">📍</span>
                        <input 
                          type="text" 
                          id="address" 
                          ref={addressInputRef}
                          className="field-input addr-input" 
                          required 
                          placeholder="Start typing your business address..." 
                        />
                      </div>
                      <div className="field-hint">We use this to find your local driver.</div>
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <label htmlFor="email" className="field-label">Email <span className="req">*</span></label>
                        <input type="email" id="email" className="field-input" required />
                      </div>
                      <div className="field-group">
                        <label htmlFor="phone" className="field-label">Phone <span className="req">*</span></label>
                        <input type="tel" id="phone" className="field-input" required />
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="interest" className="field-label">What are you interested in? <span className="req">*</span></label>
                      <CustomSelect
                        id="interest"
                        triggerClassName="field-select"
                        required
                        options={[
                          { value: '5-free', label: '5 free collections offer' },
                          { value: 'express', label: 'Express parcel delivery & ShipMate' },
                          { value: 'post-office', label: 'Post Office collect & lodge' },
                          { value: 'corporate', label: 'Multi-site / corporate services' },
                          { value: 'other', label: 'Something else' }
                        ]}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="volume" className="field-label">Roughly how many parcels do you send a week? <span className="req">*</span></label>
                      <CustomSelect
                        id="volume"
                        triggerClassName="field-select"
                        required
                        dropdownPosition="top"
                        options={[
                          { value: '1-10', label: '1–10 a week' },
                          { value: '11-50', label: '11–50 a week' },
                          { value: '51-200', label: '51–200 a week' },
                          { value: '201-500', label: '201–500 a week' },
                          { value: '500+', label: '500+ a week' },
                          { value: 'unsure', label: 'Not sure yet' }
                        ]}
                      />
                    </div>

                    <button type="submit" className="form-submit" disabled={submitting} style={{ marginTop: '16px' }}>
                      {submitting ? 'Checking...' : 'Check my area →'}
                    </button>
                  </form>
                ) : (
                  <div className="form-success show">
                    <div className="fs-ic">✅</div>
                    <h3>Request received</h3>
                    <p>Thanks for reaching out! We&apos;ve routed your details to your local MailPlus operator. They will call you shortly to arrange your 5 free collections.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
