const steps = [
  {
    step: '1',
    title: 'Submit an Enquiry',
    body: 'Fill in our online enquiry form with your details and area of interest. A member of our franchising team will be in touch within 1–2 business days.',
  },
  {
    step: '2',
    title: 'Discovery Call',
    body: 'We\'ll schedule a call to discuss the opportunity, available territories, investment requirements, and answer any questions you have. No obligation at this stage.',
  },
  {
    step: '3',
    title: 'Review the Franchise Agreement',
    body: 'We\'ll provide you with a full Franchise Disclosure Document and Agreement to review. We recommend you seek independent legal and financial advice before proceeding.',
  },
  {
    step: '4',
    title: 'Training & Onboarding',
    body: 'Once your agreement is signed, you\'ll complete our comprehensive onboarding program covering operations, technology, client management, and everything you need to launch.',
  },
  {
    step: '5',
    title: 'Launch Your Territory',
    body: 'Go live in your exclusive territory with a ready-made client base, branded vehicle, ShipMate platform access, and the full support of the MailPlus head office team behind you.',
  },
]

export function FranchiseeSteps() {
  return (
    <section
      id="franchise-how-it-works"
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="steps-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob-moss absolute w-[500px] h-[500px] -left-24 -bottom-24 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            How It Works
          </span>
          <h2
            id="steps-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#095c7b' }}
          >
            Your path to owning a{' '}
            <span className="italic" style={{ color: '#103d39' }}>MailPlus franchise.</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((item, i) => (
            <div
              key={item.step}
              className="rounded-2xl p-6 flex gap-5 items-start"
              style={{ backgroundColor: 'rgba(255,255,255,0.72)', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex-none flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                aria-hidden="true"
              >
                {item.step}
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>{item.body}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="sr-only">then</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#franchise-enquire"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
          >
            Start Your Enquiry
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
