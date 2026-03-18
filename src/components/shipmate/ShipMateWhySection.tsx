const features = [
  {
    title: 'Multiple Premium Carriers',
    body: 'Access discounted and flat-rate pricing across premium carriers on a single platform, without minimum volume requirements.',
  },
  {
    title: 'Smart Address Validation',
    body: 'Prevent delays with Google address lookup and automatic suburb, state, and postcode validation.',
  },
  {
    title: 'Flexible Pickup Options',
    body: 'Schedule pickups on-demand or enjoy automatic daily collection with your dedicated MailPlus operator.',
  },
  {
    title: 'Real-time Tracking',
    body: 'Track all your shipments in one place and stay connected with your MailPlus operator through our integrated messaging system.',
  },
]

export function ShipMateWhySection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="why-shipmate-heading"
      style={{ backgroundColor: '#063040' }}
    >
      {/* Blob */}
      <div
        className="organic-blob absolute w-[500px] h-[500px] -right-32 top-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#EAF044' }}
            >
              Why ShipMate
            </span>
            <h2
              id="why-shipmate-heading"
              className="text-4xl md:text-5xl font-bold mb-10 leading-tight"
              style={{ color: '#ffffff' }}
            >
              Why Businesses{' '}
              <span className="italic" style={{ color: '#EAF044' }}>Choose ShipMate</span>
            </h2>

            <ul className="space-y-7">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#ffffff' }}>{f.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#get-started"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Ship Smarter
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Platform mockup */}
          <div
            className="rounded-3xl overflow-hidden border p-8 flex flex-col gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
            aria-hidden="true"
          >
            {/* Mock browser chrome */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} />
              <div className="flex-1 ml-2 h-6 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Shipments today', value: '24' },
                { label: 'In transit', value: '18' },
                { label: 'Delivered', value: '142' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-2xl font-bold" style={{ color: '#EAF044' }}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
                </div>
              ))}
            </div>
            {/* Order rows */}
            {[
              { label: 'Order #1042', status: 'Dispatched', badge: '#22C55E' },
              { label: 'Order #1041', status: 'Out for Delivery', badge: '#F59E0B' },
              { label: 'Order #1040', status: 'Delivered', badge: '#095c7b' },
              { label: 'Order #1039', status: 'Delivered', badge: '#095c7b' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>{row.label}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: row.badge, color: '#fff' }}
                >
                  {row.status}
                </span>
              </div>
            ))}
            <div
              className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              + Create New Shipment
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
