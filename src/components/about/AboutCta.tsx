export function AboutCta() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="about-cta-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-5 block"
          style={{ color: '#EAF044' }}
        >
          Get Started
        </span>
        <h2
          id="about-cta-heading"
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          style={{ color: '#ffffff' }}
        >
          Ready to ship smarter with{' '}
          <span className="italic" style={{ color: '#EAF044' }}>MailPlus?</span>
        </h2>
        <p
          className="text-lg leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          Helping small to medium sized Aussie businesses grow since 2010.
          No lock-in contracts. No minimum volume. Just great service.
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
            href="tel:1300656595"
            className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            1300 65 65 95
          </a>
        </div>
      </div>
    </section>
  )
}
