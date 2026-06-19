'use client'

import Link from 'next/link'

export function HeroSection() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="dot"></span> Australian courier for small business
              </div>
              <h1>Ship overnight.<br /><span className="hl">Skip the queue.</span></h1>
              <p className="hero-lead hero-lead-hook">
                Fast, flat-rate delivery in 1–2 days Australia-wide — plus Post Office collect and lodge, all handled by your local owner-operator.
              </p>
              <div className="hero-cta-row">
                <Link href="#enquire" className="btn btn-primary">Check my area →</Link>
              </div>
            </div>

            <div className="hero-side">
              <div className="hero-placeholder" role="img" aria-label="Hero image placeholder">
                <div className="hero-placeholder-inner">
                  <span className="hp-icon">🖼️</span>
                  <span className="hp-title">Hero image placeholder</span>
                  <span className="hp-sub">Replace with final hero artwork</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fact-banner-section">
        <div className="wrap">
          <div className="fact-banner">
            <div className="fact">
              <span className="fact-num" data-count="300" data-prefix="~">~300</span>
              <span className="fact-label">vehicles on the road<br />nationwide</span>
            </div>
            <div className="fact">
              <span className="fact-num" data-pop>1–2</span>
              <span className="fact-label">day delivery<br />95% overnight</span>
            </div>
            <div className="fact">
              <span className="fact-num" data-pop>1</span>
              <span className="fact-label">flat rate<br />up to 5kg</span>
            </div>
            <div className="fact">
              <span className="fact-num">
                <strong style={{ fontWeight: 800 }} data-count="1997" data-from="1990">1997</strong>
              </span>
              <span className="fact-label">~30 years<br />experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-band">
        <div className="wrap">
          <div className="intro-band-inner">
            <div className="intro-band-label">Meet <span className="hl">MailPlus</span></div>
            <div className="intro-band-copy">
              <p><strong>MailPlus is an Australian courier and parcel delivery network founded in 1997</strong>, operating franchised territories across all metro areas and selected regional areas, with approximately 300 vehicles on the road.</p>
              <div className="intro-more" id="introMore">
                <p>We offer express parcel delivery in 1–2 business days Australia-wide — with 95% of shipments arriving overnight on business days — plus flat-rate pricing for items up to 5kg, same-day pickup through local owner-operators, and we bridge the gap between businesses and the Post Office — collecting and lodging mail and parcels on your behalf.</p>
                <p>The free MailPlus shipping platform, ShipMate, integrates with Shopify and WooCommerce. We&apos;re a reliable, independent alternative to Australia Post and traditional couriers.</p>
              </div>
              <button className="intro-toggle" id="introToggle" aria-expanded="false" aria-controls="introMore">
                <span className="it-text">Read more</span>
                <span className="it-icon">+</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
