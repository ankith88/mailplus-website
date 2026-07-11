import type { Metadata } from 'next'
import Link from 'next/link'
import { SupportTicketWizard } from './SupportTicketWizard'
import './styles.css'

export const metadata: Metadata = {
  title: 'Raise a Support Ticket | Track & Resolve a Parcel Issue | MailPlus',
  description:
    "Raise a support ticket for a MailPlus parcel — report a delayed item, request an ETA, proof of delivery, ATL photo, redelivery, return to sender and more. Enter your barcode and we'll do the rest.",
  alternates: { canonical: 'https://mailplus.com.au/support-ticket' },
  robots: { index: false }
}

export default function SupportTicketPage() {
  return (
    <>
      {/* ============= BREADCRUMB ============= */}
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/support">Support</Link>
          <span className="sep">/</span>
          <span>Raise a Ticket</span>
        </nav>
      </div>

      {/* ============= HERO ============= */}
      <section className="ticket-hero">
        <div className="wrap">
          <div className="hero-eyebrow">
            <span className="dot"></span> Parcel support
          </div>
          <h1>
            Raise a <span className="hl">support ticket</span>
          </h1>
          <p>
            Something not right with a delivery? Tell us what's happening and pop
            in your barcode — we'll pull up the parcel and get the right person
            onto it. Real Australian people, no hold queues, no bots.
          </p>
        </div>
      </section>

      {/* ============= WIZARD COMPONENT ============= */}
      <SupportTicketWizard />
    </>
  )
}
