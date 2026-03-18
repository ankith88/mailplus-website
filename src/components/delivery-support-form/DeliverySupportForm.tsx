'use client'

import { useState } from 'react'
import { submitDeliveryToNetSuite } from '@/lib/netsuite'

const AU_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

const ISSUES = [
  'Item Not Yet Received',
  'Delayed Delivery',
  'Damaged Parcel',
  'Missing / Lost Parcel',
  'Missing Items from Parcel',
  'Parcel Delivered to Wrong Location',
  'Incorrect Delivery Address',
  'Redelivery Request',
  'Other',
]

type Role = '' | 'sender' | 'receiver'

interface FormState {
  role: Role
  barcode: string
  // sender-only
  companyName: string
  delFirstName: string
  delLastName: string
  delAdd1: string
  delAdd2: string
  delCity: string
  delState: string
  delPostcode: string
  // always
  firstName: string
  lastName: string
  email: string
  phone: string
  issue: string
  comments: string
}

const empty: FormState = {
  role: '',
  barcode: '',
  companyName: '',
  delFirstName: '',
  delLastName: '',
  delAdd1: '',
  delAdd2: '',
  delCity: '',
  delState: '',
  delPostcode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  issue: '',
  comments: '',
}

const inputCls =
  'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2'
const inputStyle = {
  borderColor: 'rgba(9,92,123,0.20)',
  color: '#103d39',
  backgroundColor: '#ffffff',
}

const labelCls = 'block text-xs font-bold tracking-wide mb-1.5'
const labelStyle = { color: '#095c7b' }

/** Mirrors the original IsEmail / validatePhone checks */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}
function isValidPhone(v: string) {
  return /^(\+?61|0)[2-578]\d{8}$/.test(v.replace(/[\s\-()\+]/g, ''))
}

/**
 * Barcode validation from original JS:
 * Must start with MPXL, MPSD, MPE, CPB, 2QQZ, or any 2-char prefix 'MP'
 * (the 'MP' check catches MPEN etc. as well as the others)
 */
function isValidBarcode(raw: string): boolean {
  const b = raw.trim().toUpperCase()
  const b2 = b.slice(0, 2)
  const b3 = b.slice(0, 3)
  const b4 = b.slice(0, 4)
  return (
    b4 === 'MPXL' ||
    b4 === 'MPSD' ||
    b3 === 'MPE' ||
    b3 === 'CPB' ||
    b2 === 'MP' ||
    b4 === '2QQZ'
  )
}

