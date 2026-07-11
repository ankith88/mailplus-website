import type { Metadata } from 'next'
import { SupportTicketForm } from '@/components/support-ticket/SupportTicketForm'

export const metadata: Metadata = {
  title: 'Submit a Support Ticket | MailPlus',
  description:
    'Submit a support ticket with MailPlus for your parcel or delivery tracking identifier.',
  alternates: { canonical: 'https://mailplus.com.au/support-ticket' },
}

export default function SupportTicketPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Submit a Support Ticket | MailPlus",
    "description": "Submit a support ticket with MailPlus for your parcel or delivery tracking identifier.",
    "url": "https://mailplus.com.au/support-ticket",
    "publisher": {
      "@id": "https://mailplus.com.au/#organization"
    },
    "mainEntity": {
      "@type": "ContactPoint",
      "telephone": "+61-1300-65-65-95",
      "contactType": "Customer Support",
      "email": "support@mailplus.com.au",
      "availableLanguage": "English"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main
        className="min-h-screen px-6 py-32 flex items-center justify-center"
        style={{ backgroundColor: '#DAE8DA' }}
        aria-label="Support ticket form wrapper"
      >
        <SupportTicketForm />
      </main>
    </>
  )
}
