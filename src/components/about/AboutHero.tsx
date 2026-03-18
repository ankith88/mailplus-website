import Image from 'next/image'

export function AboutHero() {
  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      aria-labelledby="about-hero-heading"
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — text */}
        <div>
          <span
            className="text-xs font-bold tracking-widest uppercase mb-5 block"
            style={{ color: '#EAF044' }}
          >
            About MailPlus
          </span>

          <h1
            id="about-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#ffffff', fontFamily: 'var(--font-display)' }}
          >
            Helping Aussie businesses{' '}
            <span className="italic" style={{ color: '#EAF044' }}>grow since 2010.</span>
          </h1>

          <p
            className="text-xl leading-relaxed mb-4"
            style={{ color: 'rgba(255,255,255,0.80)' }}
          >
            MailPlus is a 100% Australian-owned courier, parcel delivery, mail management,
            and logistics company. We provide fast &amp; stress-free shipping Australia-wide.
          </p>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: 'rgba(255,255,255,0.60)' }}
          >
            No lock-in contracts. No minimum volume. Just reliable service from people who care.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#get-started"
              className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Enquire Now
            </a>
            <a
              href="#about-story"
              className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.20)' }}
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Right — MD photo */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="relative w-72 h-96 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px] rounded-3xl overflow-hidden flex-none"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
          >
            <Image
              src="/images/about-chris.jpg"
              alt="Chris Burgess — Managing Director of MailPlus"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-5 py-4"
              style={{ background: 'linear-gradient(to top, rgba(6,48,64,0.95) 0%, transparent 100%)' }}
            >
              <p className="text-white font-bold text-base">Chris Burgess</p>
              <p className="text-xs" style={{ color: '#EAF044' }}>Managing Director, MailPlus</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
