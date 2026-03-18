const usps = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Post Office solutions',
    body: "We'll clear your PO Box and lodge all outgoing Aus Post parcels and mail, same-day guaranteed.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Reliable service, every day',
    body: "Plus, you'll have direct contact with your local MailPlus operator.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Helping you save valuable time',
    body: 'Get back minutes, or even hours, during your busy working day. No lock-in contracts or up-front fees.',
  },
]

export function PostOfficeUsps() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Post Office Solutions benefits"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {usps.map((usp) => (
            <div
              key={usp.title}
              className="flex flex-col items-center text-center px-4"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
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
