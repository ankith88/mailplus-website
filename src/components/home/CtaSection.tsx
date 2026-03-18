import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-earth-900" />
      <div className="organic-blob absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" aria-hidden="true" />

      {/* Animated border gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, transparent 50%, rgba(217,98,67,0.05) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-400/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-moss-400 animate-pulse" />
          <span className="text-xs font-medium tracking-widest text-earth-300 uppercase">
            Available Monday–Friday 7am–7pm
          </span>
        </span>

        <h2
          id="cta-heading"
          className="text-4xl md:text-6xl font-medium text-earth-100 mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Ready to Ship with{' '}
          <span className="gradient-text italic">Sydney&apos;s Best?</span>
        </h2>

        <p className="text-earth-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a same-day courier, get an instant parcel quote, or speak with our team about
          a tailored logistics solution for your business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services/courier"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-clay-500 to-amber-500 text-earth-950 font-bold text-lg hover:shadow-glow-amber transition-all duration-300 hover:scale-105"
          >
            Book a Courier Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass text-earth-200 font-medium text-lg hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300"
          >
            Talk to Our Team
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-earth-500">
          {[
            '✓ No account required',
            '✓ Instant online booking',
            '✓ GPS tracked',
            '✓ Insured delivery',
            '✓ Proof of delivery',
          ].map((item) => (
            <span key={item} className="text-earth-400">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
