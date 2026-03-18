const steps = [
  'Shopify integration with zero subscription fees.',
  'Easy and efficient order management.',
  'Print labels with just a few clicks.',
  'Send automatic email updates to your customers.',
  'Live tracking updates in your dashboard.',
]

export function ShopifyBenefits() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="benefits-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div
        className="organic-blob-moss absolute w-[400px] h-[400px] -left-20 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07, animationDelay: '3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#EAF044' }}
          >
            Platform Benefits
          </span>
          <h2
            id="benefits-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#ffffff' }}
          >
            Get all the MailPlus benefits integrated{' '}
            <span className="italic" style={{ color: '#EAF044' }}>directly with your Shopify store.</span>
          </h2>
          <p
            className="text-lg mb-16"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Ship anywhere from 10 to 1000+ orders a week.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — platform mockup */}
          <div
            className="rounded-3xl border p-8 flex flex-col gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)' }}
            aria-hidden="true"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} />
              <div className="flex-1 ml-2 h-6 rounded-md flex items-center px-3 gap-2" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <div className="w-3 h-3 rounded-full flex-none" style={{ backgroundColor: '#96BF48' }} />
                <div className="flex-1 h-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
              </div>
            </div>

            {/* Shopify connected banner */}
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ backgroundColor: 'rgba(150,191,72,0.15)', border: '1px solid rgba(150,191,72,0.3)' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: '#96BF48' }}>S</div>
              <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: '#ffffff' }}>Shopify Store Connected</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>12 new orders ready to ship</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#22C55E', color: '#fff' }}>Live</span>
            </div>

            {/* Order rows */}
            {[
              { id: '#5521', item: 'Classic Tee — M/Black', weight: '0.3 kg', status: 'Ready', badge: '#EAF044', text: '#103d39' },
              { id: '#5520', item: 'Skincare Set × 2', weight: '0.6 kg', status: 'Ready', badge: '#EAF044', text: '#103d39' },
              { id: '#5519', item: 'Coffee Blend 250g', weight: '0.4 kg', status: 'Printing', badge: '#F59E0B', text: '#fff' },
              { id: '#5518', item: 'Shoe Box — Size 10', weight: '1.8 kg', status: 'Pending', badge: 'rgba(255,255,255,0.15)', text: 'rgba(255,255,255,0.55)' },
            ].map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.90)' }}>{row.id} — {row.item}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{row.weight}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full ml-3 flex-none" style={{ backgroundColor: row.badge, color: row.text }}>{row.status}</span>
              </div>
            ))}

            <button
              className="mt-1 w-full rounded-xl py-3 font-bold text-sm"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
              aria-label="Print all labels (demo)"
            >
              Print All Labels
            </button>
          </div>

          {/* Right — numbered list */}
          <div>
            <ol className="space-y-7">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-5">
                  <span
                    className="flex-none w-10 h-10 rounded-full flex items-center justify-center text-base font-bold"
                    style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                    aria-label={`Step ${i + 1}`}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-2 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <a
                href="https://apps.shopify.com/mailplus?surface_detail=mailplus&surface_inter_position=1&surface_intra_position=1&surface_type=search"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold underline transition-opacity hover:opacity-75"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                View our app listing on the Shopify app store here.
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
