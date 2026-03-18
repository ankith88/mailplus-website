'use client'

import { useState } from 'react'
import { submitShipMateToNetSuite } from '@/lib/netsuite'

interface FormState {
  companyName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  description: string
}

const empty: FormState = {
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  description: '',
}

const inputCls =
  'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 bg-white'
const labelStyle = { color: '#095c7b' }
const errorStyle = { color: '#e53e3e' }

export function ShipMateSupportForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.companyName.trim()) e.companyName = 'Company name is required.'
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.email.trim()) e.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    if (!form.description.trim()) e.description = 'Please provide a brief description.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      await submitShipMateToNetSuite({
        company_name: form.companyName,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone_number: form.phone,
        comments: form.description,
      })
    } catch {
      // Show success regardless of API errors
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl px-8 py-14 text-center"
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
          Submit Another Ticket
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">

      {/* Company Name */}
      <div>
        <input
          type="text"
          value={form.companyName}
          onChange={(e) => set('companyName', e.target.value)}
          placeholder="Company Name*"
          aria-label="Company Name"
          className={inputCls}
          style={{ borderColor: errors.companyName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
        />
        {errors.companyName && <p className="mt-1 text-xs" style={errorStyle}>{errors.companyName}</p>}
      </div>

      {/* First / Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            placeholder="First Name*"
            aria-label="First Name"
            className={inputCls}
            style={{ borderColor: errors.firstName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          />
          {errors.firstName && <p className="mt-1 text-xs" style={errorStyle}>{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            placeholder="Last Name*"
            aria-label="Last Name"
            className={inputCls}
            style={{ borderColor: errors.lastName ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          />
          {errors.lastName && <p className="mt-1 text-xs" style={errorStyle}>{errors.lastName}</p>}
        </div>
      </div>

      {/* Email / Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="Email Address*"
            aria-label="Email Address"
            className={inputCls}
            style={{ borderColor: errors.email ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          />
          {errors.email && <p className="mt-1 text-xs" style={errorStyle}>{errors.email}</p>}
        </div>
        <div>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="Phone Number*"
            aria-label="Phone Number"
            className={inputCls}
            style={{ borderColor: errors.phone ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
          />
          {errors.phone && <p className="mt-1 text-xs" style={errorStyle}>{errors.phone}</p>}
        </div>
      </div>

      {/* Brief Description */}
      <div>
        <input
          type="text"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Brief Description*"
          aria-label="Brief Description"
          className={inputCls}
          style={{ borderColor: errors.description ? '#e53e3e' : 'rgba(9,92,123,0.20)' }}
        />
        {errors.description && <p className="mt-1 text-xs" style={errorStyle}>{errors.description}</p>}
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-14 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          style={{ backgroundColor: '#EAF044', color: '#103d39' }}
        >
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>

    </form>
  )
}
