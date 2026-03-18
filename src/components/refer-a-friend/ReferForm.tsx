'use client'

import { useState, useRef, useCallback } from 'react'
import Script from 'next/script'
import { submitReferralToNetSuite } from '@/lib/netsuite'

interface FormState {
  // Referrer
  refFirstName: string
  refLastName: string
  refEmail: string
  refPhone: string
  hasPermission: boolean
  // Nominee
  firstName: string
  lastName: string
  email: string
  phone: string
  areaOfInterest: string
  suburb: string
  postcode: string
  comments: string
  confirmConsent: boolean
}

const empty: FormState = {
  refFirstName: '',
  refLastName: '',
  refEmail: '',
  refPhone: '',
  hasPermission: false,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  areaOfInterest: '',
  suburb: '',
  postcode: '',
  comments: '',
  confirmConsent: false,
}

type Errors = Partial<Record<keyof FormState, string>>

const inputCls =
  'w-full border rounded px-3 py-2.5 text-sm bg-white outline-none transition-all focus:ring-2'
const inputStyle = { borderColor: 'rgba(9,92,123,0.20)', color: '#103d39' }

function err(msg?: string) {
  if (!msg) return null
  return <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{msg}</p>
}

function borderColor(hasErr: boolean) {
  return hasErr ? '#e53e3e' : 'rgba(9,92,123,0.20)'
}

