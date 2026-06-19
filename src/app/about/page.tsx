import type { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'
import AboutClient from './AboutClient'
import { CustomSelect } from '@/components/shared/CustomSelect'
import './styles.css'

export const metadata: Metadata = {
  title: 'About MailPlus — Australian Courier for Small Business Since 1997',
  description:
    'MailPlus is an Australian express parcel delivery network for small business, founded in 1997 by Chris Burgess. Around 300 local owner-operators, flat-rate pricing up to 5kg, 1–2 day delivery, Post Office collect & lodge, and free Shopify & WooCommerce integration.',
  alternates: { canonical: 'https://mailplus.com.au/about' },
}

export default function AboutPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When was MailPlus founded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus was founded in 1997 and has been operating for almost 30 years. It began when founder Chris Burgess spotted a gap in the logistics industry for collecting and lodging business mail, and grew it into an Australian express parcel network with approximately 300 vehicles on the road today."
        }
      },
      {
        "@type": "Question",
        "name": "Who owns and runs MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus was founded by Chris Burgess, who remains its Managing Director. The business runs on a local owner-operator model: alongside the head-office team, around 300 dedicated owner-operators run their own territories, collecting and delivering for the businesses in their area as a consistent personal point of contact."
        }
      },
      {
        "@type": "Question",
        "name": "What does MailPlus do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus is an Australian express parcel delivery network for small business. It spans three connected services: express delivery in 1–2 business days Australia-wide, Post Office collect and lodge so you skip the queue, and same-day local hand-to-hand delivery. For shipping, the free ShipMate platform handles labels, bookings and tracking in one place."
        }
      },
      {
        "@type": "Question",
        "name": "Where does MailPlus operate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus operates franchised territories across all Australian metro areas and selected regional areas, with approximately 300 vehicles on the road. This includes Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra and Darwin, plus areas such as the Sunshine Coast, Central Coast, Geelong, Byron Bay and Southeast Queensland."
        }
      },
      {
        "@type": "Question",
        "name": "What makes MailPlus different from other couriers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus pairs a dedicated local owner-operator who knows your business with flat-rate pricing up to 5kg and same-day collection. It also bridges your business and the Post Office — collecting, lodging and clearing PO Boxes — with a local head-office support team that answers fast, with no long hold times and no bots."
        }
      }
    ]
  }

  const orgSchemaData = {
    "@context": "https://schema.org",
    "@type": [
      "Organization",
      "LocalBusiness"
    ],
    "name": "MailPlus",
    "url": "https://mailplus.com.au",
    "foundingDate": "1997",
    "founder": {
      "@type": "Person",
      "name": "Chris Burgess",
      "jobTitle": "Founder & Managing Director",
      "image": "https://mailplus.com.au/chris-burgess-founder.jpg"
    },
    "telephone": "+61-1300-65-65-95",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sydney",
      "addressRegion": "NSW",
      "addressCountry": "AU"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "description": "MailPlus is an Australian courier and parcel delivery network founded in 1997, operating franchised territories across all metro areas and selected regional areas, with approximately 300 vehicles on the road. We offer a range of services, from express parcel delivery in 1–2 business days Australia-wide with flat-rate pricing for items up to 5kg, to same-day pickup through local owner-operators. MailPlus also bridges the gap between businesses and the Post Office — collecting and lodging mail and parcels on their behalf — and provides local hand-to-hand deliveries. Customers can book pickups and deliveries online, or set up a scheduled service so they don’t need to book at all. The free MailPlus shipping platform, ShipMate, integrates with Shopify and WooCommerce for online merchants. MailPlus serves small and medium-sized businesses as a reliable, independent alternative to Australia Post and traditional couriers.",
    "slogan": "A reliable, independent alternative to traditional couriers",
    "openingHours": "Mo-Fr 09:00-17:00",
    "knowsAbout": [
      "express parcel delivery",
      "Post Office collect and lodge",
      "same-day local delivery",
      "e-commerce shipping",
      "Shopify and WooCommerce integration"
    ]
  }

  const aboutSchemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About MailPlus",
    "url": "https://mailplus.com.au/about-mailplus/",
    "about": {
      "@type": "Organization",
      "name": "MailPlus",
      "foundingDate": "1997"
    }
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <div className="about-page">
        {/* ============= HERO ============= */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-eyebrow">
                  <span className="dot"></span> About MailPlus
                </div>
                <h1>A local courier built<br /><span className="hl">for small business.</span></h1>
                <p className="hero-lead hero-lead-hook">
                  Since 1997, MailPlus has helped Australian businesses ship smarter — with local owner-operators, flat-rate pricing and a real team behind every parcel.
                </p>
                <div className="hero-cta-row">
                  <a href="#story" className="btn btn-primary">Our story →</a>
                  <a href="#enquire" className="btn btn-secondary">Enquire now</a>
                </div>
              </div>
              <div className="hero-side">
                <div className="hero-card">
                  <h2>MailPlus at a glance</h2>
                  <p className="hc-sub">The facts, stated the same way everywhere.</p>
                  <div className="vs-list">
                    <div className="vs-row">
                      <div className="vs-get">Founded in 1997</div>
                      <div className="vs-not">almost 30 years keeping Aussie business moving</div>
                    </div>
                    <div className="vs-row">
                      <div className="vs-get">~300 vehicles on the road</div>
                      <div className="vs-not">local owner-operators across Australia</div>
                    </div>
                    <div className="vs-row">
                      <div className="vs-get">1–2 day delivery, flat-rate to 5kg</div>
                      <div className="vs-not">95% of shipments arrive overnight</div>
                    </div>
                    <div className="vs-row">
                      <div className="vs-get">An independent alternative</div>
                      <div className="vs-not">to Australia Post and traditional couriers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= ANSWER-FIRST INTRO BAND (AEO) ============= */}
        <section className="intro-band">
          <div className="wrap">
            <div className="intro-band-inner">
              <div className="intro-band-label">Who <span className="hl">MailPlus</span> is</div>
              <div className="intro-band-copy">
                <p><strong>MailPlus is an Australian express parcel delivery network for small business, founded in 1997, with approximately 300 vehicles on the road.</strong></p>
                <p>We offer a range of services, from express parcel delivery in 1–2 business days Australia-wide with flat-rate pricing for items up to 5kg, to same-day pickup through local owner-operators. MailPlus also bridges the gap between businesses and the Post Office — collecting and lodging mail and parcels on their behalf — and provides local hand-to-hand deliveries.</p>
                <div className="intro-more" id="introMore">
                  <p>Customers can book pickups and deliveries online, or set up a scheduled service so they don’t need to book at all. The free MailPlus shipping platform, ShipMate, integrates with Shopify and WooCommerce for online merchants.</p>
                  <p>MailPlus serves small and medium-sized businesses as a reliable, independent alternative to Australia Post and traditional couriers.</p>
                </div>
                <button className="intro-toggle" id="introToggle" aria-expanded="false">
                  <span className="it-text">Read more</span> <span className="it-caret">▾</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============= FOUNDER STORY ============= */}
        <section className="section" id="story">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Our story</div>
              <h2>It started with a chance meeting in 1997.</h2>
            </div>
            <div className="story-grid">
              <div className="story-photo">
                <Image
                  src="/images/about-chris.jpg"
                  alt="Chris Burgess — Founder of MailPlus"
                  width={400}
                  height={500}
                  className="rounded-2xl"
                  priority
                />
                <div className="story-caption">Chris Burgess, Managing Director</div>
              </div>
              <div className="prose-block">
                <p><strong>MailPlus was born from a simple observation: small businesses spent too much time running to the Post Office when they should have been focusing on their customers.</strong></p>
                <p>In 1997, Chris Burgess saw an opportunity to bridge that gap. Starting with a single van in Sydney, he began collecting business mail and parcels directly from office doorsteps and lodging them at the local Post Office.</p>
                <p>What began as a localized convenience service quickly resonated with businesses nationwide. Chris expanded the model through a network of local owner-operators — franchisees who ran their own territories as active business partners. This model guaranteed that clients always dealt with a consistent driver who had a personal stake in the quality of the service.</p>
                <p>Nearly 30 years later, MailPlus has grown into a major independent logistics player, with approximately 300 vehicles on the road servicing metro and regional communities across Australia. While the technology has evolved from manual logging to the free ShipMate shipping platform, the core promise remains the same: a reliable, relationship-driven alternative to traditional couriers and postal queues.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= WHAT WE DO ============= */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">What we do</div>
              <h2>Built around your shipping workflow.</h2>
            </div>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>Express Delivery</h3>
                <p>Get parcels anywhere in Australia in 1–2 business days. We offer predictable flat-rate pricing up to 5kg, making it simple to calculate your shipping margins without surprise surcharges.</p>
              </div>
              <div className="feature-card">
                <h3>Post Office Collect & Lodge</h3>
                <p>Skip the daily queue. Your local driver collects your outgoing mail and parcels, lodges them for you, and clears your PO Boxes, saving your team hours of valuable time.</p>
              </div>
              <div className="feature-card">
                <h3>Local Hand-to-Hand</h3>
                <p>Need it there today? We offer same-day, hand-to-hand delivery within your local metro area, handled directly by your dedicated owner-operator.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= DIFFERENTIATORS ============= */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="diff-band">
              <div className="diff-grid">
                <div className="diff-photo">
                  <Image
                    src="/images/about-van.jpg"
                    alt="MailPlus Courier Van"
                    width={500}
                    height={400}
                  />
                  <div className="photo-tag">
                    <span className="dot"></span> Genuinely local service
                  </div>
                </div>
                <div className="diff-content">
                  <div className="diff-intro">
                    <h2>Why businesses <span className="hl">choose MailPlus.</span></h2>
                    <p>We combine the scale of a national shipping network with the personal service of a local owner-operator who knows your business by name.</p>
                  </div>
                  <div className="diff-items">
                    <div className="diff-item">
                      <div className="di-ic">👤</div>
                      <div>
                        <h4>A dedicated local driver</h4>
                        <p>No contract drivers or random faces. You get a consistent, local owner-operator who acts as a reliable partner for your business.</p>
                      </div>
                    </div>
                    <div className="diff-item">
                      <div className="di-ic">💰</div>
                      <div>
                        <h4>Flat-rate predictability</h4>
                        <p>No complex zone calculators. Ship up to 5kg Australia-wide at a predictable flat rate, with no lock-in contracts.</p>
                      </div>
                    </div>
                    <div className="diff-item">
                      <div className="di-ic">📞</div>
                      <div>
                        <h4>No bots, no hold times</h4>
                        <p>When you call our support team, you talk to real Australian-based logistics professionals who resolve queries in minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= TESTIMONIALS ============= */}
        <section className="section testimonial-section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reviews-badge">
              <span className="stars">★★★★★</span>
              <span className="rb-text">Rated <strong>4.8 / 5</strong> on Reviews.io</span>
            </div>
            <div className="review-cards">
              <div className="review-card">
                <div className="rc-stars">★★★★★</div>
                <div className="rc-quote">
                  &quot;MailPlus has completely changed how we handle shipping. Our local driver is outstanding, always on time, and knows our team. Skipping the daily post office queue has saved us hours every single week.&quot;
                </div>
                <div className="rc-author">
                  <div className="rc-avatar">SM</div>
                  <div>
                    <div className="rc-name">Sarah Jenkins</div>
                    <div className="rc-meta">Verified Business Customer</div>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="rc-stars">★★★★★</div>
                <div className="rc-quote">
                  &quot;The flat-rate pricing up to 5kg has made our eCommerce margins much easier to calculate. Combine that with the ShipMate integration for Shopify, and our packaging flow is twice as fast as before.&quot;
                </div>
                <div className="rc-author">
                  <div className="rc-avatar">DK</div>
                  <div>
                    <div className="rc-name">David K.</div>
                    <div className="rc-meta">eCommerce Store Owner</div>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="rc-stars">★★★★★</div>
                <div className="rc-quote">
                  &quot;Whenever we have an issue, a real person answers the phone in seconds. No automated menus or bots. The customer service alone is worth the switch from traditional couriers.&quot;
                </div>
                <div className="rc-author">
                  <div className="rc-avatar">LH</div>
                  <div>
                    <div className="rc-name">Lisa H.</div>
                    <div className="rc-meta">Operations Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= FAQ ============= */}
        <section className="section faq-section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Frequently asked questions</div>
              <h2>Got questions? We&apos;ve got answers.</h2>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q">When was MailPlus founded? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus was founded in 1997 and has been operating for almost 30 years. It began when founder Chris Burgess spotted a gap in the logistics industry for collecting and lodging business mail, and grew it into an Australian express parcel network with approximately 300 vehicles on the road today.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">Who owns and runs MailPlus? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus was founded by Chris Burgess, who remains its Managing Director. The business runs on a local owner-operator model: alongside the head-office team, around 300 dedicated owner-operators run their own territories, collecting and delivering for the businesses in their area as a consistent personal point of contact.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">What does MailPlus do? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus is an Australian express parcel delivery network for small business. It spans three connected services: express delivery in 1–2 business days Australia-wide, Post Office collect and lodge so you skip the queue, and same-day local hand-to-hand delivery. For shipping, the free ShipMate platform handles labels, bookings and tracking in one place.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">Where does MailPlus operate? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus operates franchised territories across all Australian metro areas and selected regional areas, with approximately 300 vehicles on the road. This includes Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra and Darwin, plus areas such as the Sunshine Coast, Central Coast, Geelong, Byron Bay and Southeast Queensland.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">What makes MailPlus different from other couriers? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus pairs a dedicated local owner-operator who knows your business with flat-rate pricing up to 5kg and same-day collection. It also bridges your business and the Post Office — collecting, lodging and clearing PO Boxes — with a local head-office support team that answers fast, with no long hold times and no bots.
                  </div>
                </div>
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
                  <h2>See how MailPlus compares for your business.</h2>
                  <p>Start with five free collections — no card, no catch. Enter your address and we’ll instantly check for a local MailPlus driver in your area, then connect you with your account manager. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
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
                    <p className="ef-intro">Pop in your pickup address and we’ll check for a local MailPlus driver in your area — then take you to the next step.</p>

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

                    <div className="field-group" id="wrapper-f-interest">
                      <label className="field-label">What are you interested in? <span className="req">*</span></label>
                      <CustomSelect
                        id="f-interest"
                        triggerClassName="field-select"
                        options={[
                          { value: '5 free collections offer', label: '5 free collections offer' },
                          { value: 'Express parcel delivery & ShipMate', label: 'Express parcel delivery & ShipMate' },
                          { value: 'Post Office collect & lodge', label: 'Post Office collect & lodge' },
                          { value: 'Switching from another courier', label: 'Switching from another courier' },
                          { value: 'Multi-site / corporate services', label: 'Multi-site / corporate services' },
                          { value: 'Something else', label: 'Something else' },
                        ]}
                      />
                    </div>

                    <div className="field-group" id="wrapper-f-volume">
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
                    <h3>Thanks — we’ve got it.</h3>
                    <p>A member of the MailPlus team will be in touch within one business day. Need us sooner? Call <strong>1300 65 65 95</strong>, Mon–Fri 9am–5pm AEST.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AboutClient />
    </>
  )
}
