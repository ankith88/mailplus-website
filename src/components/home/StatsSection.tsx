const stats = [
  { value: '2.4M+', label: 'Parcels Delivered', sublabel: 'Since 2010' },
  { value: '98.4%', label: 'On-Time Delivery', sublabel: '12-month average' },
  { value: '680+', label: 'Business Clients', sublabel: 'Across Sydney' },
  { value: '14 yrs', label: 'Operating in Sydney', sublabel: 'Waterloo founded 2010' },
  { value: '2,847', label: '5-Star Reviews', sublabel: 'Google & Trustpilot' },
  { value: '3hrs', label: 'Avg Delivery Time', sublabel: 'Sydney metro' },
]

export function StatsSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-earth-900 to-earth-950" />
      <div className="organic-blob absolute w-[500px] h-[500px] -left-40 top-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest text-amber-400 uppercase mb-3 block">
            By the Numbers
          </span>
          <h2
            id="stats-heading"
            className="text-4xl md:text-5xl font-medium text-earth-100"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Why Sydney Chooses{' '}
            <span className="gradient-text italic">MailPlus</span>
          </h2>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-3 gap-px bg-earth-800 rounded-2xl overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-earth-900 p-8 hover:bg-earth-800 transition-colors duration-300 group"
            >
              <dt className="text-4xl md:text-5xl font-semibold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300 origin-left"
                style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </dt>
              <dd>
                <p className="text-earth-200 font-medium text-sm">{stat.label}</p>
                <p className="text-earth-500 text-xs mt-0.5">{stat.sublabel}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
