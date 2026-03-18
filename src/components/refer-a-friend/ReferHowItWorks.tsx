const steps = [
  {
    step: '1',
    title: 'Submit Your Referral',
    body: 'Fill in the referral form below with your details and the contact details of the person you\'d like to refer. It only takes a minute.',
  },
  {
    step: '2',
    title: 'We Reach Out to Your Friend',
    body: 'Our franchising team will contact your friend to discuss the MailPlus franchise opportunity, available territories, and answer any questions they have.',
  },
  {
    step: '3',
    title: 'They Sign Up, You Get Paid',
    body: 'Once your friend signs their franchise agreement, you receive your cash incentive. It\'s that simple — a great outcome for everyone.',
  },
]

export function ReferHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="how-works-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob-moss absolute w-[500px] h-[500px] -right-24 -top-24 pointer-events-none"
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
            id="how-works-heading"
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#095c7b' }}
          >
            Three simple steps to{' '}
            <span className="italic" style={{ color: '#103d39' }}>earn your reward.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.72)', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-5"
                style={{ backgroundColor: '#095c7b', color: '#EAF044', fontFamily: 'var(--font-display)' }}
                aria-hidden="true"
              >
                {item.step}
              </div>
              <p className="font-bold text-base mb-2" style={{ color: '#095c7b' }}>{item.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* Eligibility note */}
        <div
          className="mt-12 max-w-2xl mx-auto rounded-2xl p-6 text-center"
          style={{ backgroundColor: 'rgba(9,92,123,0.07)', border: '1px solid rgba(9,92,123,0.12)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.80)' }}>
            <span className="font-bold" style={{ color: '#095c7b' }}>Eligibility: </span>
            The referral incentive is paid to the referrer once the referred individual has signed
            their MailPlus Franchise Agreement. The referred person must not have previously been
            in contact with MailPlus regarding a franchise opportunity. Contact our team for
            full terms and conditions.
          </p>
        </div>
      </div>
    </section>
  )
}
