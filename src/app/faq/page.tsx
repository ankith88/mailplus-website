import type { Metadata } from 'next'
import { FaqHero } from '@/components/faq/FaqHero'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { FaqCta } from '@/components/faq/FaqCta'
import { canonicalFaqs } from '@/content/company-facts'

export const metadata: Metadata = {
  title: 'FAQ | Everything You Need To Know About MailPlus',
  description:
    "You've got questions, we've got answers. For more information about MailPlus services, check out our list of frequently asked questions.",
  alternates: { canonical: 'https://mailplus.com.au/faq' },
}

export default function FaqPage() {
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: canonicalFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <FaqHero />
      <FaqAccordion />
      <FaqCta />
    </>
  )
}
