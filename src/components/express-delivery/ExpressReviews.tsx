const reviews = [
  {
    name: 'Dylan',
    business: 'Wild Nature',
    text: 'Our MailPlus driver always goes above and beyond what you would expect of your local courier. Great work ethic and personal service which clearly permeates throughout the company.',
    stars: 5,
  },
  {
    name: 'Sophie L.',
    business: 'The Beauty Collective',
    text: "Switching to MailPlus was the best decision for our business. Same-day pickups every day without fail, and our customers are consistently amazed by the 1-2 day delivery. Zero complaints since we made the switch.",
    stars: 5,
  },
  {
    name: 'Marcus T.',
    business: 'Urban Apparel Co.',
    text: "Flat-rate pricing means I know exactly what I'm spending on shipping every week. No surprises on the invoice, and the ShipMate platform makes printing labels a breeze. Highly recommend.",
    stars: 5,
  },
]

export function ExpressReviews() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="reviews-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            Customer Reviews
          </span>
          <h2
            id="reviews-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#ffffff' }}
          >
            See Why Businesses{' '}
            <span className="italic" style={{ color: '#EAF044' }}>Love Us</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.60)' }}
          >
            Our 5-star reviews speak for themselves — join other businesses that trust us for
            top-tier service and shipping solutions.
          </p>
        </div>

        {/* Stars bar */}
        <div className="flex justify-center gap-1 mb-12" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-2xl" style={{ color: '#EAF044' }} aria-hidden="true">★</span>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl p-8 border flex flex-col gap-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)' }}
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
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
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

        <div className="text-center mt-12">
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
