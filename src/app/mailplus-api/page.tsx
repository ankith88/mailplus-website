import type { Metadata } from 'next';
import Script from 'next/script';
import MailplusApiClient from './MailplusApiClient';
import { CustomSelect } from '@/components/shared/CustomSelect';
import './styles.css';

export const metadata: Metadata = {
  title: 'MailPlus API | Connect Your Systems to MailPlus | MailPlus',
  description: "The MailPlus API lets developers and higher-volume businesses connect their own systems directly to MailPlus for automated bookings, labels and tracking at scale. It's the code-level option, distinct from ShipMate — most businesses use our free ShipMate platform instead.",
};

export default function MailPlusApiPage() {
  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Shipping API integration",
  "name": "MailPlus API",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MailPlus",
    "url": "https://mailplus.com.au",
    "telephone": "+61-1300-65-65-95",
    "foundingDate": "1997",
    "areaServed": "AU"
  },
  "areaServed": { "@type": "Country", "name": "Australia" },
  "description": "The MailPlus API connects your own systems directly to MailPlus for automated bookings, labels and tracking at scale. It is end-to-end shipping software integration for 3PLs and businesses with warehouse or custom shipping systems, available with MailPlus Express. It is the developer, code-level option, distinct from the free ShipMate platform that most MailPlus businesses use.",
  "audience": {
    "@type": "Audience",
    "audienceType": "Developers and higher-volume businesses"
  }
}
      ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does MailPlus have an API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The MailPlus API lets you connect your own systems directly to MailPlus for automated bookings, labels and tracking at scale. It's designed for developers and higher-volume businesses that want shipping built into their own software, rather than managing it through a separate platform. Most businesses use ShipMate, our free platform, instead."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between ShipMate and the MailPlus API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ShipMate is the free MailPlus platform you use directly — book pickups, print labels and track orders from one dashboard. The MailPlus API is the code-level option: it connects your own systems straight to MailPlus so bookings, labels and tracking happen automatically inside your own software. Same network, two ways to access it."
      }
    },
    {
      "@type": "Question",
      "name": "What can the MailPlus API do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The MailPlus API handles automated bookings, label generation and tracking at scale. By connecting your systems directly to MailPlus, shipping happens automatically as orders flow through your own software — useful for businesses with higher volumes or custom platforms that need shipping built in."
      }
    },
    {
      "@type": "Question",
      "name": "Who is the MailPlus API for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The API suits developers and higher-volume businesses that want to build shipping into their own systems, rather than working from a separate dashboard. If you're after a ready-to-use platform with no code required, ShipMate is the better fit — most MailPlus customers use it. The API is for connecting at scale."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get access to the MailPlus API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Get in touch through the enquiry form below or call the MailPlus team on 1300 65 65 95, Monday to Friday, 9am–5pm AEST. Let us know a little about your business and what you'd like to connect, and we'll talk you through getting set up with API access."
      }
    }
  ]
}
      ) }} />

      <div className="mailplus-api-page">
        {/* ============= BREADCRUMB ============= */}
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span className="sep">/</span><a href="/#services">Services</a><span className="sep">/</span><span>MailPlus API</span>
          </nav>
        </div>

        {/* ============= HERO ============= */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid hero-grid-solo">
              <div className="hero-copy">
                <div className="hero-eyebrow"><span className="dot"></span> Developer integration</div>
                <h1>Build shipping into<br/><span className="hl">your own systems.</span></h1>
                <p className="hero-lead hero-lead-hook">
                  The MailPlus API connects your own systems directly to MailPlus, so you can generate labels for MailPlus&#x2019; express service and track shipments from inside your own software. It's the code-level option — distinct from ShipMate, the free platform most businesses use.
                </p>
                <div className="hero-cta-row">
                  <a href="#enquire" className="btn btn-primary">Enquire now →</a>
                  <a href="tel:1300656595" className="btn btn-secondary">Call 1300 65 65 95</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= ANSWER-FIRST INTRO BAND (AEO) ============= */}
        <section className="intro-band">
          <div className="wrap">
            <div className="intro-band-inner">
              <div className="intro-band-label">MailPlus <span className="hl">API</span></div>
              <div className="intro-band-copy">
                <p><strong>The MailPlus API connects your own systems directly to MailPlus, so you can generate labels for MailPlus&#x2019; express service and track shipments without leaving your own software.</strong> It's the developer, code-level option — for businesses that want shipping built into their own systems, rather than managed through a separate platform.</p>
                <div className="intro-more" id="introMore">
                  <p>It's end-to-end shipping software integration for 3PLs and businesses with warehouse or custom shipping systems. By connecting your systems straight to MailPlus, shipping happens automatically as orders flow through your own software — generate labels on demand, get live tracking visible in both your system and the MailPlus dashboard, and send automatic customer email notifications. Parcels move on the MailPlus network with 1–2 day express delivery Australia-wide.</p>
                  <p>The API is distinct from ShipMate. ShipMate is the platform you use directly — book pickups, print labels and track orders from one dashboard, with no code required. The API is for building that same shipping into your own systems instead. Same network, two ways to access it. Most businesses use <a href="/shipmate-platform">ShipMate, our free platform</a> — the API is for connecting your own systems at scale.</p>
                  <p>And you're not on your own once you're connected: API customers get full MailPlus team support — Sales, Customer Service &amp; Retention, IT Systems, and direct contact with their local MailPlus Operator — plus team training on the shipping solution. Whether you connect through the API or use ShipMate on its own, MailPlus is a reliable, independent alternative to Australia Post and traditional couriers.</p>
                </div>
                <button className="intro-toggle" id="introToggle" aria-expanded="false">
                  <span className="it-text">Read more</span> <span className="it-caret">▾</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============= FAQ ============= */}
        <section className="section faq-section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Frequently asked questions</div>
              <h2>The MailPlus API, answered.</h2>
            </div>

            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q">Does MailPlus have an API? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">Yes. The MailPlus API lets you connect your own systems directly to MailPlus for automated bookings, labels and tracking at scale. It's designed for developers and higher-volume businesses that want shipping built into their own software, rather than managing it through a separate platform. Most businesses use <a href="/shipmate-platform">ShipMate</a>, our free platform, instead.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">What's the difference between ShipMate and the MailPlus API? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">ShipMate is the free MailPlus platform you use directly — book pickups, print labels and track orders from one dashboard. The MailPlus API is the code-level option: it connects your own systems straight to MailPlus so bookings, labels and tracking happen automatically inside your own software. Same network, two ways to access it.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">What can the MailPlus API do? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">The MailPlus API handles automated bookings, label generation and tracking at scale. By connecting your systems directly to MailPlus, shipping happens automatically as orders flow through your own software — useful for businesses with higher volumes or custom platforms that need shipping built in.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">Who is the MailPlus API for? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">The API suits developers and higher-volume businesses that want to build shipping into their own systems, rather than working from a separate dashboard. If you're after a ready-to-use platform with no code required, <a href="/shipmate-platform">ShipMate</a> is the better fit — most MailPlus customers use it. The API is for connecting at scale.</div></div>
              </div>
              <div className="faq-item">
                <button className="faq-q">How do I get access to the MailPlus API? <span className="faq-toggle">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">Get in touch through the enquiry form below or call the MailPlus team on 1300 65 65 95, Monday to Friday, 9am–5pm AEST. Let us know a little about your business and what you'd like to connect, and we'll talk you through getting set up with API access.</div></div>
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
                  <h2>Talk to us about API access.</h2>
                  <p>Tell us a little about your business and what you'd like to connect, and we'll talk you through getting set up with MailPlus API access. Prefer to talk? Our Aussie-based team is here Monday to Friday.</p>
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
                    <p className="ef-intro">Tell us about your business and what you'd like to connect, and we'll be in touch about getting set up with API access.</p>

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

                    <div className="field-group">
                      <label className="field-label">What would you like to connect? <span className="req">*</span></label>
                      <CustomSelect
                        id="f-interest"
                        triggerClassName="field-select"
                        options={[
                          { value: 'MailPlus API integration', label: 'MailPlus API integration' },
                          { value: 'Warehouse / 3PL system', label: 'Warehouse / 3PL system' },
                          { value: 'Custom shipping platform', label: 'Custom shipping platform' },
                          { value: 'Not sure yet — want to discuss', label: 'Not sure yet — want to discuss' },
                          { value: 'Something else', label: 'Something else' },
                        ]}
                      />
                    </div>

                    <div className="field-group">
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

                    <button className="form-submit">Enquire now →</button>
                  </div>

                  <div className="form-success" id="enquiryChecking">
                    <div className="fs-ic checking">📍</div>
                    <h3>Checking your area…</h3>
                    <p>Looking for a local MailPlus driver near your pickup address. This will only take a moment.</p>
                  </div>

                  <div className="form-success" id="enquirySuccess">
                    <div className="fs-ic">✓</div>
                    <h3>Thanks — we've got it.</h3>
                    <p>A member of the MailPlus team will be in touch within one business day. Need us sooner? Call <strong>1300 65 65 95</strong>, Mon–Fri 9am–5pm AEST.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <MailplusApiClient />
    </>
  );
}
