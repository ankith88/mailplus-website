const usps = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    title: 'Automated label generation',
    body: 'Yes, our MailPlus integration will allow you to print labels automatically.',
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '1-2 days express delivery, Aus-wide',
    body: "We'll help you provide an excellent delivery experience for all your customers.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Live tracking updates',
    body: 'View the status of all orders within your current system, and the MailPlus dashboard.',
  },
]

export function ApiUsps() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="MailPlus API key features"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className="flex flex-col items-center text-center px-4"
              style={i < usps.length - 1 ? { borderRight: '1px solid rgba(9,92,123,0.10)' } : {}}
            >
              <div
                className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(9,92,123,0.08)', color: '#095c7b' }}
              >
                {usp.icon}
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#095c7b' }}>{usp.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.72)' }}>{usp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
