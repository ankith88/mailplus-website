const checklist = [
  'Collect and deliver mail and parcels to your address.',
  'Pickup and lodge your Australia Post items, same-day guaranteed.',
  'Personalised service with the same MailPlus owner-operator.',
  'Convenient drop off and collection times.',
  'Dedicated Account Manager who you can contact any time.',
]

export function PostOfficeFeature() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="po-feature-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob-moss absolute w-[400px] h-[400px] -right-20 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.1, animationDelay: '3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — checklist */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              What We Do
            </span>
            <h2
              id="po-feature-heading"
              className="text-3xl md:text-4xl font-bold mb-10 leading-tight"
              style={{ color: '#095c7b' }}
            >
              We&apos;re all about saving you{' '}
              <span className="italic" style={{ color: '#103d39' }}>valuable time and money.</span>
            </h2>

            <ul className="space-y-5">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-base leading-relaxed" style={{ color: '#103d39' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — visual card */}
          <div
            className="rounded-3xl overflow-hidden border p-10 flex flex-col items-center justify-center gap-6 text-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.15)' }}
          >
            {/* Illustration placeholder — replace with real image when available */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#095c7b' }}
              aria-hidden="true"
            >
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: '#EAF044' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg mb-2" style={{ color: '#095c7b' }}>Same-Day Guaranteed</p>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(16,61,57,0.72)' }}>
                Anastasia from{' '}
                <a
                  href="https://www.instagram.com/byronbaylifestyle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                  style={{ color: '#095c7b' }}
                >
                  @byronbaylifestyle
                </a>{' '}
                no longer queues at the Post Office.
              </p>
            </div>

            {/* Stats row */}
            <div className="w-full grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: 'rgba(9,92,123,0.12)' }}>
              {[
                { value: '100%', label: 'Same-day lodge' },
                { value: 'Zero', label: 'Lock-in contracts' },
                { value: '1', label: 'Dedicated operator' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-bold" style={{ color: '#095c7b' }}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(16,61,57,0.6)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
