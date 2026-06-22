import './shipmate.css'
import { Metadata } from 'next'
import { ShipMateClientWrapper } from './ShipMateClientWrapper'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ShipMate | Free Shipping Platform for Small Business | MailPlus',
  description: 'ShipMate is the free MailPlus shipping platform — book pickups and express shipments, print labels in a few clicks, and manage every order in one dashboard.',
}

export default function ShipMatePlatformPage() {
  return (
    <ShipMateClientWrapper>


{/* ============= HERO ============= */}
<section className="hero">
  <div className="wrap breadcrumb-on-hero">
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link><span className="sep">/</span><Link href="/#services">Services</Link><span className="sep">/</span><span>ShipMate</span>
    </nav>
  </div>
  <div className="wrap">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="dot"></span> The free shipping platform</div>
          <h1>One dashboard.<br /><span className="hl">Every shipment.</span></h1>
          <p className="hero-lead hero-lead-hook">
            ShipMate is the free MailPlus shipping platform — book pickups, print labels in a few clicks, and manage every order in one place. Connects straight to Shopify and WooCommerce.
          </p>
          <div className="hero-cta-row">
            <a href="#enquire" className="btn btn-primary">Enquire now →</a>
            <a href="tel:1300656595" className="btn btn-secondary">Call 1300 65 65 95</a>
          </div>
          <div className="hero-meta">
            <span>Free platform</span>
            <span>No minimum volume</span>
            <span>Shopify &amp; WooCommerce</span>
            <span>Real-time tracking</span>
          </div>
        </div>

              <div className="hero-side">
        <img className="hero-img" src="/images/ShipMate%20Hero.png" alt="ShipMate mockup screenshot" />
      </div>
      </div>
  </div>
</section>

{/* ============= FACT BANNER (white, blue bold treatment, 4 facts) ============= */}
<section className="fact-banner-section">
  <div className="wrap">
    <div className="fact-banner">
      <div className="fact">
        <span className="fact-num">$0</span>
        <span className="fact-label">platform<br />no minimum volume</span>
      </div>
      <div className="fact">
        <span className="fact-num">Bulk</span>
        <span className="fact-label">labels, or create<br />them as you go</span>
      </div>
      <div className="fact">
        <span className="fact-num">2</span>
        <span className="fact-label">integrations<br />Shopify &amp; WooCommerce</span>
      </div>
      <div className="fact">
        <span className="fact-num">Real</span>
        <span className="fact-label">-time tracking<br />for you &amp; customers</span>
      </div>
    </div>
  </div>
</section>


{/* ============= ANSWER-FIRST INTRO BAND (AEO) ============= */}
<section className="intro-band">
  <div className="wrap">
    <div className="intro-band-inner">
      <div className="intro-band-label">Ship<span className="hl">Mate</span></div>
      <div className="intro-band-copy">
        <p><strong>ShipMate is the free MailPlus shipping platform — book pickups and express shipments, print labels in a few clicks, and manage orders in one dashboard.</strong> It connects to Shopify and WooCommerce, so online merchants can sync orders, print labels and track from a single place.</p>
        <div className="intro-more" id="introMore">
          <p>Connect Shopify or WooCommerce and your orders flow straight into ShipMate — no copying details across by hand. From there you can print shipping labels for multiple orders at once, in seconds, and manage every order from a single dashboard.</p>
          <p>ShipMate gives you discounted, flat-rate pricing across premium carriers in one place, with no minimum volume requirements. Google address lookup automatically validates suburb, state and postcode to prevent delivery delays and address errors, and you get real-time parcel tracking for you and your customers, with clear updates at every scan. You can also stay in contact with your local MailPlus operator through built-in messaging on the platform.</p>
          <p>ShipMate isn't just for online stores. It works for any business that needs reliable, affordable shipping — from dentists and law firms to schools and retail — used on its own to send something the moment it's urgent. Whether you connect a store integration or use ShipMate on its own, MailPlus is a reliable, independent alternative to Australia Post and traditional couriers.</p>
        </div>
        <button className="intro-toggle" id="introToggle" aria-expanded="false">
          <span className="it-text">Read more</span> <span className="it-caret">▾</span>
        </button>
      </div>
    </div>
  </div>
</section>

{/* ============= HOW IT WORKS ============= */}
<section className="section">
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">How ShipMate works</div>
      <h2>From your store to shipped, in four steps.</h2>
    </div>
    <div className="steps-grid">
      <div className="step-card">
        <div className="step-head"><span className="step-no">1</span><span className="sc-emoji">🔌</span></div>
        <h3>Connect your store</h3>
        <p>Link your Shopify or WooCommerce store to ShipMate — or just use the platform on its own for any business that needs shipping.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">2</span><span className="sc-emoji">🔄</span></div>
        <h3>Orders sync automatically</h3>
        <p>Your orders sync automatically, so labels and tracking are handled without manual entry — everything lands in one dashboard.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">3</span><span className="sc-emoji">🏷️</span></div>
        <h3>Print labels in a few clicks</h3>
        <p>Print shipping labels for multiple orders at once, in seconds, with no manual data entry — and choose from premium carriers on flat-rate pricing.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">4</span><span className="sc-emoji">📍</span></div>
        <h3>Pickup &amp; tracking, handled</h3>
        <p>Printing a label sends the job to your local owner-operator for pickup. From there, every major scan updates your dashboard, and built-in email updates keep your customers in the loop automatically.</p>
      </div>
    </div>
  </div>
</section>

{/* ============= INTEGRATIONS ============= */}
<section className="section" style={{ paddingTop: 0 }}>
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">Built for your business</div>
      <h2>Plug ShipMate into your store — or use it on its own.</h2>
      <p>Connect Shopify or WooCommerce for automatic order sync, or run ShipMate on its own for any business that needs reliable shipping.</p>
    </div>
    <div className="pillars">
      <div className="pillar featured">
        <span className="pillar-badge free">Most popular</span>
        <div className="pillar-icon v-express">🛍️<span className="icon-sub">🔄</span></div>
        <h3>Shopify</h3>
        <p>Your Shopify orders sync automatically, with customer details carried across — so labels are ready without any retyping.</p>
        <ul>
          <li>Orders sync automatically</li>
          <li>Bulk label printing in seconds</li>
          <li>Real-time tracking for you and your customers</li>
        </ul>
        <a href="#enquire" className="pillar-cta">Enquire now →</a>
      </div>
      <div className="pillar">
        <span className="pillar-badge po">Integration</span>
        <div className="pillar-icon v-po">🧩</div>
        <h3>WooCommerce</h3>
        <p>Running your store on WooCommerce? Connect it to ShipMate and your orders are ready to ship, labelled and tracked, without leaving the platform.</p>
        <ul>
          <li>Sync orders from your store</li>
          <li>Print labels in a few clicks</li>
          <li>One dashboard for every order</li>
        </ul>
        <a href="#enquire" className="pillar-cta">Enquire now →</a>
      </div>
      <div className="pillar">
        <span className="pillar-badge express">No store needed</span>
        <div className="pillar-icon v-free">🏢</div>
        <h3>Any business</h3>
        <p>No online store? No problem. Dentists, law firms, schools, retail — any business that needs to get something out the door can use ShipMate on its own, no integration required.</p>
        <ul>
          <li>No online store required</li>
          <li>Smart address validation built in</li>
          <li>Same dashboard, labels and tracking</li>
        </ul>
        <a href="#enquire" className="pillar-cta">Enquire now →</a>
      </div>
    </div>
  </div>
</section>

{/* ============= SPEC TABLE ============= */}
<section className="section" style={{ paddingTop: 0 }}>
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">The details</div>
      <h2>Everything ShipMate gives you.</h2>
    </div>
    <div className="spec-card">
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">💰</span> Price</div>
        <div className="sr-val"><span className="spec-val-strong">Free MailPlus shipping platform.</span> No minimum volume requirements. A collection fee may apply for lower-volume businesses, agreed upfront at signup.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">📦</span> What it does</div>
        <div className="sr-val">Book pickups and express shipments, print labels in a few clicks, and manage every order in one dashboard.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">🛍️</span> Integrations</div>
        <div className="sr-val"><span className="spec-val-strong">Shopify and WooCommerce.</span> Shopify orders sync automatically, so labels and tracking are handled without manual entry.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">🏢</span> Who it's for</div>
        <div className="sr-val">Any business that needs reliable shipping — online stores and offices alike, from dentists and law firms to schools and retail. No online store required.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">🚚</span> Carriers</div>
        <div className="sr-val">Discounted, flat-rate pricing across premium carriers in one place, with no minimum volume requirements.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">🏷️</span> Labels</div>
        <div className="sr-val">Print shipping labels for multiple orders at once, in seconds, with no manual data entry.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">✅</span> Address validation</div>
        <div className="sr-val">Google address lookup with automatic suburb, state and postcode validation to prevent delivery delays.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">📍</span> Tracking</div>
        <div className="sr-val">Real-time parcel tracking for you and your customers, with clear delivery updates at every scan.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">✉️</span> Customer updates</div>
        <div className="sr-val">Built-in email updates keep customers informed as their parcel moves. Shopify and WooCommerce stores also send their own automatic shipping updates.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">💬</span> Operator messaging</div>
        <div className="sr-val">Stay in contact with your local MailPlus operator through built-in messaging on the platform.</div>
      </div>
    </div>
  </div>
</section>

{/* ============= MID-PAGE CTA BAND ============= */}
<section className="section" style={{ paddingTop: 0 }}>
  <div className="wrap">
    <div className="cta-band">
      <div className="cta-band-text">
        <h2>Ready to ship smarter?</h2>
        <p>Enter your address and we'll check for a local MailPlus driver in your area, then get you set up on ShipMate — free to use, with no minimum volume.</p>
      </div>
      <div className="cta-band-actions">
        <a href="#enquire" className="btn btn-primary">Enquire now →</a>
        <a href="tel:1300656595" className="btn btn-call">Call 1300 65 65 95</a>
      </div>
    </div>
  </div>
</section>

{/* ============= FAQ ============= */}
<section className="section faq-section" id="faq">
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">Frequently asked questions</div>
      <h2>ShipMate, answered.</h2>
    </div>

    <div className="faq-list">
      <div className="faq-item">
        <button className="faq-q">What is ShipMate? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">ShipMate is the free MailPlus shipping platform. From one dashboard you can book pickups and express shipments, print labels in a few clicks, and manage every order in one place. It connects to Shopify and WooCommerce, gives you real-time tracking, and works on its own for any business that needs reliable shipping.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">How much does ShipMate cost? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">ShipMate is the free MailPlus shipping platform — there's no cost to use it and no minimum volume requirements. You get discounted, flat-rate pricing across premium carriers in one place. A collection fee may apply for lower-volume businesses, but it's agreed upfront at signup, so your pricing is always known in advance.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Does ShipMate integrate with Shopify? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Yes. ShipMate syncs your Shopify orders automatically, so labels and tracking are handled without manual entry. Orders flow straight into your dashboard, you can print shipping labels in bulk in seconds, and both you and your customers get real-time tracking. Setup is free and requires no technical expertise.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Does ShipMate work with WooCommerce? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Yes. ShipMate connects to your WooCommerce store, so your orders sync automatically and you can print labels and track shipments from one dashboard. You manage everything in a single place, with discounted flat-rate pricing across premium carriers and real-time tracking for you and your customers.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Can any type of business use ShipMate? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Yes. ShipMate works for any business that needs reliable, affordable shipping, not just online stores. As well as merchants on Shopify or WooCommerce, it suits any office or professional service — from dentists and medical practices to law firms, schools and retail — that needs to send something, including urgent items, using the platform on its own.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Can I connect ShipMate to my own systems? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">ShipMate is the platform you use directly to book, label and track. If you'd rather build shipping into your own systems with code, that's the <Link href="/mailplus-api">MailPlus API</Link>, which connects your systems directly to MailPlus for automated bookings, labels and tracking at scale. See the MailPlus API page for details.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Can my customers track their orders? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Yes. ShipMate gives real-time parcel tracking for you and your customers, with clear delivery updates at every scan. Built-in email updates keep your customers informed automatically as their parcel moves, and Shopify and WooCommerce stores also send their own shipping updates. You can follow every shipment from your dashboard.</div></div>
      </div>
    </div>
  </div>
</section>

{/* ============= ENQUIRY FORM ============= */}
<section className="section" id="enquire" style={{ paddingTop: 0 }}>
  <div className="wrap">
    <div className="enquiry-band">
      <div className="enquiry-grid">
        <div className="enquiry-left">
          <h2>Start shipping with ShipMate — this week.</h2>
          <p>Enter your address and we'll instantly check for a local MailPlus driver in your area, then connect you with your account manager to get set up on ShipMate. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
          <div className="enquiry-contacts">
            <a href="tel:1300656595" className="enquiry-contact">
              <div className="ec-ic">📞</div>
              <div>
                <div className="ec-lbl">Call us</div>
                <div className="ec-val mono">1300 65 65 95</div>
              </div>
            </a>
            <div className="enquiry-contact">
              <div className="ec-ic">🕘</div>
              <div>
                <div className="ec-lbl">Hours</div>
                <div className="ec-val">Mon–Fri, 9am–5pm AEST</div>
              </div>
            </div>
          </div>
        </div>

        <div className="enquiry-form">
          <div id="enquiryFormInner">
            <p className="ef-intro">Pop in your pickup address and we'll check for a local MailPlus driver in your area — then take you to the next step.</p>

            <div className="field-row">
              <div className="field-group">
                <label className="field-label">First name <span className="req">*</span></label>
                <input type="text" className="field-input" id="f-fname" />
              </div>
              <div className="field-group">
                <label className="field-label">Last name <span className="req">*</span></label>
                <input type="text" className="field-input" id="f-lname" />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Business name <span className="req">*</span></label>
              <input type="text" className="field-input" id="f-company" />
            </div>

            <div className="field-group">
              <label className="field-label">Pickup address <span className="req">*</span></label>
              <div className="addr-wrap">
                <span className="addr-pin" aria-hidden="true">📍</span>
                <input type="text" className="field-input addr-input" id="f-address" placeholder="Start typing your business address…" autoComplete="off" />
              </div>
              <p className="field-hint">We use this to find your local driver.</p>
              {/*  DEV NOTE: Attach Google Places Autocomplete to #f-address (Places API key + script required).
                   On a verified address selection, store the place_id / lat-lng on a hidden field for the
                   territory lookup. The submit handler below currently routes to a placeholder next page —
                   replace TERRITORY_CHECK_ENDPOINT and NEXT_PAGE_URL with the real territory-check service
                   and the "local driver found" page (Calendly + Account Manager intro).  */}
            </div>

            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Email <span className="req">*</span></label>
                <input type="email" className="field-input" id="f-email" />
              </div>
              <div className="field-group">
                <label className="field-label">Phone <span className="req">*</span></label>
                <input type="tel" className="field-input" id="f-phone" />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">What are you interested in? <span className="req">*</span></label>
              <select className="field-select" id="f-interest">
                <option value="">Please select…</option>
                <option>ShipMate &amp; express parcel delivery</option>
                <option>Shopify integration</option>
                <option>WooCommerce integration</option>
                <option>Post Office collect &amp; lodge</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Roughly how many parcels do you send a week? <span className="req">*</span></label>
              <select className="field-select" id="f-volume">
                <option value="">Please select…</option>
                <option>1–10 a week</option>
                <option>11–50 a week</option>
                <option>51–200 a week</option>
                <option>201–500 a week</option>
                <option>500+ a week</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <button className="form-submit" type="button">Enquire now →</button>
          </div>

          <div className="form-success" id="enquiryChecking">
            <div className="fs-ic checking">📍</div>
            <h3>Checking your area…</h3>
            <p>Looking for a local MailPlus driver near your pickup address. This will only take a moment.</p>
          </div>

          <div className="form-success" id="enquirySuccess">
            <div className="fs-ic">✓</div>
            <h3>Thanks — we've got it.</h3>
            <p>A member of the MailPlus team will be in touch within one business day. Need us sooner? Call <strong>1300 65 65 95</strong>, Mon–Fri 9am–5pm AEST.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ============= FOOTER (shared across all pages) ============= */}
    </ShipMateClientWrapper>
  )
}
