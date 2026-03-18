const leftList = [
  'Best shipping software for Shopify.',
  '1-2 days express delivery, nationally.',
  'Same-day pickups, guaranteed.',
  'Free and easy-to-use portal.',
  'Detailed tracking.',
]

const rightList = [
  'Flat-rate, national prices.',
  'No extra fees for rural or regional areas.',
  'Ship now, pay later.',
  'Direct contact with driver.',
  'Reliable Account Manager.',
]

export function ShopifyChecklist() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="checklist-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob absolute w-[500px] h-[500px] -right-32 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Features
          </span>
          <h2
            id="checklist-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#095c7b' }}
          >
            The Shopify integration{' '}
            <span className="italic" style={{ color: '#103d39' }}>you&apos;ve been looking for.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 max-w-4xl mx-auto mb-12">
          {[...leftList, ...rightList].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span
                className="mt-0.5 w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-base leading-relaxed" style={{ color: '#103d39' }}>{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
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
