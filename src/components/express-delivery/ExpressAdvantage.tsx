const leftList = [
  'Perfect for small to medium businesses of all types and sizes.',
  'Access Premium via our free shipping platform, ShipMate.',
  '1-2 day express delivery nationwide, delighting customers and boosting efficiency.',
  'Guaranteed same-day pickups to keep things moving smoothly.',
  'Flat-rate national prices for up to 5kg — no surprises!',
  'No extra charges for rural areas — reach more customers without extra cost.',
]

const rightList = [
  'Door-to-door service getting goods to customers faster.',
  'Stay informed with real-time tracking, providing peace of mind.',
  'Bring your own packaging or enquire now about deals on biodegradable options.',
  'No contracts or minimum volume, simply pay for what you use.',
  'Direct contact with driver giving you a personalised service – and someone to call in parcel emergencies!',
  'Reliable state-based Account Manager who is there to provide you with solutions tailored to your business.',
]

export function ExpressAdvantage() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="advantage-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div
        className="organic-blob absolute w-[500px] h-[500px] -right-32 top-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />
      <div
        className="organic-blob-moss absolute w-[350px] h-[350px] -left-16 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07, animationDelay: '5s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            Why MailPlus
          </span>
          <h2
            id="advantage-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Experience the{' '}
            <span className="italic" style={{ color: '#EAF044' }}>MailPlus Advantage</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
          {[...leftList, ...rightList].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <span
                className="mt-0.5 w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>{item}</span>
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
