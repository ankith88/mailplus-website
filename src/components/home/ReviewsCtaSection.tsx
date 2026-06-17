'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Script from 'next/script'
import { CustomSelect } from '@/components/shared/CustomSelect'

export function ReviewsCtaSection() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)

  const autocompleteInitialized = useRef(false)

  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return
    if (!window.google?.maps?.places) return
    if (!addressInputRef.current) return
    autocompleteInitialized.current = true

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      fields: ['geometry', 'formatted_address']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry && place.geometry.location) {
        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // In a real implementation, you would send `location` along with form data.
    console.log("Submitting form with location:", location)
    
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1200)
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
          <div className="enquiry-band">
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
                  <a href="https://shipmate.mailplus.com.au" className="enquiry-contact">
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
                          { value: 'express', label: 'Express Parcel Delivery' },
                          { value: 'post-office', label: 'Post Office Collect & Lodge' },
                          { value: 'local', label: 'Local Delivery' },
                          { value: 'other', label: 'Other' }
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
                          { value: '1-10', label: '1 - 10' },
                          { value: '11-50', label: '11 - 50' },
                          { value: '51-200', label: '51 - 200' },
                          { value: '201+', label: '201+' }
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
