const testimonials = [
  {
    name: 'David K.',
    territory: 'Inner West Sydney',
    text: 'I was looking for a business with a strong brand and a ready-made client base. MailPlus ticked every box. Within my first month I already had more work than I expected. The support from head office has been outstanding.',
    stars: 5,
  },
  {
    name: 'Sandra M.',
    territory: 'Brisbane South',
    text: 'The training program set me up perfectly. I had no courier experience at all before joining MailPlus, but they walked me through everything. Two years in and I couldn\'t be happier with my decision.',
    stars: 5,
  },
  {
    name: 'Tony R.',
    territory: 'Melbourne CBD',
    text: 'What sold me was the technology. ShipMate makes my clients\' lives so easy that they never want to leave. My client retention is incredible, and I\'ve added three new accounts this quarter alone.',
    stars: 5,
  },
]

export function FranchiseeTestimonials() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            Franchisee Stories
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Don&apos;t take our word for it,{' '}
            <span className="italic" style={{ color: '#EAF044' }}>listen to our franchisees.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-8 border flex flex-col gap-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <div className="flex gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} style={{ color: '#EAF044' }} aria-hidden="true">★</span>
                ))}
              </div>
              <p
                className="text-sm leading-relaxed italic flex-1"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div
                className="flex items-center gap-3 pt-4 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.12)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-none"
                  style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                  aria-hidden="true"
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#ffffff' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>MailPlus Franchisee — {t.territory}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
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
