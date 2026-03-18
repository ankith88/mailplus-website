import Image from 'next/image'

export function ShipMateHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="shipmate-page-heading"
      style={{ backgroundColor: '#D4DCC8', minHeight: '100svh' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center h-full" style={{ minHeight: '100svh' }}>

        {/* Left — text */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[42%] pt-40 pb-16 lg:py-0">
          <h1
            id="shipmate-page-heading"
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}
          >
            Ship Smarter<br />
            with ShipMate
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-sm"
            style={{ color: 'rgba(9,92,123,0.75)' }}
          >
            The platform that gives your business the MailPlus advantage:
            Flat-rate prices, overnight shipping Australia-wide and guaranteed
            same-day collections.
          </p>

          <div>
            <a
              href="#get-started"
              className="inline-flex items-center px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Ship Smarter
            </a>
          </div>
        </div>

        {/* Right — illustration */}
        <div
          className="relative w-full lg:w-[58%] flex items-center justify-center lg:justify-end"
          style={{ minHeight: '380px' }}
          aria-hidden="true"
        >
          {/* On mobile: contained, on desktop: overflow beyond section bounds */}
          <div className="relative w-full lg:absolute lg:right-[-14%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[130%] xl:w-[140%] xl:right-[-18%]">
            <Image
              src="/images/shipmate-hero.png"
              alt="ShipMate platform illustration"
              width={1400}
              height={933}
              priority
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
