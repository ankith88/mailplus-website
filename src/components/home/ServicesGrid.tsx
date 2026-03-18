import Link from 'next/link'
import { Card3D } from '@/components/shared/Card3D'

const serviceCards = [
  {
    slug: 'courier',
    icon: '⚡',
    name: 'Same-Day Courier',
    tagline: 'Sydney Delivered in Hours',
    description: 'Pickup in 60 minutes, delivery within 2–4 hours across the Sydney metro area. GPS tracked and insured.',
    price: 'From $15',
    color: 'from-amber-500/20 to-clay-600/20',
    border: 'border-amber-500/20',
    iconBg: 'from-amber-400 to-clay-500',
    badge: '2–4 hrs',
    // Each card gets a unique scroll-parallax speed and resting Z offset
    // so they appear to sit at different depths in the scene.
    parallaxSpeed: -0.022,   // px moved per scroll-y unit
    restingY: '0px',         // initial vertical offset (staggered feel)
  },
  {
    slug: 'parcel-delivery',
    icon: '📦',
    name: 'Parcel Delivery',
    tagline: 'Australia-Wide, Tracked',
    description: 'Next-day Sydney metro delivery and 2–5 day interstate. Barcoded and scanned at every hub.',
    price: 'From $8.50',
    color: 'from-moss-500/20 to-moss-800/20',
    border: 'border-moss-500/20',
    iconBg: 'from-moss-400 to-moss-600',
    badge: 'Next day',
    parallaxSpeed: -0.038,
    restingY: '12px',
  },
  {
    slug: 'mail-management',
    icon: '📬',
    name: 'Mail Management',
    tagline: 'Outsource Your Mailroom',
    description: 'Receive, scan, forward and archive your business mail from our Waterloo facility. Digital portal included.',
    price: 'From $89/mo',
    color: 'from-earth-600/30 to-earth-700/30',
    border: 'border-earth-500/30',
    iconBg: 'from-earth-300 to-earth-500',
    badge: 'Same-day scan',
    parallaxSpeed: -0.028,
    restingY: '6px',
  },
  {
    slug: 'logistics',
    icon: '🏭',
    name: 'Logistics & Warehousing',
    tagline: '3PL from Alexandria',
    description: '3,000 sqm warehouse in Alexandria. Pick-and-pack, e-commerce fulfilment, cold chain, B2B distribution.',
    price: 'From $28/pallet',
    color: 'from-clay-600/20 to-clay-700/20',
    border: 'border-clay-500/20',
    iconBg: 'from-clay-400 to-clay-600',
    badge: 'Same-day despatch',
    parallaxSpeed: -0.044,
    restingY: '18px',
  },
]

export function ServicesGrid() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="services-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-900 to-earth-950" />
      <div className="organic-blob-moss absolute w-80 h-80 right-0 top-20 opacity-[0.07]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3 block">
            The MailPlus Advantage
          </span>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-medium text-earth-100 mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What Does MailPlus{' '}
            <span className="gradient-text italic">Deliver?</span>
          </h2>
          <p className="text-earth-400 text-lg leading-relaxed">
            Four specialist services, one trusted partner. From a single urgent parcel to full
            supply-chain outsourcing — MailPlus has Sydney covered.
          </p>
        </div>

        {/*
          cards-3d-scene establishes a shared perspective frustum so all four cards
          exist in the same 3D coordinate space — their individual tilt effects look
          physically consistent with each other.
          No overflow:hidden here so tilted cards don't clip at the grid boundary.
        */}
        <div className="cards-3d-scene">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((card) => (
              /*
                Parallax wrapper — translates on the Y axis as the user scrolls.
                Each card has a unique speed (parallaxSpeed) so they drift at
                different rates, reinforcing the illusion of different Z depths.
                The resting translateY offset staggers the cards visually on load.
                All text content is inside normal DOM elements — crawlers are unaffected.
              */
              <div
                key={card.slug}
                style={{
                  transform: `translateY(calc(${card.restingY} + var(--scroll-y, 0) * ${card.parallaxSpeed}px))`,
                  willChange: 'transform',
                  transition: 'transform 0.1s linear',
                }}
              >
                <Card3D
                  className={`rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} overflow-hidden h-full`}
                >
                  <Link href={`/services/${card.slug}`} className="block p-6 h-full group">

                    {/*
                      Icon — floats at translateZ(30px), the highest depth layer.
                      This is the first element the eye is drawn to, so lifting it
                      forward creates a natural focal hierarchy.
                    */}
                    <div className="card-3d__depth-lg mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}
                        aria-hidden="true"
                      >
                        {card.icon}
                      </div>
                    </div>

                    {/*
                      Badge — floats at translateZ(20px), mid-layer.
                      Sits between icon and body text in Z space.
                    */}
                    <div className="card-3d__depth mb-3">
                      <span className="inline-block px-2 py-0.5 rounded-full glass text-xs font-medium text-earth-300">
                        {card.badge}
                      </span>
                    </div>

                    {/*
                      Body text — remains at translateZ(0), the card surface.
                      Normal flow ensures screen readers and crawlers read it plainly.
                    */}
                    <h3
                      className="text-lg font-semibold text-earth-100 mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {card.name}
                    </h3>
                    <p className="text-sm text-earth-400 leading-relaxed mb-5">
                      {card.description}
                    </p>

                    {/* Price + arrow — floats at translateZ(10px), subtle lift */}
                    <div className="card-3d__depth-sm flex items-center justify-between mt-auto">
                      <span className="text-sm font-semibold text-amber-400">{card.price}</span>
                      <span className="text-earth-500 group-hover:text-amber-400 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>

                  </Link>
                </Card3D>
              </div>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-earth-300 hover:text-amber-400 transition-colors font-medium"
          >
            View all services &amp; pricing
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
