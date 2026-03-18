const reviews = [
  {
    name: 'Marcus T.',
    business: 'Urban Fulfilment Co.',
    text: "The MailPlus API integration was seamless. Our 3PL operation now has automated label generation and live tracking in our dashboard — no more manual data entry. The IT team were on the phone within minutes when we had a question during setup.",
    stars: 5,
  },
  {
    name: 'Priya K.',
    business: 'Bloom Skincare Co.',
    text: "We integrated MailPlus with our WooCommerce store in under a day. Automatic customer email notifications have completely eliminated 'where is my order?' queries. Our customers love the fast delivery.",
    stars: 5,
  },
  {
    name: 'James R.',
    business: 'TechParts Direct',
    text: "Switched from a legacy carrier API to MailPlus and haven't looked back. Flat-rate pricing, same-day collections and the biodegradable satchels are a bonus our eco-conscious customers really appreciate.",
    stars: 5,
  },
]

export function ApiReviews() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="api-reviews-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            id="api-reviews-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Don&apos;t take our word for it,{' '}
            <span className="italic" style={{ color: '#EAF044' }}>listen to our customers.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl p-8 border flex flex-col gap-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <div className="flex gap-0.5" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} style={{ color: '#EAF044' }} aria-hidden="true">★</span>
                ))}
              </div>
              <p
                className="text-sm leading-relaxed italic flex-1"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-none"
                  style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                  aria-hidden="true"
                >
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#ffffff' }}>{r.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>{r.business}</p>
                </div>
              </div>
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
