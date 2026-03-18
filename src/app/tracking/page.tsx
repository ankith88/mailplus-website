import type { Metadata } from 'next'
import { TrackingHero } from '@/components/tracking/TrackingHero'
import { TrackingFeatures } from '@/components/tracking/TrackingFeatures'
import { TrackingFaq } from '@/components/tracking/TrackingFaq'

export const metadata: Metadata = {
  title: 'Track Your Delivery | It Must Almost Be There',
  description:
    'Track your MailPlus delivery in real time from pick-up to drop-off. Most orders arrive within 1–2 business days Australia-wide.',
  alternates: { canonical: 'https://mailplus.com.au/tracking' },
}

export default function TrackingPage() {
  return (
    <>
      <TrackingHero />
      <TrackingFeatures />
      <TrackingFaq />
    </>
  )
}
