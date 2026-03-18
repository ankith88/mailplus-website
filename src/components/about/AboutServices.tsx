import Link from 'next/link'

const services = [
  {
    href: '/services/express-delivery',
    label: 'MailPlus Express',
    desc: '1–2 day express delivery nationwide. Flat-rate prices. Guaranteed same-day pickups. No contracts.',
  },
  {
    href: '/services/post-office-solutions',
    label: 'Post Office Solutions',
    desc: 'We clear your PO Box and lodge all outgoing Australia Post parcels same-day. No more Post Office queues.',
  },
  {
    href: '/shipmate',
    label: 'ShipMate (Free Platform)',
    desc: 'Free shipping platform with Shopify integration, bulk label printing, and discounted carriers.',
  },
  {
    href: '/services/shopify-integration',
    label: 'Shopify Integration',
    desc: 'Automatic order sync, smart product weights, tag filtering, bulk label printing — all free.',
  },
  {
    href: '/services/mailplus-api',
    label: 'MailPlus API',
    desc: 'Automated label generation, live tracking, and biodegradable packaging for developers and 3PLs.',
  },
  {
    href: '/tracking',
    label: 'Parcel Tracking',
    desc: 'Real-time tracking from pickup to delivery. Proof of delivery. Automated customer notifications.',
  },
]

export function AboutServices() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="services-heading"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            What We Do
          </span>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#095c7b' }}
          >
            Everything your business needs{' '}
            <span className="italic" style={{ color: '#103d39' }}>to ship smarter.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Link
              key={svc.label}
              href={svc.href}
              className="group rounded-2xl p-6 block transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-sm" style={{ color: '#095c7b' }}>{svc.label}</p>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  style={{ color: '#095c7b' }}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>{svc.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
