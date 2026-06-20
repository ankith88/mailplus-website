import type { Metadata } from 'next';
import Script from 'next/script';
import ExpressDeliveryClient from './ExpressDeliveryClient';
import { CustomSelect } from '@/components/shared/CustomSelect';
import './styles.css';

export const metadata: Metadata = {
  title: 'Express Parcel Delivery Australia | 1–2 Day Flat-Rate Courier | MailPlus',
  description: 'MailPlus Express delivers parcels in 1–2 business days Australia-wide with flat-rate pricing for items up to 5kg. Same-day pickup through local owner-operators, no lock-in contract, no minimum volume.',
  alternates: { canonical: 'https://mailplus.com.au/express-delivery' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ExpressDeliveryPage() {
  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Express parcel delivery",
  "name": "MailPlus Express Delivery",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MailPlus",
    "url": "https://mailplus.com.au",
    "telephone": "+61-1300-65-65-95",
    "foundingDate": "1997",
    "areaServed": "AU"
  },
  "areaServed": { "@type": "Country", "name": "Australia" },
  "description": "Fast, flat-rate express parcel delivery in 1–2 business days anywhere in Australia, for items up to 5kg, with same-day pickup through local owner-operators.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "description": "Flat-rate pricing for items up to 5kg. No lock-in contract and no minimum volume."
  }
}
) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast is MailPlus Express delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our express service delivers parcels in 1–2 business days anywhere in Australia, with 95% arriving overnight on business days. A local owner-operator collects from you the same day when booked before the daily cut-off, across all major cities and selected regional areas. From there, partnerships with leading carriers carry parcels the rest of the way nationwide."
      }
    },
    {
      "@type": "Question",
      "name": "What is the weight limit for MailPlus Express?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MailPlus Express flat-rate pricing applies to items up to 5kg, so your shipping costs stay predictable. Heavier items up to 20kg can also be sent. There are no volume minimums and no lock-in contract — the service suits small and medium businesses shipping a few parcels a week or several hundred."
      }
    },
    {
      "@type": "Question",
      "name": "How much does MailPlus Express cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MailPlus Express uses flat-rate pricing for items up to 5kg, so you pay one predictable rate with no surprise bills. There's no monthly fee, no lock-in contract, and no minimum volume. A collection fee may apply for lower-volume businesses — but it's agreed upfront, so you always know exactly what you'll pay."
      }
    },
    {
      "@type": "Question",
      "name": "Does MailPlus Express integrate with Shopify?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. MailPlus integrates with Shopify and WooCommerce through its free ShipMate platform. Orders sync automatically, labels print in a few clicks, and tracking updates in real time. Setup is free and requires no technical expertise. For larger operations, the MailPlus API connects your own systems directly for automated bookings at scale."
      }
    },
    {
      "@type": "Question",
      "name": "How is MailPlus Express different from Australia Post?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's the partnership. Your collection is handled by a local owner-operator with a real stake in your business — and when you need a hand, our head-office team answers fast. Real Australian people, no hold queues, no bots. You're a partner we know, not a number — backed by flat-rate pricing up to 5kg."
      }
    }
  ]
}
) }} />
      <div className="express-delivery-page">
        
<div className="wrap">
  <nav className="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a><span className="sep">/</span><a href="/#services">Services</a><span className="sep">/</span><span>Express Delivery</span>
  </nav>
</div>


