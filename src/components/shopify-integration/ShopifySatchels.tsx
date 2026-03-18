const satchels = [
  {
    size: '500g Satchel',
    dims: '350mm × 250mm',
    description: 'Perfect for apparel and beauty items.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    size: '1kg Satchel',
    dims: '390mm × 282mm',
    description: 'Great for multiple apparel and beauty items.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    size: '3kg Satchel',
    dims: '405mm × 315mm',
    description: 'Ideal for shoes and bulkier items.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    size: '5kg Satchel',
    dims: '425mm × 505mm',
    description: 'Option for boxes or when customers buy in bulk.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
]

export function ShopifySatchels() {
  return (
    <section
      className="py-24 px-6"
      aria-labelledby="satchels-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Packaging
          </span>
          <h2
            id="satchels-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#095c7b' }}
          >
            Satchel Weights and{' '}
            <span className="italic" style={{ color: '#103d39' }}>Dimensions</span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(9,92,123,0.72)' }}
          >
            Perfect for eCommerce businesses sending small to medium sized products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {satchels.map((s) => (
            <div
              key={s.size}
              className="rounded-2xl p-8 border text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.12)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
              >
                {s.icon}
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#095c7b' }}>{s.size}</h3>
              <p
                className="text-sm font-semibold mb-3 px-3 py-1 rounded-full inline-block"
                style={{ backgroundColor: 'rgba(9,92,123,0.10)', color: '#095c7b' }}
              >
                {s.dims}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.72)' }}>{s.description}</p>
            </div>
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
