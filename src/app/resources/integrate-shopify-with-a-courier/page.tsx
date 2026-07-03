import type { Metadata } from 'next'
import Link from 'next/link'
import ResourcesClient from '../ResourcesClient'
import '../styles.css'

export const metadata: Metadata = {
  title: 'How to Integrate Your Shopify Store With a Courier | MailPlus',
  description:
    'Step-by-step guide to integrating a Shopify store with a courier — sync orders, print labels in bulk, validate addresses and automate tracking, free with the MailPlus ShipMate platform.',
  alternates: { canonical: 'https://mailplus.com.au/resources/integrate-shopify-with-a-courier' },
}

export default function IntegrateShopifyWithCourierPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I integrate Shopify with a courier service in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Connect a shipping platform that syncs orders, prints labels and handles tracking automatically. With MailPlus, create a free account, connect your Shopify store to the ShipMate platform, and orders sync without manual entry. Labels print in a few clicks and customers receive automatic shipping updates. Setup is free."
        }
      },
      {
        "@type": "Question",
        "name": "Does MailPlus integrate with Shopify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. MailPlus integrates with Shopify through its free ShipMate platform. Orders sync automatically, labels print in a few clicks, and tracking updates in real time. Setup is free and requires no technical expertise. ShipMate also connects to WooCommerce for merchants on that platform."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Shopify courier integration free with MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The ShipMate platform and its Shopify integration are free, with no lock-in contract and no minimum volume. You only pay for what you send, at flat-rate pricing for items up to 5kg. A collection fee may apply for lower-volume businesses, agreed upfront at signup."
        }
      },
      {
        "@type": "Question",
        "name": "Can I print shipping labels in bulk from Shopify orders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ShipMate supports bulk label printing, so you can generate labels for multiple synced Shopify orders at once in seconds, with no manual data entry. It also includes Google address validation to catch suburb, state and postcode errors before they cause delivery delays."
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
      { "@type": "ListItem", "position": 3, "name": "Integrate Shopify with a courier", "item": "https://mailplus.com.au/resources/integrate-shopify-with-a-courier" }
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
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resource Hub</Link> &nbsp;/&nbsp; <span>Integrate Shopify with a courier</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot"></span> How-to
            </div>
            <h1>How to integrate your Shopify store with a courier</h1>
            <p className="art-lead">
              Manually copying order details into a courier system is slow and error-prone. Integrating your Shopify store with a courier automates the whole flow &mdash; orders, labels and tracking &mdash; so fulfilment takes seconds per order. Here's how it works with MailPlus.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="prose">
            <h2>What integration actually does</h2>
            <p>A proper courier integration connects your store to the shipping platform so that:</p>
            <ul>
              <li>New Shopify orders sync automatically &mdash; no manual data entry.</li>
              <li>Shipping labels generate and print in a few clicks.</li>
              <li>Tracking updates flow back, and your store sends automatic shipping notifications to customers.</li>
            </ul>

            <h2>Integrating Shopify with MailPlus, step by step</h2>
            <ul>
              <li><strong>Create a free MailPlus account</strong> to access <Link href="/shipmate-platform">ShipMate</Link>, the free shipping platform. There's no lock-in contract and no minimum volume.</li>
              <li><strong>Connect your Shopify store</strong> to ShipMate so orders sync automatically into one dashboard.</li>
              <li><strong>Review synced orders and validate addresses</strong> &mdash; ShipMate includes Google address lookup that auto-checks suburb, state and postcode to prevent delivery errors.</li>
              <li><strong>Print labels in a few clicks</strong>, including bulk label printing for multiple orders at once.</li>
              <li><strong>Book pickup</strong> with your local owner-operator, who collects same-day when booked before the cut-off.</li>
              <li><strong>Track everything in real time</strong> &mdash; and customers get automatic updates from both ShipMate and your Shopify store.</li>
            </ul>

            <h2>For larger or custom systems</h2>
            <p>
              If you run a warehouse system or need automated bookings at scale, the <Link href="/mailplus-api">MailPlus API</Link> connects your own systems directly for label generation, live tracking and automatic customer notifications. It's available with MailPlus Express and suits 3PLs and businesses with custom shipping software.
            </p>

            <h2>Why integrate with MailPlus specifically</h2>
            <p>
              MailPlus is an Australian courier network founded in 1997, with approximately 300 vehicles across 120+ franchises Australia-wide. The integration is free, the pricing is flat-rate up to 5kg, and pickups are handled by a local owner-operator &mdash; so the automation is backed by a real person who knows your business. Full details are on the <Link href="/shipmate-platform">ShipMate page</Link>.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="cta-band">
            <h2>Connect your Shopify store free</h2>
            <p>ShipMate syncs Shopify and WooCommerce orders automatically &mdash; labels, tracking and customer updates, no manual entry.</p>
            <Link href="/shipmate-platform" className="btn btn-primary">
              Explore ShipMate &rarr;
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
                  How do I integrate Shopify with a courier service in Australia?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Connect a shipping platform that syncs orders, prints labels and handles tracking automatically. With MailPlus, create a free account, connect your Shopify store to the ShipMate platform, and orders sync without manual entry. Labels print in a few clicks and customers receive automatic shipping updates. Setup is free.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  Does MailPlus integrate with Shopify?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Yes. MailPlus integrates with Shopify through its free ShipMate platform. Orders sync automatically, labels print in a few clicks, and tracking updates in real time. Setup is free and requires no technical expertise. ShipMate also connects to WooCommerce for merchants on that platform.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  Is the Shopify courier integration free with MailPlus?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Yes. The ShipMate platform and its Shopify integration are free, with no lock-in contract and no minimum volume. You only pay for what you send, at flat-rate pricing for items up to 5kg. A collection fee may apply for lower-volume businesses, agreed upfront at signup.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  Can I print shipping labels in bulk from Shopify orders?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Yes. ShipMate supports bulk label printing, so you can generate labels for multiple synced Shopify orders at once in seconds, with no manual data entry. It also includes Google address validation to catch suburb, state and postcode errors before they cause delivery delays.
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
              <Link href="/shipmate-platform" className="keep-card">
                <span className="kc-title">ShipMate — free shipping software</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
              <Link href="/resources/how-to-choose-a-courier" className="keep-card">
                <span className="kc-title">How to choose a courier for your Australian small business</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
