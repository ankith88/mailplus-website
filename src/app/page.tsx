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

const homeFaqs = [
  {
    question: 'What does MailPlus do?',
    answer: 'MailPlus is an Australian courier network for small business, founded in 1997, with around 300 vehicles on the road across all metro areas and regional hubs. We do three things: express parcel delivery in 1–2 days Australia-wide, Post Office collect & lodge so you never queue, and same-day local hand-to-hand delivery — all from one trusted local driver.'
  },
  {
    question: 'How much does MailPlus cost?',
    answer: "Express parcels are flat-rate for anything up to 5kg, so your shipping costs stay predictable with no surprise bills. There's no lock-in contract, and no minimum volume — you only pay for what you send. New businesses can also start with five free collections, with no card required."
  },
  {
    question: 'Can MailPlus handle my Post Office run?',
    answer: "Yes — that's one of the things we're known for. Your local owner-operator collects your parcels and mail, lodges them at the Post Office for you, and clears your business PO Boxes, all same-day. Your team never has to queue or leave the office, which is ideal for busy multi-site and corporate operations."
  },
  {
    question: 'How fast can MailPlus deliver across Australia?',
    answer: 'MailPlus delivers parcels in 1–2 business days anywhere in Australia, with 95% of shipments arriving overnight on business days — collected in Sydney today, in Perth tomorrow. Book same-day collection with your local owner-operator before the daily cut-off, or set up a scheduled service so your regular pickups just happen without you having to book each time.'
  },
  {
    question: 'Does MailPlus work with Shopify and my online store?',
    answer: 'Yes. Our free shipping platform, ShipMate, plugs straight into Shopify and WooCommerce — orders sync automatically, labels print in a few clicks, and tracking updates in real time. Prefer to build your own setup? The MailPlus API connects your systems directly for automated bookings, labels and tracking at scale.'
  },
  {
    question: 'How are the 5 free collections free?',
    answer: "We'd rather show you than tell you. Businesses that send with Australia Post get five collections completely free — your local owner-operator picks up your parcels and mail and lodges them at the Post Office on your own Aus Post account, so your rates and tracking don't change. No credit card and no obligation — it's the simplest way to see how much time the service saves before you commit."
  },
  {
    question: 'Why choose MailPlus over Australia Post?',
    answer: "You get a dedicated local owner-operator who comes to you and knows your business — not a depot drop-off or a different contract driver with no stake in your service. Flat-rate pricing keeps costs predictable, and a local Aussie support team answers fast — no hold times, no bots. And if you send with Australia Post, nothing changes: we collect and lodge on your own account, working alongside the Post Office rather than replacing it."
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
      <FaqSection faqs={homeFaqs} />
      <ReviewsCtaSection />
    </>
  )
}
