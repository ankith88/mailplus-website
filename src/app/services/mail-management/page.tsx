import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/content/services'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildServiceSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'Mail Management Sydney | Mailroom Outsourcing | MailPlus',
  description: 'Outsource your Sydney business mailroom to MailPlus. Digital scanning, secure forwarding, PO box address. From $89/month. Waterloo NSW depot.',
  alternates: { canonical: 'https://mailplus.com.au/services/mail-management' },
}

export default function MailManagementPage() {
  const service = getServiceBySlug('mail-management')
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
    { name: 'Mail Management', url: 'https://mailplus.com.au/services/mail-management' },
  ])

  return (
    <>
      <SchemaScript schema={serviceSchema} />
      <SchemaScript schema={faqSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      <MailManagementContent service={service} />
    </>
  )
}

function MailManagementContent({ service }: { service: ReturnType<typeof getServiceBySlug> }) {
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
            <span className="italic text-earth-400"> for Sydney Business</span>
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
              Start Free Trial — From ${service.startingPrice}
            </Link>
            <a
              href="tel:+61290000001"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-earth-200 font-medium hover:text-amber-400 transition-colors"
            >
              📞 +61 2 9000 0001
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
            Everything Your Mailroom{' '}
            <span className="gradient-text italic">Needs to Run Itself</span>
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

      {/* Pricing tiers */}
      <section className="py-16 px-6 bg-earth-950" aria-labelledby="pricing-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="pricing-heading"
            className="text-3xl md:text-4xl font-medium text-earth-100 mb-10"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                plan: 'Starter',
                price: '$89',
                period: '/month',
                items: '50 items/month',
                features: ['Digital scan & portal access', 'PO box address (Waterloo NSW 2017)', '90-day physical storage', 'Email notifications'],
                highlight: false,
              },
              {
                plan: 'Business',
                price: '$199',
                period: '/month',
                items: '200 items/month',
                features: ['Everything in Starter', 'Weekly physical forwarding', 'Multi-staff portal access', 'AI-assisted smart sorting', 'API access'],
                highlight: true,
              },
              {
                plan: 'Enterprise',
                price: 'Custom',
                period: '',
                items: '500+ items/month',
                features: ['Everything in Business', 'Dedicated account manager', 'Same-day scanning SLA', 'Secure destruction with certificate', 'Custom integrations'],
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.plan}
                className={`rounded-2xl p-6 border ${tier.highlight ? 'border-amber-500/50 bg-amber-500/5 glass' : 'glass border-earth-700'}`}
              >
                {tier.highlight && (
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-earth-100 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {tier.plan}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-bold ${tier.highlight ? 'text-amber-400' : 'text-earth-200'}`}>{tier.price}</span>
                  <span className="text-earth-500 text-sm">{tier.period}</span>
                </div>
                <p className="text-earth-500 text-sm mb-5">{tier.items}</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-earth-400">
                      <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
            Reclaim Your Mailroom Time
          </h2>
          <p className="text-earth-400 mb-8">
            No lock-in contract. 14-day free trial for new accounts. Setup in under 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </>
  )
}
