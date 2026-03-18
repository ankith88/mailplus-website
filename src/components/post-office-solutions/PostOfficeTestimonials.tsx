const reviews = [
  {
    name: 'Sarah M.',
    business: 'Byron Bay Lifestyle',
    text: 'MailPlus has completely changed how we manage our Post Office needs. No more wasting 2 hours a week in queues — our operator handles everything and we get back to running the business.',
    stars: 5,
  },
  {
    name: 'James T.',
    business: 'Sydney Legal Group',
    text: 'Exceptional service. Our MailPlus operator clears our PO Box every morning and lodges outgoing mail same-day. Reliable, professional, and always on time.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    business: 'Bloom Skincare Co.',
    text: "The personalised service is incredible. We have the same operator every day who knows exactly what we need. I can't imagine going back to doing Post Office runs ourselves.",
    stars: 5,
  },
]

export function PostOfficeTestimonials() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="po-reviews-heading"
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
            id="po-reviews-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Don&apos;t take our word for it,{' '}
            <span className="italic" style={{ color: '#EAF044' }}>listen to our customers.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl p-8 border flex flex-col gap-5"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} style={{ color: '#EAF044' }} aria-hidden="true">★</span>
                ))}
              </div>

              <p
                className="text-sm leading-relaxed italic flex-1"
                style={{ color: 'rgba(255,255,255,0.88)' }}
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
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{r.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