export function DeliverySupportForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const isSender = form.role === 'sender'

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}

    // Role
    if (!form.role) e.role = 'Please select an option.'

    // Barcode — empty check then format check
    if (!form.barcode.trim()) {
      e.barcode = 'Tracking number is required.'
    } else if (!isValidBarcode(form.barcode)) {
      e.barcode = 'Invalid tracking number. Must start with MPXL, MPSD, MPE, MPEN, CPB, or 2QQZ.'
    }

    // Sender-only fields
    if (isSender) {
      if (!form.companyName.trim()) e.companyName = 'Company name is required.'
      if (!form.delFirstName.trim()) e.delFirstName = 'First name is required.'
      if (!form.delLastName.trim())  e.delLastName  = 'Last name is required.'
      if (!form.delAdd2.trim())      e.delAdd2      = 'Street address is required.'
      if (!form.delCity.trim())      e.delCity      = 'City is required.'
      if (!form.delState)            e.delState     = 'State is required.'
      if (!form.delPostcode.trim())  e.delPostcode  = 'Postcode is required.'
    }

    // Contact details — always required
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim())  e.lastName  = 'Last name is required.'

    if (!form.email.trim()) {
      e.email = 'Email address is required.'
    } else if (!isValidEmail(form.email)) {
      e.email = 'Please enter a valid email address.'
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone number is required.'
    } else if (!isValidPhone(form.phone)) {
      e.phone = 'Please enter a valid Australian phone number.'
    }

    if (!form.issue) e.issue = 'Please select an issue.'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      await submitDeliveryToNetSuite({
        barcode: form.barcode.trim().toUpperCase(),
        company_name: form.companyName,
        first_name: form.firstName,
        del_first_name: form.delFirstName,
        last_name: form.lastName,
        del_last_name: form.delLastName,
        email: form.email,
        phone_number: form.phone,
        del_phone_number: '',
        issues: form.issue,
        sender_or_receiver: form.role === 'sender' ? '1' : '2',
        addr1: form.delAdd1,
        addr2: form.delAdd2,
        city: form.delCity,
        state: form.delState,
        postcode: form.delPostcode,
        comments: form.comments,
      })
    } catch {
      // Show success regardless of API errors
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  /* ── Success ──────────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        className="rounded-3xl px-8 py-14 text-center"
        style={{ backgroundColor: '#DAE8DA' }}
      >
        <h2 className="text-2xl font-bold mb-5" style={{ color: '#095c7b' }}>
          Thank you for your enquiry.
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: '#095c7b' }}>
          We&apos;ll be in contact with you very soon via phone or email. Please allow up to 24
          hours. If it is the weekend, we&apos;ll be in touch the next business day.
        </p>
        <button
          onClick={() => { setForm(empty); setSubmitted(false); setSubmitting(false) }}
          className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
        >
          Submit Another Enquiry
        </button>
      </div>
    )
  }

  /* ── Form ─────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">

      {/* Role selector */}
      <div>
        <label htmlFor="role" className={labelCls} style={labelStyle}>
          I am the… <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <div className="relative">
          <select
            id="role"
            value={form.role}
            onChange={(e) => set('role', e.target.value as Role)}
            className={inputCls + ' appearance-none pr-10'}
            style={{ ...inputStyle, borderColor: errors.role ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          >
            <option value="">Please select an option</option>
            <option value="sender">I am the Sender</option>
            <option value="receiver">I am the Receiver</option>
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#095c7b' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.role && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.role}</p>}
      </div>

      {/* Tracking number */}
      <div>
        <label htmlFor="barcode" className={labelCls} style={labelStyle}>
          Barcode / Tracking Number <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <input
          id="barcode"
          type="text"
          value={form.barcode}
          onChange={(e) => set('barcode', e.target.value)}
          placeholder="Eg: MPEN123456 or MPSD123456 or MPXL123456 or CPBZL*"
          className={inputCls}
          style={{ ...inputStyle, borderColor: errors.barcode ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
        />
        {errors.barcode && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.barcode}</p>}
      </div>

      {/* Sender-only fields */}
      {isSender && (
        <div
          className="rounded-2xl p-6 space-y-6"
          style={{ backgroundColor: 'rgba(9,92,123,0.04)', border: '1px solid rgba(9,92,123,0.10)' }}
        >
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#095c7b' }}>
            Delivery Details
          </p>

          {/* Company name */}
          <div>
            <label htmlFor="company_name" className={labelCls} style={labelStyle}>
              Company Name <span style={{ color: '#e53e3e' }}>*</span>
            </label>
            <input
              id="company_name"
              type="text"
              value={form.companyName}
              onChange={(e) => set('companyName', e.target.value)}
              placeholder="Company Name"
              className={inputCls}
              style={{ ...inputStyle, borderColor: errors.companyName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
            />
            {errors.companyName && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.companyName}</p>}
          </div>

          {/* Delivery recipient */}
          <div>
            <label className={labelCls} style={labelStyle}>
              Delivery Recipient Name <span style={{ color: '#e53e3e' }}>*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={form.delFirstName}
                  onChange={(e) => set('delFirstName', e.target.value)}
                  placeholder="First Name"
                  aria-label="Delivery recipient first name"
                  className={inputCls}
                  style={{ ...inputStyle, borderColor: errors.delFirstName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
                />
                {errors.delFirstName && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.delFirstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  value={form.delLastName}
                  onChange={(e) => set('delLastName', e.target.value)}
                  placeholder="Last Name"
                  aria-label="Delivery recipient last name"
                  className={inputCls}
                  style={{ ...inputStyle, borderColor: errors.delLastName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
                />
                {errors.delLastName && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.delLastName}</p>}
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="space-y-3">
            <label className={labelCls} style={labelStyle}>
              Delivery Address <span style={{ color: '#e53e3e' }}>*</span>
            </label>
            <input
              type="text"
              value={form.delAdd1}
              onChange={(e) => set('delAdd1', e.target.value)}
              placeholder="Unit Number / Level"
              aria-label="Unit number or level"
              className={inputCls}
              style={inputStyle}
            />
            <div>
              <input
                type="text"
                value={form.delAdd2}
                onChange={(e) => set('delAdd2', e.target.value)}
                placeholder="Street Address"
                aria-label="Street address"
                className={inputCls}
                style={{ ...inputStyle, borderColor: errors.delAdd2 ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
              />
              {errors.delAdd2 && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.delAdd2}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  value={form.delCity}
                  onChange={(e) => set('delCity', e.target.value)}
                  placeholder="City"
                  aria-label="City"
                  className={inputCls}
                  style={{ ...inputStyle, borderColor: errors.delCity ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
                />
                {errors.delCity && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.delCity}</p>}
              </div>
              <div className="relative">
                <select
                  value={form.delState}
                  onChange={(e) => set('delState', e.target.value)}
                  aria-label="State"
                  className={inputCls + ' appearance-none pr-8'}
                  style={{ ...inputStyle, borderColor: errors.delState ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
                >
                  <option value="">State</option>
                  {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#095c7b' }} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {errors.delState && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.delState}</p>}
              </div>
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={form.delPostcode}
                  onChange={(e) => set('delPostcode', e.target.value.replace(/\D/g, ''))}
                  placeholder="Postcode"
                  aria-label="Postcode"
                  className={inputCls}
                  style={{ ...inputStyle, borderColor: errors.delPostcode ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
                />
                {errors.delPostcode && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.delPostcode}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact details */}
      <div
        className="rounded-2xl p-6 space-y-6"
        style={{ backgroundColor: 'rgba(9,92,123,0.04)', border: '1px solid rgba(9,92,123,0.10)' }}
      >
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#095c7b' }}>
          Your Contact Details
        </p>

        <div>
          <label className={labelCls} style={labelStyle}>
            Your Name <span style={{ color: '#e53e3e' }}>*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                placeholder="First Name"
                aria-label="Your first name"
                className={inputCls}
                style={{ ...inputStyle, borderColor: errors.firstName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
              />
              {errors.firstName && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                placeholder="Last Name"
                aria-label="Your last name"
                className={inputCls}
                style={{ ...inputStyle, borderColor: errors.lastName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
              />
              {errors.lastName && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.lastName}</p>}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelCls} style={labelStyle}>
            Email Address <span style={{ color: '#e53e3e' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="Email Address"
            className={inputCls}
            style={{ ...inputStyle, borderColor: errors.email ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          />
          {errors.email && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelCls} style={labelStyle}>
            Phone Number <span style={{ color: '#e53e3e' }}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="Phone Number"
            className={inputCls}
            style={{ ...inputStyle, borderColor: errors.phone ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          />
          {errors.phone && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.phone}</p>}
        </div>
      </div>

      {/* Issue */}
      <div>
        <label htmlFor="issue" className={labelCls} style={labelStyle}>
          Issue <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <div className="relative">
          <select
            id="issue"
            value={form.issue}
            onChange={(e) => set('issue', e.target.value)}
            className={inputCls + ' appearance-none pr-10'}
            style={{ ...inputStyle, borderColor: errors.issue ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          >
            <option value="">Select an issue</option>
            {ISSUES.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#095c7b' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.issue && <p className="mt-1 text-xs" style={{ color: '#e53e3e' }}>{errors.issue}</p>}
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="comments" className={labelCls} style={labelStyle}>
          Additional Comments
        </label>
        <textarea
          id="comments"
          rows={4}
          value={form.comments}
          onChange={(e) => set('comments', e.target.value)}
          placeholder="Please provide additional details if needed"
          className={inputCls + ' resize-none'}
          style={inputStyle}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        style={{ backgroundColor: '#EAF044', color: '#103d39' }}
      >
        {submitting ? 'Submitting…' : 'Submit'}
      </button>

    </form>
  )
}
