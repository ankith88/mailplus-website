const reasons = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Guaranteed Same-Day Collections',
    body: 'No more waiting around. Our franchisees pick up your parcels the same day — or it&apos;s free.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'National Flat-Rate Pricing',
    body: 'Simple, transparent pricing on items up to 5kg and up to 20kg. No surprise surcharges.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '1–2 Day Express Delivery',
    body: 'Real express delivery across Australia. East coast to west coast overnight — you bet.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Free ShipMate Platform',
    body: 'Our free shipping platform with Shopify integration, bulk label printing, and discounted carriers — no subscription fees.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Real Human Support',
    body: 'Australian-based customer service, available Monday to Friday. Talk to a real person, every time.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: '100% Australian Owned',
    body: 'Proudly Australian since 2010. No overseas shareholders, no foreign call centres. Just local people who care.',
  },
]

export function AboutWhyUs() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="why-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob-moss absolute w-[500px] h-[500px] -left-24 -bottom-24 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Why MailPlus
          </span>
          <h2
            id="why-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#095c7b' }}
          >
            Why businesses choose{' '}
            <span className="italic" style={{ color: '#103d39' }}>MailPlus.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 flex gap-4 items-start"
              style={{ backgroundColor: 'rgba(255,255,255,0.70)', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex-none flex items-center justify-center mt-0.5"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
