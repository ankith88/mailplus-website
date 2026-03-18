export function ApiPackaging() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="packaging-heading"
      style={{ backgroundColor: '#063040' }}
    >
      <div
        className="organic-blob-moss absolute w-[420px] h-[420px] -left-20 bottom-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.07, animationDelay: '3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#EAF044' }}
            >
              Sustainable Packaging
            </span>
            <h2
              id="packaging-heading"
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ color: '#ffffff' }}
            >
              Environmentally friendly and{' '}
              <span className="italic" style={{ color: '#EAF044' }}>biodegradable packaging.</span>
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              Thanks to our friends at Better Packaging Co., we can offer you discounted rates on
              compostable satchels. Looking for custom bags? That&apos;s an option, too.
            </p>
          </div>

          {/* Right — packaging visual */}
          <div
            className="rounded-3xl border p-10 flex flex-col items-center gap-6 text-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.10)' }}
            aria-hidden="true"
          >
            {/* Better Packaging Co badge */}
            <div
              className="px-4 py-2 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(234,240,68,0.15)', color: '#EAF044', border: '1px solid rgba(234,240,68,0.3)' }}
            >
              Partner: Better Packaging Co.
            </div>

            {/* Satchel options */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                { label: 'Compostable Satchel', note: 'Discounted rates', icon: '🌱' },
                { label: 'Custom Branded Bag', note: 'Available on request', icon: '✏️' },
                { label: 'Standard Satchel', note: 'From 500g to 5kg', icon: '📦' },
                { label: 'Biodegradable Mailer', note: 'Eco-certified', icon: '♻️' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-4 border text-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.10)' }}
                >
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="text-xs font-bold mb-0.5" style={{ color: '#ffffff' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>{item.note}</p>
                </div>
              ))}
            </div>

            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Enquire now to discuss packaging options for your business.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
