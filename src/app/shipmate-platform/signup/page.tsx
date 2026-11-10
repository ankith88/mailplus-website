import type { Metadata } from 'next'
import Script from 'next/script'
import SignupClient from './SignupClient'
import '../shipmate.css'

export const metadata: Metadata = {
  title: 'Sign Up for ShipMate | Free Shipping Platform | MailPlus',
  description:
    'Create your free ShipMate account. No subscription fees, no minimum volume, flat-rate express pricing, and instant Shopify and WooCommerce integration.',
  alternates: { canonical: 'https://mailplus.com.au/shipmate-platform/signup' },
}

export default function ShipMateSignupPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ShipMate Platform Sign-up',
    description:
      'Free shipping software for booking pickups, bulk label printing and order tracking with Shopify & WooCommerce integrations.',
    provider: {
      '@type': 'Organization',
      name: 'MailPlus',
      url: 'https://mailplus.com.au',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
      description: 'Free platform with no subscription fees and no minimum volume.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SignupClient />
    </>
  )
}

