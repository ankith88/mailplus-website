import Link from 'next/link'

export function AdvantageSection() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-eyebrow">Three ways we save you <span className="hl-marker">time &amp; money</span></div>
          <h2>Hand us the parcels and the Post Office run.</h2>
          <p>Whether you&apos;re trying us free, shipping express at one flat rate, or handing over the Post Office run for every site — there&apos;s a MailPlus service that gives your team its time back and keeps your shipping costs down.</p>
        </div>

        <div className="pillars reveal-stagger">

          {/* PILLAR 1: 5 FREE COLLECTIONS */}
          <div className="pillar featured" id="five-free">
            <span className="pillar-badge free">★ Launch offer</span>
            <div className="pillar-icon v-free">💰<span className="icon-sub">🎁</span></div>
            <h3>5 Free Collections</h3>
            <p>Five collections, completely on us. A local owner-operator comes to you, collects your parcels and mail, and lodges them at the Post Office — so your team stops losing hours to the queue. No card, no catch.</p>
            <ul>
              <li>Five collections completely free</li>
              <li>No credit card, no obligation</li>
              <li>Win back the time spent queueing</li>
              <li>Same-day collection by your local driver</li>
            </ul>
            <Link href="/5-free-collections" className="pillar-cta">Claim your 5 free collections →</Link>
          </div>

          {/* PILLAR 2: EXPRESS DELIVERY + SHIPMATE */}
          <div className="pillar">
            <span className="pillar-badge express">Australia-wide</span>
            <div className="pillar-icon v-express">✈️<span className="icon-sub">📦</span></div>
            <h3>Express Parcel Delivery</h3>
            <p>Collected in Sydney today, delivered in Perth tomorrow. Flat-rate express across the whole country, up to 5kg — booked, labelled and tracked in ShipMate, our free shipping platform.</p>
            <ul>
              <li>Reach any address in Australia, fast</li>
              <li>One flat rate up to 5kg — no surprises</li>
              <li>Book, label and track in free ShipMate</li>
              <li>Syncs straight to Shopify &amp; WooCommerce</li>
            </ul>
            <Link href="#enquire" className="pillar-cta">Start shipping with ShipMate →</Link>
          </div>

          {/* PILLAR 3: POST OFFICE BRIDGE */}
          <div className="pillar">
            <span className="pillar-badge po">Multi-site &amp; corporate</span>
            <div className="pillar-icon v-po">🏢<span className="icon-sub">✉️</span></div>
            <h3>Post Office Collect &amp; Lodge</h3>
            <p>We run your Post Office for you, twice a day. An early-morning pickup delivers your inbound Australia Post mail and parcels so you start the day complete, and an end-of-day pickup lodges everything outbound — all handled by one trusted local operator across every site.</p>
            <ul>
              <li>Morning delivery of your inbound mail &amp; parcels (AMPO)</li>
              <li>End-of-day pickup for same-day lodgement (PMPO)</li>
              <li>PO Boxes cleared without leaving your desk</li>
              <li>Express banking runs handled, deposits lodged same-day</li>
              <li>The same trusted local operator, every site, every day</li>
            </ul>
            <Link href="#enquire" className="pillar-cta">Talk to us about your business →</Link>
          </div>

        </div>
      </div>
    </section>
  )
}
