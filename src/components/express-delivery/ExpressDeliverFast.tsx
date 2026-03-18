export function ExpressDeliverFast() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="deliver-fast-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#095c7b' }}
        >
          Premium Express
        </span>
        <h2
          id="deliver-fast-heading"
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: '#095c7b' }}
        >
          Deliver Fast,{' '}
          <span className="italic" style={{ color: '#103d39' }}>Delight Customers</span>
        </h2>
        <p
          className="text-lg leading-relaxed mb-14 max-w-2xl mx-auto"
          style={{ color: 'rgba(9,92,123,0.75)' }}
        >
          Make your customer&apos;s day with a swift and reliable service. Less delays. Zero complaints.
        </p>

        {/* Testimonial */}
        <div
          className="rounded-3xl p-10 border max-w-2xl mx-auto"
          style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(9,92,123,0.15)' }}
        >
          {/* Company initial badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6"
            style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
            aria-hidden="true"
          >
            W
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xl" style={{ color: '#EAF044' }} aria-hidden="true">★</span>
            ))}
          </div>

          <blockquote className="relative mb-6">
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-7xl font-serif leading-none pointer-events-none select-none"
              style={{ color: 'rgba(9,92,123,0.10)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="relative z-10 text-lg leading-relaxed italic"
              style={{ color: '#103d39' }}
            >
              Our MailPlus driver always goes above and beyond what you would expect of your
              local courier. Great work ethic and personal service which clearly permeates
              throughout the company.
            </p>
          </blockquote>

          <footer>
            <p className="font-bold" style={{ color: '#095c7b' }}>Dylan</p>
            <p className="text-sm" style={{ color: 'rgba(16,61,57,0.60)' }}>Wild Nature</p>
          </footer>
        </div>

        <a
          href="#get-started"
          className="mt-10 inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#EAF044', color: '#103d39' }}
        >
          Enquire Now
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
