const reasons = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Established Brand & Reputation',
    body: 'Join a network with 15+ years of brand equity, a 4.9-star rating, and 120+ franchises already operating across Australia. You\'re in business for yourself, not by yourself.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Guaranteed Client Base',
    body: 'When you become a MailPlus franchisee, you receive an established client base in your exclusive territory. You\'re not starting from scratch — clients are ready and waiting.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Free Technology Platform',
    body: 'Every MailPlus franchisee gets access to ShipMate — our free shipping platform — plus full API and Shopify integration tools that make your clients\' lives easier and keep them loyal.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Full Training Provided',
    body: 'No prior courier experience needed. We provide comprehensive onboarding training covering operations, client management, the ShipMate platform, and everything you need to hit the ground running.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Dedicated Support Teams',
    body: 'You\'ll have the full backing of our Sales, Customer Service, and IT Systems teams. We\'re invested in your success — when you grow, the whole network grows.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Exclusive Territory',
    body: 'Each MailPlus franchisee operates within a defined, exclusive territory. No competing against other franchisees — your clients are yours, and your area is protected.',
  },
]

export function FranchiseeWhy() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="why-franchise-heading"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div
        className="organic-blob-moss absolute w-[500px] h-[500px] -right-32 top-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
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
            id="why-franchise-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#095c7b' }}
          >
            Why invest in a{' '}
            <span className="italic" style={{ color: '#103d39' }}>MailPlus franchise?</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 flex gap-4 items-start"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
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
