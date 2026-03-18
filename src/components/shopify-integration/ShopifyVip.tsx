export function ShopifyVip() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="vip-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#EAF044' }}
            >
              Personalised Service
            </span>
            <h2
              id="vip-heading"
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ color: '#ffffff' }}
            >
              We&apos;ll always give you the{' '}
              <span className="italic" style={{ color: '#EAF044' }}>VIP treatment.</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: 'rgba(255,255,255,0.80)' }}
            >
              Your dedicated MailPlus operator will pick up and lodge your parcels, same-day guaranteed.
            </p>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.80)' }}
            >
              Helping you to reduce the wait time for your customers.
            </p>

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

          {/* Right — operator card */}
          <div
            className="rounded-3xl border p-10 flex flex-col items-center text-center gap-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            aria-hidden="true"
          >
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              R
            </div>

            <div>
              <p className="font-bold text-lg mb-1" style={{ color: '#ffffff' }}>Ratu</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>Byron Bay Territory Owner</p>
            </div>

            {/* Stats */}
            <div className="w-full grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              {[
                { value: '100%', label: 'On-time' },
                { value: 'Same-day', label: 'Collections' },
                { value: '5★', label: 'Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-lg font-bold" style={{ color: '#EAF044' }}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.50)' }}>
              &ldquo;James from{' '}
              <a
                href="https://www.instagram.com/parkesavedispensary/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-75"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                @parkesavedispensary
              </a>
              {' '}with Ratu, our Byron Bay franchisee.&rdquo;
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
