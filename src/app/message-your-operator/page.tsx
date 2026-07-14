'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface CompanyDetails {
  companyName: string
  prospectPlusId: string
  franchiseeName: string
  franchiseeEmail: string | null
}

function MessageYourOperatorContent() {
  const searchParams = useSearchParams()
  const customerid = searchParams.get('customerid')
  const loginemail = searchParams.get('loginemail')

  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState<CompanyDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Verify parameters and fetch company details
  useEffect(() => {
    const cleanEmail = loginemail || ''
    if (!customerid || !cleanEmail) {
      setError('Invalid access parameters. Please check your link or contact support.')
      setLoading(false)
      return
    }

    async function fetchDetails() {
      try {
        const res = await fetch(`/api/message-operator?customerid=${customerid}&loginemail=${encodeURIComponent(cleanEmail)}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to retrieve customer details.')
        } else {
          setDetails(data)
        }
      } catch (err) {
        console.error(err)
        setError('A network error occurred. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [customerid, loginemail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/message-operator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerid,
          loginemail,
          message,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert(data.error || 'Failed to send message.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while sending your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#095c7b] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Verifying customer details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
          <span className="text-4xl block mb-4" aria-hidden="true">⚠️</span>
          <h2 className="text-xl font-bold text-red-900 mb-2">Verification Failed</h2>
          <p className="text-red-700 text-sm mb-6 leading-relaxed">{error}</p>
          <div className="text-xs text-slate-500">
            Customer ID: {customerid || 'Missing'} | Email: {loginemail || 'Missing'}
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-lg w-full bg-emerald-50 border border-emerald-200 rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <span className="text-5xl block mb-6" aria-hidden="true">✉️</span>
          <h2 className="text-2xl font-bold text-[#095c7b] mb-4">Message Sent Successfully!</h2>
          <p className="text-[#103d39] text-sm leading-relaxed mb-6">
            Your message has been dispatched to your local MailPlus owner-operator (<strong>{details?.franchiseeName}</strong>).
            They will be in touch with you shortly.
          </p>
          <div className="bg-white rounded-2xl p-4 text-xs text-slate-500 border border-emerald-100 flex flex-col gap-2">
            <div><strong>Company:</strong> {details?.companyName}</div>
            <div><strong>Recipient:</strong> {details?.franchiseeEmail || 'Operator'}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-[70vh] bg-slate-50 relative overflow-hidden">
      {/* Background blobs for premium feel */}
      <div className="organic-blob absolute w-[400px] h-[400px] -top-20 -left-20 opacity-[0.03] bg-[#095c7b] pointer-events-none" />
      <div className="organic-blob absolute w-[500px] h-[500px] -bottom-40 -right-40 opacity-[0.03] bg-[#095c7b] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <h1
          className="text-4xl md:text-5xl font-bold text-[#095c7b] mb-2 text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Message Your Operator
        </h1>
        <p className="text-slate-500 text-sm text-center mb-8">
          Send a direct message or enquiry to your dedicated MailPlus franchisee.
        </p>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
          {/* Company Information Bar */}
          <div className="bg-[#095c7b] px-8 py-5 text-white flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Company Account</div>
              <h2 className="text-lg font-bold mt-0.5 leading-tight">{details?.companyName}</h2>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold">
                ID: {details?.prospectPlusId || 'N/A'}
              </span>
            </div>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#095c7b] uppercase tracking-wider mb-2">
                  Customer ID
                </label>
                <input
                  type="text"
                  readOnly
                  value={customerid || ''}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600 font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#095c7b] uppercase tracking-wider mb-2">
                  Login Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={loginemail || ''}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600 font-medium truncate focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#095c7b] uppercase tracking-wider mb-2">
                Operator / Franchisee
              </label>
              <div className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-700 font-semibold flex justify-between items-center">
                <span>{details?.franchiseeName}</span>
                {details?.franchiseeEmail && (
                  <span className="text-xs text-slate-400 font-normal">{details.franchiseeEmail}</span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-[#095c7b] uppercase tracking-wider mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type the message you would like to send to your local operator..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#095c7b] focus:ring-1 focus:ring-[#095c7b] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !message.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#095c7b] hover:bg-[#074760] text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Message...
                </>
              ) : (
                'Send Message to Operator'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function MessageYourOperatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#095c7b] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Loading page...</p>
        </div>
      </div>
    }>
      <MessageYourOperatorContent />
    </Suspense>
  )
}
