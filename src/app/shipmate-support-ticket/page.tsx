import type { Metadata } from 'next'
import Link from 'next/link'
import { ShipMateSupportForm } from '@/components/shipmate-support-ticket/ShipMateSupportForm'
import '@/app/support-ticket/styles.css'

export const metadata: Metadata = {
  title: 'ShipMate Support Ticket | MailPlus',
  description:
    'Submit a ShipMate support ticket with MailPlus. Get help with label generation, Shopify sync, tracking, API issues, and more.',
  alternates: { canonical: 'https://mailplus.com.au/shipmate-support-ticket' },
}

export default function ShipMateSupportTicketPage() {
  return (
    <>
      {/* ============= BREADCRUMB ============= */}
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/support-ticket">Support</Link>
          <span className="sep">/</span>
          <span>ShipMate Support Ticket</span>
        </nav>
      </div>

      {/* ============= HERO ============= */}
      <section className="ticket-hero">
        <div className="wrap">
          <div className="hero-eyebrow">
            <span className="dot"></span> ShipMate support
          </div>
          <h1>
            Need some <span className="hl">ShipMate assistance?</span>
          </h1>
          <p>
            Please fill in the details on this form, and our support team will
            get back to you ASAP via phone or email.
          </p>
        </div>
      </section>

      {/* ============= FORM CONTAINER ============= */}
      <section className="wizard-section">
        <div className="wrap-narrow">
          <div className="wizard">
            <div className="wizard-body">
              <ShipMateSupportForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

