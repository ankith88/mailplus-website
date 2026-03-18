'use client'

import { useState } from 'react'

export function TrackingHero() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section
      className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 pt-40 pb-24 overflow-hidden"
      aria-labelledby="tracking-heading"
      style={{ backgroundColor: '#063040' }}
    >
      {/* Background blobs */}
      <div
        className="organic-blob absolute w-[600px] h-[600px] -right-40 -top-40 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />
      <div
        className="organic-blob-moss absolute w-[400px] h-[400px] -left-20 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07, animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
        {/* Eyebrow */}
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#EAF044' }}
        >
          Real-Time Tracking
        </span>

        {/* Heading */}
        <h1
          id="tracking-heading"
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
        >
          It Must Almost{' '}
          <span className="italic" style={{ color: '#EAF044' }}>Be There</span>
        </h1>

        {/* Description */}
        <p
          className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.78)' }}
        >
          Track your delivery from the time it gets picked up until it&apos;s delivered to your
          customer. Most of our orders arrive within 1–2 days, so you can keep an eye on its status.
        </p>

        {/* Tracking form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            noValidate
          >
            <div className="flex-1">
              <label htmlFor="tracking-input" className="sr-only">Tracking number</label>
              <input
                id="tracking-input"
                type="text"
                value={trackingNumber}
                onChange={(e) => { setTrackingNumber(e.target.value); setError('') }}
                placeholder="Enter your tracking number"
                className="w-full px-5 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-shadow"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.2)',
                  // @ts-ignore
                  '--tw-ring-color': '#EAF044',
                }}
                aria-describedby={error ? 'tracking-error' : undefined}
              />
              {error && (
                <p id="tracking-error" className="text-left text-xs mt-2" style={{ color: '#fca5a5' }}>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg whitespace-nowrap"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Track Now
            </button>
          </form>
        ) : (
          <div
            className="max-w-lg mx-auto rounded-2xl px-8 py-8 text-left"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {/* Mock result — replace with real API data */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#EAF044' }}>Tracking</p>
                <p className="font-bold text-lg" style={{ color: '#ffffff' }}>{trackingNumber}</p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: '#22C55E', color: '#ffffff' }}
              >
                In Transit
              </span>
            </div>

            {/* Timeline */}
            <ol className="relative border-l space-y-5 pl-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              {[
                { label: 'Picked up by driver', time: 'Today, 9:14 am', done: true },
                { label: 'Lodged at facility', time: 'Today, 11:30 am', done: true },
                { label: 'Out for delivery', time: 'Expected today', done: false },
                { label: 'Delivered', time: '', done: false },
              ].map((step) => (
                <li key={step.label} className="relative">
                  <span
                    className="absolute -left-[1.35rem] w-3 h-3 rounded-full border-2 flex-none"
                    style={{
                      backgroundColor: step.done ? '#EAF044' : 'transparent',
                      borderColor: step.done ? '#EAF044' : 'rgba(255,255,255,0.3)',
                    }}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold" style={{ color: step.done ? '#ffffff' : 'rgba(255,255,255,0.45)' }}>{step.label}</p>
                  {step.time && <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.time}</p>}
                </li>
              ))}
            </ol>

            <button
              onClick={() => { setSubmitted(false); setTrackingNumber('') }}
              className="mt-6 text-xs font-semibold underline"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Track another parcel
            </button>
          </div>
        )}

        {/* Help link */}
        <p className="mt-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Need help?{' '}
          <a
            href="tel:1300656595"
            className="font-semibold underline hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Call 1300 65 65 95
          </a>
          {' '}Mon–Fri 9am–5pm AEST
        </p>
      </div>
    </section>
  )
}
