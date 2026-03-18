import type { Metadata } from 'next'
import { ApiHero } from '@/components/mailplus-api/ApiHero'
import { ApiUsps } from '@/components/mailplus-api/ApiUsps'
import { ApiEmailNotifications } from '@/components/mailplus-api/ApiEmailNotifications'
import { ApiPackaging } from '@/components/mailplus-api/ApiPackaging'
import { ApiSupport } from '@/components/mailplus-api/ApiSupport'
import { ApiReviews } from '@/components/mailplus-api/ApiReviews'

export const metadata: Metadata = {
  title: 'MailPlus API — Seamless Shipping Integration',
  description:
    'Integrate your platform with the MailPlus API. Automated label generation, 1-2 day express delivery Australia-wide, live tracking updates, and full team support.',
  alternates: { canonical: 'https://mailplus.com.au/api-integration-3pl' },
}

export default function MailPlusApiPage() {
  return (
    <>
      <ApiHero />
      <ApiUsps />
      <ApiEmailNotifications />
      <ApiPackaging />
      <ApiSupport />
      <ApiReviews />
    </>
  )
}
