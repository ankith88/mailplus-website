import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocationBySlug } from '@/content/locations'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'MailPlus Alexandria | Warehouse & Logistics Hub Sydney | NSW 2015',
  description: 'MailPlus Alexandria at 12 Wyndham Street, NSW 2015. 3PL warehousing, logistics and parcel depot. Open Mon–Fri 6am–8pm, Sat 7am–3pm.',
  alternates: { canonical: 'https://mailplus.com.au/locations/alexandria' },
}

const alexandriaFaqs = [
  {
    question: 'What services are available at MailPlus Alexandria?',
    answer: 'MailPlus Alexandria is our operations and logistics hub. It offers 3PL contract warehousing (ambient and cold-chain), pick-and-pack fulfilment, B2B last-mile distribution across NSW, parcel drop-off and lodgement, and same-day courier dispatch for the southern suburbs.',
  },
  {
    question: 'Where is MailPlus Alexandria located?',
    answer: 'MailPlus Alexandria is at 12 Wyndham Street, Alexandria NSW 2015 — 4km from Sydney CBD with direct access to the M5 Motorway and 6km from Port Botany. The site includes a loading dock suitable for semi-trailers and rigid trucks.',
  },
  {
    question: 'What are the opening hours for MailPlus Alexandria?',
    answer: 'The Alexandria depot is open Monday to Friday from 6:00 AM to 8:00 PM and Saturday from 7:00 AM to 3:00 PM. Extended hours reflect its role as a logistics hub. The facility is closed Sundays and public holidays, though scheduled freight deliveries can be arranged by prior appointment.',
  },
  {
    question: 'Does MailPlus Alexandria have cold-chain storage?',
    answer: 'Yes. Our Alexandria facility includes a 500 sqm cold-chain zone maintained at 2–8°C, suitable for pharmaceutical, food, and temperature-sensitive products. We hold TGA certification for pharmaceutical distribution and provide full GDP documentation for all cold-chain movements.',
  },
  {
    question: 'How close is MailPlus Alexandria to Port Botany?',
    answer: 'MailPlus Alexandria is approximately 6km from Port Botany container terminals, making it an efficient first-mile and last-mile hub for imported and exported freight. We coordinate container receival and unpacking with direct cartage from the port.',
  },
]

