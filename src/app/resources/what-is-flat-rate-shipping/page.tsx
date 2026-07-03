import type { Metadata } from 'next'
import Link from 'next/link'
import ResourcesClient from '../ResourcesClient'
import '../styles.css'

export const metadata: Metadata = {
  title: 'What Is a Flat-Rate Courier and When Does It Make Sense? | MailPlus',
  description:
    'How flat-rate courier pricing works, how it compares to destination-based and zone pricing, and when it\'s the right fit. MailPlus flat-rate up to 5kg, heavier items to 20kg.',
  alternates: { canonical: 'https://mailplus.com.au/resources/what-is-flat-rate-shipping' },
}

export default function WhatIsFlatRateShippingPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a flat-rate courier service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A flat-rate courier charges one fixed price to send a parcel regardless of distance, up to a set weight limit. It replaces weight-and-zone calculations and surcharges with a single predictable rate. MailPlus offers flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available."
        }
      },
      {
        "@type": "Question",
        "name": "When does flat-rate shipping make sense for a small business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flat-rate shipping makes sense when most parcels fall under the weight cap and you ship to both metro and regional destinations. It keeps costs predictable, makes margins easier to manage, and lets you quote customers a consistent shipping fee. It suits e-commerce sellers and professional services especially well."
        }
      },
      {
        "@type": "Question",
        "name": "Is flat-rate shipping cheaper than destination-based pricing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flat-rate isn't always the lowest possible price on every single parcel, but it's usually cheaper overall for businesses because it removes surcharges and zone penalties. The bigger benefit is predictability — you know your cost in advance. MailPlus charges one flat rate for items up to 5kg, town or interstate."
        }
      },
      {
        "@type": "Question",
        "name": "What is the weight limit for MailPlus flat-rate delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus flat-rate pricing applies to items up to 5kg. Heavier items up to 20kg can also be sent. There's no lock-in contract and no minimum volume, so the service suits businesses shipping a few parcels a week or several hundred, with predictable pricing across the board."
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
      { "@type": "ListItem", "position": 3, "name": "What is a flat-rate courier?", "item": "https://mailplus.com.au/resources/what-is-flat-rate-shipping" }
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
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resource Hub</Link> &nbsp;/&nbsp; <span>What is a flat-rate courier?</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot"></span> Definition
            </div>
            <h1>What is a flat-rate courier and when does it make sense?</h1>
            <p className="art-lead">
              If you've ever been surprised by a shipping bill, you've met the downside of weight-and-zone pricing. Flat-rate couriers exist to remove that uncertainty. Here's how the model works and when it's the right fit.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="prose">
            <h2>How flat-rate pricing works</h2>
            <p>
              With flat-rate pricing, a courier sets one price to send a parcel up to a defined weight, no matter where in the country it's going. There's no zone table and no distance multiplier. MailPlus applies flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available.
            </p>

            <h2>Why predictability matters</h2>
            <p>
              For a small or medium business, a predictable per-parcel cost makes pricing, margins and customer shipping charges far easier to set. You can quote a flat shipping fee to your customers with confidence, knowing your own cost won't jump because an order is heading to a regional postcode.
            </p>

            <h3>Flat-rate vs destination-based at a glance</h3>
            <div className="cmp-wrap">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th></th>
                    <th className="mp">Flat-rate pricing</th>
                    <th>Destination-based / zone pricing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">How price is set</th>
                    <td className="mp">One price up to a weight cap, any distance</td>
                    <td>Varies by weight, zone and distance</td>
                  </tr>
                  <tr>
                    <th scope="row">Predictability</th>
                    <td className="mp">Known in advance &mdash; easy to quote customers</td>
                    <td>Can change with postcode or surcharges</td>
                  </tr>
                  <tr>
                    <th scope="row">Best for</th>
                    <td className="mp">Parcels under the cap, to metro &amp; regional</td>
                    <td>Highly variable or oversized freight</td>
                  </tr>
                  <tr>
                    <th scope="row">At MailPlus</th>
                    <td className="mp">Up to 5kg (heavier items up to 20kg)</td>
                    <td>&mdash;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>When a flat-rate courier makes sense</h2>
            <p>
              Flat-rate works best when most of your parcels fall under the weight cap and you ship to a mix of metro and regional destinations. It's ideal for e-commerce sellers, professional services and any business that values predictable costs. If your freight is consistently very heavy or oversized, a tailored quote may suit better &mdash; though MailPlus still handles items up to 20kg.
            </p>

            <h2>Flat-rate at MailPlus</h2>
            <p>
              MailPlus pairs flat-rate pricing with 1&ndash;2 business day delivery Australia-wide and same-day pickup from a local owner-operator. You can see the full service on the <Link href="/express-delivery">Express Delivery page</Link>, including coverage and how collection works.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="cta-band">
            <h2>Predictable pricing, every parcel</h2>
            <p>
              Flat-rate up to 5kg, 1&ndash;2 day delivery Australia-wide, no lock-in contract and no minimum volume.
            </p>
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
                  What is a flat-rate courier service?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    A flat-rate courier charges one fixed price to send a parcel regardless of distance, up to a set weight limit. It replaces weight-and-zone calculations and surcharges with a single predictable rate. MailPlus offers flat-rate pricing for items up to 5kg, with heavier items up to 20kg also available.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  When does flat-rate shipping make sense for a small business?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Flat-rate shipping makes sense when most parcels fall under the weight cap and you ship to both metro and regional destinations. It keeps costs predictable, makes margins easier to manage, and lets you quote customers a consistent shipping fee. It suits e-commerce sellers and professional services especially well.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  Is flat-rate shipping cheaper than destination-based pricing?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Flat-rate isn't always the lowest possible price on every single parcel, but it's usually cheaper overall for businesses because it removes surcharges and zone penalties. The bigger benefit is predictability &mdash; you know your cost in advance. MailPlus charges one flat rate for items up to 5kg, town or interstate.
                  </div>
                </div>
              </div>

              <div className="faq-item">
                <button className="faq-q">
                  What is the weight limit for MailPlus flat-rate delivery?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus flat-rate pricing applies to items up to 5kg. Heavier items up to 20kg can also be sent. There's no lock-in contract and no minimum volume, so the service suits businesses shipping a few parcels a week or several hundred, with predictable pricing across the board.
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
              <Link href="/express-delivery" className="keep-card">
                <span className="kc-title">Express Delivery &mdash; 1&ndash;2 day flat-rate courier</span>
                <span className="kc-arrow">Read the guide &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
