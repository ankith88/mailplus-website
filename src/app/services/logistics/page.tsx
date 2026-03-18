import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/content/services'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildServiceSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'Logistics & Warehousing Sydney | 3PL Alexandria | MailPlus',
  description: '3PL warehousing and B2B distribution from MailPlus Alexandria, Sydney. Pick-and-pack, e-commerce fulfilment, cold chain. From $28/pallet/month.',
  alternates: { canonical: 'https://mailplus.com.au/services/logistics' },
}

export default function LogisticsPage() {
  const service = getServiceBySlug('logistics')
  if (!service) return notFound()

  const serviceSchema = buildServiceSchema({
    slug: service.slug,
    name: service.name,
    description: service.bluf,
    serviceType: service.schemaServiceType,
    startingPrice: service.startingPrice,
    currency: 'AUD',
  })
  const faqSchema = buildFAQSchema(service.faqs)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://mailplus.com.au' },
    { name: 'Services', url: 'https://mailplus.com.au/services' },
    { name: 'Logistics & Warehousing', url: 'https://mailplus.com.au/services/logistics' },
  ])

  return (
    <>
      <SchemaScript schema={serviceSchema} />
      <SchemaScript schema={faqSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      <LogisticsContent service={service} />
    </>
  )
}

function LogisticsContent({ service }: { service: ReturnType<typeof getServiceBySlug> }) {
  if (!service) return null

  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-20 px-6 bg-earth-950 relative overflow-hidden">
        <div className="organic-blob absolute w-[500px] h-[500px] -top-40 -right-40 opacity-[0.1]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-earth-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li className="text-earth-700">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li className="text-earth-700">/</li>
              <li className="text-earth-400">{service.name}</li>
            </ol>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full glass border border-amber-400/20 text-xs font-medium text-amber-400 uppercase tracking-widest mb-6">
            {service.deliveryTime}
          </span>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-earth-100 mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {service.name}
            <span className="italic text-earth-400"> — Alexandria, Sydney</span>
          </h1>

          {/* BLUF — Bottom Line Up Front for GEO */}
          <div className="max-w-3xl p-6 rounded-2xl glass border border-earth-700 mb-8">
            <p className="text-lg text-earth-200 leading-relaxed">{service.bluf}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold text-base hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
            >
              Get a Quote — From ${service.startingPrice}/pallet
            </Link>
            <a
              href="tel:+61290000002"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-earth-200 font-medium hover:text-amber-400 transition-colors"
            >
              📞 +61 2 9000 0002
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-20 px-6 bg-earth-900" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-medium text-earth-100 mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A Complete 3PL Solution,{' '}
            <span className="gradient-text italic">4km from Sydney CBD</span>
          </h2>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature) => (
              <li
                key={feature.title}
                className="glass rounded-2xl border border-earth-700 p-6 hover:border-amber-500/30 transition-colors"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3
                  className="text-lg font-semibold text-earth-200 mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-earth-400 text-sm leading-relaxed">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing breakdown */}
      <section className="py-16 px-6 bg-earth-950" aria-labelledby="pricing-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="pricing-heading"
            className="text-3xl font-medium text-earth-100 mb-10"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Transparent 3PL Pricing
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Ambient Storage', price: '$28', unit: 'per pallet/month' },
              { label: 'Cold-Chain Storage', price: '$45', unit: 'per pallet/month' },
              { label: 'Inbound Receival', price: '$15', unit: 'per pallet' },
              { label: 'Pick & Pack', price: '$1.20', unit: 'per order + $0.30/item' },
              { label: 'B2B Distribution (Sydney)', price: 'From $8.50', unit: 'per consignment' },
              { label: 'Kitting & Assembly', price: 'Custom', unit: 'quoted per project' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl border border-earth-700 p-5">
                <p className="text-earth-400 text-sm mb-2">{item.label}</p>
                <p className="text-earth-100 text-xl font-semibold">{item.price}</p>
                <p className="text-earth-600 text-xs mt-1">{item.unit}</p>
              </div>
            ))}
          </div>
          <p className="text-earth-500 text-xs mt-4">
            Volume discounts apply from 50 pallets/month. All prices exclude GST. No minimum contract.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-earth-900" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-medium text-earth-100 mb-10 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="glass rounded-2xl border border-earth-700 group"
              >
                <summary className="flex items-center justify-between p-6 text-earth-200 font-medium cursor-pointer hover:text-amber-400 transition-colors list-none">
                  <span>{faq.question}</span>
                  <svg
                    className="faq-chevron w-5 h-5 flex-none text-earth-500 transition-transform duration-300 ml-4"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-earth-400 leading-relaxed text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-earth-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-medium text-earth-100 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tour Our Alexandria Warehouse
          </h2>
          <p className="text-earth-400 mb-8">
            No lock-in contracts. We integrate with your existing platform in 5–10 days. Talk to our operations team today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
          >
            Request a 3PL Quote
          </Link>
        </div>
      </section>
    </>
  )
}
