'use client'

import { useState, useRef, useCallback } from 'react'
import Script from 'next/script'

interface FormState {
  businessName: string
  fullName: string
  email: string
  phone: string
  weeklyShipments: string
  servicesOfInterest: string
  currentCarrier: string
  streetAddress: string
  unitNumber: string
  suburb: string
  state: string
  postcode: string
  joinMailingList: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

const WEEKLY_SHIPMENTS = ['1-20 per Week', '21-100 per Week', '100+ per Week']
const SERVICES = ['Parcel & satchel delivery', 'Australia Post collect & lodge service']
const CARRIERS = ['Australia Post', 'Courier Please', 'Aramex', 'Sendle', 'Mix']

const EMPTY_FORM: FormState = {
  businessName: '',
  fullName: '',
  email: '',
  phone: '',
  weeklyShipments: '',
  servicesOfInterest: '',
  currentCarrier: '',
  streetAddress: '',
  unitNumber: '',
  suburb: '',
  state: '',
  postcode: '',
  joinMailingList: false,
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-600 text-xs mt-1">{msg}</p>
}

function inputCls(error?: string) {
  return [
    'w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#095c7b] transition-shadow',
    error ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-300',
  ].join(' ')
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-medium mb-1" style={{ color: '#103d39' }}>
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

export function GetStartedForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const streetInputRef = useRef<HTMLInputElement>(null)

  /* ── Google Places Autocomplete ────────────────────────── */
  const initAutocomplete = useCallback(() => {
    if (!streetInputRef.current || !window.google?.maps?.places) return

    const autocomplete = new window.google.maps.places.Autocomplete(streetInputRef.current, {
      componentRestrictions: { country: 'au' },
      types: ['address'],
      fields: ['address_components'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place?.address_components) return

      let streetNumber = ''
      let route = ''
      let suburb = ''
      let state = ''
      let postcode = ''

      for (const component of place.address_components) {
        const types = component.types
        if (types.includes('street_number')) streetNumber = component.long_name
        if (types.includes('route')) route = component.long_name
        if (types.includes('locality')) suburb = component.long_name
        if (types.includes('administrative_area_level_1')) state = component.short_name
        if (types.includes('postal_code')) postcode = component.long_name
      }

      const street = [streetNumber, route].filter(Boolean).join(' ')

      setForm((prev) => ({ ...prev, streetAddress: street, suburb, state, postcode }))
      setErrors((prev) => ({ ...prev, streetAddress: undefined, suburb: undefined }))
    })
  }, [])

  /* ── Validation ────────────────────────────────────────── */
  function validate(): boolean {
    const e: FormErrors = {}

    if (!form.businessName.trim()) e.businessName = 'Store/Business Name is required'
    if (!form.fullName.trim()) e.fullName = 'Full Name is required'

    if (!form.email.trim()) {
      e.email = 'Email Address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address'
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone Number is required'
    } else if (!/^(\+?61|0)[2-578]\d{8}$/.test(form.phone.replace(/[\s\-()]/g, ''))) {
      e.phone = 'Please enter a valid Australian phone number'
    }

    if (!form.weeklyShipments) e.weeklyShipments = 'Please select average weekly shipments'
    if (!form.servicesOfInterest) e.servicesOfInterest = 'Please select a service of interest'
    if (!form.currentCarrier) e.currentCarrier = 'Please select your current carrier'

    if (!form.streetAddress.trim()) {
      e.streetAddress = 'Street address is required'
    } else if (!form.suburb) {
      e.streetAddress = 'Please select an address from the Google suggestions'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ── Handlers ──────────────────────────────────────────── */
  function handleChange(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
    onSuccess?.()
  }

  /* ── Success state ─────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-5">✅</div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}>
          You&apos;re all set!
        </h3>
        <p style={{ color: '#103d39' }}>
          A team member will reach out to confirm your unique business needs.
        </p>
      </div>
    )
  }

  /* ── Form ──────────────────────────────────────────────── */
  return (
    <>
      {/* Load Google Places — only when API key is configured */}
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
          onLoad={initAutocomplete}
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* ── Row 1: Business / Personal details ────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Label required>Store/Business Name</Label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              className={inputCls(errors.businessName)}
            />
            <FieldError msg={errors.businessName} />
          </div>

          <div>
            <Label required>Full Name</Label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={inputCls(errors.fullName)}
            />
            <FieldError msg={errors.fullName} />
          </div>

          <div>
            <Label required>Email Address</Label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputCls(errors.email)}
            />
            <FieldError msg={errors.email} />
          </div>

          <div>
            <Label required>Phone Number</Label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. 0400 000 000"
              className={inputCls(errors.phone)}
            />
            <FieldError msg={errors.phone} />
          </div>
        </div>

        {/* ── Row 2: Dropdowns ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <Label required>Average Weekly Shipments</Label>
            <select
              value={form.weeklyShipments}
              onChange={(e) => handleChange('weeklyShipments', e.target.value)}
              className={inputCls(errors.weeklyShipments)}
            >
              <option value="" />
              {WEEKLY_SHIPMENTS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.weeklyShipments} />
          </div>

          <div>
            <Label required>Services of Interest?</Label>
            <select
              value={form.servicesOfInterest}
              onChange={(e) => handleChange('servicesOfInterest', e.target.value)}
              className={inputCls(errors.servicesOfInterest)}
            >
              <option value="" />
              {SERVICES.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.servicesOfInterest} />
          </div>

          <div>
            <Label required>Current Carrier?</Label>
            <select
              value={form.currentCarrier}
              onChange={(e) => handleChange('currentCarrier', e.target.value)}
              className={inputCls(errors.currentCarrier)}
            >
              <option value="" />
              {CARRIERS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.currentCarrier} />
          </div>
        </div>

        {/* ── Pickup Address bar ─────────────────────────── */}
        <div
          className="w-full rounded-full py-2.5 text-center text-xs font-bold tracking-[0.2em] text-white uppercase mb-5"
          style={{ backgroundColor: '#2d5f7a' }}
        >
          Pickup Address
        </div>

        {/* ── Row 3: Address fields ──────────────────────── */}
        <div className="grid grid-cols-12 gap-3 mb-6">
          {/* Street — 4 cols */}
          <div className="col-span-12 sm:col-span-4">
            <Label required>Street No. &amp; Name</Label>
            <input
              ref={streetInputRef}
              type="text"
              value={form.streetAddress}
              onChange={(e) => {
                handleChange('streetAddress', e.target.value)
                setForm((prev) => ({ ...prev, streetAddress: e.target.value, suburb: '', state: '', postcode: '' }))
              }}
              autoComplete="off"
              className={inputCls(errors.streetAddress)}
            />
            <FieldError msg={errors.streetAddress} />
          </div>

          {/* Unit — 2 cols */}
          <div className="col-span-6 sm:col-span-2">
            <Label>Unit Number/Level</Label>
            <input
              type="text"
              value={form.unitNumber}
              onChange={(e) => handleChange('unitNumber', e.target.value)}
              className={inputCls()}
            />
          </div>

          {/* Suburb — 2 cols — read-only */}
          <div className="col-span-6 sm:col-span-2">
            <Label>Suburb</Label>
            <input
              type="text"
              value={form.suburb}
              readOnly
              tabIndex={-1}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed select-none"
            />
          </div>

          {/* State — 2 cols — read-only */}
          <div className="col-span-6 sm:col-span-2">
            <Label>State</Label>
            <input
              type="text"
              value={form.state}
              readOnly
              tabIndex={-1}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed select-none"
            />
          </div>

          {/* Postcode — 2 cols — read-only */}
          <div className="col-span-6 sm:col-span-2">
            <Label>Postcode</Label>
            <input
              type="text"
              value={form.postcode}
              readOnly
              tabIndex={-1}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed select-none"
            />
          </div>
        </div>

        {/* ── Mailing list checkbox ──────────────────────── */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#103d39' }}>
            <input
              type="checkbox"
              checked={form.joinMailingList}
              onChange={(e) => handleChange('joinMailingList', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#095c7b] cursor-pointer"
            />
            Join our mailing list for exclusive offers. No spam, we promise!
          </label>
        </div>

        {/* ── Submit ─────────────────────────────────────── */}
        <div className="flex justify-center mb-5">
          <button
            type="submit"
            disabled={submitting}
            className="px-14 py-3 rounded-full font-bold text-base transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            {submitting ? 'Submitting…' : 'Submit Now'}
          </button>
        </div>

        {/* ── Chat CTA ───────────────────────────────────── */}
        <div className="text-center text-sm" style={{ color: '#103d39' }}>
          <p className="flex items-center justify-center gap-1.5 mb-0.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            Want to chat now?
          </p>
          <p>
            Call{' '}
            <a href="tel:1300656595" className="font-bold hover:underline" style={{ color: '#095c7b' }}>
              1300 65 65 95
            </a>{' '}
            9am-5pm AEST.
          </p>
        </div>
      </form>
    </>
  )
}
