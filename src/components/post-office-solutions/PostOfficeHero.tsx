export function PostOfficeHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center px-6 text-center overflow-hidden"
      aria-labelledby="po-hero-heading"
      style={{ backgroundColor: '#DAE8DA', minHeight: '100svh' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#095c7b' }}
        >
          Post Office Solutions
        </span>

        <h1
          id="po-hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}
        >
          That&apos;s right, we&apos;ll deliver the{' '}
          <span className="italic" style={{ color: '#103d39' }}>Post Office to you.</span>
        </h1>

        <p
          className="text-xl md:text-2xl leading-relaxed mb-10"
          style={{ color: 'rgba(9,92,123,0.75)' }}
        >
          No more treks. No more queues. Get back time in your working day.
        </p>

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
    </section>
  )
}
