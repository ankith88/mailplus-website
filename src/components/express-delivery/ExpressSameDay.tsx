export function ExpressSameDay() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="same-day-heading"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              Collections
            </span>
            <h2
              id="same-day-heading"
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ color: '#095c7b' }}
            >
              Guaranteed Same-Day{' '}
              <span className="italic" style={{ color: '#103d39' }}>Parcel Collections</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-5"
              style={{ color: 'rgba(16,61,57,0.75)' }}
            >
              We provide reliable, on-time parcel collections across all metropolitan and some
              regional areas.
            </p>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(16,61,57,0.75)' }}
            >
              With our dedicated local owner-operators, your parcels are always a priority, no
              matter your volume. Let us take the stress out of shipping, so you can concentrate
              on building your business.
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

          {/* Right — visual */}
          <div
            className="rounded-3xl border p-10 flex flex-col gap-5"
            style={{ backgroundColor: 'rgba(9,92,123,0.04)', borderColor: 'rgba(9,92,123,0.12)' }}
            aria-hidden="true"
          >
            {/* Mock collection card */}
            {[
              { time: 'Today, 9:15 am', label: 'Collected from your premises', status: 'Done', color: '#22C55E' },
              { time: 'Today, 11:00 am', label: 'Lodged at express facility', status: 'Done', color: '#22C55E' },
              { time: 'Tomorrow', label: 'Out for delivery to customer', status: 'In Transit', color: '#F59E0B' },
              { time: 'Tomorrow', label: 'Delivered to customer door', status: 'Pending', color: '#095c7b' },
            ].map((step) => (
              <div
                key={step.label}
                className="flex items-center justify-between rounded-2xl px-5 py-4 border"
                style={{ backgroundColor: '#ffffff', borderColor: 'rgba(9,92,123,0.10)' }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#103d39' }}>{step.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(16,61,57,0.55)' }}>{step.time}</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full flex-none ml-4"
                  style={{ backgroundColor: step.color, color: '#fff' }}
                >
                  {step.status}
                </span>
              </div>
            ))}

            <div
              className="rounded-2xl p-5 text-center"
              style={{ backgroundColor: 'rgba(234,240,68,0.15)', border: '1px solid rgba(234,240,68,0.4)' }}
            >
              <p className="text-2xl font-bold" style={{ color: '#095c7b' }}>1–2 Days</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(16,61,57,0.65)' }}>Express delivery, Australia-wide</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
