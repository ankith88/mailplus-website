import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutStats } from '@/components/about/AboutStats'
import { AboutStory } from '@/components/about/AboutStory'
import { AboutMd } from '@/components/about/AboutMd'
import { AboutWhyUs } from '@/components/about/AboutWhyUs'
import { AboutServices } from '@/components/about/AboutServices'
import { AboutCta } from '@/components/about/AboutCta'

export const metadata: Metadata = {
  title: 'About MailPlus | 100% Australian-Owned Courier & Delivery',
  description:
    'MailPlus is a 100% Australian-owned courier, parcel delivery, mail management, and logistics company. Serving Aussie businesses since 2010 with guaranteed same-day collections and 1–2 day express delivery.',
  alternates: { canonical: 'https://mailplus.com.au/about' },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutMd />
      <AboutWhyUs />
      <AboutServices />
      <AboutCta />
    </>
  )
}
