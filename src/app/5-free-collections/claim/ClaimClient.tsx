'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ProgressModal } from '@/components/shared/ProgressModal'
import { submitLead } from '@/utils/submitLead'

export default function ClaimClient() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [leadResult, setLeadResult] = useState<{
    success: boolean
    message?: string
    franchiseeName?: string
    localMilePlusAuthLink?: string
    outOfTerritory?: boolean
  } | null>(null)

  const addressInputRef = useRef<HTMLInputElement>(null)
  const [location, setLocation] = useState<{
    lat: number
    lng: number
    city: string
    state: string
    zip: string
    street: string
  } | null>(null)

  const [formFields, setFormFields] = useState({
    fname: '',
    lname: '',
    company: '',
    email: '',
    phone: '',
    volume: '10-50',
    addressText: '',
  })

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})

  // Initialize Google Places Autocomplete
  const initAutocomplete = useCallback(() => {
    if (!window.google?.maps?.places || !addressInputRef.current) return

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      fields: ['geometry', 'address_components', 'formatted_address'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry && place.geometry.location && place.address_components) {
        let streetNumber = ''
        let route = ''
        let city = ''
        let state = ''
        let zip = ''

        for (const component of place.address_components) {
          const types = component.types
          if (types.includes('street_number')) streetNumber = component.long_name
          if (types.includes('route')) route = component.long_name
          if (types.includes('locality')) city = component.long_name
          if (types.includes('administrative_area_level_1')) state = component.long_name
          if (types.includes('postal_code')) zip = component.long_name
        }

        const street = [streetNumber, route].filter(Boolean).join(' ')
        const formatted = place.formatted_address || [street, city, state, zip].filter(Boolean).join(', ')

        if (addressInputRef.current) {
          addressInputRef.current.value = formatted
        }

        setFormFields((prev) => ({ ...prev, addressText: formatted }))
        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          city,
          state,
          zip,
          street: street || formatted,
        })
        setFieldErrors((prev) => ({ ...prev, address: false }))
      }
    })
  }, [])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const checkAndInit = () => {
      if (window.google?.maps?.places) {
        initAutocomplete()
        if (interval) clearInterval(interval)
      }
    }
    checkAndInit()
    if (!window.google?.maps?.places) {
      interval = setInterval(checkAndInit, 500)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [initAutocomplete])

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormFields((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors: Record<string, boolean> = {}
    if (!formFields.fname.trim()) errors.fname = true
    if (!formFields.lname.trim()) errors.lname = true
    if (!formFields.company.trim()) errors.company = true
    if (!formFields.email.trim()) errors.email = true
    if (!formFields.phone.trim()) errors.phone = true
    if (!addressInputRef.current?.value.trim()) errors.address = true

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setSubmitting(true)

    // Determine address payload
    const addressStr = addressInputRef.current?.value.trim() || formFields.addressText
    const resolvedCity = location?.city || ''
    const resolvedState = location?.state || ''
    const resolvedZip = location?.zip || ''

    try {
      const result = await submitLead({
        companyName: formFields.company,
        customerPhone: formFields.phone,
        customerServiceEmail: formFields.email,
        interestedIn: '5-free',
        selectedServiceOption: 'five-free',
        weeklyParcels: formFields.volume,
        bucket: '5-free-trial',
        isFiveFreeCollections: true,
        sourcePage: '5-free-collections/claim',
        address: {
          address1: addressStr,
          street: location?.street || addressStr,
          city: resolvedCity,
          state: resolvedState,
          zip: resolvedZip,
          latitude: location?.lat || 0,
          longitude: location?.lng || 0,
        },
        contacts: [
          {
            name: `${formFields.fname} ${formFields.lname}`.trim(),
            email: formFields.email,
            phone: formFields.phone,
          },
        ],
      })

      setSubmitting(false)
      setSubmitted(true)
      setLeadResult(result)
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitting(false)
      alert('There was an issue submitting your request. Please call 1300 65 65 95.')
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '60px 20px', backgroundColor: '#CFE0CE' }}>
      <ProgressModal isOpen={submitting} />

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Navigation back */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/5-free-collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0A3242',
              textDecoration: 'none',
            }}
          >
            ← Back to 5 Free Collections overview
          </Link>
        </div>

        {!submitted ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '40px 36px',
              boxShadow: '0 12px 32px rgba(10,50,66,0.12)',
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#E4F3E5',
                  color: '#217A32',
                  fontWeight: 700,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  marginBottom: '14px',
                }}
              >
                Zero Risk • $0 Trial
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display, Georgia, serif)',
                  fontSize: '36px',
                  lineHeight: 1.15,
                  color: '#0A3242',
                  marginBottom: '12px',
                }}
              >
                Claim Your 5 Free Collections
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: '#5B6E66',
                  maxWidth: '560px',
                  margin: '0 auto',
                }}
              >
                No credit card, no invoice, and no contract. A local owner-operator collects from your
                premises and lodges on your own Australia Post account so your rates and tracking do not
                change.
              </p>
            </div>

            {/* Quick Benefits Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#F4F7F4',
                borderRadius: '12px',
                marginBottom: '32px',
                fontSize: '13px',
                color: '#14506B',
                fontWeight: 600,
              }}
            >
              <div>✓ Lodged on your Aus Post account</div>
              <div>✓ Rates &amp; tracking stay unchanged</div>
              <div>✓ Same-day local pickup</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Business Address */}
                <div>
                  <label
                    htmlFor="claim-address"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                  >
                    Business Pickup Address *
                  </label>
                  <input
                    ref={addressInputRef}
                    id="claim-address"
                    name="addressText"
                    type="text"
                    placeholder="Enter your street address, suburb, state and postcode"
                    defaultValue={formFields.addressText}
                    onChange={handleFieldChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      borderRadius: '10px',
                      border: fieldErrors.address ? '2px solid #E5484D' : '1px solid #C3D2C2',
                      backgroundColor: '#FFFFFF',
                      color: '#0A3242',
                      outline: 'none',
                    }}
                  />
                  {fieldErrors.address && (
                    <span style={{ fontSize: '12px', color: '#E5484D', marginTop: '4px', display: 'block' }}>
                      Please provide your business pickup address.
                    </span>
                  )}
                </div>

                {/* Names */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="claim-fname"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      First Name *
                    </label>
                    <input
                      id="claim-fname"
                      name="fname"
                      type="text"
                      placeholder="Jane"
                      value={formFields.fname}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: fieldErrors.fname ? '2px solid #E5484D' : '1px solid #C3D2C2',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-lname"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Last Name *
                    </label>
                    <input
                      id="claim-lname"
                      name="lname"
                      type="text"
                      placeholder="Smith"
                      value={formFields.lname}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: fieldErrors.lname ? '2px solid #E5484D' : '1px solid #C3D2C2',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="claim-company"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                  >
                    Company / Trading Name *
                  </label>
                  <input
                    id="claim-company"
                    name="company"
                    type="text"
                    placeholder="Acme Pty Ltd"
                    value={formFields.company}
                    onChange={handleFieldChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      borderRadius: '10px',
                      border: fieldErrors.company ? '2px solid #E5484D' : '1px solid #C3D2C2',
                      backgroundColor: '#FFFFFF',
                      color: '#0A3242',
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="claim-email"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Work Email *
                    </label>
                    <input
                      id="claim-email"
                      name="email"
                      type="email"
                      placeholder="jane@company.com.au"
                      value={formFields.email}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: fieldErrors.email ? '2px solid #E5484D' : '1px solid #C3D2C2',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="claim-phone"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Mobile Phone *
                    </label>
                    <input
                      id="claim-phone"
                      name="phone"
                      type="tel"
                      placeholder="0400 000 000"
                      value={formFields.phone}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: fieldErrors.phone ? '2px solid #E5484D' : '1px solid #C3D2C2',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label
                    htmlFor="claim-volume"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                  >
                    Estimated Weekly Aus Post Parcels / Mail
                  </label>
                  <select
                    id="claim-volume"
                    name="volume"
                    value={formFields.volume}
                    onChange={handleFieldChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      borderRadius: '10px',
                      border: '1px solid #C3D2C2',
                      backgroundColor: '#FFFFFF',
                      color: '#0A3242',
                    }}
                  >
                    <option value="1-10">1–10 items per week</option>
                    <option value="10-50">10–50 items per week</option>
                    <option value="50-200">50–200 items per week</option>
                    <option value="200+">200+ items per week</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#E3F046',
                    color: '#0A3242',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '18px 28px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(10,50,66,0.1)',
                  }}
                >
                  {submitting ? 'Submitting Your Claim...' : 'Activate 5 Free Collections →'}
                </button>

                <p style={{ fontSize: '12px', color: '#5B6E66', textAlign: 'center', margin: 0 }}>
                  By clicking activate, you agree to receive your LocalMile app code by SMS and email.
                  No payment details are required.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '48px 36px',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(10,50,66,0.12)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#E4F3E5',
                color: '#217A32',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                margin: '0 auto 20px',
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display, Georgia, serif)',
                fontSize: '32px',
                color: '#0A3242',
                marginBottom: '12px',
              }}
            >
              You&apos;re All Set!
            </h2>
            <p style={{ fontSize: '16px', color: '#5B6E66', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Thank you, <strong>{formFields.fname}</strong>. We have received your claim for 5 free collections for{' '}
              <strong>{formFields.company}</strong>.
            </p>

            <div
              style={{
                backgroundColor: '#F4F7F4',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'left',
                maxWidth: '560px',
                margin: '0 auto 28px',
                fontSize: '14px',
                color: '#0A3242',
                lineHeight: 1.6,
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#025D7C', marginBottom: '8px' }}>
                Next steps:
              </h3>
              <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>We have sent your LocalMile activation code to <strong>{formFields.phone}</strong> and <strong>{formFields.email}</strong>.</li>
                <li>Your local owner-operator will reach out to confirm your preferred collection cut-off time.</li>
                <li>Book your first pickup anytime in the LocalMile app — completely free!</li>
              </ol>
            </div>

            <Link
              href="/"
              style={{
                display: 'inline-block',
                backgroundColor: '#025D7C',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

