import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import HowWeCompareClient from './HowWeCompareClient'
import { CustomSelect } from '@/components/shared/CustomSelect'
import '../styles.css'
import './styles.css'

export const metadata: Metadata = {
  title: 'How MailPlus Compares — Courier for Australian Small Business',
  description:
    'How MailPlus compares for Australian small business: a local owner-operator model with same-day pickup, flat-rate pricing up to 5kg, 1–2 day delivery, Post Office collect & lodge, and free Shopify & WooCommerce integration — no lock-in, no minimum volume.',
  alternates: { canonical: 'https://mailplus.com.au/resources/how-we-compare' },
}

export default function HowWeComparePage() {
  const serviceSchemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Express parcel delivery and courier services for small business",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MailPlus",
      "url": "https://mailplus.com.au",
      "telephone": "+61-1300-65-65-95",
      "foundingDate": "1997",
      "areaServed": "AU"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "description": "MailPlus is an Australian express parcel delivery network for small business, founded in 1997, with approximately 300 vehicles. Flat-rate pricing for items up to 5kg, 1–2 business day delivery Australia-wide, same-day pickup through local owner-operators, Post Office collect & lodge, and free Shopify and WooCommerce integration via the ShipMate platform — a reliable, independent alternative to traditional couriers.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AUD",
      "description": "Flat-rate pricing for items up to 5kg, with no lock-in contract and no minimum volume."
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best courier for a small business in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The right courier depends on what your business needs most: predictable pricing, reliable pickup, fast support and easy integration. For small businesses that value a consistent local point of contact, MailPlus offers a local owner-operator model, founded in 1997, with around 300 vehicles, flat-rate pricing up to 5kg, same-day pickup, and free Shopify and WooCommerce integration."
        }
      },
      {
        "@type": "Question",
        "name": "How is a MailPlus owner-operator different from a large-carrier driver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus operators are local franchisees who own their territory, so the same invested person handles your collections — not a driver working a route for a large carrier, where you may get someone different each visit with no stake in your business. They collect same-day, backed by a local head-office support team with real people, no bots."
        }
      },
      {
        "@type": "Question",
        "name": "How does MailPlus compare to a depot drop-off postal service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instead of dropping parcels at a depot or counter, MailPlus collects from you same-day through a local owner-operator who knows your business. You get flat-rate pricing up to 5kg, 1–2 business day delivery Australia-wide, plus Post Office collect and lodge so your team never has to queue or travel."
        }
      },
      {
        "@type": "Question",
        "name": "Is MailPlus good value compared with other couriers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus uses competitive, flat-rate pricing for items up to 5kg, comparable to other couriers, so your shipping costs stay predictable with no surprise bills. Heavier items up to 20kg can also be sent. There is no lock-in contract and no minimum volume, and a collection fee may apply for lower-volume businesses, agreed upfront."
        }
      },
      {
        "@type": "Question",
        "name": "Does MailPlus offer same-day delivery and pickup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. MailPlus offers same-day collection through local owner-operators, and personal same-day local hand-to-hand delivery where a parcel is handed straight to the recipient. For interstate and Australia-wide shipping, MailPlus Express delivers in 1–2 business days, with 95% of shipments arriving overnight on business days."
        }
      }
    ]
  };

  const breadcrumbSchemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mailplus.com.au/" },
      { "@type": "ListItem", "position": 2, "name": "Resource Hub", "item": "https://mailplus.com.au/resources/" },
      { "@type": "ListItem", "position": 3, "name": "How MailPlus Compares", "item": "https://mailplus.com.au/resources/how-we-compare" }
    ]
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />

      <div className="how-we-compare-page">
        {/* ============= HERO (lighter homepage-style) ============= */}
        <section className="hero">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resource Hub</Link> &nbsp;/&nbsp; <span>How MailPlus Compares</span>
            </nav>
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-eyebrow">
                  <span className="dot"></span> How MailPlus compares
                </div>
                <h1>A courier built<br /><span className="hl">around your business.</span></h1>
                <p className="hero-lead hero-lead-hook">
                  See how the MailPlus model stacks up on the things small businesses care about most — pricing, speed, pickup, integration and contract — with no jargon and no surprises.
                </p>
                <div className="hero-cta-row">
                  <a href="#how" className="btn btn-primary">See how we compare →</a>
                  <a href="#enquire" className="btn btn-secondary">Enquire now</a>
                </div>
              </div>

              <div className="hero-side">
                <div className="hero-card">
                  <h2>The MailPlus difference</h2>
                  <p className="hc-sub">What you get with us — and what you leave behind.</p>
                  <div className="vs-list">
                    <div className="vs-row">
                      <div className="vs-get">A dedicated local owner-operator</div>
                      <div className="vs-not">not a depot drop-off, or a driver working a route for a large carrier with no stake in your business</div>
                    </div>
                    <div className="vs-row">
                      <div className="vs-get">Same-day collection from your door</div>
                      <div className="vs-not">not a queue or counter trip, or unreliable collections from a driver you can't call</div>
                    </div>
                    <div className="vs-row">
                      <div className="vs-get">One flat rate up to 5kg</div>
                      <div className="vs-not">not surprise bills, plus a support team you can actually talk to</div>
                    </div>
                    <div className="vs-row">
                      <div className="vs-get">A real local person answers</div>
                      <div className="vs-not">not hold queues or bots — reach your local operator or our support team directly</div>
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
              <div className="intro-band-label">How <span className="hl">MailPlus</span> compares</div>
              <div className="intro-band-copy">
                <p><strong>MailPlus is an Australian express parcel delivery network for small business, founded in 1997, with approximately 300 vehicles on the road.</strong> It offers flat-rate pricing for items up to 5kg, 1–2 business day delivery Australia-wide, and same-day pickup through local owner-operators — a reliable, independent alternative to traditional couriers.</p>
                <div className="intro-more" id="introMore">
                  <p>What sets MailPlus apart is the local owner-operator model: a dedicated person who knows your business, collects same-day, and is a consistent point of contact — rather than a depot drop-off or a different contract driver each visit. It is backed by a local head-office support team with fast, real-person responses — no long hold times and no bots.</p>
                  <p>MailPlus also bridges your business and the Post Office, collecting and lodging mail and parcels and clearing your PO Boxes. For online stores, the free ShipMate platform integrates with Shopify and WooCommerce, and the MailPlus API connects custom systems directly — with no lock-in contract and no minimum volume.</p>
                </div>
                <button className="intro-toggle" id="introToggle" aria-expanded="false" aria-controls="introMore">
                  <span className="it-text">Read more</span>
                  <span className="it-icon">+</span>
                </button>
                <p className="intro-updated">Last reviewed June 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= FAQ (model comparison Q&A) ============= */}
        <section className="section faq-section" id="how">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">How we compare</div>
              <h2>Smart questions, straight answers.</h2>
              <p>The questions small businesses actually ask when choosing a courier — answered factually, with no jargon.</p>
            </div>

            <div className="faq-list" id="faq">
              <div className="faq-item">
                <button className="faq-q">What is the best courier for a small business in Australia? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">The right courier depends on what your business needs most: predictable pricing, reliable pickup, fast support and easy integration. For small businesses that value a consistent local point of contact, MailPlus offers a local owner-operator model, founded in 1997, with around 300 vehicles, flat-rate pricing up to 5kg, same-day pickup, and free Shopify and WooCommerce integration.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">How is a MailPlus owner-operator different from a large-carrier driver? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">MailPlus operators are local franchisees who own their territory, so the same invested person handles your collections — not a driver working a route for a large carrier, where you may get someone different each visit with no stake in your business. They collect same-day, backed by a local head-office support team with real people, no bots.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">How does MailPlus compare to a depot drop-off postal service? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">Instead of dropping parcels at a depot or counter, MailPlus collects from you same-day through a local owner-operator who knows your business. You get flat-rate pricing up to 5kg, 1–2 business day delivery Australia-wide, plus Post Office collect and lodge so your team never has to queue or travel.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">Is MailPlus good value compared with other couriers? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">MailPlus uses competitive, flat-rate pricing for items up to 5kg, comparable to other couriers, so your shipping costs stay predictable with no surprise bills. Heavier items up to 20kg can also be sent. There is no lock-in contract and no minimum volume, and a collection fee may apply for lower-volume businesses, agreed upfront.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">Does MailPlus offer same-day delivery and pickup? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">Yes. MailPlus offers same-day collection through local owner-operators, and personal same-day local hand-to-hand delivery where a parcel is handed straight to the recipient. For interstate and Australia-wide shipping, MailPlus Express delivers in 1–2 business days, with 95% of shipments arriving overnight on business days.</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= COMPARE IN MORE DETAIL (pillar -> cluster) ============= */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Go deeper</div>
              <h2>Compare in more detail.</h2>
              <p>Weighing up your options? These guides break down the specific comparisons small businesses ask about most.</p>
            </div>
            <div className="cmp-grid">
              <Link className="cmp-card" href="/resources/australia-post-vs-courier-services">
                <span className="cmp-tag">Comparison</span>
                <h3>Australia Post vs courier services</h3>
                <p>How a dedicated courier with same-day pickup stacks up against a depot drop-off postal service.</p>
                <span className="cmp-go">Read the comparison →</span>
              </Link>
              <Link className="cmp-card" href="/resources/owner-operator-vs-large-logistics">
                <span className="cmp-tag">Comparison</span>
                <h3>Owner-operator vs large logistics</h3>
                <p>Why a local franchisee who owns their territory handles your collections differently to a large-carrier route driver.</p>
                <span className="cmp-go">Read the comparison →</span>
              </Link>
              <Link className="cmp-card" href="/resources/how-to-choose-a-courier">
                <span className="cmp-tag">Guide</span>
                <h3>How to choose a courier</h3>
                <p>The criteria that matter — pricing, pickup, speed, support and integration — and how to weigh them.</p>
                <span className="cmp-go">Read the guide →</span>
              </Link>
              <Link className="cmp-card" href="/resources/sendle-shut-down-in-australia">
                <span className="cmp-tag">Explainer</span>
                <h3>Has Sendle shut down in Australia?</h3>
                <p>What the change means for small-business shippers and what your alternatives are.</p>
                <span className="cmp-go">Read the explainer →</span>
              </Link>
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
                  <p>Enter your details and we’ll instantly check whether a local MailPlus driver covers your area. If you’re in territory, your enquiry comes straight through to us and your Account Manager will be in touch within one business day — nothing else needed. Want to pick the time yourself? You can book a quick call on the next step. Prefer to talk now? Our Aussie-based team is here Monday to Friday.</p>
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
                    <p className="ef-intro">Pop in your details and we’ll instantly check for a local MailPlus driver in your area. If we cover you, we’ll receive your enquiry right away — your Account Manager takes it from there.</p>

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

      <HowWeCompareClient />
    </>
  )
}
