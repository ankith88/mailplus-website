const items = [
  {
    number: '01',
    title: 'Exclusive Territory',
    body: 'An exclusive, defined territory with an established client base already using MailPlus. Your territory is yours — protected from other franchisees.',
  },
  {
    number: '02',
    title: 'Full Onboarding & Training',
    body: 'Comprehensive training on operations, client management, the ShipMate platform, Australia Post lodgement, and everything else you need to operate confidently from day one.',
  },
  {
    number: '03',
    title: 'ShipMate Technology Platform',
    body: 'Free access to ShipMate — our shipping platform — giving your clients bulk label printing, Shopify integration, real-time tracking, and automated notifications.',
  },
  {
    number: '04',
    title: 'Branded Vehicle & Uniforms',
    body: 'A fully branded MailPlus vehicle and uniforms so you look professional from day one. Your local presence builds trust and recognition in your territory.',
  },
  {
    number: '05',
    title: 'Marketing & Sales Support',
    body: 'Access to national marketing campaigns, digital assets, and a dedicated Sales and Marketing team who will help you grow your client base within your territory.',
  },
  {
    number: '06',
    title: 'Ongoing Operational Support',
    body: 'Dedicated support from our Customer Service and IT Systems teams. You\'re never on your own — our head office team is always just a call or email away.',
  },
]

export function FranchiseeWhatYouGet() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="what-you-get-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] -right-32 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            What You Get
          </span>
          <h2
            id="what-you-get-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#ffffff' }}
          >
            Everything you need to{' '}
            <span className="italic" style={{ color: '#EAF044' }}>hit the ground running.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span
                className="text-4xl font-bold block mb-4"
                style={{ color: '#EAF044', fontFamily: 'var(--font-display)' }}
                aria-hidden="true"
              >
                {item.number}
              </span>
              <p className="font-bold text-base mb-2" style={{ color: '#ffffff' }}>{item.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#franchise-enquire"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            Enquire Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
