const steps = [
  {
    number: '01',
    icon: '📱',
    title: 'Book Online or by Phone',
    description: 'Use our website, mobile app, or call +61 2 9000 0001. Provide pickup/delivery details and parcel specs. Instant quote, no account required.',
  },
  {
    number: '02',
    icon: '🚗',
    title: 'Driver Dispatched',
    description: 'A MailPlus driver is assigned within minutes of booking. You receive their name, photo, and live GPS tracking link.',
  },
  {
    number: '03',
    icon: '📍',
    title: 'Track Every Step',
    description: 'Watch your parcel move on a live map. SMS and email notifications at pickup and delivery. Share the link with your recipient.',
  },
  {
    number: '04',
    icon: '✅',
    title: 'Proof of Delivery',
    description: 'Electronic signature and time-stamped photo sent immediately on delivery. Disputes resolved in 24 hours — guaranteed.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="how-heading">
      <div className="absolute inset-0 bg-earth-950" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3 block">
            How It Works
          </span>
          <h2
            id="how-heading"
            className="text-4xl md:text-5xl font-medium text-earth-100 mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            How Do I Book a{' '}
            <span className="gradient-text italic">Courier in Sydney?</span>
          </h2>
          <p className="text-earth-400 text-lg">
            Four simple steps from booking to proof of delivery — everything tracked in real time.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line — desktop only */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #564535 20%, #564535 80%, transparent 100%)' }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <li key={step.number} className="relative group" style={{ animationDelay: `${i * 0.1}s` }}>
              {/* Step circle */}
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-earth-800 border-2 border-earth-700 group-hover:border-amber-500/50 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
                <div className="relative h-full flex flex-col items-center justify-center">
                  <span className="text-2xl mb-0.5">{step.icon}</span>
                  <span className="text-xs font-mono text-earth-600">{step.number}</span>
                </div>
              </div>

              <h3
                className="text-lg font-semibold text-earth-200 text-center mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-earth-400 text-center leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
