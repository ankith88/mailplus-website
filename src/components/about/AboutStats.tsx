const stats = [
  { value: '15+', label: 'Years in Business', sub: 'Proudly Australian since 2010' },
  { value: '4.9★', label: 'Star Rating', sub: 'Most loved local courier' },
  { value: '680+', label: 'Business Clients', sub: 'Small to medium businesses' },
  { value: '100%', label: 'Australian Owned', sub: 'No overseas shareholders' },
]

export function AboutStats() {
  return (
    <section
      className="py-16 px-6"
      style={{ backgroundColor: '#DAE8DA' }}
      aria-label="Company statistics"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-6 text-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.70)', border: '1px solid rgba(9,92,123,0.12)' }}
          >
            <p
              className="text-4xl font-bold mb-1"
              style={{ color: '#095c7b', fontFamily: 'var(--font-display)' }}
            >
              {stat.value}
            </p>
            <p className="font-semibold text-sm mb-1" style={{ color: '#103d39' }}>{stat.label}</p>
            <p className="text-xs" style={{ color: 'rgba(9,92,123,0.60)' }}>{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
