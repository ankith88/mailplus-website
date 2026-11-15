import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { AdvantageSection } from '@/components/home/AdvantageSection'
import { NetworkSection } from '@/components/home/NetworkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FaqSection } from '@/components/home/FaqSection'
import { ReviewsCtaSection } from '@/components/home/ReviewsCtaSection'
import { ClientScripts } from '@/components/home/ClientScripts'

export const metadata: Metadata = {
  title: 'MailPlus — Australian Courier & Parcel Delivery for Small Business',
  description:
    "MailPlus is an Australian courier and parcel delivery network founded in 1997, with approximately 300 vehicles. Express delivery in 1–2 business days, flat-rate pricing up to 5kg, same-day pickup, and Post Office collect & lodge.",
  alternates: { canonical: 'https://mailplus.com.au' },
}

import { canonicalFaqs } from '@/content/company-facts'

export default function HomePage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": canonicalFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <ClientScripts />

      <HeroSection />
      <AdvantageSection />
      <NetworkSection />
      <TestimonialsSection />
      <FaqSection faqs={canonicalFaqs} />
      <ReviewsCtaSection />
    </>
  )
}
