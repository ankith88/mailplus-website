import Link from 'next/link'

export function Shipping101Article() {
  return (
    <div className="py-16 px-6" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_300px] gap-16">

        {/* Article body */}
        <article className="prose-style" style={{ color: '#103d39' }}>

          {/* Intro */}
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(16,61,57,0.80)', fontSize: '1.125rem' }}>
            If you&apos;re a small business owner selling products online or in-store, shipping
            is one of the most important parts of your customer experience. Get it right and
            customers come back. Get it wrong and they won&apos;t. This guide covers everything
            you need to know to ship smarter — from packaging basics to choosing the right
            courier for your business.
          </p>

          {/* Featured customer */}
          <div
            className="rounded-2xl p-8 mb-12"
            style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#095c7b' }}>
              Customer Story
            </p>
            <blockquote className="text-base italic leading-relaxed mb-4" style={{ color: '#103d39' }}>
              &ldquo;Before MailPlus, I was making trips to the Post Office three times a week.
              Now my parcels are collected from the store every day and my customers receive
              them the next day. It&apos;s completely changed how I run my business.&rdquo;
            </blockquote>
            <p className="text-sm font-bold" style={{ color: '#095c7b' }}>Jules</p>
            <p className="text-xs" style={{ color: 'rgba(9,92,123,0.60)' }}>Parkes Ave Dispensary, Byron Bay</p>
          </div>

          <Section title="What is express shipping — and do I actually need it?">
            <p>
              Express shipping means your parcel arrives at its destination in 1–2 business days.
              For most small businesses, this is the gold standard — especially if you&apos;re
              competing with larger retailers who offer next-day delivery as standard.
            </p>
            <p>
              The short answer is: yes, you probably do need it. Studies consistently show that
              delivery speed is one of the top three reasons customers choose where to shop online.
              If your competitor offers faster shipping, you risk losing the sale.
            </p>
            <p>
              The good news is that express delivery doesn&apos;t have to be expensive. MailPlus
              offers national flat-rate pricing for express delivery on items up to 5kg — so you
              always know what you&apos;re paying, regardless of where in Australia your parcel
              is headed.
            </p>
          </Section>

          <Section title="Understanding shipping costs">
            <p>
              Shipping costs are typically calculated based on one of two things: dead weight
              (the actual weight of the parcel) or cubic weight (the space it takes up in a
              vehicle or aircraft). Carriers charge whichever is greater.
            </p>
            <p>
              For small businesses, the key is to minimise both. This means:
            </p>
            <ul>
              <li>Choosing packaging that fits your product snugly — avoid oversized boxes</li>
              <li>Using satchels instead of boxes for soft or flat items</li>
              <li>Keeping packaging materials lightweight</li>
              <li>Setting accurate product weights in your e-commerce store</li>
            </ul>
            <p>
              MailPlus Express uses simple flat-rate pricing — up to 500g, 1kg, 3kg, 5kg,
              and up to 20kg tiers — so you can price shipping confidently for your customers
              without complicated formulas.
            </p>
          </Section>

          <Section title="Choosing the right packaging">
            <p>
              Packaging protects your product and represents your brand. It&apos;s often the
              first physical touchpoint a customer has with your business after placing an order —
              so it matters.
            </p>
            <p>Here&apos;s a simple guide to choosing the right packaging:</p>

            <div className="rounded-2xl overflow-hidden border my-6" style={{ borderColor: 'rgba(9,92,123,0.12)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#095c7b', color: '#ffffff' }}>
                    <th className="text-left px-5 py-3 font-semibold">Packaging Type</th>
                    <th className="text-left px-5 py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Satchel (500g)', best: 'Clothing, accessories, small flat items' },
                    { type: 'Satchel (1kg)', best: 'Books, shoes, cosmetics, homewares' },
                    { type: 'Satchel (3kg)', best: 'Multiple items, heavier clothing, gifts' },
                    { type: 'Satchel (5kg)', best: 'Bulkier orders, multiple products' },
                    { type: 'Box', best: 'Fragile items, irregular shapes, heavy goods' },
                  ].map((row, i) => (
                    <tr key={row.type} style={{ backgroundColor: i % 2 === 0 ? '#f8faf8' : '#ffffff' }}>
                      <td className="px-5 py-3 font-medium" style={{ color: '#095c7b' }}>{row.type}</td>
                      <td className="px-5 py-3" style={{ color: 'rgba(16,61,57,0.72)' }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              MailPlus offers biodegradable satchels through our Better Packaging Co partnership —
              a great option for eco-conscious brands. Customers notice, and it makes a positive
              impression.
            </p>
          </Section>

          <Section title="Same-day collections: why they matter">
            <p>
              One of the biggest frustrations for small business owners is waiting for a
              courier to pick up — or worse, missing a collection window altogether. This
              creates delays and unhappy customers.
            </p>
            <p>
              MailPlus guarantees same-day collections, every business day. Your dedicated
              local owner-operator will collect your parcels the same day you book. This means:
            </p>
            <ul>
              <li>Orders placed before your cut-off time ship the same day</li>
              <li>Your customers receive their parcels in 1–2 days</li>
              <li>No more trips to the Post Office</li>
              <li>No missed pickup windows</li>
            </ul>
          </Section>

          <Section title="Setting up shipping in your online store">
            <p>
              If you&apos;re selling on Shopify, setting up MailPlus is straightforward.
              Install the free MailPlus ShipMate app from the Shopify App Store, connect it
              to your ShipMate account, and your orders will sync automatically.
            </p>
            <p>From there, you can:</p>
            <ul>
              <li>Print labels individually or in bulk</li>
              <li>Apply smart product weights automatically</li>
              <li>Send automated tracking notifications to your customers</li>
              <li>View all active shipments from one dashboard</li>
            </ul>
            <p>
              Not on Shopify? ShipMate works for any business — you can create labels manually
              through the platform or use our API to connect a custom system. It&apos;s
              completely free to use.
            </p>
          </Section>

          <Section title="How to handle returns">
            <p>
              Returns are a reality of online retail. Having a clear, simple returns process
              builds trust with customers and reduces the anxiety of buying online.
            </p>
            <p>A few tips for small businesses managing returns:</p>
            <ul>
              <li>Publish your returns policy clearly on your website before purchase</li>
              <li>Use pre-paid return labels for high-value or frequent return categories</li>
              <li>Include a returns slip inside every parcel</li>
              <li>Process refunds or exchanges quickly — customers remember how you handle problems</li>
            </ul>
          </Section>

          <Section title="Tracking and customer notifications">
            <p>
              Once a parcel leaves your hands, your customer wants to know where it is.
              &ldquo;Where is my order?&rdquo; (WISMO) queries are one of the most common
              forms of customer service enquiries for e-commerce businesses — and they&apos;re
              almost entirely preventable with good tracking notifications.
            </p>
            <p>
              MailPlus automatically sends SMS and email notifications to your customers at
              each stage of the delivery journey — from pickup through to delivery. This
              significantly reduces inbound support queries and improves your customer&apos;s
              experience with your brand.
            </p>
          </Section>

          <Section title="Common shipping mistakes small businesses make">
            <p>
              Even experienced operators make these — here&apos;s what to watch for:
            </p>
            <ul>
              <li><strong>Under-declaring parcel weight</strong> — always weigh your packed parcel, not just the product</li>
              <li><strong>Using the wrong packaging size</strong> — oversized packaging inflates cubic weight and cost</li>
              <li><strong>Not having a cut-off time</strong> — set a daily order cut-off and communicate it clearly to customers</li>
              <li><strong>Inconsistent address data</strong> — use Google address validation (built into ShipMate) to reduce failed deliveries</li>
              <li><strong>Leaving shipping to the last minute</strong> — build dispatch into your daily routine, not as an afterthought</li>
              <li><strong>Choosing the cheapest carrier, not the best</strong> — a delayed or damaged parcel costs more in customer service time than you save on postage</li>
            </ul>
          </Section>

          <Section title="Getting started with MailPlus">
            <p>
              If you&apos;re ready to simplify your shipping, MailPlus makes it easy to get
              started with no contracts, no minimum volumes, and no subscription fees.
            </p>
            <p>Here&apos;s how it works:</p>
            <ol>
              <li>Contact our team and we&apos;ll get your account set up — usually within 24 hours</li>
              <li>Log in to ShipMate (free) and connect your Shopify store or create labels manually</li>
              <li>Your local MailPlus owner-operator collects your parcels same-day</li>
              <li>Your customers receive their orders in 1–2 days with automatic tracking notifications</li>
            </ol>
            <p>
              You only pay for the labels you use. No lock-in contracts. No surprises.
            </p>
          </Section>

          {/* CTA */}
          <div
            className="rounded-2xl p-8 mt-12 text-center"
            style={{ backgroundColor: '#095c7b' }}
          >
            <p className="font-bold text-xl mb-2" style={{ color: '#ffffff' }}>
              Ready to ship smarter?
            </p>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.72)' }}>
              No contracts. No minimum volumes. Just reliable express delivery Australia-wide.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Enquire Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-28 space-y-6">

            {/* Table of contents */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <p className="font-bold text-sm mb-4" style={{ color: '#095c7b' }}>In this article</p>
              <nav aria-label="Article sections">
                <ol className="space-y-2">
                  {[
                    'What is express shipping?',
                    'Understanding shipping costs',
                    'Choosing the right packaging',
                    'Same-day collections',
                    'Setting up in your online store',
                    'How to handle returns',
                    'Tracking & notifications',
                    'Common mistakes to avoid',
                    'Getting started with MailPlus',
                  ].map((item, i) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(9,92,123,0.80)' }}>
                      <span className="font-bold flex-none" style={{ color: '#095c7b' }}>{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Related links */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'rgba(9,92,123,0.04)', border: '1px solid rgba(9,92,123,0.12)' }}
            >
              <p className="font-bold text-sm mb-4" style={{ color: '#095c7b' }}>Related Articles</p>
              <div className="space-y-3">
                <Link
                  href="/small-business/why-express-matters"
                  className="flex items-start gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: '#095c7b' }}
                >
                  <svg className="w-3.5 h-3.5 flex-none mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  Why Express Delivery Matters for Small Business
                </Link>
              </div>
            </div>

            {/* Services */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#095c7b' }}
            >
              <p className="font-bold text-sm mb-4" style={{ color: '#EAF044' }}>MailPlus Services</p>
              <div className="space-y-2">
                {[
                  { href: '/services/express-delivery', label: 'Express Delivery' },
                  { href: '/shipmate', label: 'ShipMate (Free Platform)' },
                  { href: '/services/shopify-integration', label: 'Shopify Integration' },
                  { href: '/services/post-office-solutions', label: 'Post Office Solutions' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    <svg className="w-3.5 h-3.5 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: '#095c7b' }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed" style={{ color: 'rgba(16,61,57,0.80)' }}>
        {children}
      </div>
    </section>
  )
}
