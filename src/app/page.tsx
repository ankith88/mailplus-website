import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { AdvantageSection } from '@/components/home/AdvantageSection'
import { ShipMateSection } from '@/components/home/ShipMateSection'
import { NetworkSection } from '@/components/home/NetworkSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { ReviewsCtaSection } from '@/components/home/ReviewsCtaSection'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildFAQSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'MailPlus | Fast & Stress-Free Shipping, Australia-wide',
  description:
    "MailPlus — Australia's most loved courier service. National flat-rate prices, Australia-wide express delivery in 1–2 days, seamless Shopify & API integrations. Free ShipMate platform. No contracts.",
  alternates: { canonical: 'https://mailplus.com.au' },
}

const homeFaqs = [
  {
    question: 'What services does MailPlus offer?',
    answer:
      'MailPlus offers express parcel delivery Australia-wide, Post Office lodge and collect solutions, same-day pick-ups, and a free shipping platform called ShipMate. ShipMate integrates with Shopify, supports bulk uploads, and provides access to premium delivery options at discounted rates.',
  },
  {
    question: 'How much does MailPlus shipping cost?',
    answer:
      'MailPlus offers national flat-rate prices for items up to 5kg — predictable rates with no surprises. Your free MailPlus account gives you enterprise-level shipping products at a discount, regardless of your volume. Get an instant quote on our website.',
  },
  {
    question: 'Is there a contract or minimum volume requirement?',
    answer:
      'No. Opening a MailPlus account is completely free with no strings attached. There are no contracts and no minimum volume requirements. You can cancel at any time.',
  },
  {
    question: 'Does MailPlus integrate with Shopify?',
    answer:
      'Yes. ShipMate, our free shipping platform, integrates directly with Shopify for seamless order management. You can also use our API for custom integrations or use the bulk upload and print function.',
  },
  {
    question: 'How does MailPlus handle Australia Post lodgement?',
    answer:
      'MailPlus can pick up and lodge your Australia Post mail and parcels on your behalf, saving you the trip to the post office. This service is available as part of our Post Office Solutions offering.',
  },
]

export default function HomePage() {
  const faqSchema = buildFAQSchema(homeFaqs)

  return (
    <>
      <SchemaScript schema={faqSchema} />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Who Are MailPlus? */}
      <AboutSection />

      {/* 3. What's the MailPlus Advantage? */}
      <AdvantageSection />

      {/* 4. ShipMate = Your Shipping Sidekick */}
      <ShipMateSection />

      {/* 5. Our Network Delivers 5-Star Service */}
      <NetworkSection />

      {/* 6. Hear it From Phillip – Goldelucks */}
      <TestimonialsSection />

      {/* 7. Not Your Average Courier / See Why Businesses Love Us */}
      <ReviewsCtaSection />

      {/* 8. FAQ */}
      <section
        className="py-24 px-6 relative"
        aria-labelledby="faq-home-heading"
        style={{ backgroundColor: '#DAE8DA' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold tracking-widest uppercase mb-3 block"
              style={{ color: '#095c7b' }}
            >
              FAQ
            </span>
            <h2
              id="faq-home-heading"
              className="text-4xl font-bold"
              style={{ color: '#095c7b' }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border group"
                style={{ backgroundColor: 'rgba(255,255,255,0.65)', borderColor: 'rgba(9,92,123,0.15)' }}
              >
                <summary
                  className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#103d39' }}
                >
                  <span>{faq.question}</span>
                  <svg
                    className="faq-chevron w-5 h-5 flex-none transition-transform duration-300 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: '#095c7b' }}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#103d39' }}>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
