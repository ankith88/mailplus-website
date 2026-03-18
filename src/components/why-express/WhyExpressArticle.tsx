import Link from 'next/link'

export function WhyExpressArticle() {
  return (
    <div className="py-16 px-6" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_300px] gap-16">

        {/* Article body */}
        <article className="prose-style" style={{ color: '#103d39' }}>

          {/* Intro */}
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(16,61,57,0.80)', fontSize: '1.125rem' }}>
            In a world where Amazon Prime has trained customers to expect next-day delivery as
            standard, small businesses face a real challenge: match that expectation, or risk
            losing the sale. The good news is that fast delivery is no longer just for the big
            players. With the right courier partner, any small business can offer express delivery
            Australia-wide — at flat-rate prices, with no contracts required.
          </p>

          {/* Stat callout */}
          <div
            className="rounded-2xl p-8 mb-12"
            style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#095c7b' }}>
              The Research Says
            </p>
            <blockquote className="text-base italic leading-relaxed mb-4" style={{ color: '#103d39' }}>
              &ldquo;Delivery speed is one of the top three reasons customers choose where to shop
              online. 56% of shoppers aged 18–34 have abandoned a cart because the delivery
              options weren&apos;t fast enough.&rdquo;
            </blockquote>
            <p className="text-xs" style={{ color: 'rgba(9,92,123,0.60)' }}>
              Metapack, Global E-Commerce Delivery Consumer Research
            </p>
          </div>

          <Section title="Delivery speed shapes buying decisions">
            <p>
              Most small business owners focus on product quality, pricing, and marketing — and
              rightly so. But delivery is often the final deciding factor in a purchase. When a
              customer is choosing between two similar products at a similar price, the one that
              arrives faster almost always wins.
            </p>
            <p>
              Research consistently shows that delivery speed ranks in the top three purchase
              considerations for online shoppers. It&apos;s not just about convenience —
              it&apos;s about confidence. A fast delivery estimate signals to a customer that
              your business is organised, reliable, and professional.
            </p>
            <p>
              Slow delivery, on the other hand, creates anxiety. Customers start wondering:
              has it been sent? Will it arrive in time? This doubt leads to more &ldquo;Where
              is my order?&rdquo; enquiries, lower satisfaction scores, and fewer return purchases.
            </p>
          </Section>

          <Section title="The hidden cost of slow delivery">
            <p>
              It&apos;s easy to see the cost of express delivery on a label — but the cost of
              slow delivery is hidden across your business:
            </p>
            <ul>
              <li><strong>Lost sales</strong> — customers who see a 5–7 day delivery estimate often don&apos;t complete the purchase</li>
              <li><strong>Cart abandonment</strong> — over half of under-35 shoppers have abandoned carts due to slow shipping options</li>
              <li><strong>Customer service load</strong> — WISMO (Where Is My Order?) queries spike with every day of extra transit time</li>
              <li><strong>Returns</strong> — customers who receive gifts or time-sensitive items late are more likely to return them</li>
              <li><strong>Repeat purchase rate</strong> — customers who receive fast, reliable deliveries are significantly more likely to reorder</li>
            </ul>
            <p>
              When you add up these costs, the premium for express delivery often pays for
              itself — and then some.
            </p>
          </Section>

          <Section title="What customers actually expect in 2024">
            <p>
              Expectations have shifted dramatically in the past five years. Here&apos;s what
              today&apos;s online shoppers consider &ldquo;normal&rdquo;:
            </p>

            <div className="rounded-2xl overflow-hidden border my-6" style={{ borderColor: 'rgba(9,92,123,0.12)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#095c7b', color: '#ffffff' }}>
                    <th className="text-left px-5 py-3 font-semibold">Delivery Speed</th>
                    <th className="text-left px-5 py-3 font-semibold">Customer Expectation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { speed: 'Same day', expectation: 'Considered premium; strong competitive advantage' },
                    { speed: '1–2 business days', expectation: 'The new standard — what most customers expect as baseline' },
                    { speed: '3–5 business days', expectation: 'Acceptable for large/heavy items; creates friction for impulse purchases' },
                    { speed: '5–7+ business days', expectation: 'Often results in cart abandonment or post-purchase regret' },
                  ].map((row, i) => (
                    <tr key={row.speed} style={{ backgroundColor: i % 2 === 0 ? '#f8faf8' : '#ffffff' }}>
                      <td className="px-5 py-3 font-medium" style={{ color: '#095c7b' }}>{row.speed}</td>
                      <td className="px-5 py-3" style={{ color: 'rgba(16,61,57,0.72)' }}>{row.expectation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The shift to 1–2 days as the expected baseline is significant for small businesses.
              Until recently, express delivery was positioned as a premium add-on. Now,
              it&apos;s increasingly what customers expect by default — especially in metro areas.
            </p>
          </Section>

          <Section title="Why standard post is holding your business back">
            <p>
              Many small businesses default to Australia Post for shipping — often because
              it&apos;s familiar, or because they haven&apos;t explored alternatives. But
              standard post has real limitations:
            </p>
            <ul>
              <li>Transit times of 3–7+ business days for many routes</li>
              <li>No guaranteed collection — you have to take parcels to the Post Office</li>
              <li>Variable pricing that can be hard to predict</li>
              <li>Limited tracking visibility between scans</li>
              <li>No dedicated local contact if something goes wrong</li>
            </ul>
            <p>
              For businesses selling products where delivery speed matters — gifts, fashion,
              perishables, time-sensitive items — standard post puts you at a structural
              disadvantage against larger competitors.
            </p>
          </Section>

          <Section title="How same-day collection changes everything">
            <p>
              One of the most underappreciated advantages of MailPlus Express isn&apos;t
              the delivery speed — it&apos;s the collection guarantee. MailPlus guarantees
              same-day pickup every business day. Your dedicated local owner-operator comes
              to you.
            </p>
            <p>
              This matters more than most businesses realise. Without guaranteed same-day
              collection, your &ldquo;1–2 day delivery&rdquo; promise can easily become
              3–4 days in practice, because parcels sit waiting for pickup. With MailPlus:
            </p>
            <ul>
              <li>Orders placed before your cut-off time ship the same day</li>
              <li>No trips to the Post Office</li>
              <li>No missed pickup windows</li>
              <li>Your customers receive their parcels in 1–2 days — consistently</li>
            </ul>
            <p>
              Consistency is the key word here. Customers remember outliers. A single
              package that takes 6 days can undo months of good delivery performance
              in that customer&apos;s mind.
            </p>
          </Section>

          <Section title="Offering express delivery without absorbing the cost">
            <p>
              A common objection from small business owners is the cost: &ldquo;I
              can&apos;t afford to offer express delivery — my margins are too thin.&rdquo;
              But the maths is often more favourable than people expect.
            </p>
            <p>
              There are three approaches:
            </p>
            <ul>
              <li>
                <strong>Pass the cost on</strong> — many customers are willing to pay a
                premium for express delivery. Offer it as a paid upgrade at checkout.
              </li>
              <li>
                <strong>Build it in</strong> — incorporate your express delivery cost into
                product pricing. Many businesses find this simplifies the customer experience
                (&ldquo;free express shipping&rdquo;) and increases conversion.
              </li>
              <li>
                <strong>Set a free shipping threshold</strong> — offer free express shipping
                above a minimum order value. This increases average order value while covering
                your delivery cost.
              </li>
            </ul>
            <p>
              MailPlus national flat-rate pricing makes this straightforward. Because the
              price is fixed by weight tier — not by distance — you can price your shipping
              confidently without complex calculations.
            </p>
          </Section>

          <Section title="Express delivery as a brand statement">
            <p>
              There&apos;s a subtler benefit to offering express delivery that&apos;s worth
              considering: it signals something about your brand.
            </p>
            <p>
              When a customer sees &ldquo;1–2 day express delivery Australia-wide&rdquo;
              on your website, it communicates that you&apos;re organised, customer-focused,
              and capable of delivering a premium experience. It builds trust before the
              customer has even placed an order.
            </p>
            <p>
              Conversely, slow or inconsistent delivery sends the opposite signal — regardless
              of how good your product is. In a competitive market, your fulfilment
              experience is part of your product.
            </p>
          </Section>

          <Section title="How MailPlus makes it simple">
            <p>
              MailPlus Express is designed specifically for small and medium-sized businesses
              that need reliable express delivery without the complexity of enterprise
              logistics contracts.
            </p>
            <ul>
              <li><strong>No contracts</strong> — start and stop whenever you need to</li>
              <li><strong>No minimum volumes</strong> — send one parcel or a hundred</li>
              <li><strong>Free ShipMate platform</strong> — manage labels, track shipments, and connect Shopify in minutes</li>
              <li><strong>Guaranteed same-day collection</strong> — your local owner-operator comes to you</li>
              <li><strong>National flat-rate pricing</strong> — predictable costs, no surprises</li>
              <li><strong>Automated customer notifications</strong> — SMS and email updates at every stage</li>
              <li><strong>1–2 day delivery Australia-wide</strong> — reliable, every time</li>
            </ul>
          </Section>

          {/* CTA */}
          <div
            className="rounded-2xl p-8 mt-12 text-center"
            style={{ backgroundColor: '#095c7b' }}
          >
            <p className="font-bold text-xl mb-2" style={{ color: '#ffffff' }}>
              Ready to offer express delivery?
            </p>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.72)' }}>
              No contracts. No minimum volumes. Guaranteed same-day collections and 1–2 day delivery Australia-wide.
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
                    'Delivery speed shapes buying decisions',
                    'The hidden cost of slow delivery',
                    'What customers expect in 2024',
                    'Why standard post holds you back',
                    'How same-day collection changes everything',
                    'Express delivery without absorbing the cost',
                    'Express delivery as a brand statement',
                    'How MailPlus makes it simple',
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
                  href="/small-business/shipping-101"
                  className="flex items-start gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: '#095c7b' }}
                >
                  <svg className="w-3.5 h-3.5 flex-none mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  Shipping 101 for Small Business
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
