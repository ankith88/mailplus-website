import type { Metadata } from 'next'
import { PortalQuestionsHero } from '@/components/portal-questions/PortalQuestionsHero'
import { PortalQuestionsAccordion } from '@/components/portal-questions/PortalQuestionsAccordion'
import { PortalQuestionsCta } from '@/components/portal-questions/PortalQuestionsCta'

export const metadata: Metadata = {
  title: 'Commonly Asked Portal Questions | ShipMate — MailPlus',
  description:
    'Find answers to the most common ShipMate portal questions — getting started, creating labels, Shopify integration, tracking, carriers, and account management.',
  alternates: { canonical: 'https://mailplus.com.au/commonly-asked-portal-questions' },
}

export default function PortalQuestionsPage() {
  return (
    <>
      <PortalQuestionsHero />
      <PortalQuestionsAccordion />
      <PortalQuestionsCta />
    </>
  )
}
