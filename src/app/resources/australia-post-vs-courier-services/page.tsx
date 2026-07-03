import type { Metadata } from 'next'
import Link from 'next/link'
import ResourcesClient from '../ResourcesClient'
import '../styles.css'

export const metadata: Metadata = {
  title: 'Australia Post vs. Courier Services: What Small Businesses Need to Know | MailPlus',
  description:
    'How Australia Post and dedicated couriers differ for Australian small business — collection, flat-rate vs zone pricing, Australia-wide delivery, and support. Plus how MailPlus bridges both.',
  alternates: { canonical: 'https://mailplus.com.au/resources/australia-post-vs-courier-services' },
}

export default function AustraliaPostVsCourierServicesPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is a courier cheaper than Australia Post for small business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your parcels. Australia Post prices vary by weight and zone, with possible surcharges, while flat-rate couriers charge predictable prices no matter where you send an item. MailPlus uses flat-rate pricing for items up to 5kg, which often makes costs easier to predict and control for businesses shipping regularly."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between Australia Post and a courier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Australia Post has the widest network and Post Office counters, but you usually drop parcels off. A courier like MailPlus collects from your door same-day, gives you a named local owner-operator, and uses flat-rate pricing up to 5kg. MailPlus can also lodge with Australia Post on your behalf."
        }
      },
      {
        "@type": "Question",
        "name": "Can MailPlus lodge parcels with Australia Post for me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Through its Post Office collect & lodge service, MailPlus picks up your Australia Post mail and parcels and lodges them on your behalf, and can clear your business PO Boxes, with same-day collection. This removes Post Office queues and trips from your routine while keeping access to the Australia Post network."
        }
      },
      {
        "@type": "Question",
        "name": "Does MailPlus deliver Australia-wide like Australia Post?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. MailPlus delivers 1–2 business days Australia-wide, with 95% of shipments arriving overnight on business days. Its local owner-operators handle collection and lodgement, and through partnerships with leading overnight carriers MailPlus reaches destinations right across the country."
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
      { "@type": "ListItem", "position": 3, "name": "Australia Post vs. courier services", "item": "https://mailplus.com.au/resources/australia-post-vs-courier-services" }
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
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resource Hub</Link> &nbsp;/&nbsp; <span>Australia Post vs. courier services</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot"></span> Comparison
            </div>
            <h1>Australia Post vs. courier services: what small businesses need to know</h1>
            <p className="art-lead">
              For most Australian small and medium businesses, the question isn't whether Australia Post is good — it's whether a dedicated courier suits how you actually ship. The two models differ most in how parcels are collected, how pricing works, and who you reach when there's a problem.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="prose">
            <h2>Network and coverage</h2>
            <p>
              Australia Post has the largest delivery footprint in the country and a Post Office in almost every suburb. Courier networks are smaller but focused. MailPlus operates franchised territories across all metro areas and selected regional areas, with approximately 300 vehicles across 120+ franchises Australia-wide. Through partnerships with leading overnight carriers, MailPlus delivers 1–2 business days Australia-wide.
            </p>
            <h2>Pickup and collection</h2>
            <p>
              This is the clearest difference. With the Post Office model you generally drop parcels at a counter or depot. A courier with local drivers collects from you. MailPlus offers same-day collection through a local owner-operator — and uniquely, it also bridges the two: through its <Link href="/post-office-collect-lodge">Post Office collect & lodge</Link> service, MailPlus picks up and lodges your Australia Post mail and parcels for you, so you skip the queue entirely.
            </p>
            <h2>How does MailPlus compare to Australia Post?</h2>
            <div className="cmp-wrap">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Australia Post</th>
                    <th className="mp">MailPlus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Network &amp; coverage</th>
                    <td>Largest footprint; a Post Office in almost every suburb</td>
                    <td className="mp">Franchised territories across all metro &amp; selected regional areas; ~300 vehicles across 120+ franchises, plus partnerships with leading overnight carriers</td>
                  </tr>
                  <tr>
                    <th scope="row">Pickup</th>
                    <td>You drop parcels at a counter or depot</td>
                    <td className="mp">Same-day collection from a local owner-operator</td>
                  </tr>
                  <tr>
                    <th scope="row">Post Office lodgement</th>
                    <td>You queue and lodge yourself</td>
                    <td className="mp">MailPlus collects &amp; lodges your Australia Post mail and parcels for you</td>
                  </tr>
                  <tr>
                    <th scope="row">Pricing</th>
                    <td>Varies by weight and zone, with possible surcharges</td>
                    <td className="mp">Flat-rate up to 5kg (heavier items up to 20kg)</td>
                  </tr>
                  <tr>
                    <th scope="row">Delivery speed</th>
                    <td>Varies by service</td>
                    <td className="mp">1–2 business days Australia-wide, 95% overnight</td>
                  </tr>
                  <tr>
                    <th scope="row">Support</th>
                    <td>General customer service</td>
                    <td className="mp">Named local owner-operator + local head-office team, no bots</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2>Support and accountability</h2>
            <p>
              With a large network you typically get general customer service. MailPlus pairs you with a local owner-operator who knows your business, backed by a local head-office support team with fast, real-person responses — no long hold times and no bots.
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="cta-band">
            <h2>Skip the Post Office queue</h2>
            <p>MailPlus collects and lodges your Australia Post mail and parcels for you — with same-day collection from a local owner-operator.</p>
            <Link href="/post-office-collect-lodge" className="btn btn-primary">
              Explore Post Office collect &amp; lodge &rarr;
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
                  Is a courier cheaper than Australia Post for small business?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    It depends on your parcels. Australia Post prices vary by weight and zone, with possible surcharges, while flat-rate couriers charge predictable prices no matter where you send an item. MailPlus uses flat-rate pricing for items up to 5kg, which often makes costs easier to predict and control for businesses shipping regularly.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  What's the difference between Australia Post and a courier?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Australia Post has the widest network and Post Office counters, but you usually drop parcels off. A courier like MailPlus collects from your door same-day, gives you a named local owner-operator, and uses flat-rate pricing up to 5kg. MailPlus can also lodge with Australia Post on your behalf.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  Can MailPlus lodge parcels with Australia Post for me?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Yes. Through its Post Office collect &amp; lodge service, MailPlus picks up your Australia Post mail and parcels and lodges them on your behalf, and can clear your business PO Boxes, with same-day collection. This removes Post Office queues and trips from your routine while keeping access to the Australia Post network.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  Does MailPlus deliver Australia-wide like Australia Post?<span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Yes. MailPlus delivers 1–2 business days Australia-wide, with 95% of shipments arriving overnight on business days. Its local owner-operators handle collection and lodgement, and through partnerships with leading overnight carriers MailPlus reaches destinations right across the country.
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
