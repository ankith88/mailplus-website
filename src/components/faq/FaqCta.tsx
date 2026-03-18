export function FaqCta() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: '#095c7b' }}
      aria-labelledby="faq-cta-heading"
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
          Get In Touch
        </span>
        <h2
          id="faq-cta-heading"
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          style={{ color: '#ffffff' }}
        >
          Can&apos;t find what you&apos;re looking for?{' '}
          <span className="italic" style={{ color: '#EAF044' }}>Talk to our team.</span>
        </h2>
        <p
          className="text-lg leading-relaxed mb-10"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          Our Aussie-based customer service team is available Monday to Friday, 9am–5pm AEST.
          We&apos;re happy to help with any questions about our services, pricing, or getting set up.
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
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.20)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            1300 65 65 95
          </a>
        </div>
      </div>
    </section>
  )
}
