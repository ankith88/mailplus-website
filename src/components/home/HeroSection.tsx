'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="dot"></span> Australian courier for small business
              </div>
              <h1>Ship <span className="hl-marker hl-marker-draw">overnight</span>.<br /><span className="hl">Skip the queue.</span></h1>
              <p className="hero-lead hero-lead-hook">
                Fast, flat-rate delivery in 1–2 days Australia-wide — plus Post Office collect and lodge, all handled by your local owner-operator.
              </p>
              <div className="hero-cta-row">
                <Link href="#enquire" className="btn btn-primary">Check my area →</Link>
              </div>
              <div className="hero-trust">
                <span className="ht-stars" aria-hidden="true">★★★★★</span>
                <span className="ht-text">5-star reviews from Aussie businesses</span>
              </div>
            </div>

            <div className="hero-side">
              <Image
                src="/images/Homepage Hero.png"
                alt="A MailPlus delivery van on a winding road with parcels, a clock, a kangaroo road sign and a location pin — fast, trackable parcel delivery for small business across Australia."
                width={600}
                height={500}
                className="hero-image"
                priority
              />
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
              <div 
                className={`intro-more ${isOpen ? 'open' : ''}`} 
                id="introMore"
                style={{ 
                  maxHeight: isOpen ? '500px' : '0px', 
                  opacity: isOpen ? 1 : 0,
                  margin: isOpen ? '8px 0' : '0'
                }}
              >
                <p>We offer express parcel delivery in 1–2 business days Australia-wide — with 95% of shipments arriving overnight on business days — plus flat-rate pricing for items up to 5kg, same-day pickup through local owner-operators, and we bridge the gap between businesses and the Post Office — collecting and lodging mail and parcels on your behalf.</p>
                <p>The free MailPlus shipping platform, ShipMate, integrates with Shopify and WooCommerce. We&apos;re a reliable, independent alternative to Australia Post and traditional couriers.</p>
              </div>
              <button 
                className={`intro-toggle ${isOpen ? 'open' : ''}`} 
                id="introToggle" 
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen} 
                aria-controls="introMore"
              >
                <span className="it-text">{isOpen ? 'Read less' : 'Read More'}</span>
                {isOpen && <span className="it-icon-close">×</span>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
