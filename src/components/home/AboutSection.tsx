import Link from 'next/link'

export function AboutSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="about-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              About MailPlus
            </span>
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: '#095c7b' }}
            >
              Who Are MailPlus?
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: '#103d39' }}>
              We specialise in providing efficient, reliable solutions tailored to business.
              With over 25 years of experience as an independent Australian company, we&apos;ve
              gone from delivering mail to now also shipping parcels all over the country.
            </p>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#103d39' }}>
              Our local teams and national network of owner-operators ensure a seamless
              shipping experience for your business, suppliers and customers!
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Stats / trust cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '25+', label: 'Years of Experience', sub: 'Independent Australian company' },
              { value: '4.9★', label: 'Customer Rating', sub: 'The most loved local courier' },
              { value: 'Free', label: 'ShipMate Platform', sub: 'No contracts, no minimum volume' },
              { value: '100%', label: 'Aussie Owned', sub: 'Local teams, national network' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderColor: 'rgba(9,92,123,0.15)' }}
              >
                <p className="text-3xl font-bold mb-1" style={{ color: '#095c7b' }}>{s.value}</p>
                <p className="text-sm font-semibold mb-1" style={{ color: '#103d39' }}>{s.label}</p>
                <p className="text-xs" style={{ color: '#4A7A5A' }}>{s.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
