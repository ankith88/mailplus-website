import type { Metadata } from 'next'
import { Shipping101Hero } from '@/components/shipping-101/Shipping101Hero'
import { Shipping101Article } from '@/components/shipping-101/Shipping101Article'

export const metadata: Metadata = {
  title: 'Small Business Hub | Shipping 101 For Small Business | MailPlus',
  description:
    'Everything small businesses need to know about shipping — from choosing the right packaging and understanding costs, to express delivery and setting up Shopify integration.',
  alternates: { canonical: 'https://mailplus.com.au/for-small-business/shipping-101' },
}

export default function Shipping101Page() {
  return (
    <>
      <Shipping101Hero />
      <Shipping101Article />
    </>
  )
}
