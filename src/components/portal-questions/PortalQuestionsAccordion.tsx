'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    faqs: [
      {
        q: 'How do I sign up for ShipMate?',
        a: 'Getting started with ShipMate is free and easy. Simply contact our team via the enquiry form or call us on 1300 65 65 95 and we\'ll get your account set up. There are no subscription fees, no setup costs, and no minimum volumes.',
      },
      {
        q: 'Is ShipMate free to use?',
        a: 'Yes. ShipMate is completely free to use. There are no monthly fees, no subscription costs, and no lock-in contracts. You only pay for the shipping labels you generate and use.',
      },
      {
        q: 'How do I log in to ShipMate?',
        a: 'Visit the ShipMate portal and enter your registered email address and password. If you\'ve forgotten your password, click "Forgot Password" on the login screen and follow the prompts to reset it. If you\'re still having trouble, contact our support team on 1300 65 65 95.',
      },
      {
        q: 'Can I have multiple users on the one ShipMate account?',
        a: 'Yes. ShipMate supports multiple users under the one account, which is ideal for businesses with warehouse staff, admin teams, or multiple locations. Contact our team to set up additional user access.',
      },
      {
        q: 'What browsers does ShipMate support?',
        a: 'ShipMate works best on the latest versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari. We recommend keeping your browser up to date for the best experience. If you\'re experiencing display issues, try clearing your browser cache or switching to Chrome.',
      },
    ],
  },
  {
    id: 'creating-labels',
    label: 'Creating Labels',
    faqs: [
      {
        q: 'How do I create a shipping label in ShipMate?',
        a: 'Log in to ShipMate, click "Create Shipment", enter the recipient\'s details and parcel weight, then select your preferred carrier and service. Review the details and click "Generate Label". Your label will be ready to download and print immediately.',
      },
      {
        q: 'Can I print labels in bulk?',
        a: 'Yes. ShipMate supports bulk label printing, allowing you to generate and print multiple shipping labels at once. Select the orders you\'d like to process, click "Print Labels", and all selected labels will be generated as a single PDF ready for printing.',
      },
      {
        q: 'What label sizes does ShipMate support?',
        a: 'ShipMate supports standard A4 label printing as well as thermal label printing (100mm × 150mm). You can configure your label format preferences in your account settings to match your printer setup.',
      },
      {
        q: 'Can I save sender addresses and product presets?',
        a: 'Yes. ShipMate allows you to save your sender addresses and create product weight presets so you don\'t have to re-enter the same information each time. This is particularly useful for businesses that regularly send the same types of parcels.',
      },
      {
        q: 'I generated a label by mistake. Can I cancel it?',
        a: 'Labels can be cancelled if they have not yet been scanned by a driver. Please contact our customer service team on 1300 65 65 95 as soon as possible and we\'ll assist you. Note that you are only charged for labels that are scanned — unscanned labels are not billed.',
      },
    ],
  },
  {
    id: 'shopify',
    label: 'Shopify Integration',
    faqs: [
      {
        q: 'How do I connect my Shopify store to ShipMate?',
        a: 'Install the free MailPlus ShipMate app from the Shopify App Store. Once installed, follow the on-screen prompts to connect your Shopify store to your ShipMate account. Your orders will begin syncing automatically within minutes.',
      },
      {
        q: 'My Shopify orders are not syncing to ShipMate. What should I do?',
        a: 'First, check that your Shopify integration is still connected in your ShipMate account settings. If the connection appears active but orders still aren\'t syncing, try disconnecting and reconnecting the integration. If the issue persists, submit a ShipMate support ticket or call us on 1300 65 65 95.',
      },
      {
        q: 'Can I filter which Shopify orders are imported into ShipMate?',
        a: 'Yes. ShipMate\'s Shopify integration supports order tag filtering, so you can choose to import only orders with specific tags. This is useful if you fulfil some orders yourself and use MailPlus for others.',
      },
      {
        q: 'Will ShipMate automatically update my Shopify order status after dispatch?',
        a: 'Yes. Once a label is generated and the parcel is collected, ShipMate automatically updates your Shopify order status to "Fulfilled" and adds the tracking number to the order. Your customer will also receive an automated tracking notification.',
      },
      {
        q: 'Does ShipMate support smart product weights in Shopify?',
        a: 'Yes. ShipMate can read the product weights set in your Shopify store and automatically apply them when generating labels. Make sure your product weights are correctly entered in Shopify for the most accurate label pricing.',
      },
    ],
  },
  {
    id: 'tracking',
    label: 'Tracking & Notifications',
    faqs: [
      {
        q: 'How do I track a shipment in ShipMate?',
        a: 'Log in to ShipMate and navigate to "Shipments". Find the relevant order and click the tracking number to view real-time status updates. You can also use the public tracking page at mailplus.com.au/tracking by entering the tracking number.',
      },
      {
        q: 'Does ShipMate send tracking notifications to my customers?',
        a: 'Yes. ShipMate automatically sends branded SMS and email notifications to your customers at key stages — including when the parcel is picked up, in transit, and delivered. This reduces inbound "where is my order?" queries significantly.',
      },
      {
        q: 'Can I customise the tracking notification emails sent to customers?',
        a: 'Yes. ShipMate allows you to customise the sender name and branding on outbound customer notifications. Contact our support team for assistance configuring your notification templates.',
      },
      {
        q: 'My tracking number is showing no results. What should I do?',
        a: 'Tracking information can take a few hours to activate after a label is generated. If your tracking number still shows no results after 4 hours of the parcel being collected, please contact our customer service team on 1300 65 65 95 (Mon–Fri, 9am–5pm AEST).',
      },
    ],
  },
  {
    id: 'carriers',
    label: 'Carriers & Pricing',
    faqs: [
      {
        q: 'Which carriers are available through ShipMate?',
        a: 'ShipMate gives you access to MailPlus Express (1–2 day delivery Australia-wide) plus a range of premium discounted carriers for domestic and international shipments. The available carrier options are displayed at label creation based on the parcel weight, dimensions, and destination.',
      },
      {
        q: 'How is shipping pricing calculated in ShipMate?',
        a: 'MailPlus Express uses national flat-rate pricing based on parcel weight — up to 5kg and up to 20kg tiers. Other carriers available through ShipMate may be priced differently. You\'ll see the exact price before confirming each label. You are only charged for labels that are scanned by a driver.',
      },
      {
        q: 'Can I get a quote before creating a label?',
        a: 'Yes. When creating a shipment in ShipMate, you\'ll see a rate comparison showing available carriers and their prices before you commit to generating a label. This allows you to choose the best option for each shipment.',
      },
      {
        q: 'Does MailPlus offer discounted rates for high volume senders?',
        a: 'Yes. If your business sends a high volume of parcels, our team can discuss volume pricing with you. Contact us on 1300 65 65 95 or submit an enquiry and a member of our sales team will be in touch.',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account & Billing',
    faqs: [
      {
        q: 'How do I update my account details in ShipMate?',
        a: 'Log in to ShipMate and navigate to "Account Settings". From here you can update your business name, contact details, sender addresses, and notification preferences. For changes to your billing or account plan, please contact our team directly.',
      },
      {
        q: 'How does billing work for ShipMate?',
        a: 'You are only charged for shipping labels that are scanned by a MailPlus driver. Unused or cancelled labels are not billed. Invoices are issued on a regular billing cycle and can be paid online at bpoint.com.au/pay/mailplus.',
      },
      {
        q: 'How do I pay my MailPlus invoice?',
        a: 'You can pay your MailPlus invoice securely online at bpoint.com.au/pay/mailplus. If you have questions about your invoice, please contact our accounts team on 1300 65 65 95 (Mon–Fri, 9am–5pm AEST).',
      },
      {
        q: 'Can I close my ShipMate account?',
        a: 'Yes. There are no lock-in contracts, so you can close your ShipMate account at any time. Please contact our team on 1300 65 65 95 or via the contact form and we\'ll process your request. Any outstanding invoices must be settled before account closure.',
      },
    ],
  },
]

export function PortalQuestionsAccordion() {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const current = categories.find((c) => c.id === activeCategory) ?? categories[0]

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Portal questions"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12">

          {/* Sidebar */}
          <nav aria-label="Question categories">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: 'rgba(9,92,123,0.50)' }}
            >
              Categories
            </p>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={
                      activeCategory === cat.id
                        ? { backgroundColor: '#095c7b', color: '#ffffff' }
                        : { color: 'rgba(9,92,123,0.80)', backgroundColor: 'transparent' }
                    }
                    aria-pressed={activeCategory === cat.id}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Support card */}
            <div
              className="mt-10 rounded-2xl p-5"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>Still need help?</p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(9,92,123,0.72)' }}>
                Our team is ready to help Monday–Friday, 9am–5pm AEST.
              </p>
              <a
                href="tel:1300656595"
                className="flex items-center gap-2 font-bold text-sm mb-3"
                style={{ color: '#095c7b' }}
              >
                <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                1300 65 65 95
              </a>
              <Link
                href="/shipmate-support-ticket"
                className="flex items-center gap-2 font-bold text-sm"
                style={{ color: '#095c7b' }}
              >
                <svg className="w-4 h-4 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Submit a support ticket
              </Link>
            </div>
          </nav>

          {/* Questions */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ color: '#095c7b' }}
            >
              {current.label}
            </h2>

            <div className="space-y-3">
              {current.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-2xl border group"
                  style={{ backgroundColor: '#f8faf8', borderColor: 'rgba(9,92,123,0.12)' }}
                >
                  <summary
                    className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none transition-opacity duration-200 hover:opacity-80"
                    style={{ color: '#095c7b' }}
                  >
                    <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                    <svg
                      className="w-5 h-5 flex-none transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{ color: '#095c7b' }}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div
                    className="px-6 pb-6 text-sm leading-relaxed"
                    style={{ color: 'rgba(9,92,123,0.80)' }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* Related links */}
            <div
              className="mt-10 rounded-2xl p-6"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <p className="font-bold text-sm mb-4" style={{ color: '#095c7b' }}>Related Pages</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: '/shipmate', label: 'ShipMate Platform' },
                  { href: '/services/shopify-integration', label: 'Shopify Integration' },
                  { href: '/services/mailplus-api', label: 'MailPlus API' },
                  { href: '/tracking', label: 'Track a Parcel' },
                  { href: '/shipmate-support-ticket', label: 'Support Ticket' },
                  { href: '/faq', label: 'General FAQs' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
