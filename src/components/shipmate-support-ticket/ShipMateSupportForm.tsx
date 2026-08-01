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

export function ShipMateSupportForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)

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
      <div className="form-success show">
        <div className="fs-ic">✓</div>
        <h3>Thank you for your enquiry.</h3>
        <p>
          We&apos;ll be in contact with you very soon via phone or email. Please allow up to 24
          hours. If it is the weekend, we&apos;ll be in touch the next business day.
        </p>
        <div className="pt-6">
          <button
            onClick={() => {
              setForm(empty)
              setSubmitted(false)
              setSubmitting(false)
            }}
            className="btn btn-primary px-8 py-3 font-bold text-sm"
            style={{ backgroundColor: '#025d7c', color: '#ffffff' }}
          >
            Submit Another Ticket
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Company Name */}
      <div className="field-group">
        <label className="field-label" htmlFor="companyName">
          Company Name <span className="req">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          value={form.companyName}
          onChange={(e) => set('companyName', e.target.value)}
          placeholder="e.g. Acme Corporation"
          className={`field-input ${errors.companyName ? 'err' : ''}`}
        />
        {errors.companyName && <p className="field-error-msg show">{errors.companyName}</p>}
      </div>

      {/* First / Last Name */}
      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="firstName">
            First Name <span className="req">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            placeholder="e.g. Jane"
            className={`field-input ${errors.firstName ? 'err' : ''}`}
          />
          {errors.firstName && <p className="field-error-msg show">{errors.firstName}</p>}
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="lastName">
            Last Name <span className="req">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            placeholder="e.g. Smith"
            className={`field-input ${errors.lastName ? 'err' : ''}`}
          />
          {errors.lastName && <p className="field-error-msg show">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email / Phone */}
      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="email">
            Email Address <span className="req">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="jane@company.com.au"
            className={`field-input ${errors.email ? 'err' : ''}`}
          />
          {errors.email && <p className="field-error-msg show">{errors.email}</p>}
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="phone">
            Phone Number <span className="req">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="e.g. 0400 000 000"
            className={`field-input ${errors.phone ? 'err' : ''}`}
          />
          {errors.phone && <p className="field-error-msg show">{errors.phone}</p>}
        </div>
      </div>

      {/* Brief Description */}
      <div className="field-group">
        <label className="field-label" htmlFor="description">
          Brief Description <span className="req">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Please describe your enquiry, Shopify order sync, or label issue in detail..."
          className={`field-input field-textarea ${errors.description ? 'err' : ''}`}
        />
        {errors.description && <p className="field-error-msg show">{errors.description}</p>}
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-3">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary px-12 py-3.5 text-base font-bold transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#EAF044', color: '#103d39' }}
        >
          {submitting ? 'Submitting…' : 'Submit Ticket'}
        </button>
      </div>

      {/* Direct Contact CTA */}
      <div className="text-center text-sm pt-6 mt-6 border-t border-slate-100" style={{ color: 'var(--ink-2)' }}>
        <p className="flex items-center justify-center gap-1.5 mb-1 font-medium">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
          </svg>
          Want to chat now?
        </p>
        <p>
          Call{' '}
          <a href="tel:1300656595" className="font-bold hover:underline" style={{ color: 'var(--brand)' }}>
            1300 65 65 95
          </a>{' '}
          Mon–Fri 9am–5pm AEST.
        </p>
      </div>
    </form>
  )
}

