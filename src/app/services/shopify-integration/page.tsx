import type { Metadata } from 'next'
import { ShopifyHero } from '@/components/shopify-integration/ShopifyHero'
import { ShopifyUsps } from '@/components/shopify-integration/ShopifyUsps'
import { ShopifyChecklist } from '@/components/shopify-integration/ShopifyChecklist'
import { ShopifyBenefits } from '@/components/shopify-integration/ShopifyBenefits'
import { ShopifySatchels } from '@/components/shopify-integration/ShopifySatchels'
import { ShopifyVip } from '@/components/shopify-integration/ShopifyVip'

export const metadata: Metadata = {
  title: 'Shopify Integration | Shopify Shipping Australia',
  description:
    'MailPlus makes selling with Shopify so much easier. Our Shopify integration is free, easy to use and allows you to scan parcels straight from your phone.',
  alternates: { canonical: 'https://mailplus.com.au/shopify-integration' },
}

export default function ShopifyIntegrationPage() {
  return (
    <>
      <ShopifyHero />
      <ShopifyUsps />
      <ShopifyChecklist />
      <ShopifyBenefits />
      <ShopifySatchels />
      <ShopifyVip />
    </>
  )
}
