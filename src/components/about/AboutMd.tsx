import Image from 'next/image'

export function AboutMd() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="md-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — photo */}
        <div className="flex justify-center lg:justify-start">
          <div
            className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden flex-none"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.40)' }}
          >
            <Image
              src="/images/about-chris.jpg"
              alt="Chris Burgess — Managing Director, MailPlus"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Right — quote + bio */}
        <div>
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            A word from our MD
          </span>

          <h2
            id="md-heading"
            className="text-3xl md:text-4xl font-bold mb-8 leading-tight"
            style={{ color: '#ffffff' }}
          >
            &ldquo;We built MailPlus because Aussie businesses{' '}
            <span className="italic" style={{ color: '#EAF044' }}>deserve better.&rdquo;</span>
          </h2>

          <blockquote
            className="rounded-2xl p-8 mb-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <p
              className="text-lg leading-relaxed italic"
              style={{ color: 'rgba(255,255,255,0.90)' }}
            >
              &ldquo;When I started MailPlus, I wanted to build something that small business owners could
              actually rely on. Not a call centre, not a tracking number — real people, real pickups,
              real service. Fifteen years later, that hasn&apos;t changed. We&apos;re still here for
              you, same-day, every day.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div>
                <p className="font-bold text-sm" style={{ color: '#ffffff' }}>Chris Burgess</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>Managing Director, MailPlus</p>
              </div>
            </div>
          </blockquote>

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

      </div>
    </section>
  )
}
