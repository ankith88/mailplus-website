import type { Metadata } from 'next'
import Link from 'next/link'
import ResourcesClient from './ResourcesClient'
import './styles.css'

export const metadata: Metadata = {
  title: 'Small & Medium Business Shipping Resource Hub | MailPlus',
  description:
    'Practical shipping guides for Australian small and medium business — choosing a courier, flat-rate pricing, same-day delivery, Shopify integration, Australia Post vs couriers, and the Sendle alternative.',
  alternates: { canonical: 'https://mailplus.com.au/resources' },
}

export default function ResourcesPage() {
  const collectionSchemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Small & Medium Business Shipping Resource Hub",
    "url": "https://mailplus.com.au/resources/",
    "about": {
      "@type": "Organization",
      "name": "MailPlus"
    }
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the MailPlus Resource Hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The MailPlus Resource Hub is a library of practical guides on shipping for Australian small and medium businesses. It covers choosing a courier, flat-rate pricing, same-day delivery, Shopify integration, and how courier models compare. Each article gives factual answers to questions small business owners commonly ask."
        }
      },
      {
        "@type": "Question",
        "name": "Who is MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus is an Australian express parcel delivery network for small and medium businesses, founded in 1997, with approximately 300 vehicles across 120+ franchises Australia-wide. It offers express delivery to anywhere in Australia with their free shipping platform ShipMate, Post Office collect & lodge, and same-day local hand-to-hand delivery."
        }
      },
      {
        "@type": "Question",
        "name": "Does MailPlus offer flat-rate shipping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. MailPlus uses flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available. Delivery is 1–2 business days Australia-wide, with 95% of shipments arriving overnight on business days. There's no lock-in contract and no minimum volume — you only pay for what you send."
        }
      }
    ]
  };

  const breadcrumbSchemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mailplus.com.au/" },
      { "@type": "ListItem", "position": 2, "name": "Resource Hub", "item": "https://mailplus.com.au/resources/" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchemaData) }}
      />
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
              <Link href="/">Home</Link> &nbsp;/&nbsp; <span>Resource Hub</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot"></span> Small &amp; Medium Business Shipping Resource Hub
            </div>
            <h1>Practical shipping guides for Australian small &amp; medium business.</h1>
            <p className="art-lead">
              A library of practical guides on shipping for Australian small and medium businesses — choosing a courier, flat-rate pricing, same-day delivery, Shopify integration, and how courier models compare.
            </p>
          </div>
        </div>

        <section className="section" style={{ paddingTop: '34px' }}>
          <div className="wrap">
            <div className="hub-grid">
              <Link className="hub-card" href="/resources/how-we-compare">
                <span className="hub-tag">COMPARISON</span>
                <h3>How MailPlus compares for Australian small business</h3>
                <p>See how the MailPlus model stacks up on pricing, speed, pickup, integration and contract — the things small businesses weigh up most.</p>
                <span className="hub-arrow">See how we compare &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/how-to-choose-a-courier">
                <span className="hub-tag">GUIDE</span>
                <h3>How to choose a courier for your Australian small business</h3>
                <p>Compare delivery speed, flat-rate vs destination-based pricing, pickup, integration and support — the five factors that matter.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/australia-post-vs-courier-services">
                <span className="hub-tag">COMPARISON</span>
                <h3>Australia Post vs. courier services: what small businesses need to know</h3>
                <p>Coverage, same-day pickup, pricing and accountability compared — and how MailPlus bridges both.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/what-is-flat-rate-shipping">
                <span className="hub-tag">EXPLAINER</span>
                <h3>What is a flat-rate courier and when does it make sense?</h3>
                <p>How fixed-rate pricing works, how it compares to destination-based pricing, and when it's the right fit.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/same-day-delivery-guide">
                <span className="hub-tag">GUIDE</span>
                <h3>Same-day local delivery: how hand-to-hand courier service works</h3>
                <p>How a local owner-operator delivers items door to door — and when same-day local delivery is the right choice.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/integrate-shopify-with-a-courier">
                <span className="hub-tag">HOW-TO</span>
                <h3>How to integrate your Shopify store with a courier</h3>
                <p>A step-by-step guide to syncing orders, printing labels and automating tracking — free with ShipMate.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/owner-operator-vs-large-logistics">
                <span className="hub-tag">EXPLAINER</span>
                <h3>Owner-operator courier networks vs. large logistics companies</h3>
                <p>Consistency and accountability versus scale — how the owner-operator model works and why it matters.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
              
              <Link className="hub-card" href="/resources/sendle-shut-down-in-australia">
                <span className="hub-tag">COMPARISON</span>
                <h3>Sendle shut down in Australia: what happened &amp; your best alternative</h3>
                <p>What happened to Sendle, how the MailPlus model differs, and how former customers can switch.</p>
                <span className="hub-arrow">Read the guide &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">FAQ</div>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q">
                  What is the MailPlus Resource Hub?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    The MailPlus Resource Hub is a library of practical guides on shipping for Australian small and medium businesses. It covers choosing a courier, flat-rate pricing, same-day delivery, Shopify integration, and how courier models compare. Each article gives factual answers to questions small business owners commonly ask.
                  </div>
                </div>
              </div>
              
              <div className="faq-item">
                <button className="faq-q">
                  Who is MailPlus?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus is an Australian express parcel delivery network for small and medium businesses, founded in 1997, with approximately 300 vehicles across 120+ franchises Australia-wide. It offers express delivery to anywhere in Australia with their free shipping platform ShipMate, Post Office collect &amp; lodge, and same-day local hand-to-hand delivery.
                  </div>
                </div>
              </div>
              
              <div className="faq-item">
                <button className="faq-q">
                  Does MailPlus offer flat-rate shipping?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Yes. MailPlus uses flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available. Delivery is 1–2 business days Australia-wide, with 95% of shipments arriving overnight on business days. There's no lock-in contract and no minimum volume — you only pay for what you send.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
