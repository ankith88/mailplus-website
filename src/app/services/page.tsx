import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/content/services'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildServiceSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'Courier & Logistics Services | MailPlus Sydney',
  description: 'Same-day courier, parcel delivery, mail management and 3PL logistics in Sydney. Compare MailPlus services and pricing.',
  alternates: { canonical: 'https://mailplus.com.au/services' },
}

export default function ServicesPage() {
  const schemas = services.map((s) =>
    buildServiceSchema({
      slug: s.slug,
      name: s.name,
      description: s.bluf,
      serviceType: s.schemaServiceType,
      startingPrice: s.startingPrice,
      currency: s.priceUnit.includes('/') ? 'AUD' : s.priceUnit,
    })
  )

  return (
    <>
      {schemas.map((schema, i) => (
        <SchemaScript key={i} schema={schema} />
      ))}

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 bg-earth-950 relative overflow-hidden">
        <div className="organic-blob absolute w-96 h-96 -top-20 -right-20 opacity-[0.08]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-earth-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li className="text-earth-700">/</li>
              <li className="text-earth-400">Services</li>
            </ol>
          </nav>
          <h1
            className="text-5xl md:text-6xl font-medium text-earth-100 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our <span className="gradient-text italic">Services</span>
          </h1>
          <p className="text-xl text-earth-400 max-w-2xl">
            Four specialist logistics services from Sydney's most trusted courier and mail management partner.
            Transparent pricing, real-time tracking, guaranteed delivery.
          </p>
        </div>
      </div>

      {/* Services list */}
      <div className="py-16 px-6 bg-earth-900">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((service) => (
            <article
              key={service.slug}
              className="glass rounded-2xl border border-earth-700 hover:border-amber-500/30 transition-colors overflow-hidden group"
            >
              <Link href={`/services/${service.slug}`} className="block p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium tracking-widest text-amber-400 uppercase">
                        {service.deliveryTime}
                      </span>
                    </div>
                    <h2
                      className="text-2xl md:text-3xl font-semibold text-earth-100 mb-3 group-hover:text-amber-400 transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {service.name}
                    </h2>
                    {/* BLUF */}
                    <p className="text-earth-300 leading-relaxed mb-5 max-w-3xl">{service.bluf}</p>
                    <ul className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((f) => (
                        <li key={f.title} className="px-3 py-1 rounded-full glass text-xs text-earth-400 border border-earth-700">
                          {f.icon} {f.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4 flex-none">
                    <div className="text-right">
                      <p className="text-3xl font-semibold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
                        From ${service.startingPrice}
                      </p>
                      <p className="text-xs text-earth-500 mt-1">{service.priceUnit}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-semibold text-sm">
                      View Service
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
