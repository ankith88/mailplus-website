export function AboutStory() {
  return (
    <section
      id="about-story"
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="story-heading"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div
        className="organic-blob-moss absolute w-[500px] h-[500px] -right-32 top-0 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div>
          <span
            className="text-xs font-bold tracking-widest uppercase mb-4 block"
            style={{ color: '#095c7b' }}
          >
            Our Story
          </span>
          <h2
            id="story-heading"
            className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
            style={{ color: '#095c7b' }}
          >
            A business built on one simple belief:{' '}
            <span className="italic" style={{ color: '#103d39' }}>
              logistics should be simple.
            </span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed" style={{ color: 'rgba(9,92,123,0.80)' }}>
            <p>
              MailPlus was born from a genuine frustration with Australia&apos;s courier industry.
              Too many missed pickups. Too many &ldquo;we tried to deliver&rdquo; cards. Too many
              businesses wasting hours chasing parcels instead of growing their business.
            </p>
            <p>
              So we decided to do something about it. MailPlus was founded in 2010 with a
              commitment to guaranteed same-day collections, 1–2 day express delivery, and
              real human support when things go wrong.
            </p>
            <p>
              Today, we serve small to medium-sized Aussie businesses from every industry —
              from boutique retailers and e-commerce stores to healthcare providers and
              professional services firms. Our franchisees are local business owners who
              take personal pride in their service territory.
            </p>
            <p>
              We&apos;re not a faceless multinational. We&apos;re your neighbours, and we show
              up every day because your business depends on it.
            </p>
          </div>
        </div>

        {/* Right — values */}
        <div className="space-y-5">
          {[
            {
              title: 'Guaranteed Same-Day Collections',
              body: 'We collect your parcels the same day, every day. No exceptions, no excuses. Your business runs on time — so do we.',
            },
            {
              title: '1–2 Day Express Delivery',
              body: 'Flat-rate prices on items up to 5kg (and up to 20kg). Express delivery across Australia — from Perth to Sydney overnight.',
            },
            {
              title: 'Free ShipMate Platform',
              body: 'Our free shipping platform gives you bulk label printing, Shopify integration, Google address validation, and access to discounted premium carriers — at no subscription cost.',
            },
            {
              title: 'Real Human Support',
              body: 'When you need help, you talk to a real person. Our customer service team is based in Australia and available Monday–Friday, 9am–5pm AEST.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6 flex gap-4 items-start"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <div
                className="w-2 h-2 rounded-full flex-none mt-2"
                style={{ backgroundColor: '#EAF044', boxShadow: '0 0 0 4px rgba(9,92,123,0.15)' }}
                aria-hidden="true"
              />
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>{item.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(9,92,123,0.72)' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
