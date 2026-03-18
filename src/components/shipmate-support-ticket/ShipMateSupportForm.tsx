'use client'

import { useState } from 'react'

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: '#095c7b' }}
          aria-hidden="true"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#EAF044' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: '#095c7b' }}>Thank You!</h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(9,92,123,0.80)' }}>
          Your support ticket has been submitted. Our team will get back to you via phone or email ASAP.
        </p>
        <button
          onClick={() => { setForm(empty); setSubmitted(false) }}
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
          className="px-14 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#EAF044', color: '#103d39' }}
        >
          Submit
        </button>
      </div>

    </form>
  )
}
