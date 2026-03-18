'use client'

import { useState } from 'react'

interface FormState {
  // Your details (referrer)
  refFirstName: string
  refLastName: string
  refEmail: string
  refPhone: string
  // Friend's details (referee)
  friendFirstName: string
  friendLastName: string
  friendEmail: string
  friendPhone: string
  friendLocation: string
  comments: string
}

const empty: FormState = {
  refFirstName: '',
  refLastName: '',
  refEmail: '',
  refPhone: '',
  friendFirstName: '',
  friendLastName: '',
  friendEmail: '',
  friendPhone: '',
  friendLocation: '',
  comments: '',
}

const inputCls =
  'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 bg-white'
const errorStyle = { color: '#e53e3e' }

export function ReferForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.refFirstName.trim()) e.refFirstName = 'First name is required.'
    if (!form.refLastName.trim()) e.refLastName = 'Last name is required.'
    if (!form.refEmail.trim()) e.refEmail = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.refEmail)) e.refEmail = 'Please enter a valid email.'
    if (!form.refPhone.trim()) e.refPhone = 'Phone number is required.'
    if (!form.friendFirstName.trim()) e.friendFirstName = 'First name is required.'
    if (!form.friendLastName.trim()) e.friendLastName = 'Last name is required.'
    if (!form.friendEmail.trim()) e.friendEmail = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.friendEmail)) e.friendEmail = 'Please enter a valid email.'
    if (!form.friendPhone.trim()) e.friendPhone = 'Phone number is required.'
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
        <h3 className="text-2xl font-bold mb-3" style={{ color: '#095c7b' }}>Referral Submitted!</h3>
        <p className="text-base leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'rgba(9,92,123,0.80)' }}>
          Thanks for referring a friend. Our franchising team will be in touch with{' '}
          <strong>{form.friendFirstName}</strong> shortly. We&apos;ll let you know when they sign up
          so we can arrange your cash incentive.
        </p>
        <button
          onClick={() => { setForm(empty); setSubmitted(false) }}
          className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
        >
          Submit Another Referral
        </button>
      </div>
    )
  }

  const fieldBase = (hasError: boolean) => ({
    borderColor: hasError ? '#e53e3e' : 'rgba(9,92,123,0.20)',
    color: '#103d39',
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">

      {/* Your details */}
      <div>
        <p
          className="text-xs font-bold tracking-widest uppercase mb-5"
          style={{ color: '#095c7b' }}
        >
          Your Details
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={form.refFirstName}
                onChange={(e) => set('refFirstName', e.target.value)}
                placeholder="First Name*"
                aria-label="Your first name"
                className={inputCls}
                style={fieldBase(!!errors.refFirstName)}
              />
              {errors.refFirstName && <p className="mt-1 text-xs" style={errorStyle}>{errors.refFirstName}</p>}
            </div>
            <div>
              <input
                type="text"
                value={form.refLastName}
                onChange={(e) => set('refLastName', e.target.value)}
                placeholder="Last Name*"
                aria-label="Your last name"
                className={inputCls}
                style={fieldBase(!!errors.refLastName)}
              />
              {errors.refLastName && <p className="mt-1 text-xs" style={errorStyle}>{errors.refLastName}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                value={form.refEmail}
                onChange={(e) => set('refEmail', e.target.value)}
                placeholder="Email Address*"
                aria-label="Your email address"
                className={inputCls}
                style={fieldBase(!!errors.refEmail)}
              />
              {errors.refEmail && <p className="mt-1 text-xs" style={errorStyle}>{errors.refEmail}</p>}
            </div>
            <div>
              <input
                type="tel"
                value={form.refPhone}
                onChange={(e) => set('refPhone', e.target.value)}
                placeholder="Phone Number*"
                aria-label="Your phone number"
                className={inputCls}
                style={fieldBase(!!errors.refPhone)}
              />
              {errors.refPhone && <p className="mt-1 text-xs" style={errorStyle}>{errors.refPhone}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(9,92,123,0.12)' }}
        role="separator"
      />

      {/* Friend's details */}
      <div>
        <p
          className="text-xs font-bold tracking-widest uppercase mb-5"
          style={{ color: '#095c7b' }}
        >
          Your Friend&apos;s Details
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={form.friendFirstName}
                onChange={(e) => set('friendFirstName', e.target.value)}
                placeholder="First Name*"
                aria-label="Friend's first name"
                className={inputCls}
                style={fieldBase(!!errors.friendFirstName)}
              />
              {errors.friendFirstName && <p className="mt-1 text-xs" style={errorStyle}>{errors.friendFirstName}</p>}
            </div>
            <div>
              <input
                type="text"
                value={form.friendLastName}
                onChange={(e) => set('friendLastName', e.target.value)}
                placeholder="Last Name*"
                aria-label="Friend's last name"
                className={inputCls}
                style={fieldBase(!!errors.friendLastName)}
              />
              {errors.friendLastName && <p className="mt-1 text-xs" style={errorStyle}>{errors.friendLastName}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                value={form.friendEmail}
                onChange={(e) => set('friendEmail', e.target.value)}
                placeholder="Email Address*"
                aria-label="Friend's email address"
                className={inputCls}
                style={fieldBase(!!errors.friendEmail)}
              />
              {errors.friendEmail && <p className="mt-1 text-xs" style={errorStyle}>{errors.friendEmail}</p>}
            </div>
            <div>
              <input
                type="tel"
                value={form.friendPhone}
                onChange={(e) => set('friendPhone', e.target.value)}
                placeholder="Phone Number*"
                aria-label="Friend's phone number"
                className={inputCls}
                style={fieldBase(!!errors.friendPhone)}
              />
              {errors.friendPhone && <p className="mt-1 text-xs" style={errorStyle}>{errors.friendPhone}</p>}
            </div>
          </div>
          <input
            type="text"
            value={form.friendLocation}
            onChange={(e) => set('friendLocation', e.target.value)}
            placeholder="Preferred Location / Territory (optional)"
            aria-label="Friend's preferred location or territory"
            className={inputCls}
            style={fieldBase(false)}
          />
          <textarea
            rows={3}
            value={form.comments}
            onChange={(e) => set('comments', e.target.value)}
            placeholder="Any additional comments (optional)"
            aria-label="Additional comments"
            className={inputCls + ' resize-none'}
            style={fieldBase(false)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-14 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#EAF044', color: '#103d39' }}
        >
          Submit Referral
        </button>
      </div>

    </form>
  )
}
