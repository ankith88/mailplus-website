const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Live Tracking Updates',
    body: 'Get real-time status updates from the moment your parcel is collected to the second it arrives at your customer\'s door.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '1–2 Day Delivery',
    body: 'Most MailPlus orders arrive within 1–2 business days Australia-wide, so your customers are never left waiting long.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: 'Delivery Notifications',
    body: 'Your customers automatically receive SMS and email notifications at each stage of the delivery — reducing "where\'s my order?" queries.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Proof of Delivery',
    body: 'Every delivery includes proof-of-delivery confirmation — giving you and your customers complete peace of mind.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: 'Track Multiple Parcels',
    body: 'Managing volume? Track all your active shipments in one place through the ShipMate platform — no need to check individually.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Aussie-Based Support',
    body: 'If something goes wrong, our Australian-based customer service team is here to help. Call us Mon–Fri 9am–5pm AEST.',
  },
]

export function TrackingFeatures() {
  return (
    <section
      className="py-24 px-6"
      aria-labelledby="tracking-features-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Why Tracking Matters
          </span>
          <h2
            id="tracking-features-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#095c7b' }}
          >
            Know Where Every Parcel Is,{' '}
            <span className="italic" style={{ color: '#103d39' }}>Every Step of the Way</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-7 border"
              style={{ backgroundColor: 'rgba(255,255,255,0.70)', borderColor: 'rgba(9,92,123,0.12)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
              >
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#103d39' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.75)' }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
