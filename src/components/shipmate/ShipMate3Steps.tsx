const steps = [
  {
    number: '1',
    title: 'Select your orders from the dashboard',
    description: 'All your Shopify orders appear automatically — select one or many to process at once.',
  },
  {
    number: '2',
    title: 'Review label details and generate them in bulk',
    description: 'Confirm shipping details with pre-filled product weights and addresses, then print in a single click.',
  },
  {
    number: '3',
    title: 'Track items to be delivered overnight Aus-wide',
    description: 'Your MailPlus operator collects same-day. Customers receive tracking notifications automatically.',
  },
]

export function ShipMate3Steps() {
  return (
    <section
      className="py-24 px-6"
      aria-labelledby="three-steps-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            It&apos;s That Easy
          </span>
          <h2
            id="three-steps-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Ship Shopify Orders in{' '}
            <span className="italic" style={{ color: '#EAF044' }}>3 Steps</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-1/2 w-full h-px"
                  style={{ backgroundColor: 'rgba(234,240,68,0.2)' }}
                  aria-hidden="true"
                />
              )}

              {/* Step number */}
              <div
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 border-4"
                style={{ backgroundColor: '#063040', borderColor: '#EAF044', color: '#EAF044' }}
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </div>

              <h3 className="font-bold text-base mb-3 max-w-[200px]" style={{ color: '#ffffff' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#EAF044', color: '#103d39' }}
          >
            Ship Smarter
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
