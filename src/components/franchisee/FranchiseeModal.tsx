'use client'

import { useEffect, useRef, useState } from 'react'
import { submitFranchiseeToNetSuite } from '@/lib/netsuite'

type Role = '' | 'investor' | 'owner-operator' | 'employment'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: Role
  comments: string
}

const empty: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  comments: '',
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function FranchiseeModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormState>(empty)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const dialogRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Reset on close
  useEffect(() => {
    if (!isOpen) { setForm(empty); setSubmitted(false); setSubmitting(false); setErrors({}) }
  }, [isOpen])

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Required.'
    if (!form.lastName.trim())  e.lastName  = 'Required.'
    if (!form.email.trim())     e.email     = 'Required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email.'
    if (!form.phone.trim())     e.phone     = 'Required.'
    if (!form.role)             e.role      = 'Please select an option.'
    if (!form.comments.trim())  e.comments  = 'Required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      await submitFranchiseeToNetSuite({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone_number: form.phone,
        postcode: '',
        comments: form.comments,
        investor_radio:            form.role === 'investor'        ? 'T' : '',
        owner_radio:               form.role === 'owner-operator'  ? 'T' : '',
        seeking_employment_radio:  form.role === 'employment'      ? 'T' : '',
        residentialpostcode: '',
        vehicle: '',
        experience: '',
        employment_type: '',
        suburb: '',
        pathname: window.location.pathname,
      })
    } catch {
      // Show success regardless of API errors
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  if (!isOpen) return null

  const inputBase = (hasError: boolean) =>
    `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 bg-white ${hasError ? 'border-red-400' : 'border-gray-200'}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="franchise-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(6,48,64,0.70)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: '#f5f5f0' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/10 z-10"
          aria-label="Close"
          style={{ color: '#095c7b' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pt-12 pb-10">
          {submitted ? (
            <div
              className="rounded-2xl px-8 py-14 text-center"
              style={{ backgroundColor: '#DAE8DA' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: '#095c7b' }}>
                Thank you for your enquiry.
              </h2>
              <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: '#095c7b' }}>
                We&apos;ll be in contact with you very soon via phone or email. Please allow up to
                24 hours. If it is the weekend, we&apos;ll be in touch the next business day.
              </p>
              <button
                onClick={onClose}
                className="px-10 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Heading */}
              <div className="text-center mb-8">
                <h2
                  id="franchise-modal-title"
                  className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                  style={{ color: '#095c7b' }}
                >
                  Be part of Australia&apos;s most{' '}
                  <span
                    className="italic"
                    style={{
                      color: '#095c7b',
                      textDecoration: 'underline',
                      textDecorationColor: '#EAF044',
                      textDecorationThickness: '3px',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    trusted
                  </span>{' '}
                  franchise business.
                </h2>
                <p className="text-sm" style={{ color: 'rgba(9,92,123,0.72)' }}>
                  Simply fill in this form and we&apos;ll be in contact as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name / Email / Phone — one row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => set('firstName', e.target.value)}
                      placeholder="First Name*"
                      aria-label="First Name"
                      className={inputBase(!!errors.firstName)}
                    />
                    {errors.firstName && <p className="mt-0.5 text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => set('lastName', e.target.value)}
                      placeholder="Last Name*"
                      aria-label="Last Name"
                      className={inputBase(!!errors.lastName)}
                    />
                    {errors.lastName && <p className="mt-0.5 text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="Email Address*"
                      aria-label="Email Address"
                      className={inputBase(!!errors.email)}
                    />
                    {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="Phone Number*"
                      aria-label="Phone Number"
                      className={inputBase(!!errors.phone)}
                    />
                    {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                {/* Role radio buttons */}
                <div>
                  <div className="grid grid-cols-3 gap-3 py-1">
                    {[
                      { value: 'investor', label: "I'm an investor" },
                      { value: 'owner-operator', label: "I'd like to become an owner-operator" },
                      { value: 'employment', label: "I'm seeking employment" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2 cursor-pointer text-sm"
                        style={{ color: '#103d39' }}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={opt.value}
                          checked={form.role === opt.value}
                          onChange={(e) => set('role', e.target.value)}
                          className="flex-none accent-[#095c7b]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                </div>

                {/* Comments */}
                <div>
                  <input
                    type="text"
                    value={form.comments}
                    onChange={(e) => set('comments', e.target.value)}
                    placeholder="Comments*"
                    aria-label="Comments"
                    className={inputBase(!!errors.comments)}
                  />
                  {errors.comments && <p className="mt-0.5 text-xs text-red-500">{errors.comments}</p>}
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-16 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                  >
                    {submitting ? 'Submitting…' : 'Enquire Now'}
                  </button>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#103d39' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                    </svg>
                    <span>Want to chat now? Call <strong>1300 65 65 95</strong> &nbsp;9am–5pm AEST.</span>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
