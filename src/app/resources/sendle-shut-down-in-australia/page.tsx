import type { Metadata } from 'next'
import Link from 'next/link'
import ResourcesClient from '../ResourcesClient'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Sendle Shut Down in Australia: What Happened & Your Best Alternative | MailPlus',
  description:
    "Sendle closed in Australia in January 2026. Here's what happened, how the MailPlus owner-operator model differs from Sendle's third-party booking platform, and how to switch your shipping.",
  alternates: { canonical: 'https://mailplus.com.au/resources/sendle-shut-down-in-australia' },
}

export default function SendleAlternativePage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What happened to Sendle in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sendle ceased operations in Australia in January 2026 and is now in liquidation. Sendle was an online platform that booked third-party couriers for collections rather than running its own drivers. Former customers are switching to alternatives such as MailPlus, which uses its own local owner-operators for collection and delivery."
        }
      },
      {
        "@type": "Question",
        "name": "What replaced Sendle in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There's no single replacement, but MailPlus is a direct alternative for former Sendle customers. Unlike Sendle's third-party booking model, MailPlus runs its own local owner-operators for same-day pickup and 1–2 day delivery Australia-wide, with flat-rate pricing up to 5kg and real Australian-based support."
        }
      },
      {
        "@type": "Question",
        "name": "Is MailPlus a good alternative to Sendle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus suits former Sendle customers because it solves the accountability gap in the booking-platform model. Its own owner-operators handle every pickup personally, with same-day collection, 1–2 day Australia-wide delivery, flat-rate pricing up to 5kg, free Shopify and WooCommerce integration, and no lock-in contract or minimum volume."
        }
      },
      {
        "@type": "Question",
        "name": "How do I switch my shipping from Sendle to MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Create a free MailPlus account to access the ShipMate platform, connect your Shopify or WooCommerce store if you have one, and book your first pickup with your local owner-operator. There's no lock-in contract or minimum volume, so you can move across at your own pace and only pay for what you send."
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
      { "@type": "ListItem", "position": 3, "name": "Sendle alternative", "item": "https://mailplus.com.au/resources/sendle-shut-down-in-australia" }
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
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resource Hub</Link> &nbsp;/&nbsp; <span>Sendle shut down: your alternative</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot"></span> Sendle alternative
            </div>
            <h1>Sendle shut down in Australia: what happened &amp; your best alternative</h1>
            <p className="art-lead">
              If you shipped with Sendle, its closure left a gap to fill quickly. This article explains what happened, how MailPlus differs from the Sendle model, and how to move your shipping across without disruption.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="prose">
            <h2>What happened to Sendle in Australia</h2>
            <p>
              Sendle closed in January 2026 and is now in liquidation. The key thing to understand about the model is structural: Sendle was an online platform that booked third-party couriers on your behalf, rather than operating its own fleet of drivers. That meant the actual pickup and delivery were carried out by other carriers.
            </p>

            <h2>How MailPlus is different</h2>
            <p>
              MailPlus is the opposite model. Our own local owner-operators handle every pickup, so collections are reliable and accountable, with real Australian-based support behind them. MailPlus is an Australian express parcel delivery network founded in 1997, with approximately 300 vehicles across 120+ franchises Australia-wide.
            </p>

            <h3>Real people, real accountability</h3>
            <p>
              Rather than anonymous drivers, MailPlus pairs you with a local owner-operator you'll know &mdash; a dedicated person who collects from you personally. Behind them is a local head-office support team with fast, real-person responses: no bots and no long hold queues.
            </p>

            <h2>Reliable service you can count on</h2>
            <ul>
              <li>Same-day collection from your local owner-operator when booked before the daily cut-off.</li>
              <li>1&ndash;2 business day delivery Australia-wide, with 95% of shipments arriving overnight on business days, to metro and regional areas.</li>
              <li>Real-time tracking for you and your customers, with clear updates at every scan.</li>
            </ul>

            <h2>How MailPlus can deliver your parcels</h2>
            <p>
              MailPlus offers connected options depending on your needs. Your local owner-operator can collect from you and lodge directly with Australia Post on your behalf through the <Link href="/post-office-collect-lodge">Post Office collect &amp; lodge</Link> service &mdash; combining personal local pickup with the Australia Post network, without you queuing. Alternatively, use the free <Link href="/shipmate-platform">ShipMate</Link> platform to book and manage express shipments yourself. Not sure which fits? The MailPlus team helps you choose based on your volume and destinations.
            </p>

            <h2>Simple, transparent pricing</h2>
            <p>
              MailPlus uses flat-rate pricing for items up to 5kg, whether you're shipping across town or to Perth, with heavier items up to 20kg also available. There's no lock-in contract and no minimum volume &mdash; you only pay for what you send. A collection fee may apply for lower-volume businesses, agreed upfront at signup so pricing is always known in advance.
            </p>

            <h2>Easy integration</h2>
            <p>
              The free ShipMate platform integrates with Shopify and WooCommerce, so orders sync automatically and labels print in a few clicks. If you're not on either platform, you can still use ShipMate on its own to book consignments or bulk-upload orders. See our step-by-step guide to <Link href="/resources/integrate-shopify-with-a-courier">integrating Shopify with a courier</Link>, or read more on the <Link href="/shipmate-platform">ShipMate page</Link>.
            </p>

            <h2>Who MailPlus serves</h2>
            <p>
              MailPlus is trusted by small and medium businesses, e-commerce sellers, Shopify and WooCommerce merchants, professional services, and any Australian business that needs reliable nationwide shipping. For a wider comparison of options, read <Link href="/resources/how-to-choose-a-courier">how to choose a courier for your small business</Link>.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="cta-band">
            <h2>Switching from Sendle?</h2>
            <p>
              Owner-operators you'll know by name, same-day collection, flat-rate pricing up to 5kg, and 1&ndash;2 day delivery Australia-wide.
            </p>
            <Link href="/express-delivery" className="btn btn-primary">
              Get started with MailPlus &rarr;
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
                  What happened to Sendle in Australia?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Sendle ceased operations in Australia in January 2026 and is now in liquidation. Sendle was an online platform that booked third-party couriers for collections rather than running its own drivers. Former customers are switching to alternatives such as MailPlus, which uses its own local owner-operators for collection and delivery.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  What replaced Sendle in Australia?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    There's no single replacement, but MailPlus is a direct alternative for former Sendle customers. Unlike Sendle's third-party booking model, MailPlus runs its own local owner-operators for same-day pickup and 1–2 day delivery Australia-wide, with flat-rate pricing up to 5kg and real Australian-based support.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  Is MailPlus a good alternative to Sendle?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus suits former Sendle customers because it solves the accountability gap in the booking-platform model. Its own owner-operators handle every pickup personally, with same-day collection, 1–2 day Australia-wide delivery, flat-rate pricing up to 5kg, free Shopify and WooCommerce integration, and no lock-in contract or minimum volume.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  How do I switch my shipping from Sendle to MailPlus?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Create a free MailPlus account to access the ShipMate platform, connect your Shopify or WooCommerce store if you have one, and book your first pickup with your local owner-operator. There's no lock-in contract or minimum volume, so you can move across at your own pace and only pay for what you send.
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
              <Link href="/resources/how-to-choose-a-courier" className="keep-card">
                <span className="kc-title">How to choose a courier for your Australian small business</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
              <Link href="/resources/owner-operator-vs-large-logistics" className="keep-card">
                <span className="kc-title">Owner-operator courier networks vs. large logistics companies</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
