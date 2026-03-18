const features = [
  {
    title: 'Automatic Order Sync',
    body: 'Your Shopify orders appear instantly in ShipMate, ready for shipping with all customer details pre-filled.',
  },
  {
    title: 'Smart Product Weights',
    body: 'Product weights sync automatically from your Shopify store, ensuring the right shipping service is selected every time.',
  },
  {
    title: 'Smart Tag Filtering',
    body: 'Automatically sync and filter orders by Shopify tags – easily exclude click & collect orders and organise shipments by type.',
  },
  {
    title: 'Bulk Label Printing',
    body: 'Print shipping labels for multiple Shopify orders in seconds – no manual data entry required.',
  },
]

export function ShipMateShopify() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="shopify-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob-moss absolute w-[400px] h-[400px] -left-20 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.1, animationDelay: '3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Mock Shopify panel */}
          <div
            className="rounded-3xl border p-8 flex flex-col gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderColor: 'rgba(9,92,123,0.15)' }}
            aria-hidden="true"
          >
            {/* Shopify badge */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ backgroundColor: '#96BF48' }}
              >
                S
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#103d39' }}>Shopify Store Connected</p>
                <p className="text-xs" style={{ color: '#4A7A5A' }}>Last synced: just now</p>
              </div>
              <span
                className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#22C55E', color: '#fff' }}
              >
                Live
              </span>
            </div>

            {/* Order rows */}
            {[
              { order: '#5521', product: 'Gift Box — Large', weight: '1.2 kg', ready: true },
              { order: '#5520', product: 'Candle Set × 3', weight: '0.8 kg', ready: true },
              { order: '#5519', product: 'Skincare Bundle', weight: '0.5 kg', ready: true },
              { order: '#5518', product: 'Book Collection', weight: '2.1 kg', ready: false },
            ].map((row) => (
              <div
                key={row.order}
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ backgroundColor: row.ready ? 'rgba(9,92,123,0.07)' : 'rgba(0,0,0,0.04)', borderColor: 'rgba(9,92,123,0.1)', border: '1px solid' }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#103d39' }}>{row.order} — {row.product}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A7A5A' }}>{row.weight}</p>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full ml-3 flex-none"
                  style={{
                    backgroundColor: row.ready ? '#EAF044' : 'rgba(0,0,0,0.06)',
                    color: row.ready ? '#103d39' : '#6B7280',
                  }}
                >
                  {row.ready ? 'Ready to ship' : 'Pending'}
                </span>
              </div>
            ))}

            <button
              className="mt-2 w-full rounded-xl py-3 font-bold text-sm transition-all duration-200 hover:brightness-95"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
              aria-label="Print all labels (demo)"
            >
              Print Labels (4)
            </button>
          </div>

          {/* Text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              Shopify Integration
            </span>
            <h2
              id="shopify-heading"
              className="text-4xl md:text-5xl font-bold mb-10 leading-tight"
              style={{ color: '#095c7b' }}
            >
              Seamless{' '}
              <span className="italic" style={{ color: '#103d39' }}>Shopify Integration</span>
            </h2>

            <ul className="space-y-7">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 w-6 h-6 rounded-full flex-none flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#095c7b', color: '#EAF044' }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#103d39' }}>{f.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(16,61,57,0.72)' }}>{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
