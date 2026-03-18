const usps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: 'Free Shopify Integration',
    body: 'Connect your store in 2 minutes and automatically see orders, tags and your pre-populated product weights.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Perfect for Every Professional',
    body: 'From medical offices to law firms, schools and retail – simplify shipping no matter your business type with this user-friendly platform.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Developer-Friendly API',
    body: 'Seamlessly integrate with WooCommerce, Squarespace, or any platform using our public API.',
  },
]

export function ShipMateUsp() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#DAE8DA' }}
      aria-label="ShipMate key benefits"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {usps.map((usp) => (
            <div
              key={usp.title}
              className="rounded-2xl p-8 border text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.12)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
              >
                {usp.icon}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#103d39' }}>{usp.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.75)' }}>{usp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
