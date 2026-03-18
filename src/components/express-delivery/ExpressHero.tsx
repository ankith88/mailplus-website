export function ExpressHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center px-6 overflow-hidden"
      aria-labelledby="express-hero-heading"
      style={{ backgroundColor: '#063040', minHeight: '100svh' }}
    >
      {/* Blobs */}
      <div
        className="organic-blob absolute w-[700px] h-[700px] -right-48 -top-32 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />
      <div
        className="organic-blob-moss absolute w-[450px] h-[450px] -left-24 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07, animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#EAF044' }}
        >
          Express Delivery
        </span>

        <h1
          id="express-hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
        >
          East Coast to West Coast{' '}
          <span className="italic" style={{ color: '#EAF044' }}>Overnight?</span>
        </h1>

        <p
          className="text-xl md:text-2xl leading-relaxed mb-4"
          style={{ color: 'rgba(255,255,255,0.80)' }}
        >
          You bet. Ship items up to 5kg with national flat-rate prices. Plus, the option to send 20kgs.
        </p>
        <p
          className="text-lg leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.60)' }}
        >
          Available now on ShipMate, powered by MailPlus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#get-started"
            className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            Enquire Now
          </a>
          <a
            href="#express-how"
            className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  )
}
