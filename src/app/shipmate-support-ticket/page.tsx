import type { Metadata } from 'next'
import { ShipMateSupportForm } from '@/components/shipmate-support-ticket/ShipMateSupportForm'

export const metadata: Metadata = {
  title: 'ShipMate Support Ticket | MailPlus',
  description:
    'Submit a ShipMate support ticket with MailPlus. Get help with label generation, Shopify sync, tracking, API issues, and more.',
  alternates: { canonical: 'https://mailplus.com.au/shipmate-support-ticket' },
}

export default function ShipMateSupportTicketPage() {
  return (
    <section
      className="min-h-screen px-6 py-32 flex items-center justify-center"
      style={{ backgroundColor: '#DAE8DA' }}
      aria-label="ShipMate support ticket form"
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}
          >
            Need some ShipMate assistance?
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(9,92,123,0.80)' }}>
            Please fill in the details on this form, and our support team will
            get back to you ASAP via phone or email.
          </p>
        </div>

        <ShipMateSupportForm />
      </div>
    </section>
  )
}