<section className="hero">
  <div className="wrap">
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span className="dot"></span> Express parcel delivery</div>
        <h1>Sent today.<br/><span className="hl">There tomorrow.</span></h1>
        <p className="hero-lead hero-lead-hook">
          Get your parcels across Australia in 1–2 business days, at one flat rate up to 5kg — with same-day pickup from your local owner-operator.
        </p>
        <div className="hero-cta-row">
          <a href="#enquire" className="btn btn-primary">Check for a driver near you →</a>
          <a href="tel:1300656595" className="btn btn-secondary">Call 1300 65 65 95</a>
        </div>
      </div>

      <div className="hero-side">
        <div className="hero-card">
          <h2>Express at a glance</h2>
          <p className="hc-sub">Everything you need to ship with confidence.</p>
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-benefit">Sent today, there tomorrow</div>
              <div className="stat-proof"><span className="num">1–2</span><span className="num-suffix">days</span><span className="lbl">Australia-wide</span></div>
            </div>
            <div className="stat">
              <div className="stat-benefit">Usually there next day</div>
              <div className="stat-proof"><span className="num" data-count="95" data-prefix="">95</span><span className="num-suffix">%</span><span className="lbl">overnight on business days</span></div>
            </div>
            <div className="stat">
              <div className="stat-benefit">No surprise bills, no lock-in</div>
              <div className="stat-proof"><span className="num">1</span><span className="num-suffix">flat rate</span><span className="lbl">up to 5kg</span></div>
            </div>
            <div className="stat">
              <div className="stat-benefit">Nationwide reach</div>
              <div className="stat-proof"><span className="num">Every</span><span className="num-suffix">postcode</span><span className="lbl">via leading carriers</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="intro-band">
  <div className="wrap">
    <div className="intro-band-inner">
      <div className="intro-band-label">Express <span className="hl">delivery</span></div>
      <div className="intro-band-copy">
        <p><strong>Our express service gets your parcels anywhere in Australia in 1–2 business days, with 95% of shipments arriving overnight on business days and flat-rate pricing for items up to 5kg.</strong> Your local owner-operator collects the same day when you book before the daily cut-off.</p>
        <div className="intro-more" id="introMore">
          <p>Pickup is handled by a local owner-operator in your area — a network of approximately 300 drivers covering all major cities, including Sydney, Melbourne, Brisbane, Perth and Adelaide, plus selected regional areas. From there, our partnerships with leading carriers carry your parcel the rest of the way, so you get reliable 1–2 day delivery anywhere in the country.</p>
          <p>Even though carriers handle the line-haul, MailPlus stays your single point of contact — we look after the tracking and customer service for every shipment, so you're never left chasing a third party. There's no lock-in contract and no minimum volume, so the service suits businesses shipping a few parcels a week or several hundred.</p>
          <p>It all works hand in hand with ShipMate, our free shipping platform — book pickups, print labels in a few clicks, and manage every order in one dashboard. Plug it straight into Shopify or WooCommerce, or just use it on its own. MailPlus is a reliable, independent alternative to Australia Post and traditional couriers.</p>
        </div>
        <button className="intro-toggle" id="introToggle" aria-expanded="false">
          <span className="it-text">Read more</span> <span className="it-caret">▾</span>
        </button>
      </div>
    </div>
  </div>
</section>


<section className="section">
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">How Express works</div>
      <h2>From your door to theirs, in four steps.</h2>
    </div>
    <div className="steps-grid">
      <div className="step-card">
        <div className="step-head"><span className="step-no">1</span><span className="sc-emoji">📅</span></div>
        <h3>Print labels in seconds</h3>
        <p>This sends a job to your local driver automatically. Once they accept, your ShipMate dashboard updates — no guessing, no wondering.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">2</span><span className="sc-emoji">🚚</span></div>
        <h3>Same-day collection</h3>
        <p>Your local owner-operator collects from your premises the same day, as long as it's booked before the daily cut-off time for your area.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">3</span><span className="sc-emoji">✈️</span></div>
        <h3>Into the express network</h3>
        <p>Your parcel moves through the national express network for delivery in 1–2 business days, anywhere in Australia.</p>
      </div>
      <div className="step-card">
        <div className="step-head"><span className="step-no">4</span><span className="sc-emoji">📍</span></div>
        <h3>Delivered &amp; tracked</h3>
        <p>You and your customer get real-time tracking with clear updates at every scan, right through to delivery.</p>
      </div>
    </div>
  </div>
</section>


<section className="section" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">The details</div>
      <h2>Everything Express covers.</h2>
    </div>
    <div className="spec-card">
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">⚡</span> Delivery speed</div>
        <div className="sr-val"><span className="spec-val-strong">1–2 business days</span>&nbsp;anywhere in Australia — 95% of shipments arrive overnight on business days.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">💰</span> Pricing</div>
        <div className="sr-val"><span className="spec-val-strong">Flat-rate pricing for items up to 5kg.</span>&nbsp;No surprise bills. Heavier items up to 20kg can also be sent.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">🚚</span> Pickup</div>
        <div className="sr-val">Same-day collection through your local owner-operator, booked before the daily cut-off.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">📄</span> Contract</div>
        <div className="sr-val">No lock-in contract and no minimum volume — you only pay for what you send.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">📦</span> Platform</div>
        <div className="sr-val">Free ShipMate platform — book pickups, print labels in a few clicks, and manage orders in one dashboard.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">🛍️</span> Integrations</div>
        <div className="sr-val">Integrates with Shopify and WooCommerce, plus a MailPlus API for automated bookings at scale.</div>
      </div>
      <div className="spec-row">
        <div className="sr-key"><span className="sr-ic">📍</span> Tracking</div>
        <div className="sr-val">Real-time parcel tracking for you and your customers, with clear delivery updates at every scan.</div>
      </div>
    </div>
  </div>
</section>


