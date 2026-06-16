import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { AdvantageSection } from '@/components/home/AdvantageSection'
import { NetworkSection } from '@/components/home/NetworkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ReviewsCtaSection } from '@/components/home/ReviewsCtaSection'
import { ClientScripts } from '@/components/home/ClientScripts'

export const metadata: Metadata = {
  title: 'MailPlus — Australian Courier & Parcel Delivery for Small Business',
  description:
    "MailPlus is an Australian courier and parcel delivery network founded in 1997, with approximately 300 vehicles. Express delivery in 1–2 business days, flat-rate pricing up to 5kg, same-day pickup, and Post Office collect & lodge.",
  alternates: { canonical: 'https://mailplus.com.au' },
}

const homeFaqs = [
  {
    question: 'Are there any hidden fuel surcharges or residential fees?',
    answer: 'No. MailPlus operates on a strictly flat-rate basis up to 5kg. The price you are quoted is the exact price you pay, regardless of whether the delivery is to a residential address or a business address.'
  },
  {
    question: 'How do the 5 free collections work?',
    answer: 'When you enquire, your local MailPlus operator will contact you to set up your account. Your first 5 collections are completely free, with no credit card required and no obligation to continue. It allows you to trial our express delivery and Post Office solutions risk-free.'
  },
  {
    question: 'Do you really go to the Post Office for me?',
    answer: 'Yes. As part of our Post Office Collect & Lodge service, we collect your mail from the PO Box in the morning and deliver it to your office. In the afternoon, we collect your outbound mail and parcels and lodge them directly at the Post Office for you.'
  },
  {
    question: 'Does ShipMate integrate with my online store?',
    answer: 'ShipMate integrates directly with Shopify and WooCommerce, automatically importing your orders and syncing tracking data back to your store. For custom setups, we provide a full API and bulk CSV upload options.'
  }
]

export default function HomePage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqs.map(faq => ({
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

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-eyebrow">Common Questions</div>
            <h2>Got questions? <span className="hl">We&apos;ve got answers.</span></h2>
          </div>

          <div className="faq-list">
            {homeFaqs.map((faq, idx) => (
              <details key={idx} className="faq-item group">
                <summary className="faq-q">
                  <span>{faq.question}</span>
                  <div className="faq-toggle">+</div>
                </summary>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ReviewsCtaSection />
    </>
  )
}
