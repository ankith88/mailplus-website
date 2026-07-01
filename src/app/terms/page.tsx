import type { Metadata } from 'next'
import Link from 'next/link'
import TermsClient from './TermsClient'
import './styles.css'

export const metadata: Metadata = {
  title: 'Terms & Conditions — MailPlus',
  description:
    'MailPlus Terms & Conditions: the Client Contract governing delivery and lodgement, service fees, termination, liability, GST, definitions, and the FreightSafe Warranty for Australian small-business courier customers.',
  alternates: { canonical: 'https://mailplus.com.au/terms' },
}

export default function TermsPage() {
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Client Contract with MailPlus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Client Contract is made up of these Terms & Conditions, the Service Commencement Form, and any orders the Client places from time to time. A Client agrees to the terms by signing the Service Commencement Form in person or electronically. Together these documents govern the services MailPlus provides."
        }
      },
      {
        "@type": "Question",
        "name": "When are MailPlus invoices due for payment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Invoices for Services must be paid within 15 days of the Invoice Date, and invoices for Extra Services linked to Product Stationery within 7 days. Time is of the essence. Late payment can trigger administration fees and MailPlus may cease providing services until the account is brought up to date."
        }
      },
      {
        "@type": "Question",
        "name": "Does MailPlus insure my parcels?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. MailPlus does not insure Mail Items, and the Client is solely responsible for arranging insurance at their own cost if desired. Liability for loss, damage or delay is limited to the Service Fee paid, except where caused by MailPlus's wilful misconduct or fraud, and subject to the Australian Consumer Law."
        }
      },
      {
        "@type": "Question",
        "name": "How do I cancel my MailPlus service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Either party may terminate the Client Contract by giving two weeks' prior written notice. MailPlus continues providing services and invoicing fees through the notice period, and the Client remains liable for those fees. MailPlus may also terminate immediately if an invoice is not paid in full by the Invoice Date."
        }
      },
      {
        "@type": "Question",
        "name": "What does the FreightSafe Warranty cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FreightSafe is a service-guarantee warranty covering shipping products sent via ShipMate against loss of or damage to goods in transit. Claims are capped at the lesser of $250 or the documented cost price of the goods, exclude consequential loss, and must be lodged online within the stated time limits."
        }
      }
    ]
  };

  const breadcrumbSchemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mailplus.com.au/" },
      { "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://mailplus.com.au/terms/" }
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

      <div className="terms-page">
        {/* ============= HERO ============= */}
        <section className="legal-hero">
          <div className="wrap">
            <div className="crumb">
              <Link href="/">Home</Link> <span>/</span> Terms &amp; Conditions
            </div>
            <div className="hero-eyebrow">
              <span className="dot"></span> Legal
            </div>
            <h1>Terms &amp; Conditions</h1>
            <p className="legal-lead">
              These Terms &amp; Conditions form the Client Contract between you and MailPlus, covering how we deliver and lodge your items, fees and payment, liability, and the FreightSafe Warranty.
            </p>
            <p className="legal-meta">Last updated 11 February 2025 · Mail Plus Pty Ltd ACN 609 801 194</p>
          </div>
        </section>

        {/* ============= ANSWER-FIRST INTRO BAND (AEO) ============= */}
        <section className="intro-band">
          <div className="wrap">
            <div className="intro-band-inner">
              <div className="intro-band-label">In <span className="hl">plain English</span></div>
              <div className="intro-band-copy">
                <p>
                  <strong>These Terms &amp; Conditions are the Client Contract that governs the courier services MailPlus provides to your business.</strong> They sit alongside your Service Commencement Form and any orders you place, and you accept them by signing that form in person or electronically.
                </p>
                <p>
                  The terms set out how MailPlus collects, delivers and lodges your items, how Service Fees and invoices work, when either party can end the contract, and how liability and insurance are handled. MailPlus does not insure your items — you are responsible for arranging cover if you want it — and liability is generally limited to the Service Fee, subject to your rights under the Australian Consumer Law.
                </p>
                <p>
                  A separate section covers the <strong>FreightSafe Warranty</strong>, available only for shipping products sent via ShipMate, which provides limited cover against loss or damage to goods in transit up to $250 per consignment.
                </p>
                <p className="legal-meta" style={{ marginTop: '4px' }}>This is a plain-language summary only. The full terms below prevail.</p>
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
                <li><a href="#s1">Parties</a></li>
                <li><a href="#s2">Delivery &amp; Lodgement Procedure</a></li>
                <li><a href="#s3">Service Fee Payment</a></li>
                <li><a href="#s4">Termination</a></li>
                <li><a href="#s5">Liability and Insurance</a></li>
                <li><a href="#s6">General</a></li>
                <li><a href="#s7">GST</a></li>
                <li><a href="#s8">Definitions</a></li>
                <li><a href="#freightsafe">FreightSafe Warranty</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ol>
            </div>
          </div>
        </section>

        {/* ============= LEGAL BODY ============= */}
        <section className="section" style={{ paddingTop: '28px' }}>
          <div className="wrap">
            <div className="legal-body">

              {/* 1. Parties */}
              <div className="legal-block" id="s1">
                <h2>1. Parties</h2>
                <p>These terms and conditions, together with the Service Commencement Form and orders from the Client received from time to time form the Client Contract between the Client and MailPlus.</p>
              </div>

              {/* 2. Delivery & Lodgement */}
              <div className="legal-block" id="s2">
                <h2>2.A MailPlus Delivery &amp; Lodgement Procedure</h2>
                <div className="clause">
                  <span className="lbl">a.</span>
                  <span className="txt">MailPlus will provide the Services and/or Extra Services in accordance with the information set out in the Client Contract. MailPlus may supply the Product Stationery to the Client in advance to enable the Client to purchase the Extra Services from time to time on the terms set out in the Client Contract.</span>
                </div>
                <div className="clause">
                  <span className="lbl">b.</span>
                  <span className="txt">The Client agrees that MailPlus may collect any Product Stationery held by the Client if the Client Contract ends or is terminated, if the Client fails to pay an Invoice by the Invoice Date, if the Client is not using the Product Stationery, if the Client suffers an Insolvency Event or if there is another legitimate business reason why the collection of the Product Stationery is reasonable in the circumstances.</span>
                </div>
                <div className="clause">
                  <span className="lbl">c.</span>
                  <span className="txt">The Client must ensure that the Delivery Address is attended by the Client or an appropriate representative at all times during the Delivery Time.</span>
                </div>
                <div className="clause">
                  <span className="lbl">d.</span>
                  <span className="txt">If Delivery Address is unattended during the Delivery Time, in the absence of an Authority to Leave, or another agreed arrangement, MailPlus will hold the Mail Items for the Client and attempt to deliver the Mail Items at a later time. Holding the Mail Items is an Extra Service and incurs a Service Fee.</span>
                </div>
                <div className="clause">
                  <span className="lbl">e.</span>
                  <span className="txt">MailPlus will use its reasonable endeavours to pick up, deliver or lodge Mail Items at a Delivery Address during the Delivery Time. Any failure by MailPlus to do this does not constitute a breach of this Client Contract. MailPlus gives no representation, guarantee or warranty that Services or Extra Services will be provided within the Delivery Time or overnight.</span>
                </div>
                <div className="clause">
                  <span className="lbl">f.</span>
                  <span className="txt">The Client must ensure that a duly authorised person on behalf of the Client has signed the Service Commencement Form to accept Services and/or Extra Services.</span>
                </div>
                <div className="clause">
                  <span className="lbl">g.</span>
                  <span className="txt">The Client acknowledges that by continuing to accept Services and/or Extra Services, the Client agrees to pay for these Services and/or Extra Services in accordance with the terms and conditions set out in this Client Contract.</span>
                </div>
                <div className="clause">
                  <span className="lbl">h.</span>
                  <span className="txt">The Client acknowledges that by accepting and using the Product Stationery, the Client agrees to pay for the Extra Services associated with the use of the Product Stationery in accordance with the terms and conditions set out in this Client Contract.</span>
                </div>
              </div>

              {/* 3. Service Fee Payment */}
              <div className="legal-block" id="s3">
                <h2>3. Service Fee Payment</h2>
                <div className="clause">
                  <span className="lbl">a.</span>
                  <span className="txt">Subject to this Client Contract, the Client will pay the Service Fee for all Services and/or Extra Services. The Service Fee for Services and/or Extra Services may be amended from time to time by MailPlus. If a supplier to MailPlus, such as Toll or Australia Post, increase the fees for goods or services used under the Client Contract, this increase may be passed directly onto the Client. The Service Fee may be increased to reflect the increased amount charged by Toll and/or Australia Post and/or a similar supplier. You must also pay: any applicable fees and/or surcharges notified to you, including as a result of any applicable regulatory, legislative or directive imposed on us as amended from time to time;</span>
                </div>
                <div className="clause">
                  <span className="lbl">b.</span>
                  <span className="txt">MailPlus will provide a tax invoice to the Client for the Service Fee (Invoice). The Invoice will state the day on which payment is due (Invoice Date). Mail Plus will render an Invoice for Services (including some Extra Services) each month. Mail Plus will render an Invoice for Extra Services associated with the use of the Product Stationery within 7 days of the Product Stationery being used or as otherwise agreed between the parties in writing.</span>
                </div>
                <div className="clause">
                  <span className="lbl">c.</span>
                  <span className="txt">MailPlus may apply an account administration fee of up to $9.90 GST inclusive on its Invoice each month.</span>
                </div>
                <div className="clause">
                  <span className="lbl">d.</span>
                  <span className="txt">The Client must pay Invoices for Services (including some Extra Services) within 15 days of the Invoice Date. The Client must pay Invoices for Extra Services associated with the use of the Product Stationery within 7 days of the Invoice Date. Time is of the essence.</span>
                </div>
                <div className="clause">
                  <span className="lbl">e.</span>
                  <span className="txt">MailPlus may vary the Service Fee on giving the Client 14 days prior written notice of the variation, and the revised Service Fee will apply to any Services and/or Extra Services performed or provided after the expiry of the 14 day notice period.</span>
                </div>
                <div className="clause">
                  <span className="lbl">f.</span>
                  <span className="txt">MailPlus may charge fees specified below which are in addition to the Service Fee for Services if:
                    <div className="subclause">
                      <p>(i) Mail volumes exceed 16 kilograms ($3.85 for every additional 16 kilograms or part thereof); or</p>
                      <p>(ii) MailPlus is required to collect registered mail items ($3.30 per item), signature items ($3.30 per instance) or parcel items ($2.20 per item) on behalf of the Client; or</p>
                      <p>(iii) MailPlus is not granted prompt, free and unfettered access to the Delivery Address during the Delivery Time.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">g.</span>
                  <span className="txt">If the Client does not have all Mail Items ready for pick-up during the Delivery Time, MailPlus will wait for the Mail Items for up to 5 minutes at no charge (Wait Time). MailPlus may charge an additional $11.00 for each 5 minutes (or part thereof) in addition to the Wait Time that the Client requests MailPlus wait for the Mail Item.</span>
                </div>
                <div className="clause">
                  <span className="lbl">h.</span>
                  <span className="txt">If the Client does not pay an Invoice in full within 30 days of the date of the Invoice Date, the Client acknowledges the right of MailPlus to charge an administration fee of $5.50 to be applied to the next Invoice (which the Client agrees is a reasonable pre-estimate of the likely cost of the default in payment by the Client). MailPlus also reserves the right to act in accordance with condition 3i of these terms and conditions.</span>
                </div>
                <div className="clause">
                  <span className="lbl">i.</span>
                  <span className="txt">If the Client does not pay an Invoice in full within 90 days of the Invoice Date, the Client acknowledges the right of MailPlus to charge the Client a further $11.00 to be applied to the next Invoice (which the Client agrees is a reasonable pre-estimate of the likely cost of the default in payment by the Client). MailPlus also reserves the right to act in accordance with condition 3j of these terms and conditions. MailPlus reserves the right to immediately cease providing the Services and/or Extra Services if an Invoice is not paid by the Invoice Date.</span>
                </div>
                <div className="clause">
                  <span className="lbl">j.</span>
                  <span className="txt">If the Client does not pay the Invoice in full within 30 days of the Invoice Date, MailPlus may:
                    <div className="subclause">
                      <p>(i) immediately cease to provide Services or Extra Services to the Client; and</p>
                      <p>(ii) keep the Clients PO Box and DX box keys until all Invoices rendered by MailPlus to the Client that are due and payable are paid in full.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">k.</span>
                  <span className="txt">MailPlus may engage the services of an agent (including a debt recovery agent) to recover any unpaid Invoices and other amounts due to MailPlus under this Client Contract, and the Client will be responsible for all reasonable mercantile recovery fees applicable.</span>
                </div>
                <div className="clause">
                  <span className="lbl">l.</span>
                  <span className="txt">The Client indemnifies MailPlus for all expenses incurred and loss suffered because the Client breaches this Client Contract, including reasonable legal costs, debt recovery agency costs reasonable mercantile recovery fees and any other expenses, except to the extent that such expenses or losses are directly caused or contributed to by MailPlus’ wilful misconduct or fraud.</span>
                </div>
                <div className="clause">
                  <span className="lbl">m.</span>
                  <span className="txt">The Client indemnifies MailPlus for any additional costs, expenses or charges that arise from the Client not using the correct Product Stationery or from the Client mislabelling the weight of a Mail Item. Product Stationery is not correctly used if Mail Items exceed the weight indicated by the Product Stationery (for example, if Mail Items weighing 2 kilograms are put in a satchel for 1 kilogram). In the event that incorrect Product Stationery is used, MailPlus may charge additional Service Fees or the cost of additional Product Stationery that should have been paid. The surcharge is applied in multiples of the declared product to cover the additional excess (actual weight or cubic weight). For example, if you declare a 1kg satchel and the actual weight is checked at 2.5 kgs; the excess charge will be 2 x 1kg charges.</span>
                </div>
                <div className="clause">
                  <span className="lbl">n.</span>
                  <span className="txt">MailPlus may charge a manual handling fee to cover additional labour costs in processing and handling items of freight that cannot be sorted using our automated sortation equipment.</span>
                </div>
              </div>

              {/* 4. Termination */}
              <div className="legal-block" id="s4">
                <h2>4. Termination</h2>
                <div className="clause">
                  <span className="lbl">a.</span>
                  <span className="txt">This Client Contract may be terminated:
                    <div className="subclause">
                      <p>(i) by either party providing 2 weeks prior written notice of termination to the other party (<strong>Notice Period</strong>); or</p>
                      <p>(ii) immediately by MailPlus if an Invoice is not paid unconditionally and in full by the Invoice Date.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">b.</span>
                  <span className="txt">Subject to clause 4a(i), MailPlus will:
                    <div className="subclause">
                      <p>(i) continue to provide the Services and/or Extra Services to the Client in accordance with this Client Contract throughout the Notice Period; and</p>
                      <p>(ii) issue an Invoice for any Service Fees accrued during the Notice Period.</p>
                    </div>
                  </span>
                </div>
                <div className="clause">
                  <span className="lbl">c.</span>
                  <span className="txt">The Client remains liable for payment of the Service Fees during the Notice Period.</span>
                </div>
                <div className="clause">
                  <span className="lbl">d.</span>
                  <span className="txt">MailPlus may require that the Services Fees for any Services and/or Extra Services to be provided in the Notice Period be paid in advance of the Services and/or Extra Service being provided.</span>
                </div>
                <div className="clause">
                  <span className="lbl">e.</span>
                  <span className="txt">Upon termination or notice of termination (or sooner under this Client Contract), MailPlus may collect the Product Stationery and is authorised to enter the premises where the Product Stationery is stored for this purpose.</span>
                </div>
              </div>

              {/* 5. Liability and Insurance */}
              <div className="legal-block" id="s5">
                <h2>5. Liability and Insurance</h2>
                <div className="clause">
                  <span className="lbl">a.</span>
                  <span className="txt">To the maximum extent permitted by Law, Services and/or Extra Services shall be provided on the basis that recourse for failure to provide Services and/or Extra Services, delay, loss of or damage to the Mail Items carried shall be limited to an amount not exceeding the Service Fee payable by the Client to MailPlus.</span>
                </div>
                <div className="clause">
                  <span className="lbl">b.</span>
                  <span className="txt">To the maximum extent permitted by Law, MailPlus, and any contractor engaged by MailPlus to provide the Services and/or Extra Services, shall have no liability to the Client for any loss, damage or expense the Client may incur in excess of the Service Fee (as contemplated in clause 5a), including without limitation Consequential Loss, as a result of any act or omission or delay by MailPlus, except to the extent that such loss, damage or expense is directly caused by the wilful misconduct or fraud of MailPlus.</span>
                </div>
                <div className="clause">
                  <span className="lbl">c.</span>
                  <span className="txt">MailPlus does not insure the Mail Items and the Client will be solely responsible for obtaining insurance over the Mail Items at its cost if so desired.</span>
                </div>
                <div className="clause">
                  <span className="lbl">d.</span>
                  <span className="txt">The Client will not consign through MailPlus any Mail Items which are or contain articles or substances which are, or may become, a risk to health, safety, property or the environment and include, articles or substances so classified, specified or listed in Laws, including the IATA Dangerous Goods Regulations, the Australian Dangerous Goods Codes for Transport and the Aviation Transport Security Act 2004 (Cth) and articles that are or will become material of an obscene, inflammable, poisonous, illegal, offensive or dangerous nature or an item or document that would be unlawful for MailPlus to deliver, carry or collect.</span>
                </div>
                <div className="clause">
                  <span className="lbl">e.</span>
                  <span className="txt">Any claim by the Client that MailPlus has breached this Client Contract must be made to MailPlus in writing within 3 Business Days of the breach. Time is of the essence. MailPlus is not obliged to accept any claim if it is not lodged in accordance with this clause.</span>
                </div>
                <div className="clause">
                  <span className="lbl">f.</span>
                  <span className="txt">MailPlus goods and Services and/or Extra Services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the Services and Extra Services, the Client is entitled to cancel the provision of further Services and/or Extra Services. The Client is also entitled to choose a refund or replacement for major failures with the Product Stationery. If a failure with the Product Stationery or a Service or Extra Service does not amount to a major failure, the Client is entitled to have the failure rectified in a reasonable time. If this is not done, the Client is entitled to a refund for the Product Stationery and to cancel the contract for the Service and Extra Service and obtain a refund of any unused portion.</span>
                </div>
              </div>

              {/* 6. General */}
              <div className="legal-block" id="s6">
                <h2>6. General</h2>
                <div className="clause">
                  <span className="lbl">a.</span>
                  <span className="txt">Any provision in this Client Contract which binds more than one person, binds all of those persons jointly and each of them severally.</span>
                </div>
                <div className="clause">
                  <span className="lbl">b.</span>
                  <span className="txt">Each obligation imposed on a party by this Client Contract in favour of another is a separate obligation.</span>
                </div>
                <div className="clause">
                  <span className="lbl">c.</span>
                  <span className="txt">Subject to any specific arrangement entered into under clause 6m, the Client Contract, which includes the Service Commencement Form and these terms and conditions, contains the entire understanding between the parties concerning the subject matter of this Client Contract and supersedes all prior communications between the parties.</span>
                </div>
                <div className="clause">
                  <span className="lbl">d.</span>
                  <span className="txt">Each party acknowledges that, except as expressly stated in this Client Contract, that party has not relied on any representation, warranty or undertaking of any kind made by or on behalf of another party in relation to the subject matter of this Client Contract.</span>
                </div>
                <div className="clause">
                  <span className="lbl">e.</span>
                  <span className="txt">Any provision of this Client Contract which is invalid in any jurisdiction must, in relation to that jurisdiction, be read down to the minimum extent necessary to achieve its validity, if applicable and be severed from this Client Contract in any other case without invalidating or affecting the remaining provisions of this Client Contract or the validity of that provision in any other jurisdiction.</span>
                </div>
                <div className="clause">
                  <span className="lbl">f.</span>
                  <span className="txt">This Client Contract binds and benefits the parties and their respective successors and permitted assigns under clause 6g.</span>
                </div>
                <div className="clause">
                  <span className="lbl">g.</span>
                  <span className="txt">A Client cannot assign or otherwise transfer the benefit of this Client Contract without the prior written consent of MailPlus (which will not be unreasonably withheld). MailPlus can assign, otherwise, transfer the benefit of, or novate, this Client Contract either without notice under clause 6o. If the assignment, transfer or novation occurs other than under clause 6o then MailPlus will give the Client written notice of that assignment, transfer or novation.</span>
                </div>
                <div className="clause">
                  <span className="lbl">h.</span>
                  <span className="txt">MailPlus may vary these terms and conditions at any time by giving the Client reasonable notice of the variation. If the Client does not agree to the variations, it may terminate the Client Contract in accordance with clause 4.</span>
                </div>
                <div className="clause">
                  <span className="lbl">i.</span>
                  <span className="txt">This Client Contract is governed by and must be construed in accordance with the laws in force in New South Wales and the parties submit to the non-exclusive jurisdiction of the courts of New South Wales and the Commonwealth of Australia in respect of all matters arising out of or relating to this Client Contract, its performance or subject matter.</span>
                </div>
                <div className="clause">
                  <span className="lbl">j.</span>
                  <span className="txt">If any part of this Client Contract or any variation consists of a number of signed counterparts, each is an original and all of the counterparts together constitute the same document. A Client agrees to these terms and conditions by signing, in person or electronically, the Service Commencement Form.</span>
                </div>
                <div className="clause">
                  <span className="lbl">k.</span>
                  <span className="txt">The Client agrees that all intellectual property used to fulfill any order or provide any Service or Extra Service is owned by or licensed to MailPlus and remains the property of MailPlus (or the licensor) despite any contribution by the Client.</span>
                </div>
                <div className="clause">
                  <span className="lbl">l.</span>
                  <span className="txt">If MailPlus waives a Clients breach of these terms and conditions, that will not operate as a waiver of any other breach. Any act or omission whatsoever by MailPlus (which, but for this clause ought or might amount to a waiver of MailPlus rights in respect of any such breach) does not operate as a waiver in any way of MailPlus rights in respect of such breach.</span>
                </div>
                <div className="clause">
                  <span className="lbl">m.</span>
                  <span className="txt">Any quotation given by MailPlus to the Client and any order given by the Client to MailPlus (which is accepted in writing by MailPlus) shall incorporate these terms and conditions by reference. If there is any discrepancy between such quote and/or order and these terms, the quote and/or order will prevail to such an extent as to resolve the dispute, but otherwise, these terms and conditions will continue to apply.</span>
                </div>
                <div className="clause">
                  <span className="lbl">n.</span>
                  <span className="txt">MailPlus may review its fees and charges, including the Service Fees and the cost of each item of Product Stationery, periodically and advise in writing of any changes, subject to clause 3e.</span>
                </div>
                <div className="clause">
                  <span className="lbl">o.</span>
                  <span className="txt">MailPlus may assign or transfer its rights or obligations under the Client Contract, without the Clients consent, to any third-party service provider such as a courier for the purpose of providing the Services and/or Extra Services to you. Any third-party service provider engaged by MailPlus may, in turn, subcontract part or all of its obligations to another third party.</span>
                </div>
              </div>

              {/* 7. GST */}
              <div className="legal-block" id="s7">
                <h2>7. GST</h2>
                <div className="clause">
                  <span className="lbl">a.</span>
                  <span className="txt">In this clause 7, terms or expressions which have a defined meaning in the A New Tax System (Goods and Services Tax) Act 1999 (Cth) (GST Act) have the same meaning as in the GST Act and any reference to a party includes the representative member of a GST group of which that party is a member.</span>
                </div>
                <div className="clause">
                  <span className="lbl">b.</span>
                  <span className="txt">Unless otherwise expressly stated, all consideration to be paid or provided under the Client Contract is expressed exclusive of GST.</span>
                </div>
                <div className="clause">
                  <span className="lbl">c.</span>
                  <span className="txt">If GST is payable on any supply made under the Client Contract, the recipient must pay to the supplier an additional amount (GST Amount) equal to the GST payable on that supply at the same time as the consideration for the supply is to be paid or provided. This clause does not apply to the extent that the consideration for the supply is stated to include GST; or GST on the supply is reverse charged and payable by the recipient.</span>
                </div>
                <div className="clause">
                  <span className="lbl">d.</span>
                  <span className="txt">The recipient need not pay the GST Amount until it has received a tax invoice or adjustment note, as the case may be.</span>
                </div>
                <div className="clause">
                  <span className="lbl">e.</span>
                  <span className="txt">If an adjustment event arises in relation to a supply made under the Client Contract, the GST Amount must be adjusted to reflect that adjustment event. A corresponding payment must be made by the supplier to the recipient or by the recipient to the supplier, as the case may be. If the Client Contract requires an amount to be calculated by reference to another amount (Reference Amount) that will be: received for a taxable supply; or paid for a creditable acquisition and then the Reference Amount must be reduced so as to exclude any part of the Reference Amount paid or received on account of GST, as the case may be.</span>
                </div>
                <div className="clause">
                  <span className="lbl">f.</span>
                  <span className="txt">If the Client Contract requires a party to reimburse or indemnify another party for a cost or expense, the amount of the cost or expense must be reduced by an amount equal to any input tax credit to which the party being reimbursed or indemnified is entitled for that cost or expense.</span>
                </div>
                <div className="clause">
                  <span className="lbl">g.</span>
                  <span className="txt">This clause 7 will survive and continue to apply following the termination or completion of the Client Contract.</span>
                </div>
              </div>

              {/* 8. Definitions */}
              <div className="legal-block" id="s8">
                <h2>8. Definitions</h2>
                <p>In these terms and conditions:</p>
                <dl className="deflist">
                  <dt>Authority to Leave</dt>
                  <dd>means that the Client authorises MailPlus to leave Mail Items at the delivery address if the Delivery Address is unattended during the Delivery Time.</dd>
                  <dt>Business Day</dt>
                  <dd>means a day other than a Saturday or Sunday that is not a public holiday in the location where an act or payment is to be performed by a party.</dd>
                  <dt>Client Contract</dt>
                  <dd>means these terms and conditions together with the Service Commencement Form and orders placed by the Client from time to time;</dd>
                  <dt>Client</dt>
                  <dd>means the person to whom MailPlus provides Services and/or Extra Services outlined in the Client Contract;</dd>
                  <dt>Consequential Loss</dt>
                  <dd>means any loss of profit, anticipated loss of profit, loss of production, loss of opportunity, loss of use, or any indirect, special or consequential loss or damage;</dd>
                  <dt>Corporations Act</dt>
                  <dd>means the Corporations Act 2001 (Cth);</dd>
                  <dt>Delivery Address</dt>
                  <dd>means the street or postal address (as the case may be) specified in the Client Contract and in orders placed by the Client from time to time;</dd>
                  <dt>Delivery Time</dt>
                  <dd>means the time between the earliest delivery time and latest delivery time outlined in the Client Contract and in orders placed by the Client from time to time.</dd>
                  <dt>Extra Services</dt>
                  <dd>includes collecting registered mail and parcels, holding Mail Items where the Client is not available to accept delivery at the Delivery Time and processing signature item on behalf of a Client, the provision of Product Stationery (including pre-paid satchels and any Australia Post products, the sale of Toll products, the sale of MailPlus Express products (including DL, C5, B4, 1kg, 3kg and 5kg satchels), waiting time, weight charges and special services as requested by the Client and agreed with MailPlus from time to time;</dd>
                  <dt>Government Agency</dt>
                  <dd>means any government or any public, statutory, governmental (including a local government), semi-governmental, local governmental or judicial body, entity, department or authority and includes any self-regulatory organisation established under statute;</dd>
                  <dt>Insolvency Event</dt>
                  <dd>means the winding up, liquidation or provisional liquidation; the appointment of an administrator under the Corporations Act 2001 (Cth); the appointment of a controller or analogous person to it or any of its property; being deregistered as a company or other body corporate or otherwise dissolved; being unable to pay any of its debts as and when due and payable or being deemed to be insolvent under any Law; seeking protection from its creditors under any Law or entering into a compromise, moratorium, assignment, composition or arrangement with, or for the benefit of, any of its members or creditors; it otherwise becomes a Chapter 5 body corporate as defined in the Corporations Act 2001 (Cth); if the party is an individual, they commit an act of bankruptcy within the meaning of section 40 Bankruptcy Act 1966 (Cth) or they are or become bankrupt within the meaning of section 5 of that Act; suspending or threatening to suspend payment of its debts as and when they become due; ceasing or threatening to cease to carry on business or taking any step or being the subject matter of any action that is preparatory to, or reasonably likely to result in, any of the above;</dd>
                  <dt>Law</dt>
                  <dd>means principles of law or equity established by decisions of courts, statutes, regulations or by-laws of the Commonwealth, a State, a Territory or a Government Agency and requirements and approvals (including conditions) of the Commonwealth, a State, a Territory or a Government Agency that have the force of law;</dd>
                  <dt>Mail Items</dt>
                  <dd>means any postal articles, documents, parcels, items in the Product Stationery and other items but excludes cash, bearer securities of any kind, gold and other precious metals, jewellery, gems and other valuables;</dd>
                  <dt>MailPlus</dt>
                  <dd>means the relevant Mail Plus franchisee providing the Services and/or Extra Services to the Client and Mail Plus Pty Ltd ACN 609 801 194 (solely in its capacity as agent of the relevant franchisee);</dd>
                  <dt>Product Stationery</dt>
                  <dd>means the range of envelopes and satchels (whether pre-printed or not) which is made available to Clients by MailPlus or for use with MailPlus Services and/or Extra Services including satchels, envelopes and/or other packaging used for Australia Post products, Toll products, and MailPlus Express products (including DL, C5, B4, 1kg, 3kg and 5kg satchels) as available and as provided to the Client from MailPlus from time to time;</dd>
                  <dt>Services</dt>
                  <dd>means the collection and delivery of: Mail Items from a post office, any articles from a document exchange, or other location as requested by the Client and agreed to by MailPlus in accordance with this Client Contract, but excludes the Extra Services;</dd>
                  <dt>Service Commencement Form</dt>
                  <dd>means the document specifying the agreed Services and/or Extra Services to be provided by MailPlus to the Client;</dd>
                  <dt>Service Fees</dt>
                  <dd>means the amount payable by the Client to MailPlus for the performance of the Services and Extra Service rendered as outlined in the information provided to the Client (including in the case of the Services in the Service Commencement Form) before an order is placed by the Client from time to time;</dd>
                  <dt>Signature Items</dt>
                  <dd>means any item requiring MailPlus to collect or provide signature, confirmation or authentication during each of the delivery or collection phase of any Service. Extra Services may apply for each instance of delivery or collection requiring any form of signature, confirmation or authentication.</dd>
                  <dt>Surcharges</dt>
                  <dd>includes logistics, shipping and fuel levies subject to change and reviewed monthly. <a href="https://mailplus.com.au/surcharge/">Surcharge</a></dd>
                </dl>
              </div>

              {/* FreightSafe Warranty */}
              <div className="legal-block" id="freightsafe">
                <h2>MailPlus FreightSafe Warranty Terms &amp; Conditions</h2>
                <div className="legal-callout">
                  <p><strong>FreightSafe service guarantee warranty is only valid for shipping products sent via ShipMate.</strong></p>
                </div>

                <h3>General</h3>
                <div className="clause"><span className="lbl">1.</span><span className="txt">MailPlus will provide to the Customer a warranty against loss or damage to Goods during the Carriage and while the Goods are in the possession of MailPlus or their agents, subject to the limitations and exclusions set out hereunder, hereinunder referred to as the <strong>FreightSafe Warranty</strong>.</span></div>
                <div className="clause"><span className="lbl">2.</span><span className="txt">The FreightSafe Warranty applies to all goods consigned on each Customers unique account number, as well as all cash sale consignments.</span></div>

                <h3>FreightSafe Warranty Claims</h3>
                <div className="clause"><span className="lbl">3.</span><span className="txt">Any claim under the FreightSafe Warranty for damage to or loss of Goods (“Claim”) must be made online, using the online claim form found on the MailPlus website at <a href="https://www.mailplus.com.au/freightsafe">www.mailplus.com.au/freightsafe</a>.</span></div>
                <div className="clause">
                  <span className="lbl">4.</span>
                  <span className="txt">The Customer must notify MailPlus in writing of any Claim within the following time limits:
                    <div className="subclause">
                      <p>a) where the Receiver has indicated in writing on the Proof of Delivery or has records that they have informed MailPlus that damage has occurred in respect of the Goods, within seven (7) business days from the date of delivery of the Goods to the Delivery Address;</p>
                      <p>b) where the Receiver has acknowledged that the Goods have been delivered and received in good order and condition, within 48 hours from the date of delivery of the Goods to the Delivery Address;</p>
                      <p>c) In respect of Claims for non-delivery, within thirty (30) business days after dispatch of that item/consignment note.</p>
                    </div>
                  </span>
                </div>
                <div className="clause"><span className="lbl">5.</span><span className="txt">The Customer may only make one (1) Claim per consignment.</span></div>
                <div className="clause"><span className="lbl">6.</span><span className="txt">The Customer must provide to MailPlus with any Claim, documentary evidence acceptable to MailPlus (for example copy of the suppliers invoice or evidence of actual cost of manufactured goods) as proof of value of the Goods.</span></div>
                <div className="clause"><span className="lbl">7.</span><span className="txt">Where the customer makes a valid Claim, MailPlus reserves the right to pay the Claim directly to the Customer by credit note to the Customer’s account.</span></div>
                <div className="clause"><span className="lbl">8.</span><span className="txt">Claims will only be paid by MailPlus in respect of any Claim after the Customer has paid all outstanding amounts owed by the Customer to MailPlus on their account, so that the account is within agreed trading terms.</span></div>

                <h3>FreightSafe Warranty Limitations</h3>
                <div className="clause">
                  <span className="lbl">9.</span>
                  <span className="txt">The FreightSafe Warranty is subject to the following limitations:
                    <div className="subclause">
                      <p>a) Claims are limited to loss of or damage to the Goods only. For the avoidance of doubt, the FreightSafe Warranty does not cover any consequential loss or damage suffered by the Customer as a result of loss or damage to the Goods.</p>
                      <p>b) The maximum amount that may be claimed from MailPlus under the FreightSafe Warranty is the lesser of: a) the FreightSafe Warranty Limitation Amount of $250 or; b) the cost price of the Goods, as supported by documentary evidence acceptable to MailPlus (for example copy of the suppliers invoice or evidence of actual cost of manufactured goods).</p>
                      <p>c) GST and freight charges relating to the consignment covered by the FreightSafe Warranty shall not be included in the calculation of any amount payable under the FreightSafe Warranty in respect of the Goods and any payment by MailPlus arising out of any Claim made by the Customer will be exclusive of GST.</p>
                      <p>d) Where a claim has been paid in full for goods damaged, MailPlus reserves the right to take possession of the goods as salvage and to dispose of such goods as it sees fit.</p>
                    </div>
                  </span>
                </div>

                <h3>FreightSafe Warranty Exclusions</h3>
                <div className="clause">
                  <span className="lbl">10.</span>
                  <span className="txt">MailPlus will not be liable for any Claims made by Customers in any of the following circumstances:
                    <div className="subclause">
                      <p>a) Where the Customer has not paid the FreightSafe Warranty charge;</p>
                      <p>b) Where the Customer is not the account holder (unless the consignment is on a cash sale basis);</p>
                      <p>c) Where the Customer fails to submit the Claim to MailPlus within the relevant time limits set out above;</p>
                      <p>d) Where MailPlus is in possession of an unendorsed proof of delivery form for the consignment;</p>
                      <p>e) Where the Goods consigned are Excluded Goods, where Excluded Goods means each of the following items:- i. currency; jewellery; precious metals; precious stones; antiques; works of art; drugs; weapons; living animals or plants; perishable goods; cigarettes, tobacco and tobacco related products; valuable documents; glass or glass related products; liquids; hazardous or dangerous goods including flammable, radioactive, magnetised, aerosol or poison goods or materials, sharp objects.</p>
                      <p>f) In the event of damage to second hand or used goods in transit. i. In the event of loss of second hand or used goods in transit, claims will be paid at the current depreciated market value of the goods, as determined by FreightSafe, to a maximum of the Warranty Limitation Amount of $250 and subject to the Terms &amp; Conditions of the FreightSafe Warranty.</p>
                      <p>g) Where the Goods have not been packed in the original manufacturer’s packaging or the equivalent, and/or MailPlus in its reasonable opinion considers the Packaging of the Goods to be inadequate for road, rail, sea or air transportation;</p>
                      <p>h) Where the Goods were not adequately labelled or no label exists on the consignment;</p>
                      <p>i) Where the Goods are determined by MailPlus to have been defective prior to the Carriage;</p>
                      <p>j) Where damage, mechanical failure or other operational defect in the Goods could not, in the reasonable opinion of MailPlus, have been caused by the Carriage;</p>
                      <p>k) Where MailPlus fails, delays or is unable to carry out its obligations under this contract due to strikes and / or lockouts (whether of MailPlus own employees or those of others and whether or not MailPlus could have avoided the same by acceding to the demands of the employees responsible for such action), acts of God, war, terrorism, fire, flood, embargo, litigation, acts of government or any agency instrumentality or any political subdivision thereof or any other cause beyond the control MailPlus;</p>
                      <p>l) Where the goods have been lost or damaged as a result of derailments, collisions, overturning;</p>
                      <p>m) Where the Delivery Address is a post office box, a roadside drop or postal mail box.</p>
                    </div>
                  </span>
                </div>

                <h3>Amendments to Terms and Conditions of Contract</h3>
                <div className="clause"><span className="lbl">11.</span><span className="txt">MailPlus reserves the right to amend these terms and conditions of the contract from time to time, without prior notice to the Customer.</span></div>
              </div>

            </div>
          </div>
        </section>

        {/* ============= FAQ (AEO) ============= */}
        <section className="section faq-section" id="faq" style={{ background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-eyebrow">Frequently asked questions</div>
              <h2>Terms &amp; Conditions, answered</h2>
              <p>Quick answers to the questions clients ask most. The full terms above always prevail.</p>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q">What is the Client Contract with MailPlus? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    The Client Contract is made up of these Terms &amp; Conditions, the Service Commencement Form, and any orders the Client places from time to time. A Client agrees to the terms by signing the Service Commencement Form in person or electronically. Together these documents govern the services MailPlus provides.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">When are MailPlus invoices due for payment? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Invoices for Services must be paid within 15 days of the Invoice Date, and invoices for Extra Services linked to Product Stationery within 7 days. Time is of the essence. Late payment can trigger administration fees and MailPlus may cease providing services until the account is brought up to date.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">Does MailPlus insure my parcels? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    No. MailPlus does not insure Mail Items, and the Client is solely responsible for arranging insurance at their own cost if desired. Liability for loss, damage or delay is limited to the Service Fee paid, except where caused by MailPlus’s wilful misconduct or fraud, and subject to the Australian Consumer Law.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">How do I cancel my MailPlus service? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    Either party may terminate the Client Contract by giving two weeks’ prior written notice. MailPlus continues providing services and invoicing fees through the notice period, and the Client remains liable for those fees. MailPlus may also terminate immediately if an invoice is not paid in full by the Invoice Date.
                  </div>
                </div>
              </div>
              <div className="faq-item">
                <button className="faq-q">What does the FreightSafe Warranty cover? <span className="faq-toggle">+</span></button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    FreightSafe is a service-guarantee warranty covering shipping products sent via ShipMate against loss of or damage to goods in transit. Claims are capped at the lesser of $250 or the documented cost price of the goods, exclude consequential loss, and must be lodged online within the stated time limits.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============= CTA BAND ============= */}
        <section className="cta-band">
          <div className="wrap">
            <h2>Questions about your account or these terms?</h2>
            <p>Our local support team is here to help — no long hold times, no bots. Call us Monday to Friday, 9am–5pm.</p>
            <div className="cta-row">
              <a href="tel:1300656595" className="btn-cta">Call 1300 65 65 95</a>
              <a href="https://customer.mailplus.com.au/" className="btn-line" target="_blank" rel="noopener noreferrer">Customer login</a>
            </div>
          </div>
        </section>
      </div>

      <TermsClient />
    </>
  )
}
