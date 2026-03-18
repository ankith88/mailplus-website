const tiers = [
  {
    weight: 'Up to 1kg',
    label: 'Cubic or deadweight',
    description: 'Perfect for apparel, coffee, chocolate and more.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    weight: 'Up to 3kg',
    label: 'Cubic or deadweight',
    description: 'Great for bulkier orders like beauty and supplements.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    weight: 'Up to 5kg',
    label: 'Cubic or deadweight',
    description: 'Ideal for shoes and other bulkier items.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    weight: 'Up to 10kg',
    label: 'Cubic or deadweight',
    description: 'Wholesale orders or bulk shipments.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    weight: 'Up to 20kg',
    label: 'Cubic or deadweight',
    description: 'Wholesale orders or bulk shipments.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
  },
]

export function ExpressWeightTiers() {
  return (
    <section
      className="py-24 px-6"
      aria-labelledby="weight-tiers-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Pricing
          </span>
          <h2
            id="weight-tiers-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#095c7b' }}
          >
            Box &amp; Satchel Weight &amp;{' '}
            <span className="italic" style={{ color: '#103d39' }}>Dimensions</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(9,92,123,0.72)' }}
          >
            Ship items with express delivery from up to 1kg to up 20kg, perfect for small to
            medium sized items and wholesale.
          </p>
        </div>

        {/* First 3 tiers */}
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {tiers.slice(0, 3).map((tier) => (
            <TierCard key={tier.weight} tier={tier} />
          ))}
        </div>

        {/* Last 2 tiers — centred */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {tiers.slice(3).map((tier) => (
            <TierCard key={tier.weight} tier={tier} />
          ))}
        </div>

        <div className="text-center">
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            Enquire Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function TierCard({ tier }: { tier: typeof tiers[number] }) {
  return (
    <div
      className="rounded-2xl p-8 border text-center"
      style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.12)' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
      >
        {tier.icon}
      </div>
      <h3 className="text-xl font-bold mb-1" style={{ color: '#095c7b' }}>{tier.weight}</h3>
      <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: 'rgba(9,92,123,0.55)' }}>{tier.label}</p>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.72)' }}>{tier.description}</p>
    </div>
  )
}
