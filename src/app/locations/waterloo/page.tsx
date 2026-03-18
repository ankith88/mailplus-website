import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocationBySlug } from '@/content/locations'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'MailPlus Waterloo | Courier & Parcel Depot Sydney | NSW 2017',
  description: 'MailPlus Waterloo depot at 45 Botany Road, NSW 2017. Same-day courier, parcel delivery and mail management. Open Mon–Fri 7am–7pm, Sat 8am–2pm.',
  alternates: { canonical: 'https://mailplus.com.au/locations/waterloo' },
}

const waterlooFaqs = [
  {
    question: 'What services are available at MailPlus Waterloo?',
    answer: 'MailPlus Waterloo offers same-day courier dispatch, over-the-counter parcel lodgement for interstate delivery, and full mail management (digital scanning, forwarding, PO box address). It is our head office and primary dispatch depot for the Sydney inner city and eastern suburbs.',
  },
  {
    question: 'Where is MailPlus Waterloo located?',
    answer: 'MailPlus Waterloo is at 45 Botany Road, Waterloo NSW 2017 — approximately 3km south of Sydney CBD. The depot is accessible via bus routes along Botany Road and is 1.2km from Green Square Station.',
  },
  {
    question: 'What are the opening hours for MailPlus Waterloo?',
    answer: 'The Waterloo depot is open Monday to Friday from 7:00 AM to 7:00 PM and Saturday from 8:00 AM to 2:00 PM. We are closed Sundays and public holidays. After-hours parcel lodgement is available via a secure drop box at the entrance.',
  },
  {
    question: 'Can I drop off a parcel at MailPlus Waterloo without booking?',
    answer: 'Yes — walk-in parcel lodgement is available during opening hours. Bring your parcel and the destination address. Our counter staff will weigh, measure, label, and book the consignment on the spot. Cash, card, and account payments are accepted.',
  },
  {
    question: 'Does MailPlus Waterloo handle medical and legal document couriers?',
    answer: 'Yes. Our Waterloo depot has a dedicated Medical & Legal courier track with trained handlers, chain-of-custody documentation, and priority dispatch. Accounts for law firms, pathology labs, and healthcare providers are set up with a one-time application.',
  },
]

export default function WaterlooPage() {
  const location = getLocationBySlug('waterloo')
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
  const faqSchema = buildFAQSchema(waterlooFaqs)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://mailplus.com.au' },
    { name: 'Locations', url: 'https://mailplus.com.au/locations' },
    { name: 'Waterloo', url: 'https://mailplus.com.au/locations/waterloo' },
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
              <li className="text-earth-400">Waterloo</li>
            </ol>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full glass border border-amber-400/20 text-xs font-medium text-amber-400 uppercase tracking-widest mb-6">
            Head Office · NSW 2017
          </span>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-earth-100 mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            MailPlus Waterloo —
            <span className="italic text-earth-400"> Courier &amp; Parcel Depot</span>
          </h1>

          {/* BLUF */}
          <div className="max-w-3xl p-6 rounded-2xl glass border border-earth-700 mb-8">
            <p className="text-lg text-earth-200 leading-relaxed">
              {location.description} It serves as the primary dispatch point for same-day courier runs into the CBD, Eastern Suburbs, and Inner West, and processes all mail management accounts from its secure Waterloo mailroom facility.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold text-base hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
            >
              Book a Pickup
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
              <span className="text-3xl mb-4 block" aria-hidden="true">📋</span>
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
                  Walk-in Counter Service
                </li>
                <li className="flex items-start gap-2 text-sm text-earth-400">
                  <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                  Account Setup &amp; Business Rates
                </li>
                <li className="flex items-start gap-2 text-sm text-earth-400">
                  <span className="text-moss-400 mt-0.5 flex-none">✓</span>
                  Medical &amp; Legal Courier Track
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="py-0 bg-earth-950" aria-label="Map of MailPlus Waterloo">
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-2xl overflow-hidden border border-earth-700 h-80">
            <iframe
              title="MailPlus Waterloo on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.4!2d151.207!3d-33.8988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z45+Botany+Road+Waterloo+NSW+2017!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
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
            {waterlooFaqs.map((faq) => (
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
            Visit or Book From Waterloo
          </h2>
          <p className="text-earth-400 mb-8">
            Drop in during opening hours or book a pickup online. No account required for one-off consignments.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
            >
              Book Online
            </Link>
            <Link
              href="/locations/alexandria"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-earth-700 text-earth-300 font-medium hover:text-amber-400 hover:border-amber-500/30 transition-colors"
            >
              See Alexandria Depot →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
