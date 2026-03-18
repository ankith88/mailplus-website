import type { Metadata } from 'next'
import { ExpressHero } from '@/components/express-delivery/ExpressHero'
import { ExpressDeliverFast } from '@/components/express-delivery/ExpressDeliverFast'
import { ExpressSameDay } from '@/components/express-delivery/ExpressSameDay'
import { ExpressAdvantage } from '@/components/express-delivery/ExpressAdvantage'
import { ExpressWeightTiers } from '@/components/express-delivery/ExpressWeightTiers'
import { Express3Steps } from '@/components/express-delivery/Express3Steps'
import { ExpressReviews } from '@/components/express-delivery/ExpressReviews'

export const metadata: Metadata = {
  title: 'Express Delivery | Premium Express Delivery You Can Trust',
  description:
    'Real express delivery in 1–2 days. MailPlus offers flat-rate national prices, guaranteed same-day pickups, and door-to-door service for small to medium businesses across Australia.',
  alternates: { canonical: 'https://mailplus.com.au/mailplus-express-delivery' },
}

export default function ExpressDeliveryPage() {
  return (
    <>
      <ExpressHero />
      <ExpressDeliverFast />
      <ExpressSameDay />
      <ExpressAdvantage />
      <ExpressWeightTiers />
      <Express3Steps />
      <ExpressReviews />
    </>
  )
}
