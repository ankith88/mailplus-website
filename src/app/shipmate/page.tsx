import type { Metadata } from 'next'
import { ShipMateHero } from '@/components/shipmate/ShipMateHero'
import { ShipMateUsp } from '@/components/shipmate/ShipMateUsp'
import { ShipMateWhySection } from '@/components/shipmate/ShipMateWhySection'
import { ShipMateShopify } from '@/components/shipmate/ShipMateShopify'
import { ShipMateTestimonial } from '@/components/shipmate/ShipMateTestimonial'
import { ShipMate3Steps } from '@/components/shipmate/ShipMate3Steps'
import { ShipMateEveryBusiness } from '@/components/shipmate/ShipMateEveryBusiness'
import { ShipMateVideo } from '@/components/shipmate/ShipMateVideo'

export const metadata: Metadata = {
  title: 'ShipMate — Your Free Shipping Platform',
  description:
    'ShipMate by MailPlus is a free shipping platform with Shopify integration, bulk label printing, Google address validation, and access to discounted premium carriers. No contracts, no minimum volume.',
  alternates: { canonical: 'https://mailplus.com.au/shipmate' },
}

export default function ShipMatePage() {
  return (
    <>
      <ShipMateHero />
      <ShipMateUsp />
      <ShipMateWhySection />
      <ShipMateShopify />
      <ShipMateTestimonial />
      <ShipMate3Steps />
      <ShipMateEveryBusiness />
      <ShipMateVideo />
    </>
  )
}
