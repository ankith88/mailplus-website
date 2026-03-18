import type { Metadata } from 'next'
import Link from 'next/link'
import { locations } from '@/content/locations'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/schema/entity-graph'

export const metadata: Metadata = {
  title: 'Contact MailPlus Sydney | Courier & Logistics Enquiries',
  description: 'Contact MailPlus Sydney for courier bookings, parcel delivery, warehousing enquiries and mail management. Call +61 2 9000 0001 (Waterloo) or +61 2 9000 0002 (Alexandria).',
  alternates: { canonical: 'https://mailplus.com.au/contact' },
}

export default function ContactPage() {
  const waterlooLocation = locations.find((l) => l.slug === 'waterloo')!
  const alexandriaLocation = locations.find((l) => l.slug === 'alexandria')!

  const waterlooSchema = buildLocalBusinessSchema({
    id: waterlooLocation.slug,
    name: waterlooLocation.name,
    streetAddress: waterlooLocation.streetAddress,
    suburb: waterlooLocation.suburb,
    state: waterlooLocation.state,
    postcode: waterlooLocation.postcode,
    lat: waterlooLocation.latitude,
    lng: waterlooLocation.longitude,
    phone: waterlooLocation.phone,
    email: waterlooLocation.email,
    hours: waterlooLocation.hours,
    googleMapsUrl: waterlooLocation.googleMapsUrl,
  })

  const alexandriaSchema = buildLocalBusinessSchema({
    id: alexandriaLocation.slug,
    name: alexandriaLocation.name,
    streetAddress: alexandriaLocation.streetAddress,
    suburb: alexandriaLocation.suburb,
    state: alexandriaLocation.state,
    postcode: alexandriaLocation.postcode,
    lat: alexandriaLocation.latitude,
    lng: alexandriaLocation.longitude,
    phone: alexandriaLocation.phone,
    email: alexandriaLocation.email,
    hours: alexandriaLocation.hours,
    googleMapsUrl: alexandriaLocation.googleMapsUrl,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://mailplus.com.au' },
    { name: 'Contact', url: 'https://mailplus.com.au/contact' },
  ])

  return (
    <>
      <SchemaScript schema={waterlooSchema} />
      <SchemaScript schema={alexandriaSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 bg-earth-950 relative overflow-hidden">
        <div className="organic-blob absolute w-[500px] h-[500px] -top-40 -right-40 opacity-[0.1]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-earth-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li className="text-earth-700">/</li>
              <li className="text-earth-400">Contact</li>
            </ol>
          </nav>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-earth-100 mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Contact MailPlus
            <span className="italic text-earth-400"> Sydney</span>
          </h1>

          {/* BLUF */}
          <div className="max-w-3xl p-6 rounded-2xl glass border border-earth-700 mb-8">
            <p className="text-lg text-earth-200 leading-relaxed">
              For bookings and general enquiries, call our Waterloo head office on{' '}
              <a href="tel:+61290000001" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                +61 2 9000 0001
              </a>{' '}
              (Mon–Fri 7 AM–7 PM, Sat 8 AM–2 PM). For logistics and warehousing, call Alexandria on{' '}
              <a href="tel:+61290000002" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                +61 2 9000 0002
              </a>{' '}
              (Mon–Fri 6 AM–8 PM, Sat 7 AM–3 PM). Use the form below for non-urgent enquiries and we will respond within 2 business hours.
            </p>
          </div>
        </div>
      </div>

      {/* Location contact cards */}
      <section className="py-20 px-6 bg-earth-900" aria-labelledby="depots-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="depots-heading"
            className="text-3xl font-medium text-earth-100 mb-10"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our Depots
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[waterlooLocation, alexandriaLocation].map((loc) => (
              <div key={loc.slug} className="glass rounded-2xl border border-earth-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl font-semibold text-earth-100 mb-0.5"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {loc.name}
                    </h3>
                    {loc.isHeadOffice && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium uppercase tracking-wider">
                        Head Office
                      </span>
                    )}
                  </div>
                  <span className="text-2xl" aria-hidden="true">{loc.isHeadOffice ? '🏢' : '🏭'}</span>
                </div>

                <address className="not-italic mb-4 text-sm">
                  <p className="text-earth-300 font-medium">
                    {loc.streetAddress}, {loc.suburb} {loc.state} {loc.postcode}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p>
                      <a
                        href={`tel:${loc.phone.replace(/\s/g, '')}`}
                        className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
                      >
                        {loc.phone}
                      </a>
                    </p>
                    <p>
                      <a href={`mailto:${loc.email}`} className="text-earth-400 hover:text-amber-400 transition-colors">
                        {loc.email}
                      </a>
                    </p>
                  </div>
                </address>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Opening Hours</p>
                  <table className="w-full text-xs">
                    <tbody>
                      {loc.hours.map((h) => (
                        <tr key={h.day} className="border-b border-earth-800 last:border-0">
                          <td className="py-1 text-earth-400 pr-4">{h.day}</td>
                          <td className={`py-1 text-right ${h.hours === 'Closed' ? 'text-earth-600' : 'text-earth-300'}`}>
                            {h.hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-3 mt-4">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2.5 rounded-full glass border border-earth-700 text-earth-300 font-medium text-sm hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                  >
                    Get Directions
                  </a>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="flex-1 text-center px-4 py-2.5 rounded-full glass border border-earth-700 text-earth-300 font-medium text-sm hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                  >
                    Location Page →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-earth-950" aria-labelledby="form-heading">
        <div className="max-w-2xl mx-auto">
          <h2
            id="form-heading"
            className="text-3xl font-medium text-earth-100 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Send Us a Message
          </h2>
          <p className="text-earth-400 mb-8 text-sm">
            We respond to all enquiries within 2 business hours. For urgent bookings, please call your nearest depot directly.
          </p>

          <form
            action="/api/contact"
            method="POST"
            className="space-y-5"
            aria-label="Contact MailPlus"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-earth-400 mb-1.5">
                  Full Name <span className="text-amber-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className="w-full rounded-xl glass border border-earth-700 bg-transparent px-4 py-3 text-earth-200 placeholder:text-earth-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-earth-400 mb-1.5">
                  Email Address <span className="text-amber-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@company.com.au"
                  className="w-full rounded-xl glass border border-earth-700 bg-transparent px-4 py-3 text-earth-200 placeholder:text-earth-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-earth-400 mb-1.5">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+61 4XX XXX XXX"
                className="w-full rounded-xl glass border border-earth-700 bg-transparent px-4 py-3 text-earth-200 placeholder:text-earth-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-earth-400 mb-1.5">
                Service Enquiry <span className="text-amber-500" aria-hidden="true">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full rounded-xl glass border border-earth-700 bg-earth-900 px-4 py-3 text-earth-200 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors text-sm appearance-none"
              >
                <option value="" disabled>Select a service…</option>
                <option value="same-day-courier">Same-Day Courier</option>
                <option value="parcel-delivery">Parcel Delivery</option>
                <option value="mail-management">Mail Management</option>
                <option value="logistics-warehousing">Logistics &amp; Warehousing</option>
                <option value="business-account">Business Account Setup</option>
                <option value="other">Other Enquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-earth-400 mb-1.5">
                Message <span className="text-amber-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your delivery needs, volume, preferred locations, or any specific requirements…"
                className="w-full rounded-xl glass border border-earth-700 bg-transparent px-4 py-3 text-earth-200 placeholder:text-earth-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold text-base hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
            >
              Send Message
            </button>

            <p className="text-earth-600 text-xs">
              By submitting this form you agree to MailPlus contacting you about your enquiry. Your details are not shared with third parties. See our{' '}
              <Link href="/privacy" className="text-earth-500 hover:text-amber-400 transition-colors underline">
                Privacy Policy
              </Link>.
            </p>
          </form>
        </div>
      </section>

      {/* Operating hours summary */}
      <section className="py-16 px-6 bg-earth-900" aria-labelledby="hours-heading">
        <div className="max-w-3xl mx-auto">
          <h2
            id="hours-heading"
            className="text-2xl font-medium text-earth-100 mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Operating Hours at a Glance
          </h2>

          <div className="glass rounded-2xl border border-earth-700 divide-y divide-earth-800 overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-3 text-xs font-semibold text-earth-500 uppercase tracking-wider">
              <span>Day</span>
              <span className="text-center">Waterloo (Courier &amp; Mail)</span>
              <span className="text-right">Alexandria (Logistics)</span>
            </div>
            {waterlooLocation.hours.map((h, i) => (
              <div key={h.day} className="grid grid-cols-3 px-6 py-3 text-sm">
                <span className="text-earth-400">{h.day}</span>
                <span className={`text-center ${h.hours === 'Closed' ? 'text-earth-600' : 'text-earth-200'}`}>
                  {h.hours}
                </span>
                <span className={`text-right ${alexandriaLocation.hours[i]?.hours === 'Closed' ? 'text-earth-600' : 'text-earth-200'}`}>
                  {alexandriaLocation.hours[i]?.hours ?? 'Closed'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-earth-600 text-xs mt-4">
            After-hours parcel drop box available at both locations. After-hours courier pickups available with 2-hour advance notice, no surcharge before 9 PM.
          </p>
        </div>
      </section>

      {/* Services quick links */}
      <section className="py-16 px-6 bg-earth-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-medium text-earth-100 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Not Sure Which Service You Need?
          </h2>
          <p className="text-earth-400 mb-8 text-sm">
            Browse our service pages for pricing and details, or call us and we will recommend the right solution.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: '/services/courier', label: 'Same-Day Courier' },
              { href: '/services/parcel-delivery', label: 'Parcel Delivery' },
              { href: '/services/mail-management', label: 'Mail Management' },
              { href: '/services/logistics', label: 'Logistics & Warehousing' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-5 py-2.5 rounded-full glass border border-earth-700 text-earth-300 font-medium text-sm hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
