const supportItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    text: 'The Sales and Marketing team are keen to collaborate and help you succeed.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    text: 'The Customer Service & Retention team are here to ensure that you and your customers are happy.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    text: 'Our IT Systems team are only a call or quick email away if you ever need IT support.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    text: "You'll have direct contact with your MailPlus Operator, who will pick up and lodge items same day guaranteed.",
  },
]

export function ApiSupport() {
  return (
    <section
      id="api-how-it-works"
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="support-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob absolute w-[500px] h-[500px] -right-32 top-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — integration diagram */}
          <div
            className="rounded-3xl border p-8 flex flex-col gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.15)' }}
            aria-hidden="true"
          >
            {/* API flow diagram */}
            <p className="text-xs font-bold tracking-widest uppercase mb-2 text-center" style={{ color: '#095c7b' }}>Integration Flow</p>

            {[
              { step: 'Your Platform', desc: 'WooCommerce, Squarespace, custom system', color: '#095c7b' },
              { step: 'MailPlus API', desc: 'Automated label creation & order sync', color: '#EAF044', textColor: '#103d39' },
              { step: 'MailPlus Network', desc: 'Same-day pickup by your local operator', color: '#095c7b' },
              { step: 'Customer Delivery', desc: '1–2 day express delivery, Australia-wide', color: '#22C55E' },
            ].map((item, i) => (
              <div key={item.step}>
                <div
                  className="rounded-2xl px-5 py-4 flex items-center gap-4"
                  style={{ backgroundColor: item.color, color: item.textColor ?? '#ffffff' }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: item.textColor ?? '#ffffff' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{item.step}</p>
                    <p className="text-xs opacity-80">{item.desc}</p>
                  </div>
                </div>
                {i < 3 && (
                  <div className="flex justify-center my-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'rgba(9,92,123,0.35)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right — text + checklist */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              Full Team Support
            </span>
            <h2
              id="support-heading"
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ color: '#095c7b' }}
            >
              Plus, you&apos;ll get the full support of{' '}
              <span className="italic" style={{ color: '#103d39' }}>the MailPlus teams.</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(9,92,123,0.72)' }}
            >
              We have dedicated teams that will always give you the VIP treatment:
            </p>

            <ul className="space-y-5 mb-8">
              {supportItems.map((item) => (
                <li key={item.text} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-9 h-9 rounded-xl flex-none flex items-center justify-center"
                    style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm leading-relaxed pt-1.5" style={{ color: '#103d39' }}>{item.text}</span>
                </li>
              ))}
            </ul>

            <p
              className="text-base font-medium mb-10"
              style={{ color: 'rgba(9,92,123,0.80)' }}
            >
              Full training on how to use the MailPlus shipping solution is available for your teams.
            </p>

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
      </div>
    </section>
  )
}
