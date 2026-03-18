const usps = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Reliable local support',
    body: "Direct contact with your local MailPlus operator and our friendly HQ team. We're here to help you.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real express delivery',
    body: 'Think 1-2 business days and guaranteed same-day pickup. Great for eCommerce delivery solutions.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: 'Low, flat-rate prices',
    body: "No upfront costs or lock-in contracts. We'll give you free satchels so you can ship now and pay later.",
  },
]

export function ShopifyUsps() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Shopify integration key benefits"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className="flex flex-col items-center text-center px-4"
              style={i < usps.length - 1 ? { borderRight: '1px solid rgba(9,92,123,0.10)' } : {}}
            >
              <div
                className="w-18 h-18 w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(9,92,123,0.08)', color: '#095c7b' }}
              >
                {usp.icon}
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#095c7b' }}>{usp.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.72)' }}>{usp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
