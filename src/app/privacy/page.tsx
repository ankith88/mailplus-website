import type { Metadata } from 'next'
import Link from 'next/link'
import PrivacyClient from './PrivacyClient'
import './styles.css'

export const metadata: Metadata = {
  title: 'Privacy Policy — MailPlus',
  description:
    'The Mail Plus Pty Ltd Privacy Policy explains how MailPlus and its franchisees collect, hold, use, disclose and protect your personal and sensitive information in line with the Privacy Act 1988 (Cth).',
  alternates: { canonical: 'https://mailplus.com.au/privacy' },
}

export default function PrivacyPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What personal information does MailPlus collect?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus collects the information needed to provide its services — typically your name, email, phone, billing and postal address, transaction and payment details, account logins, service preferences and ABN. For franchisees it may also collect business, financial and sensitive information such as COVID-19 vaccination status where relevant."
        }
      },
      {
        "@type": "Question",
        "name": "How does MailPlus store and protect my information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your personal information is stored electronically on password-protected servers located in Australia, with hardcopy records sometimes held in central offices or by franchisees. MailPlus uses physical, technical and procedural safeguards designed to protect it from misuse, interference, loss, and unauthorised access, modification or disclosure."
        }
      },
      {
        "@type": "Question",
        "name": "Does MailPlus send my personal information overseas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MailPlus is unlikely to disclose your personal information overseas, and information is generally stored on servers in Australia. Where disclosure is needed, it is made to third parties such as strategic delivery partners, IT and data-storage providers, professional advisers, and government or regulatory bodies as permitted by law."
        }
      },
      {
        "@type": "Question",
        "name": "How can I access, correct or stop marketing from MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can request access to or correction of your information, or opt out of marketing, by contacting MailPlus by mail at L16, 175 Pitt Street, Sydney NSW 2000, by phone on 1300 65 65 95, or by email. You can also use the unsubscribe link in any marketing email."
        }
      },
      {
        "@type": "Question",
        "name": "How do I make a privacy complaint to MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Send your complaint in writing to the MailPlus Customer Service team by email. It will be considered or investigated and MailPlus will endeavour to respond within 30 days. If you are unhappy with the response, you can ask the Office of the Australian Information Commissioner to investigate further."
        }
      }
    ]
  };

  const breadcrumbSchemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mailplus.com.au/" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://mailplus.com.au/privacy/" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <div className="privacy-page">
        {/* ============= HERO ============= */}
        <section className="legal-hero">
          <div className="wrap">
            <div className="crumb">
              <Link href="/">Home</Link> <span>/</span> Privacy Policy
            </div>
            <div className="hero-eyebrow">
              <span className="dot"></span> Legal
            </div>
            <h1>Privacy Policy</h1>
            <p className="legal-lead">
              How Mail Plus Pty Ltd and its franchisees collect, hold, use, disclose and protect your personal — including sensitive — information, in line with the Privacy Act 1988 (Cth).
            </p>
            <p className="legal-meta">Effective 6 October 2021  ·  Mail Plus Pty Ltd ACN 609 801 194</p>
          </div>
        </section>

        {/* ============= ANSWER-FIRST INTRO BAND (AEO) ============= */}
        <section className="intro-band">
          <div className="wrap">
            <div className="intro-band-inner">
              <div className="intro-band-label">
                In <span className="hl">plain English</span>
              </div>
              <div className="intro-band-copy">
                <p>
                  <strong>This Privacy Policy explains how Mail Plus Pty Ltd (ACN 609 801 194) and its franchisees handle your personal and sensitive information.</strong> It covers what we collect, how we collect it, why we use it, who we share it with, and how we keep it secure.
                </p>
                <p>
                  We collect the information needed to run our pickup and delivery services and our franchise network — such as your contact, billing, payment and account details — and we store it securely on password-protected servers located in Australia. We are unlikely to send your information overseas.
                </p>
                <p>
                  You can access or correct your information, opt out of marketing, or raise a complaint at any time using the contact details below. This summary is a guide only — the full policy that follows applies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= TABLE OF CONTENTS ============= */}
        <section className="section" style={{ padding: '36px 0 8px' }}>
          <div className="wrap">
            <div className="legal-toc">
              <h2>On this page</h2>
              <ol>
                <li><a href="#s1">About Mail Plus and this Privacy Policy</a></li>
                <li><a href="#s2">Background</a></li>
                <li><a href="#s3">What information do we collect?</a></li>
                <li><a href="#s4">How do we collect it?</a></li>
                <li><a href="#s5">Why do we collect and use it?</a></li>
                <li><a href="#s6">Who may we disclose it to?</a></li>
                <li><a href="#s7">If you don&rsquo;t provide it</a></li>
                <li><a href="#s8">How we hold &amp; secure it</a></li>
                <li><a href="#s9">Overseas transfers</a></li>
                <li><a href="#s10">Marketing</a></li>
                <li><a href="#s11">Access &amp; correction</a></li>
                <li><a href="#s12">How we handle complaints</a></li>
                <li><a href="#s13">Further information</a></li>
                <li><a href="#s14">Changes to this Policy</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ol>
            </div>
          </div>
        </section>

        {/* ============= LEGAL BODY ============= */}
        <section className="section" style={{ paddingTop: '28px' }}>
          <div className="wrap">
            <div className="legal-body">
              {/* 1 */}
              <div className="legal-block" id="s1">
                <h2>1. About Mail Plus and this Privacy Policy</h2>
                <div className="clause">
                  <span className="lbl">1.1</span>
                  <span className="txt">
                    Mail Plus Pty Ltd (ACN 609 801 194) (Mail Plus) oversees a franchise network and it and its franchisees primarily operate a national pickup and delivery service for parcels and mail deliveries (Core Services). The network also provides a number of miscellaneous services such as assisting clients with banking, providing stationery and goods (such as delivery satchels) and delivering milk and travelling between dedicated office spaces and third parties (Additional Services). As a franchisor, Mail Plus provides services to franchisees to assist them with training, template documents for use with clients, invoicing clients, collection of funds from clients, booking services with clients, marketing, regulatory compliance and other goods and services as Mail Plus believes may be appropriate for the operation of the franchised business or the network from time to time (Franchise Services). Together, the Core Services, Additional Services and Franchise Services constitute Services under this Privacy Policy.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">1.2</span>
                  <span className="txt">
                    This Privacy Policy explains how we manage the personal (including sensitive) information that we collect, hold, use and disclose and how to contact us if you have any further queries about our management of your personal (including sensitive) information. This Privacy Policy applies to you only to the extent that the collection and handling of your personal (including sensitive) information is subject to the Privacy Act 1988 (Cth) (Privacy Act).
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">1.3</span>
                  <span className="txt">
                    If you have any queries or concerns around how a franchisee in the Mail Plus network has managed your personal (including sensitive) information, we invite you to contact us and we will seek to assist you with those queries or concerns.
                  </span>
                </div>
              </div>

              {/* 2 */}
              <div className="legal-block" id="s2">
                <h2>2. Background</h2>
                <div className="clause">
                  <span className="lbl">2.1</span>
                  <span className="txt">
                    Where the collection or handling of your personal information by us is subject to the Privacy Act, we must comply with the requirements of that Act. Where the collection or handling of your personal information by our franchisees is subject to the Privacy Act, our franchisees must comply with the requirements of that Act. The Privacy Act regulates the manner in which personal information is handled throughout its life cycle, from collection to use and disclosure, storage, accessibility and disposal.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">2.2</span>
                  <span className="txt">
                    Personal information is information or an opinion about an identified individual, or an individual who is reasonably identifiable, whether the information or opinion is true or not, and whether the information or opinion is recorded in a material form or not.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">2.3</span>
                  <span className="txt">
                    Special provisions apply to the collection of personal information which is sensitive information. This includes health information and information about a person&rsquo;s race, ethnic origin, political opinions, membership of political, professional or trade associations, religious or philosophical belief, sexual preferences and criminal history.
                  </span>
                </div>
              </div>

              {/* 3 */}
              <div className="legal-block" id="s3">
                <h2>3. What personal (including sensitive) information do we collect?</h2>
                <div className="clause">
                  <span className="lbl">3.1</span>
                  <span className="txt">
                    In the course of our business, we may collect personal (including sensitive) information about you that is necessary for us to perform our functions and activities. In the course of providing Services our franchisees may also collect personal (including sensitive) information about you that is necessary for functions and activities to be performed.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">3.2</span>
                  <span className="txt">
                    If you are a customer, we or our franchisees may collect personal information about you such as:
                    <div className="subclause">
                      <p>(a) identifying and contact information (such as name, email address and telephone numbers);</p>
                      <p>(b) billing and postal address details;</p>
                      <p>(c) transaction details relating to the services you require and purchases and bookings that have been made with us;</p>
                      <p>(d) bank account and payment details;</p>
                      <p>(e) account usernames and passwords;</p>
                      <p>(f) any personal preferences you select in respect of the services and products we offer including the days and times in which services are provided (and any reasoning for those days and times); and</p>
                      <p>(g) Australian Business Number.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">3.3</span>
                  <span className="txt">
                    If you are a franchisee, we may collect personal (including sensitive) information about you and your manager as well as your officers, employees and contractors such as:
                    <div className="subclause">
                      <p>(a) the business history and experience of the franchisee or individuals behind the operation of the franchisee;</p>
                      <p>(b) the financial history of the franchisee or individuals behind the operation of the franchisee;</p>
                      <p>(c) identifying and contact information (such as name, email address, home address, telephone numbers and visa status);</p>
                      <p>(d) Australian Business Number and other business information such as copies of any trust deed, information from references, copies of tax information, information collected during an audit from bank statements and other business records;</p>
                      <p>(e) COVID-19 vaccination status and, where relevant, medical contraindication certificates.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">3.4</span>
                  <span className="txt">
                    The types of personal (including sensitive) information we may collect and hold may vary depending on the nature of our interaction with you and the Services you have requested. Some examples may include:
                    <div className="subclause">
                      <p>(a) Parcels: when you ship a parcel with us, we will capture the details of the parcel including the shipping activities (for tracking purposes), the weight and dimensions of the parcel and the details of the sender and the receiver of the parcel;</p>
                      <p>(b) Communications: when you communicate with us to inquire about, book or pay for our courier services, we will collect your personal information.</p>
                      <p>(c) Marketing – we engage in marketing for our Services and may use your personal information to market our Services to you.</p>
                      <p>(d) Preferences – when you order goods or services from us and our franchisees, your preferences may be recorded and we may use this information to inform you of other services we offer which may be of interest to you.</p>
                      <p>(e) Business – when you are a franchisee we collect information regarding the operation of the franchised business and we may use this information to monitor compliance and offer suggestions regarding the operation of the business.</p>
                      <p>(f) COVID-19 Vaccine Status – our strategic partners, customers and/or government regulation may require that only COVID-19 vaccinated people attend locations or interact and we collect your personal (including sensitive) information to facilitate the provision of Services in accordance with strategic partner requirements, customer requirements and regulatory requirements.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">3.5</span>
                  <span className="txt">
                    We may collect personal (including sensitive) information about:
                    <div className="subclause">
                      <p>(a) our customers;</p>
                      <p>(b) our franchisees, the franchisee manager and the officers, employees and contractors of the franchisee;</p>
                      <p>(c) the guarantors of the franchisee; and</p>
                      <p>(d) third parties providing or receiving goods or services to/from Mail Plus.</p>
                    </div>
                  </span>
                </div>
              </div>

              {/* 4 */}
              <div className="legal-block" id="s4">
                <h2>4. How do we collect personal (including sensitive) information?</h2>
                <div className="clause">
                  <span className="lbl">4.1</span>
                  <span className="txt">
                    In the course of our business, we may collect your personal (including sensitive) information in a number ways including when you:
                    <div className="subclause">
                      <p>(a) complete an application form to become a customer or a franchisee;</p>
                      <p>(b) register as a user, or create an account, or enter into a contract with us for our Services;</p>
                      <p>(c) make a booking for our Services;</p>
                      <p>(d) use, seek or enquire about our Services;</p>
                      <p>(e) provide us with feedback;</p>
                      <p>(f) make an inquiry or a complaint;</p>
                      <p>(g) as a franchisee, are audited by us; and</p>
                      <p>(h) otherwise communicate with us (either verbally or in writing).</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">4.2</span>
                  <span className="txt">
                    We typically collect your personal (including sensitive) information directly from you. We may also collect personal (including sensitive) information about you from third parties such as from:
                    <div className="subclause">
                      <p>(a) payment gateways relating to payments made through third party providers;</p>
                      <p>(b) franchisees; and</p>
                      <p>(c) your financier or vendor, if you are a franchisee that has entered into an arrangement that encumbers the franchise.</p>
                    </div>
                  </span>
                </div>
              </div>

              {/* 5 */}
              <div className="legal-block" id="s5">
                <h2>5. Why do we collect, hold, use and disclose your personal (including sensitive) information?</h2>
                <div className="clause">
                  <span className="lbl">5.1</span>
                  <span className="txt">
                    In general, we collect, hold, use and disclose personal (including sensitive) information for the following purposes:
                    <div className="subclause">
                      <p>(a) to carry out our functions and activities including providing you with our Services;</p>
                      <p>(b) to help us better understand the needs of our customers, strategic partners and franchisees so that we can better develop products and services for them or so that the products and services can be more efficiently integrated and managed;</p>
                      <p>(c) to manage our relationship with you and to contact you for follow up purposes;</p>
                      <p>(d) to facilitate the management of our franchisees and their manager, officers, employees and contractors, including to address health and safety matters (such as with respect to COVID-19) and ensure compliance with our policies, procedures and requirements;</p>
                      <p>(e) to verify and update personal (including sensitive) information held by us;</p>
                      <p>(f) to review, develop and improve our functions and activities and business processes;</p>
                      <p>(g) to review and address complaints;</p>
                      <p>(h) to comply with legal or regulatory obligations; and</p>
                      <p>(i) for other purposes required or authorised by or under law, including purposes for which you have provided your express or implied consent. We may also use and disclose to third parties aggregated de-identified data regarding our franchisees, strategic partners and customers. We may use and disclose data where we are required to do so by law.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">5.2</span>
                  <span className="txt">
                    Our functions and activities may change from time to time.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">5.3</span>
                  <span className="txt">
                    If you provide your email address, telephone and/or mobile phone number, you also consent to us using your email address, telephone and/or mobile phone number to contact you (including by telephone call, SMS or email) for any of the above purposes.
                  </span>
                </div>
              </div>

              {/* 6 */}
              <div className="legal-block" id="s6">
                <h2>6. To whom may we disclose your personal (including sensitive) information?</h2>
                <p>In order to carry out the above purposes, we may disclose your personal (including sensitive) information to third parties including:</p>
                <div className="subclause">
                  <p>(a) prospective franchisees, your buyer, franchisees and their manager, officers, employees and contractors;</p>
                  <p>(b) persons or organisations we engage to assist us in carrying out our Services such as our strategic partners who may perform part of the collection and delivery services, data storage providers, IT support, marketing service providers and professional advisors;</p>
                  <p>(c) government agencies, regulatory bodies and law enforcement agencies, or as required, permitted or authorised by law or where we have a public duty to do so; and</p>
                  <p>(d) parties involved in a prospective or actual transfer of our assets or business.</p>
                </div>
              </div>

              {/* 7 */}
              <div className="legal-block" id="s7">
                <h2>7. What happens if you don&rsquo;t provide your personal (including sensitive) information to us?</h2>
                <div className="clause">
                  <span className="lbl">7.1</span>
                  <span className="txt">
                    If you are a customer and you do not provide the personal (including sensitive) information that we request, we may be unable to provide the Core Services or Additional Services.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">7.2</span>
                  <span className="txt">
                    If you are a franchisee and you do not provide the personal (including sensitive) information that we request, we may be unable to provide the Franchise Services and you may not be able to provide goods and services to customers, deal with our strategic partners or operate a franchised business (or you may need to engage a third party employee or contractor to provide services in your franchised business).
                  </span>
                </div>
              </div>

              {/* 8 */}
              <div className="legal-block" id="s8">
                <h2>8. How do we hold your information and manage its quality and security?</h2>
                <div className="clause">
                  <span className="lbl">8.1</span>
                  <span className="txt">
                    We store your personal (including sensitive) information electronically on servers located in Australia with access only available by password. A hardcopy format may also be kept in our central offices or by our franchisees.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">8.2</span>
                  <span className="txt">
                    We aim to store your personal (including sensitive) information securely and have a range of security controls in place (including physical, technical and procedural safeguards) designed to protect your personal (including sensitive) information.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">8.3</span>
                  <span className="txt">
                    To the extent required by the Privacy Act, we take reasonable steps and require that our franchisees take reasonable steps to:
                    <div className="subclause">
                      <p>(a) make sure that the personal (including sensitive) information that we collect, hold, use and disclose is accurate, complete and up to date; and</p>
                      <p>(b) protect the personal (including sensitive) information that we hold from misuse, interference and loss and from unauthorised access, modification or disclosure.</p>
                    </div>
                  </span>
                </div>
              </div>

              {/* 9 */}
              <div className="legal-block" id="s9">
                <h2>9. Do we transfer personal (including sensitive) information overseas?</h2>
                <p>We are unlikely to disclose your personal (including sensitive) information overseas.</p>
              </div>

              {/* 10 */}
              <div className="legal-block" id="s10">
                <h2>10. Marketing</h2>
                <div className="clause">
                  <span className="lbl">10.1</span>
                  <span className="txt">
                    We may use your personal information to contact you (including by mail, telephone call, SMS or email) in relation to products, services or other offers we think may be of interest to you.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">10.2</span>
                  <span className="txt">
                    You may opt-out of receiving marketing materials from Mail Plus at any time by contacting us using the contact details in the section below or using the unsubscribe facility in an email from us.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">10.3</span>
                  <span className="txt">
                    If you opt-out of receiving marketing materials from Mail Plus, please note that we may still contact you to provide you with other types of non-marketing information.
                  </span>
                </div>
              </div>

              {/* 11 */}
              <div className="legal-block" id="s11">
                <h2>11. How can you access or correct the information we hold about you?</h2>
                <div className="clause">
                  <span className="lbl">11.1</span>
                  <span className="txt">
                    Please contact us if you would like to seek access to or request that we correct the personal (including sensitive) information we hold about you:
                    <div className="contact-card">
                      <div className="cc-row">
                        <span className="cc-ic">✉️</span>
                        <span><strong>By mail:</strong> L16, 175 Pitt Street, Sydney NSW 2000</span>
                      </div>
                      <div className="cc-row">
                        <span className="cc-ic">📞</span>
                        <span><strong>By telephone:</strong> <a href="tel:1300656595">1300 65 65 95</a></span>
                      </div>
                      <div className="cc-row">
                        <span className="cc-ic">@</span>
                        <span><strong>By email:</strong> <a href="mailto:customerservice@mailplus.com.au">customerservice@mailplus.com.au</a></span>
                      </div>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">11.2</span>
                  <span className="txt">
                    We will generally provide you with access to your personal (including sensitive) information if practicable, and will take reasonable steps to amend any personal (including sensitive) information about you which is inaccurate or out of date. In some circumstances and in accordance with the Privacy Act, we may not permit you access to your personal (including sensitive) information, or may refuse to correct your personal (including sensitive) information, in which case we will provide you reasons for this decision.
                  </span>
                </div>
              </div>

              {/* 12 */}
              <div className="legal-block" id="s12">
                <h2>12. How we handle complaints</h2>
                <div className="clause">
                  <span className="lbl">12.1</span>
                  <span className="txt">
                    If you have any concerns or complaints about the manner in which we have collected or handled your personal (including sensitive) information, please advise us of your concern or complaint in writing and send it to our Customer Service team using the email address set out above. Your concern or complaint will be considered or investigated and we will endeavour to respond to your complaint within 30 days.
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">12.2</span>
                  <span className="txt">
                    It is our intention to use our best endeavours to resolve any complaint to your satisfaction. However, if you are unhappy with our response, you may contact the Office of Australian Information Commission who may investigate your complaint further.
                  </span>
                </div>
              </div>

              {/* 13 */}
              <div className="legal-block" id="s13">
                <h2>13. Further information</h2>
                <p>
                  Further information about the application of the Privacy Act can be found at the website of the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
                </p>
              </div>

              {/* 14 */}
              <div className="legal-block" id="s14">
                <h2>14. Changes to our Privacy Policy</h2>
                <p>
                  This Privacy Policy is effective from 6th October 2021. As this Privacy Policy is updated from time to time, to obtain a copy of the latest version at any time, you should visit our website at <a href="https://mailplus.com.au/">https://mailplus.com.au/</a> or contact our Customer Service team at <a href="mailto:customerservice@mailplus.com.au">customerservice@mailplus.com.au</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= FAQ (AEO) ============= */}
        <section className="section faq-section" id="faq" style={{ background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Frequently asked questions</div>
              <h2>Your privacy, answered</h2>
              <p>Quick answers to common privacy questions. The full policy above always applies.</p>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q">
                  What personal information does MailPlus collect? <span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus collects the information needed to provide its services — typically your name, email, phone, billing and postal address, transaction and payment details, account logins, service preferences and ABN. For franchisees it may also collect business, financial and sensitive information such as COVID-19 vaccination status where relevant.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  How does MailPlus store and protect my information? <span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Your personal information is stored electronically on password-protected servers located in Australia, with hardcopy records sometimes held in central offices or by franchisees. MailPlus uses physical, technical and procedural safeguards designed to protect it from misuse, interference, loss, and unauthorised access, modification or disclosure.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  Does MailPlus send my personal information overseas? <span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    MailPlus is unlikely to disclose your personal information overseas, and information is generally stored on servers in Australia. Where disclosure is needed, it is made to third parties such as strategic delivery partners, IT and data-storage providers, professional advisers, and government or regulatory bodies as permitted by law.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  How can I access, correct or stop marketing from MailPlus? <span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    You can request access to or correction of your information, or opt out of marketing, by contacting MailPlus by mail at L16, 175 Pitt Street, Sydney NSW 2000, by phone on 1300 65 65 95, or by email. You can also use the unsubscribe link in any marketing email.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">
                  How do I make a privacy complaint to MailPlus? <span className="faq-toggle">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Send your complaint in writing to the MailPlus Customer Service team by email. It will be considered or investigated and MailPlus will endeavour to respond within 30 days. If you are unhappy with the response, you can ask the Office of the Australian Information Commissioner to investigate further.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= CTA BAND ============= */}
        <section className="cta-band">
          <div className="wrap">
            <h2>Questions about your privacy?</h2>
            <p>Contact our Customer Service team to access or correct your information, opt out of marketing, or raise a concern. Our local team is here Monday to Friday.</p>
            <div className="cta-row">
              <a href="mailto:customerservice@mailplus.com.au" className="btn-cta">Email us</a>
              <a href="tel:1300656595" className="btn-line">Call 1300 65 65 95</a>
            </div>
          </div>
        </section>
      </div>

      <PrivacyClient />
    </>
  )
}
