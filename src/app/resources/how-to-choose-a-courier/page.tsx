import type { Metadata } from 'next'
import Link from 'next/link'
import ResourcesClient from '../ResourcesClient'
import '../styles.css'

export const metadata: Metadata = {
  title: 'How to Choose a Courier for Your Australian Small Business | MailPlus',
  description:
    'The five factors that matter when choosing a courier for an Australian small business — delivery speed, flat-rate pricing, same-day pickup, store integration, and support.',
  alternates: { canonical: 'https://mailplus.com.au/resources/how-to-choose-a-courier' },
}

export default function HowToChooseACourierPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I choose a courier for my small business in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compare couriers on five factors: delivery speed, pricing structure, pickup method, store integration, and support. Prioritise flat-rate pricing for predictable costs, same-day pickup to save time, and a provider with real human support. Confirm there's no lock-in contract or minimum volume before committing."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best courier for a small e-commerce business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best courier for small e-commerce offers fast national delivery, predictable flat-rate pricing, same-day pickup, and direct store integration. MailPlus delivers in 1–2 business days Australia-wide with flat-rate pricing up to 5kg and free Shopify and WooCommerce integration through its ShipMate platform — with no minimum volume."
        }
      },
      {
        "@type": "Question",
        "name": "Is flat-rate or destination-based courier pricing better?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flat-rate pricing is usually better for small and medium businesses because costs stay predictable regardless of distance or postcode. Destination-based and zone-based pricing can blow out margins on heavier parcels or regional deliveries. MailPlus uses flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available."
        }
      },
      {
        "@type": "Question",
        "name": "Do small business couriers require a contract?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not always. Some couriers lock you into contracts or monthly minimums, but many small-business services don't. MailPlus has no lock-in contract and no minimum volume — you only pay for what you send. A collection fee may apply for lower-volume businesses, agreed upfront so pricing is always known in advance."
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
      { "@type": "ListItem", "position": 3, "name": "How to choose a courier", "item": "https://mailplus.com.au/resources/how-to-choose-a-courier" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />

      <ResourcesClient />

      <main className="res-main">
        <div className="art-hero">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resource Hub</Link> &nbsp;/&nbsp; <span>How to choose a courier</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot"></span> Choosing a courier
            </div>
            <h1>How to choose a courier for your Australian small business</h1>
            <p className="art-lead">
              Most Australian small and medium businesses pick a courier on price alone, then discover the real costs later — surcharges, missed pickups, or hours lost on hold. A better approach is to weigh five factors together. This guide walks through each one so you can compare providers on what actually affects your day-to-day shipping.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="prose">
            <h2>1. Delivery speed and coverage</h2>
            <p>
              Start with how fast parcels need to arrive and where they're going. A courier built for a growing business should give you predictable national timeframes, not best-guess estimates. MailPlus, for example, delivers in 1–2 business days Australia-wide, with 95% of shipments arriving overnight on business days. Check that a provider covers both metro and regional destinations your customers order from.
            </p>
            <h2>2. Pricing structure: flat-rate vs destination-based</h2>
            <p>
              Destination-based and zone-based pricing makes costs hard to predict — a heavier parcel or a regional postcode can quietly blow out your margin. Flat-rate pricing fixes one predictable price regardless of distance. MailPlus uses flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available. If you want to understand this model in detail, read our guide to{' '}
              <Link href="/resources/what-is-flat-rate-shipping">
                what a flat-rate courier is and when it makes sense
              </Link>
              .
            </p>
            <h2>3. Pickup: depot drop-off or same-day collection</h2>
            <p>
              Some services expect you to drop parcels at a depot or Post Office; others collect from your door. For a busy business, same-day collection saves real time. MailPlus offers same-day pickup through local owner-operators — a dedicated person who collects from your premises when you book before the daily cut-off.
            </p>
            <h2>4. Platform and store integration</h2>
            <p>
              If you sell online, the courier should plug into your store so orders, labels and tracking flow automatically. MailPlus includes{' '}
              <Link href="/shipmate-platform">ShipMate</Link>
              , a free shipping platform that integrates with Shopify and WooCommerce — orders sync, labels print in a few clicks, and tracking updates in real time. E-commerce sellers can follow our step-by-step guide on{' '}
              <Link href="/resources/integrate-shopify-with-a-courier">
                integrating a Shopify store with a courier
              </Link>
              .
            </p>
            <h2>5. Support and accountability</h2>
            <p>
              When something goes wrong, support quality decides how much it costs you. Large networks route you through call centres or bots; an owner-operator model gives you a named local contact plus a head-office team. To understand the trade-off, see our comparison of{' '}
              <Link href="/resources/owner-operator-vs-large-logistics">
                owner-operator courier networks versus large logistics companies
              </Link>
              .
            </p>
            <h2>How MailPlus fits</h2>
            <p>
              MailPlus is an Australian express parcel delivery network for small and medium businesses, founded in 1997, with approximately 300 vehicles across 120+ franchises Australia-wide. It combines express delivery, Post Office collect & lodge, and same-day local hand-to-hand delivery in one service — a reliable, independent alternative to Australia Post and traditional couriers.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="cta-band">
            <h2>See express delivery in action</h2>
            <p>Flat-rate up to 5kg, 1–2 day delivery Australia-wide, and same-day pickup from a local owner-operator.</p>
            <Link href="/express-delivery" className="btn btn-primary">
              Explore Express Delivery &rarr;
            </Link>
          </div>
        </div>

        <section className="section faq-section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">FAQ</div>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q">
                  How do I choose a courier for my small business in Australia?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Compare couriers on five factors: delivery speed, pricing structure, pickup method, store integration, and support. Prioritise flat-rate pricing for predictable costs, same-day pickup to save time, and a provider with real human support. Confirm there's no lock-in contract or minimum volume before committing.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  What is the best courier for a small e-commerce business?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    The best courier for small e-commerce offers fast national delivery, predictable flat-rate pricing, same-day pickup, and direct store integration. MailPlus delivers in 1–2 business days Australia-wide with flat-rate pricing up to 5kg and free Shopify and WooCommerce integration through its ShipMate platform — with no minimum volume.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  Is flat-rate or destination-based courier pricing better?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Flat-rate pricing is usually better for small and medium businesses because costs stay predictable regardless of distance or postcode. Destination-based and zone-based pricing can blow out margins on heavier parcels or regional deliveries. MailPlus uses flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  Do small business couriers require a contract?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Not always. Some couriers lock you into contracts or monthly minimums, but many small-business services don't. MailPlus has no lock-in contract and no minimum volume — you only pay for what you send. A collection fee may apply for lower-volume businesses, agreed upfront so pricing is always known in advance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="keep">
            <div className="keep-label">Keep reading</div>
            <div className="keep-grid">
              <Link href="/resources/australia-post-vs-courier-services" className="keep-card">
                <span className="kc-title">Australia Post vs. courier services: what small businesses need to know</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
              <Link href="/resources/what-is-flat-rate-shipping" className="keep-card">
                <span className="kc-title">What is a flat-rate courier and when does it make sense?</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
