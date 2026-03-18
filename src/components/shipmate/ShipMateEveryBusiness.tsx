const steps = [
  {
    number: '1',
    title: 'Enter Details',
    body: 'Quick Google address lookup and saved contacts make data entry effortless – no more typing errors.',
  },
  {
    number: '2',
    title: 'Choose Service',
    body: 'Select from multiple carriers with discounted rates – all in one place, no minimum volumes.',
  },
  {
    number: '3',
    title: 'Print & Ship',
    body: 'Print labels instantly and schedule pickups with your MailPlus operator. Same-day collections guaranteed!',
  },
]

export function ShipMateEveryBusiness() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="every-business-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob absolute w-[500px] h-[500px] -right-32 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            No Shopify? No Problem.
          </span>
          <h2
            id="every-business-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: '#095c7b' }}
          >
            Designed for{' '}
            <span className="italic" style={{ color: '#103d39' }}>Every Business</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'rgba(16,61,57,0.75)' }}>
            Not on Shopify? Don&apos;t need an API solution? No problem. ShipMate&apos;s
            user-friendly platform works for any business that needs reliable, affordable
            shipping – from simple address validation to bulk label printing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl p-8 border text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.12)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6"
                style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: '#103d39' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.72)' }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
