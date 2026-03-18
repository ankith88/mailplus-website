import Image from 'next/image'

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="MailPlus hero"
      style={{ backgroundColor: '#D1E0D1', minHeight: '100svh' }}
    >
      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex h-screen max-w-none w-full">
        {/* Left — copy */}
        <div
          className="relative z-10 flex flex-col justify-center px-12 lg:px-20 xl:px-28"
          style={{ flex: '0 0 42%' }}
        >
          <h1
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#103d39' }}
          >
            Fast &amp;{' '}
            <span
              className="italic"
              style={{
                color: '#103d39',
                textDecoration: 'underline',
                textDecorationColor: '#EAF044',
                textDecorationThickness: '4px',
                textUnderlineOffset: '6px',
              }}
            >
              Stress-Free
            </span>
            <br />
            Shipping
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-sm" style={{ color: '#103d39' }}>
            Imagine cheap flat-rate prices, 1–2 day delivery across Australia, and
            guaranteed same-day pickups. Well, all you need is a free MailPlus account.
          </p>
          <div>
            <a
              href="#get-started"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#EAF044', color: '#103d39', minWidth: '220px' }}
            >
              START SAVING
            </a>
          </div>
        </div>

        {/* Right — illustration */}
        <div className="relative flex-1 z-10" aria-hidden="true">
          <Image
            src="/images/hero-illustration.png.png"
            alt="MailPlus delivery van, airplane and parcels"
            fill
            priority
            className="object-contain object-center"
            sizes="58vw"
          />
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="flex flex-col md:hidden min-h-svh">
        {/* Image */}
        <div className="relative w-full z-10" style={{ flex: '1 1 55%', minHeight: '55vw' }}>
          <Image
            src="/images/hero-illustration.png.png"
            alt="MailPlus delivery van, airplane and parcels"
            fill
            priority
            className="object-contain object-bottom"
            sizes="100vw"
          />
        </div>

        {/* Text + CTA */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-6 pb-14 pt-6"
          style={{ flex: '0 0 auto' }}
        >
          <h1
            className="text-4xl sm:text-5xl font-bold mb-5 leading-tight"
            style={{ color: '#103d39' }}
          >
            Fast &amp;{' '}
            <span
              className="italic"
              style={{
                color: '#103d39',
                textDecoration: 'underline',
                textDecorationColor: '#EAF044',
                textDecorationThickness: '4px',
                textUnderlineOffset: '6px',
              }}
            >
              Stress-Free
            </span>
            <br />
            Shipping
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-xs" style={{ color: '#103d39' }}>
            Imagine cheap flat-rate prices, 1–2 day delivery across Australia, and
            guaranteed same-day pickups. Well, all you need is a free MailPlus account.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39', minWidth: '220px' }}
          >
            START SAVING
          </a>
        </div>
      </div>
    </section>
  )
}
