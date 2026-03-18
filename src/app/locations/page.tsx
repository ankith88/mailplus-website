import type { Metadata } from 'next'
import Link from 'next/link'
import { locations } from '@/content/locations'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildBreadcrumbSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'Our Sydney Locations | MailPlus Depots',
  description: 'MailPlus operates two Sydney depots — Waterloo (inner city) and Alexandria (logistics hub). Find addresses, hours and services for each location.',
  alternates: { canonical: 'https://mailplus.com.au/locations' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://mailplus.com.au/#organization',
  name: 'MailPlus',
  url: 'https://mailplus.com.au',
  numberOfLocations: 2,
  location: locations.map((loc) => ({
    '@type': 'Place',
    name: loc.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.streetAddress,
      addressLocality: loc.suburb,
      addressRegion: loc.state,
      postalCode: loc.postcode,
      addressCountry: 'AU',
    },
    telephone: loc.phone,
    url: `https://mailplus.com.au/locations/${loc.slug}`,
  })),
}

export default function LocationsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://mailplus.com.au' },
    { name: 'Locations', url: 'https://mailplus.com.au/locations' },
  ])

  return (
    <>
      <SchemaScript schema={organizationSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 bg-earth-950 relative overflow-hidden">
        <div className="organic-blob absolute w-[500px] h-[500px] -top-40 -right-40 opacity-[0.1]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-earth-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li className="text-earth-700">/</li>
              <li className="text-earth-400">Locations</li>
            </ol>
          </nav>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-earth-100 mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our Sydney
            <span className="gradient-text italic"> Locations</span>
          </h1>

          <div className="max-w-3xl p-6 rounded-2xl glass border border-earth-700 mb-8">
            <p className="text-lg text-earth-200 leading-relaxed">
              MailPlus operates two Sydney depots — our Waterloo head office handles courier and mail management for the inner city, while our Alexandria hub manages logistics, warehousing, and B2B distribution. Both locations offer drop-off, pickup booking, and over-the-counter parcel lodgement.
            </p>
          </div>
        </div>
      </div>

      {/* Location cards */}
      <section className="py-20 px-6 bg-earth-900" aria-labelledby="locations-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="locations-heading"
            className="text-3xl md:text-4xl font-medium text-earth-100 mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Find a MailPlus Depot
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <article
                key={location.slug}
                className="glass rounded-2xl border border-earth-700 p-8 hover:border-amber-500/30 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2
                      className="text-2xl font-semibold text-earth-100 mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {location.name}
                    </h2>
                    {location.isHeadOffice && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium uppercase tracking-wider">
                        Head Office
                      </span>
                    )}
                  </div>
                  <span className="text-3xl" aria-hidden="true">
                    {location.isHeadOffice ? '🏢' : '🏭'}
                  </span>
                </div>

                <address className="not-italic mb-5">
                  <p className="text-earth-300 font-medium">
                    {location.streetAddress}, {location.suburb} {location.state} {location.postcode}
                  </p>
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="text-earth-400 text-sm hover:text-amber-400 transition-colors mt-1 block"
                  >
                    {location.phone}
                  </a>
                  <a
                    href={`mailto:${location.email}`}
                    className="text-earth-400 text-sm hover:text-amber-400 transition-colors block"
                  >
                    {location.email}
                  </a>
                </address>

                <div className="mb-5">
                  <h3 className="text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Opening Hours</h3>
                  <ul className="space-y-1">
                    {location.hours.map((h) => (
                      <li key={h.day} className="flex justify-between text-sm">
                        <span className="text-earth-400">{h.day}</span>
                        <span className={h.hours === 'Closed' ? 'text-earth-600' : 'text-earth-200'}>{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Services Available</h3>
                  <ul className="flex flex-wrap gap-2">
                    {location.services.map((svc) => (
                      <li
                        key={svc}
                        className="px-3 py-1 rounded-full glass border border-earth-700 text-xs text-earth-400"
                      >
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex gap-3">
                  <Link
                    href={`/locations/${location.slug}`}
                    className="flex-1 text-center px-5 py-3 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold text-sm hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
                  >
                    View Location
                  </Link>
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-5 py-3 rounded-full glass border border-earth-700 text-earth-300 font-medium text-sm hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </article>
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
            Not Sure Which Depot?
          </h2>
          <p className="text-earth-400 mb-8">
            For courier and mail management, use Waterloo. For freight, B2B distribution or warehousing, contact Alexandria. Our team can route you to the right location.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
