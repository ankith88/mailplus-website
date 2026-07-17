'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface CompanyDetails {
  companyName: string
  prospectPlusId: string
  franchiseeName: string
  franchiseeEmail: string | null
}

function MessageYourDriverContent() {
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
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20 bg-[#CFE0CE]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#025D7C] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0A3242] font-semibold text-sm">Verifying customer details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20 px-6 bg-[#CFE0CE]">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-8 text-center shadow-md">
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

  return (
    <>
      <style>{`
        :root {
          --ink: #0A3242;
          --ink-2: #14506B;
          --paper: #CFE0CE;
          --card: #FFFFFF;
          --line: #DCE5DB;
          --line-2: #C3D2C2;
          --muted: #5B6E66;
          --muted-2: #93A49B;
          --brand: #025D7C;
          --brand-2: #0E7396;
          --accent: #3DA14B;
          --accent-tint: #E4F3E5;
          --cta: #E3F046;
          --cta-hover: #D6E62F;
          --radius: 14px;
          --radius-sm: 10px;
          --radius-lg: 20px;
          --shadow-sm: 0 1px 2px rgba(10,50,66,.05), 0 0 0 1px rgba(10,50,66,.04);
          --shadow-md: 0 4px 12px rgba(10,50,66,.07), 0 0 0 1px rgba(10,50,66,.04);
          --shadow-lg: 0 12px 32px rgba(10,50,66,.12), 0 0 0 1px rgba(10,50,66,.04);
          --font-display: "Source Serif 4", Georgia, serif;
          --font-body: "DM Sans", system-ui, sans-serif;
          --font-mono: "JetBrains Mono", ui-monospace, monospace;
        }

        .message-driver-page-container {
          background: var(--paper);
          color: var(--ink);
          font-family: var(--font-body);
          min-height: 100vh;
          padding-top: 120px;
          padding-bottom: 80px;
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .page-head {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 36px;
        }

        .page-head .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--brand);
          margin-bottom: 14px;
          font-weight: 600;
        }

        .page-head .hero-eyebrow .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }

        .page-head h1 {
          font-family: var(--font-display);
          font-size: 40px;
          line-height: 1.08;
          color: var(--ink);
          margin: 0 0 12px;
          font-weight: 700;
        }

        .page-head p {
          font-size: 17px;
          line-height: 1.6;
          color: var(--ink-2);
          margin: 0;
        }

        .enquiry-band {
          background: var(--brand);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .enquiry-grid {
          display: grid;
          grid-template-columns: 0.96fr 1.04fr;
        }

        .enquiry-left {
          padding: 48px;
          color: #fff;
          position: relative;
        }

        .enquiry-left::before {
          content: '';
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, var(--cta) 0%, transparent 70%);
          opacity: .2;
        }

        .enquiry-left h2 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -.02em;
          line-height: 1.12;
          margin-bottom: 16px;
          position: relative;
          color: #fff;
        }

        .enquiry-left p {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255,255,255,.78);
          margin-bottom: 28px;
          position: relative;
        }

        .msg-examples {
          display: grid;
          gap: 12px;
          margin: 26px 0 0;
          position: relative;
        }

        .msg-example {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
        }

        .msg-example .me-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--cta);
          margin-bottom: 6px;
        }

        .msg-example .me-quote {
          display: block;
          color: rgba(255,255,255,.88);
          font-size: 14.5px;
          line-height: 1.5;
          font-style: italic;
        }

        .one-way-note {
          margin: 22px 0 0;
          color: rgba(255,255,255,.75);
          font-size: 13.5px;
          line-height: 1.55;
          position: relative;
        }

        .enquiry-contacts {
          display: grid;
          gap: 14px;
          position: relative;
        }

        .enquiry-contact {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          color: #fff;
        }

        .enquiry-contact .ec-ic {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.16);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .enquiry-contact .ec-lbl {
          font-size: 12px;
          color: rgba(255,255,255,.6);
          text-transform: uppercase;
          letter-spacing: .08em;
          font-family: var(--font-mono);
        }

        .enquiry-contact .ec-val {
          font-size: 16px;
          font-weight: 600;
        }

        .enquiry-contact .ec-val.mono {
          font-family: var(--font-mono);
        }

        .enquiry-form {
          background: var(--card);
          padding: 44px;
        }

        .ef-intro {
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink);
          background: rgba(9,92,124,.05);
          border: 1px solid rgba(9,92,124,.12);
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 22px;
        }

        .field-group {
          margin-bottom: 16px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 6px;
        }

        .field-label .req {
          color: #E5484D;
        }

        .field-label .opt {
          color: var(--muted);
          font-weight: 400;
        }

        .field-readonly {
          width: 100%;
          background: #f5f7f5;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--ink-2);
          font-weight: 500;
        }

        .field-textarea {
          width: 100%;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color .15s, box-shadow .15s;
          resize: vertical;
          min-height: 120px;
        }

        .field-textarea:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(9,92,124,.1);
        }

        .form-submit {
          width: 100%;
          background: var(--cta);
          color: var(--ink);
          border: none;
          padding: 15px;
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background .15s;
          margin-top: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .form-submit:hover {
          background: var(--cta-hover);
        }

        .form-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .form-success {
          display: block !important;
          text-align: center;
          padding: 30px 10px;
        }

        .form-success .fs-ic {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--accent-tint);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin: 0 auto 18px;
          color: var(--accent);
          font-weight: bold;
        }

        .form-success h3 {
          font-family: var(--font-display);
          font-size: 22px;
          margin-bottom: 8px;
          font-weight: bold;
          color: var(--ink);
        }

        .form-success p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }

        @media (max-width: 920px) {
          .enquiry-grid {
            grid-template-columns: 1fr;
          }
          .enquiry-left {
            padding: 36px 28px;
          }
          .enquiry-form {
            padding: 36px 28px;
          }
          .page-head h1 {
            font-size: 31px;
          }
        }

        @media (max-width: 560px) {
          .enquiry-left, .enquiry-form {
            padding: 32px 24px;
          }
        }
      `}</style>

      <div className="message-driver-page-container">
        <div className="wrap">
          <div className="page-head">
            <div className="hero-eyebrow">
              <span className="dot"></span> ShipMate &middot; Driver messaging
            </div>
            <h1>Message your driver.</h1>
            <p>
              Send a quick one-way note to your local MailPlus driver &mdash; a change of parcel location, a pick-up update, parcels ready early, or a special request. Need a reply, or is it urgent? Call your driver directly, or phone <a href="tel:1300656595" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>1300 65 65 95</a>.
            </p>
          </div>

          <div className="enquiry-band">
            <div className="enquiry-grid">
              
              {/* Left Panel */}
              <div className="enquiry-left">
                <h2>A quick note, straight to your driver.</h2>
                <p>Your MailPlus driver is a local owner-driver &mdash; use a one-way message for everyday updates like these:</p>
                
                <div className="msg-examples">
                  <div className="msg-example">
                    <span className="me-label">Change of parcel location</span>
                    <span className="me-quote">&ldquo;Parcels are at the side door today, not reception.&rdquo;</span>
                  </div>
                  <div className="msg-example">
                    <span className="me-label">Pick-up schedule update</span>
                    <span className="me-quote">&ldquo;We&rsquo;ve cancelled today&rsquo;s pick-up &mdash; everything will be ready on the next scheduled day.&rdquo;</span>
                  </div>
                  <div className="msg-example">
                    <span className="me-label">Parcels ready early</span>
                    <span className="me-quote">&ldquo;Orders are packed and ready now if that suits your run.&rdquo;</span>
                  </div>
                  <div className="msg-example">
                    <span className="me-label">Special pick-up request</span>
                    <span className="me-quote">&ldquo;We&rsquo;re closing early today &mdash; please collect by 12pm if you can.&rdquo;</span>
                  </div>
                </div>

                <p className="one-way-note">Messages are one-way, so your driver won&rsquo;t reply here. For anything urgent or two-way, call them directly or phone us.</p>
                
                <div className="enquiry-contacts" style={{ marginTop: '20px' }}>
                  <a href="tel:1300656595" className="enquiry-contact">
                    <div className="ec-ic">📞</div>
                    <div>
                      <div className="ec-lbl">Urgent, or need a reply?</div>
                      <div className="ec-val mono">1300 65 65 95</div>
                    </div>
                  </a>
                  <div className="enquiry-contact">
                    <div className="ec-ic">🕘</div>
                    <div>
                      <div className="ec-lbl">Hours</div>
                      <div className="ec-val">Mon&ndash;Fri, 9am&ndash;5pm AEST</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="enquiry-form">
                {!submitted ? (
                  <form onSubmit={handleSubmit}>
                    <p className="ef-intro">Type your update below &mdash; include times and locations so your driver has everything at a glance.</p>
                    
                    {/* Readonly Account Details */}
                    <div className="field-group">
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <label className="field-label">Customer ID</label>
                          <div className="field-readonly">{customerid}</div>
                        </div>
                        <div>
                          <label className="field-label">Login Email</label>
                          <div className="field-readonly truncate" title={loginemail || ''}>{loginemail}</div>
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Company Name</label>
                        <div className="field-readonly">{details?.companyName}</div>
                      </div>
                      {details?.franchiseeName && (
                        <div style={{ marginTop: '16px' }}>
                          <label className="field-label">Driver / Franchisee</label>
                          <div className="field-readonly">{details.franchiseeName}</div>
                        </div>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="field-group" style={{ marginTop: '24px' }}>
                      <label className="field-label" htmlFor="o-message">Your message <span className="req">*</span></label>
                      <textarea
                        className="field-textarea"
                        id="o-message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="e.g. Parcels are at the side door today &mdash; we close at 3pm."
                      ></textarea>
                    </div>

                    <button
                      className="form-submit"
                      type="submit"
                      disabled={submitting || !message.trim()}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        'Send to your driver →'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="form-success show">
                    <div className="fs-ic">✓</div>
                    <h3>Message sent.</h3>
                    <p>
                      Your note is on its way to your local driver (<strong>{details?.franchiseeName}</strong>). Need a reply or something urgent? Call <strong>1300 65 65 95</strong>, Mon&ndash;Fri 9am&ndash;5pm AEST.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function MessageYourDriverPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center pt-32 pb-20 bg-[#CFE0CE]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#025D7C] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0A3242] font-semibold text-sm">Loading page...</p>
        </div>
      </div>
    }>
      <MessageYourDriverContent />
    </Suspense>
  )
}