<section className="section" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="coverage-band">
      <h2>Australia-wide coverage, delivered locally.</h2>
      <p>MailPlus operates franchised territories across all metro areas and selected regional areas, with approximately 300 vehicles on the road. Your collection is always handled by a local owner-operator who knows your area.</p>
      <div className="chip-group">
        <span className="chip-label">Major cities</span>
        <div className="city-chips">
          <span className="city-chip"><span className="cc-dot"></span> Sydney</span>
          <span className="city-chip"><span className="cc-dot"></span> Melbourne</span>
          <span className="city-chip"><span className="cc-dot"></span> Brisbane</span>
          <span className="city-chip"><span className="cc-dot"></span> Perth</span>
          <span className="city-chip"><span className="cc-dot"></span> Adelaide</span>
          <span className="city-chip"><span className="cc-dot"></span> Canberra</span>
          <span className="city-chip"><span className="cc-dot"></span> Darwin</span>
        </div>
      </div>
      <div className="chip-group">
        <span className="chip-label">Plus areas including</span>
        <div className="city-chips">
          <span className="city-chip"><span className="cc-dot"></span> Sunshine Coast</span>
          <span className="city-chip"><span className="cc-dot"></span> Central Coast</span>
          <span className="city-chip"><span className="cc-dot"></span> Geelong</span>
          <span className="city-chip"><span className="cc-dot"></span> Byron Bay</span>
          <span className="city-chip"><span className="cc-dot"></span> Southeast Queensland</span>
        </div>
      </div>
      <p className="coverage-note">Enter your address below to check for a local MailPlus driver in your area.</p>
    </div>
  </div>
</section>


<section className="section faq-section" id="faq">
  <div className="wrap">
    <div className="section-head">
      <div className="section-eyebrow">Frequently asked questions</div>
      <h2>Express delivery, answered.</h2>
    </div>

    <div className="faq-list">
      <div className="faq-item">
        <button className="faq-q">How fast is MailPlus Express delivery? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Our express service delivers parcels in 1–2 business days anywhere in Australia, with 95% arriving overnight on business days. A local owner-operator collects from you the same day when booked before the daily cut-off, across all major cities and selected regional areas. From there, partnerships with leading carriers carry parcels the rest of the way nationwide.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">What is the weight limit for MailPlus Express? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">MailPlus Express flat-rate pricing applies to items up to 5kg, so your shipping costs stay predictable. Heavier items up to 20kg can also be sent. There are no volume minimums and no lock-in contract — the service suits small and medium businesses shipping a few parcels a week or several hundred.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">How much does MailPlus Express cost? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">MailPlus Express uses flat-rate pricing for items up to 5kg, so you pay one predictable rate with no surprise bills. There's no monthly fee, no lock-in contract, and no minimum volume. A collection fee may apply for lower-volume businesses — but it's agreed upfront, so you always know exactly what you'll pay.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">Does MailPlus Express integrate with Shopify? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Yes. MailPlus integrates with Shopify and WooCommerce through its free ShipMate platform. Orders sync automatically, labels print in a few clicks, and tracking updates in real time. Setup is free and requires no technical expertise. For larger operations, the MailPlus API connects your own systems directly for automated bookings at scale.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q">How is MailPlus Express different from Australia Post? <span className="faq-toggle">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">It's the partnership. Your collection is handled by a local owner-operator with a real stake in your business — and when you need a hand, our head-office team answers fast. Real Australian people, no hold queues, no bots. You're a partner we know, not a number — backed by flat-rate pricing up to 5kg.</div></div>
      </div>
    </div>
  </div>
</section>


<section className="section" id="enquire" style={{"paddingTop":"0"}}>
  <div className="wrap">
    <div className="enquiry-band">
      <div className="enquiry-grid">
        <div className="enquiry-left">
          <h2>Start shipping with MailPlus — this week.</h2>
          <p>Enter your address and we'll instantly check for a local MailPlus driver in your area, then connect you with your account manager to get set up. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
          <div className="enquiry-contacts">
            <a href="tel:1300656595" className="enquiry-contact">
              <div className="ec-ic">📞</div>
              <div>
                <div className="ec-lbl">Call us</div>
                <div className="ec-val mono">1300 65 65 95</div>
              </div>
            </a>
            <a href="https://customer.mailplus.com.au/" className="enquiry-contact" target="_blank" rel="noopener noreferrer">
              <div className="ec-ic">🔑</div>
              <div>
                <div className="ec-lbl">Existing customer</div>
                <div className="ec-val">ShipMate Login</div>
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
              <CustomSelect
                id="f-interest"
                triggerClassName="field-select"
                options={[
                  { value: 'Express parcel delivery & ShipMate', label: 'Express parcel delivery & ShipMate' },
                  { value: 'Post Office collect & lodge', label: 'Post Office collect & lodge' },
                  { value: 'Multi-site / corporate services', label: 'Multi-site / corporate services' },
                  { value: 'Something else', label: 'Something else' },
                ]}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Roughly how many parcels do you send a week? <span className="req">*</span></label>
              <CustomSelect
                id="f-volume"
                triggerClassName="field-select"
                options={[
                  { value: '1–10 a week', label: '1–10 a week' },
                  { value: '11–50 a week', label: '11–50 a week' },
                  { value: '51–200 a week', label: '51–200 a week' },
                  { value: '201–500 a week', label: '201–500 a week' },
                  { value: '500+ a week', label: '500+ a week' },
                  { value: 'Not sure yet', label: 'Not sure yet' },
                ]}
              />
            </div>

            <button className="form-submit">Check my area →</button>
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


      </div>
      <ExpressDeliveryClient />
    </>
  );
}
