import Link from 'next/link'

const features = [
  'Access to Premium delivery and more.',
  'Print labels with just a few clicks.',
  'Shopify integration and order management.',
  'Bulk upload and print function.',
  'Easy to use! Anyone can navigate the ShipMate interface.',
]

export function ShipMateSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" aria-labelledby="shipmate-heading" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text side */}
          <div>
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: 'var(--cta)' }}>
              Free Shipping Platform
            </span>
            <h2 id="shipmate-heading" className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              ShipMate = Your <span className="italic" style={{ color: 'var(--cta)' }}>Shipping Sidekick</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--line-2)' }}>
              Watch how ShipMate can optimise your shipping — or{' '}
              <Link href="/shipmate" className="underline hover:opacity-80" style={{ color: 'var(--cta)' }}>
                visit our ShipMate info page here
              </Link>
              .
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full flex-none flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--cta)', color: 'var(--ink)' }} aria-hidden="true">
                    ✓
                  </span>
                  <span style={{ color: 'var(--card)' }}>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="#get-started" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-transform hover:scale-105 hover:shadow-lg" style={{ backgroundColor: 'var(--cta)', color: 'var(--ink)' }}>
              START SAVING
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Visual side — platform mockup placeholder */}
          <div className="rounded-3xl overflow-hidden border p-8 flex flex-col gap-4 shadow-2xl bg-black/20" style={{ borderColor: 'var(--ink-2)' }} aria-hidden="true">
            {/* Mock browser chrome */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} />
              <div className="flex-1 ml-2 h-6 rounded-md bg-white/10" />
            </div>
            {/* Mock rows */}
            {[
              { label: 'Order #1042', status: 'Dispatched', badge: 'var(--accent)' },
              { label: 'Order #1041', status: 'Out for Delivery', badge: 'var(--brand-2)' },
              { label: 'Order #1040', status: 'Delivered', badge: 'var(--muted)' },
              { label: 'Order #1039', status: 'Delivered', badge: 'var(--muted)' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                <span style={{ color: 'var(--card)', fontSize: '0.875rem' }}>{row.label}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: row.badge }}>
                  {row.status}
                </span>
              </div>
            ))}
            <div className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold cursor-pointer transition-colors hover:opacity-90" style={{ backgroundColor: 'var(--cta)', color: 'var(--ink)' }}>
              + Create New Shipment
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

