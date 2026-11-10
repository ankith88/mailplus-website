'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ProgressModal } from '@/components/shared/ProgressModal'
import { submitLead } from '@/utils/submitLead'

export default function SignupClient() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [leadResult, setLeadResult] = useState<{
    success: boolean
    message?: string
    accountManagerName?: string
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
    platform: 'Shopify',
    addressText: '',
  })

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})

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

    const addressStr = addressInputRef.current?.value.trim() || formFields.addressText
    const resolvedCity = location?.city || ''
    const resolvedState = location?.state || ''
    const resolvedZip = location?.zip || ''

    try {
      const result = await submitLead({
        companyName: formFields.company,
        customerPhone: formFields.phone,
        customerServiceEmail: formFields.email,
        interestedIn: 'ShipMate Platform',
        selectedServiceOption: 'shipmate',
        weeklyParcels: formFields.volume,
        bucket: 'inbound',
        sourcePage: 'shipmate-platform/signup',
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
      console.error('ShipMate signup error:', err)
      setSubmitting(false)
      alert('There was an issue creating your account. Please call 1300 65 65 95.')
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '60px 20px', backgroundColor: '#F8FAF8' }}>
      <ProgressModal isOpen={submitting} />

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/shipmate-platform"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#095C7C',
              textDecoration: 'none',
            }}
          >
            ← Back to ShipMate overview
          </Link>
        </div>

        {!submitted ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '44px 36px',
              boxShadow: '0 12px 36px rgba(9,92,124,0.08)',
              border: '1px solid rgba(9,92,124,0.1)',
            }}
          >
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#E3F1F6',
                  color: '#095C7C',
                  fontWeight: 700,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  marginBottom: '14px',
                }}
              >
                Free Platform • Zero Setup Fee
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
                Sign Up for ShipMate
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
                Get instant access to discounted flat-rate express parcel delivery, automated Shopify
                and WooCommerce sync, bulk label printing, and same-day collection from your local owner-operator.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#F3F7F8',
                borderRadius: '12px',
                marginBottom: '32px',
                fontSize: '13px',
                color: '#095C7C',
                fontWeight: 600,
              }}
            >
              <div>✓ $0 monthly subscription</div>
              <div>✓ Flat-rate parcels up to 5kg</div>
              <div>✓ 1–2 day express delivery</div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Business Address */}
                <div>
                  <label
                    htmlFor="sm-address"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                  >
                    Business Pickup Address *
                  </label>
                  <input
                    ref={addressInputRef}
                    id="sm-address"
                    name="addressText"
                    type="text"
                    placeholder="Enter street address, suburb, state and postcode"
                    defaultValue={formFields.addressText}
                    onChange={handleFieldChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      borderRadius: '10px',
                      border: fieldErrors.address ? '2px solid #E5484D' : '1px solid #DCE5DB',
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
                      htmlFor="sm-fname"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      First Name *
                    </label>
                    <input
                      id="sm-fname"
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
                        border: fieldErrors.fname ? '2px solid #E5484D' : '1px solid #DCE5DB',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sm-lname"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Last Name *
                    </label>
                    <input
                      id="sm-lname"
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
                        border: fieldErrors.lname ? '2px solid #E5484D' : '1px solid #DCE5DB',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="sm-company"
                    style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                  >
                    Business / Store Name *
                  </label>
                  <input
                    id="sm-company"
                    name="company"
                    type="text"
                    placeholder="Acme Co / Acme Store"
                    value={formFields.company}
                    onChange={handleFieldChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '15px',
                      borderRadius: '10px',
                      border: fieldErrors.company ? '2px solid #E5484D' : '1px solid #DCE5DB',
                      backgroundColor: '#FFFFFF',
                      color: '#0A3242',
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="sm-email"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Work Email *
                    </label>
                    <input
                      id="sm-email"
                      name="email"
                      type="email"
                      placeholder="jane@acme.com.au"
                      value={formFields.email}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: fieldErrors.email ? '2px solid #E5484D' : '1px solid #DCE5DB',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sm-phone"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Direct Phone Number *
                    </label>
                    <input
                      id="sm-phone"
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
                        border: fieldErrors.phone ? '2px solid #E5484D' : '1px solid #DCE5DB',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    />
                  </div>
                </div>

                {/* Platform & Volume */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="sm-platform"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Primary Store Platform
                    </label>
                    <select
                      id="sm-platform"
                      name="platform"
                      value={formFields.platform}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: '1px solid #DCE5DB',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    >
                      <option value="Shopify">Shopify</option>
                      <option value="WooCommerce">WooCommerce</option>
                      <option value="API / Custom">API / Custom Warehouse</option>
                      <option value="None / Office Shipping">None / Office Shipping</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="sm-volume"
                      style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0A3242', marginBottom: '6px' }}
                    >
                      Estimated Weekly Parcels
                    </label>
                    <select
                      id="sm-volume"
                      name="volume"
                      value={formFields.volume}
                      onChange={handleFieldChange}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: '1px solid #DCE5DB',
                        backgroundColor: '#FFFFFF',
                        color: '#0A3242',
                      }}
                    >
                      <option value="1-10">1–10 parcels / week</option>
                      <option value="10-50">10–50 parcels / week</option>
                      <option value="50-200">50–200 parcels / week</option>
                      <option value="200+">200+ parcels / week</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#095C7C',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '18px 28px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(9,92,124,0.2)',
                  }}
                >
                  {submitting ? 'Setting Up Your Account...' : 'Create Free ShipMate Account →'}
                </button>

                <p style={{ fontSize: '12px', color: '#5B6E66', textAlign: 'center', margin: 0 }}>
                  No payment details required. Existing customers can{' '}
                  <a
                    href="https://customer.mailplus.com.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#095C7C', fontWeight: 600 }}
                  >
                    log in here
                  </a>.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '48px 36px',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(9,92,124,0.08)',
              border: '1px solid rgba(9,92,124,0.1)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#E3F1F6',
                color: '#095C7C',
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
              Account Request Received!
            </h2>
            <p style={{ fontSize: '16px', color: '#5B6E66', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Thank you, <strong>{formFields.fname}</strong>. We are provisioning your free ShipMate platform access for{' '}
              <strong>{formFields.company}</strong>.
            </p>

            <div
              style={{
                backgroundColor: '#F3F7F8',
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
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#095C7C', marginBottom: '8px' }}>
                What happens next:
              </h3>
              <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Your dedicated account specialist will finalize your account setup and email your portal access credentials.</li>
                <li>Your local MailPlus owner-operator will be assigned to your address for same-day parcel pickups.</li>
                <li>You can start printing flat-rate express labels right from your ShipMate dashboard.</li>
              </ol>
            </div>

            <a
              href="https://customer.mailplus.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#095C7C',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '999px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              Go to Customer Login
            </a>
          </div>
        )}
      </div>
    </main>
  )
}