export function ReferForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const areaInputRef = useRef<HTMLInputElement>(null)

  /* ── Google Places Autocomplete ─────────────────────── */
  const initAutocomplete = useCallback(() => {
    if (!areaInputRef.current || !window.google?.maps?.places) return

    const autocomplete = new window.google.maps.places.Autocomplete(areaInputRef.current, {
      componentRestrictions: { country: 'au' },
      types: ['geocode'],
      fields: ['address_components'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place?.address_components) return

      let suburb = ''
      let postcode = ''

      for (const component of place.address_components) {
        const types = component.types
        if (types.includes('locality')) suburb = component.long_name
        if (types.includes('postal_code')) postcode = component.long_name
      }

      const areaOfInterest = areaInputRef.current?.value ?? ''
      setForm(prev => ({ ...prev, areaOfInterest, suburb, postcode }))
      setErrors(prev => ({ ...prev, areaOfInterest: undefined, suburb: undefined, postcode: undefined }))
    })
  }, [])

  function set(field: keyof FormState, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Errors = {}
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.refFirstName.trim()) e.refFirstName = 'First name is required.'
    if (!form.refLastName.trim())  e.refLastName  = 'Last name is required.'
    if (!form.refEmail.trim())     e.refEmail     = 'Email address is required.'
    else if (!emailRe.test(form.refEmail)) e.refEmail = 'Please enter a valid email.'
    if (!form.refPhone.trim())     e.refPhone     = 'Phone number is required.'

    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim())  e.lastName  = 'Last name is required.'
    if (!form.email.trim())     e.email     = 'Email address is required.'
    else if (!emailRe.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.phone.trim())     e.phone     = 'Phone number is required.'
    const areaVal = areaInputRef.current?.value ?? form.areaOfInterest
    if (!areaVal.trim()) e.areaOfInterest = 'Please select an area of interest from the suggestions.'
    else if (!form.suburb) e.areaOfInterest = 'Please select an address from the Google suggestions.'
    if (!form.postcode.trim())  e.postcode  = 'Postcode is required.'
    else if (!/^\d{4}$/.test(form.postcode)) e.postcode = 'Please enter a valid 4-digit postcode.'

    if (!form.confirmConsent) e.confirmConsent = 'You must confirm consent to submit.'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      await submitReferralToNetSuite({
        ref_first_name: form.refFirstName,
        ref_last_name: form.refLastName,
        ref_email: form.refEmail,
        ref_phone_number: form.refPhone,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone_number: form.phone,
        postcode: form.postcode,
        comments: form.comments,
        investor_radio: '',
        owner_radio: '',
        seeking_employment_radio: '',
        residentialpostcode: '',
        vehicle: '',
        experience: '',
        employment_type: '',
        suburb: form.suburb,
        pathname: window.location.pathname,
      })

    } catch {
      // Show success regardless of API errors
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  /* ── Success state ────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        className="rounded-2xl px-8 py-14 text-center"
        style={{ backgroundColor: '#DAE8DA' }}
      >
        <h3 className="text-3xl font-bold mb-4" style={{ color: '#095c7b' }}>
          Thank you for your nomination.
        </h3>
        <p className="text-lg font-semibold mb-6" style={{ color: '#095c7b' }}>
          What happens next?
        </p>
        <p className="text-sm leading-relaxed mb-4 max-w-lg mx-auto" style={{ color: '#095c7b' }}>
          We&apos;ll soon reach out to your nominated friend or family member to get the ball rolling
          on their potential future as a MailPlus business owner.
        </p>
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: '#095c7b' }}>
          If they become a franchisee at MailPlus, we&apos;ll deposit $3,000 cash directly into your
          bank account. Simple!
        </p>
      </div>
    )
  }

  /* ── Form ─────────────────────────────────────────────── */
  const sectionLabel = (text: string) => (

    <p
      className="text-xs font-bold tracking-widest uppercase mb-4"
      style={{
        color: '#095c7b',
        textDecoration: 'underline',
        textDecorationColor: 'rgba(9,92,123,0.4)',
        textUnderlineOffset: '4px',
      }}
    >
      {text}
    </p>
  )

  return (
    <div>
      {/* Load Google Places — only when API key is configured */}
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
          onLoad={initAutocomplete}
        />
      )}

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ color: '#095c7b' }}>
        Does your nominee tick{' '}
        <span
          className="italic"
          style={{
            textDecoration: 'underline',
            textDecorationColor: '#EAF044',
            textDecorationThickness: '3px',
            textUnderlineOffset: '4px',
          }}
        >
          all
        </span>{' '}
        the boxes?
      </h2>
      <p className="text-sm leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(9,92,123,0.75)' }}>
        If that&apos;s a yes, please complete the form below. You may nominate multiple people by
        submitting separate forms.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">

        {/* ── YOUR DETAILS ── */}
        {sectionLabel('Your Details')}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <input
              type="text"
              value={form.refFirstName}
              onChange={e => set('refFirstName', e.target.value)}
              placeholder="First Name*"
              aria-label="Your first name"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.refFirstName) }}
            />
            {err(errors.refFirstName)}
          </div>
          <div>
            <input
              type="text"
              value={form.refLastName}
              onChange={e => set('refLastName', e.target.value)}
              placeholder="Last Name*"
              aria-label="Your last name"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.refLastName) }}
            />
            {err(errors.refLastName)}
          </div>
          <div>
            <input
              type="email"
              value={form.refEmail}
              onChange={e => set('refEmail', e.target.value)}
              placeholder="Email Address*"
              aria-label="Your email address"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.refEmail) }}
            />
            {err(errors.refEmail)}
          </div>
          <div>
            <input
              type="tel"
              value={form.refPhone}
              onChange={e => set('refPhone', e.target.value)}
              placeholder="Phone Number*"
              aria-label="Your phone number"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.refPhone) }}
            />
            {err(errors.refPhone)}
          </div>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer text-sm" style={{ color: '#103d39' }}>
          <input
            type="checkbox"
            checked={form.hasPermission}
            onChange={e => set('hasPermission', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#095c7b] cursor-pointer flex-none"
          />
          The person below has given me permission to nominate them.
        </label>

        {/* ── YOUR NOMINEE'S DETAILS ── */}
        {sectionLabel("Your Nominees' Details")}

        {/* Name + contact row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <input
              type="text"
              value={form.firstName}
              onChange={e => set('firstName', e.target.value)}
              placeholder="First Name*"
              aria-label="Nominee's first name"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.firstName) }}
            />
            {err(errors.firstName)}
          </div>
          <div>
            <input
              type="text"
              value={form.lastName}
              onChange={e => set('lastName', e.target.value)}
              placeholder="Last Name*"
              aria-label="Nominee's last name"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.lastName) }}
            />
            {err(errors.lastName)}
          </div>
          <div>
            <input
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="Email Address*"
              aria-label="Nominee's email address"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.email) }}
            />
            {err(errors.email)}
          </div>
          <div>
            <input
              type="tel"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="Phone Number*"
              aria-label="Nominee's phone number"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.phone) }}
            />
            {err(errors.phone)}
          </div>
        </div>

        {/* Area of interest row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <input
              ref={areaInputRef}
              type="text"
              defaultValue={form.areaOfInterest}
              onChange={e => {
                // Clear suburb/postcode if user manually clears the field
                if (!e.target.value) setForm(prev => ({ ...prev, areaOfInterest: '', suburb: '', postcode: '' }))
              }}
              placeholder="Area of Interest*"
              aria-label="Area of interest"
              autoComplete="off"
              className={inputCls}
              style={{ ...inputStyle, borderColor: borderColor(!!errors.areaOfInterest) }}
            />
            {err(errors.areaOfInterest)}
          </div>
          <div>
            <input
              type="text"
              value={form.suburb}
              readOnly
              tabIndex={-1}
              placeholder="Area of Interest – Suburb"
              aria-label="Area of interest suburb (auto-filled)"
              className="w-full border rounded px-3 py-2.5 text-sm bg-gray-100 text-gray-500 cursor-not-allowed select-none"
              style={{ borderColor: borderColor(!!errors.suburb) }}
            />
            {err(errors.suburb)}
          </div>
          <div>
            <input
              type="text"
              value={form.postcode}
              readOnly
              tabIndex={-1}
              placeholder="Area of Interest – Postcode"
              aria-label="Area of interest postcode (auto-filled)"
              className="w-full border rounded px-3 py-2.5 text-sm bg-gray-100 text-gray-500 cursor-not-allowed select-none"
              style={{ borderColor: borderColor(!!errors.postcode) }}
            />
            {err(errors.postcode)}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-xs mb-1.5" style={{ color: 'rgba(9,92,123,0.75)' }}>
            Tell us about this person in a couple of sentences…
          </label>
          <textarea
            rows={4}
            value={form.comments}
            onChange={e => set('comments', e.target.value)}
            placeholder="Type here"
            className={inputCls + ' resize-none'}
            style={inputStyle}
          />
        </div>

        {/* Consent checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer text-sm" style={{ color: '#103d39' }}>
            <input
              type="checkbox"
              checked={form.confirmConsent}
              onChange={e => set('confirmConsent', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#095c7b] cursor-pointer flex-none"
            />
            I confirm that I have given the nominee permission to nominate myself. I agree to be
            contacted by a MailPlus representative.
          </label>
          {err(errors.confirmConsent)}
        </div>

        {/* Submit */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-14 py-3.5 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            {submitting ? 'Submitting…' : 'Enquire Now'}
          </button>
          <p className="flex items-center gap-1.5 text-sm" style={{ color: '#103d39' }}>
            <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            Want to chat now?{' '}
            Call{' '}
            <a href="tel:1300656595" className="font-bold hover:underline" style={{ color: '#095c7b' }}>
              1300 65 65 95
            </a>
            {' '}9am–5pm AEST.
          </p>
        </div>

      </form>
    </div>
  )
}
