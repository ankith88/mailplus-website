import type { Metadata } from 'next'
import Script from 'next/script'
import ClaimClient from './ClaimClient'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Claim 5 Free Collections | Start Your Free MailPlus Trial',
  description:
    'Claim 5 free parcel collections for your business. A local MailPlus owner-operator collects from your premises and lodges at Australia Post on your own account. No credit card, no contract.',
  alternates: { canonical: 'https://mailplus.com.au/5-free-collections/claim' },
}

export default function ClaimPage() {
  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: '5 Free Collections Claim',
    description:
      'Claim five free collections for new business customers sending with Australia Post. No credit card required.',
    price: '0',
    priceCurrency: 'AUD',
    url: 'https://mailplus.com.au/5-free-collections/claim',
    seller: {
      '@type': 'Organization',
      name: 'MailPlus',
      url: 'https://mailplus.com.au',
    },
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <div className="five-free-page">
        <ClaimClient />
      </div>
    </>
  )
}

