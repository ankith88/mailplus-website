const steps = [
  {
    number: '1',
    body: 'Enter your business details below and your Account Manager will contact you to confirm collection details and times in your area.',
  },
  {
    number: '2',
    body: "You'll get set-up on ShipMate, our free shipping platform. From here, you will get access to express delivery and be able to print labels with ease.",
  },
  {
    number: '3',
    body: 'Once you print labels, your MailPlus operator will be notified to collect on the same-day guaranteed.',
  },
]

export function Express3Steps() {
  return (
    <section
      id="express-how"
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="steps-heading"
      style={{ backgroundColor: '#095c7b' }}
    >
      <div
        className="organic-blob absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            Getting Started
          </span>
          <h2
            id="steps-heading"
            className="text-3xl md:text-4xl font-bold"
            style={{ color: '#ffffff' }}
          >
            Start Shipping Express in{' '}
            <span className="italic" style={{ color: '#EAF044' }}>3 Easy Steps</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-1/2 w-full h-px"
                  style={{ backgroundColor: 'rgba(234,240,68,0.25)' }}
                  aria-hidden="true"
                />
              )}
              <div
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-6 border-4"
                style={{ backgroundColor: '#095c7b', borderColor: '#EAF044', color: '#EAF044' }}
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>{step.body}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 text-center border mb-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <p className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
            You&apos;ll only pay for the labels your MailPlus operator scans with weekly invoices sent direct to your inbox.
          </p>
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