export default function AlexandriaPage() {
  const location = getLocationBySlug('alexandria')
  if (!location) return notFound()

  const localBusinessSchema = buildLocalBusinessSchema({
    id: location.slug,
    name: location.name,
    streetAddress: location.streetAddress,
    suburb: location.suburb,
    state: location.state,
    postcode: location.postcode,
    lat: location.latitude,
    lng: location.longitude,
    phone: location.phone,
    email: location.email,
    hours: location.hours,
    googleMapsUrl: location.googleMapsUrl,
  })
  const faqSchema = buildFAQSchema(alexandriaFaqs)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://mailplus.com.au' },
    { name: 'Locations', url: 'https://mailplus.com.au/locations' },
    { name: 'Alexandria', url: 'https://mailplus.com.au/locations/alexandria' },
  ])

  return (
    <>
      <SchemaScript schema={localBusinessSchema} />
      <SchemaScript schema={faqSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 bg-earth-950 relative overflow-hidden">
        <div className="organic-blob absolute w-[500px] h-[500px] -top-40 -right-40 opacity-[0.1]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-earth-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li className="text-earth-700">/</li>
              <li><Link href="/locations" className="hover:text-amber-400 transition-colors">Locations</Link></li>
              <li className="text-earth-700">/</li>
              <li className="text-earth-400">Alexandria</li>
            </ol>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full glass border border-amber-400/20 text-xs font-medium text-amber-400 uppercase tracking-widest mb-6">
            Operations Hub · NSW 2015
          </span>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-earth-100 mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            MailPlus Alexandria —
            <span className="italic text-earth-400"> Logistics Hub</span>
          </h1>

          {/* BLUF */}
          <div className="max-w-3xl p-6 rounded-2xl glass border border-earth-700 mb-8">
            <p className="text-lg text-earth-200 leading-relaxed">
              {location.description} Its proximity to Port Botany and the M5 Motorway makes it the natural choice for businesses needing efficient inbound freight, contract warehousing, and B2B distribution across NSW and beyond.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold text-base hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
            >
              Get a Logistics Quote
            </Link>
            <a
              href={`tel:${location.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-earth-200 font-medium hover:text-amber-400 transition-colors"
            >
              📞 {location.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <section className="py-20 px-6 bg-earth-900" aria-labelledby="details-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="details-heading"
            className="text-3xl md:text-4xl font-medium text-earth-100 mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Location Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Address */}
            <div className="glass rounded-2xl border border-earth-700 p-6">
              <span className="text-3xl mb-4 block" aria-hidden="true">📍</span>
              <h3 className="text-lg font-semibold text-earth-200 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Address
              </h3>
              <address className="not-italic text-earth-400 text-sm leading-relaxed">
                <p className="font-medium text-earth-300">{location.streetAddress}</p>
                <p>{location.suburb} {location.state} {location.postcode}</p>
                <p className="mt-2">
                  <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="hover:text-amber-400 transition-colors">
                    {location.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${location.email}`} className="hover:text-amber-400 transition-colors">
                    {location.email}
                  </a>
                </p>
              </address>
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* Hours */}
            <div className="glass rounded-2xl border border-earth-700 p-6">
              <span className="text-3xl mb-4 block" aria-hidden="true">🕐</span>
              <h3 className="text-lg font-semibold text-earth-200 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Opening Hours
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {location.hours.map((h) => (
                    <tr key={h.day} className="border-b border-earth-800 last:border-0">
                      <td className="py-1.5 text-earth-400 pr-4">{h.day}</td>
                      <td className={`py-1.5 text-right ${h.hours === 'Closed' ? 'text-earth-600' : 'text-earth-200'}`}>
                        {h.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Services */}
            <div className="glass rounded-2xl border border-earth-700 p-6">
              <span className="text-3xl mb-4 block" aria-hidden="true">🏭</span>
              <h3 className="text-lg font-semibold text-earth-200 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Services at This Location
              </h3>
              <ul className="space-y-2">
                {location.services.map((svc) => (
                  <li key={svc} className="flex items-start gap-2 text-sm text-earth-400">
                    <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                    {svc}
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm text-earth-400">
                  <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                  Cold-Chain Storage (2–8°C)
                </li>
                <li className="flex items-start gap-2 text-sm text-earth-400">
                  <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                  Container Receival from Port Botany
                </li>
                <li className="flex items-start gap-2 text-sm text-earth-400">
                  <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                  Loading Dock (Semi-trailer capable)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facility highlights */}
      <section className="py-16 px-6 bg-earth-950" aria-labelledby="facility-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="facility-heading"
            className="text-3xl font-medium text-earth-100 mb-10"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Facility Specifications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { stat: '3,000 sqm', label: 'Total Warehouse Area' },
              { stat: '500 sqm', label: 'Cold-Chain Zone (2–8°C)' },
              { stat: '4km', label: 'From Sydney CBD' },
              { stat: '6km', label: 'From Port Botany' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl border border-earth-700 p-5 text-center">
                <p className="text-3xl font-bold text-amber-400 mb-1">{item.stat}</p>
                <p className="text-earth-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="bg-earth-950" aria-label="Map of MailPlus Alexandria">
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-2xl overflow-hidden border border-earth-700 h-80">
            <iframe
              title="MailPlus Alexandria on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.1!2d151.195!3d-33.9050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z12+Wyndham+Street+Alexandria+NSW+2015!5e0!3m2!1sen!2sau!4v1700000000001!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
            {alexandriaFaqs.map((faq) => (
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
            Arrange a site visit with our operations team. We welcome prospective 3PL clients and freight partners.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
            >
              Request a Site Visit
            </Link>
            <Link
              href="/locations/waterloo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-earth-700 text-earth-300 font-medium hover:text-amber-400 hover:border-amber-500/30 transition-colors"
            >
              See Waterloo Depot →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
