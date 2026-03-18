export function ShipMateVideo() {
  return (
    <section
      id="shipmate-video"
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="video-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#EAF044' }}
        >
          See It In Action
        </span>
        <h2
          id="video-heading"
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: '#ffffff' }}
        >
          Watch How ShipMate Can{' '}
          <span className="italic" style={{ color: '#EAF044' }}>Help Your Business</span>
        </h2>
        <p
          className="text-base mb-12 max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          See exactly how ShipMate streamlines your entire shipping workflow — from order sync to label printing to same-day pickup.
        </p>

        {/* Loom embed */}
        <div
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl border"
          style={{ paddingBottom: '56.25%', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <iframe
            src="https://www.loom.com/embed/b763e5a12b454737a71f5facd07cccc6"
            frameBorder="0"
            allowFullScreen
            title="Watch how ShipMate works"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        <a
          href="#get-started"
          className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: '#EAF044', color: '#103d39' }}
        >
          Ship Smarter
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
