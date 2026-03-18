'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    id: 'general',
    label: 'General',
    faqs: [
      {
        q: 'What is MailPlus?',
        a: 'MailPlus is a 100% Australian-owned courier, parcel delivery, mail management, and logistics company. We provide fast and stress-free shipping Australia-wide with guaranteed same-day collections, 1–2 day express delivery, and a free shipping platform called ShipMate. We have been helping small to medium-sized Aussie businesses grow since 2010.',
      },
      {
        q: 'Is MailPlus Australian owned?',
        a: 'Yes. MailPlus is 100% Australian-owned and operated. We are not a franchise and have no overseas shareholders or foreign call centres. Our team is based right here in Australia.',
      },
      {
        q: 'How do I contact MailPlus?',
        a: 'You can reach our customer service team by phone on 1300 65 65 95, Monday to Friday, 9am–5pm AEST. You can also submit an enquiry through our contact page and a team member will get back to you promptly.',
      },
      {
        q: 'Does MailPlus require a contract or minimum volume?',
        a: 'No. There are no lock-in contracts and no minimum volume requirements. You only pay for the labels you scan and use. This makes MailPlus ideal for businesses of any size — whether you send 1 parcel or 1,000 per week.',
      },
      {
        q: 'What areas does MailPlus service?',
        a: 'MailPlus delivers to every Australian postcode. Our owner-operators are based in major cities and regional areas across Australia, ensuring consistent same-day collections wherever your business is located.',
      },
      {
        q: 'How do I get started with MailPlus?',
        a: 'Simply fill out our enquiry form and a member of our team will be in touch to get you set up. There are no contracts, no setup fees, and no minimum volumes. You can be up and running with ShipMate — our free shipping platform — in minutes.',
      },
    ],
  },
  {
    id: 'express',
    label: 'Express Delivery',
    faqs: [
      {
        q: 'How fast is MailPlus Express delivery?',
        a: 'MailPlus Express delivers in 1–2 business days Australia-wide. Our owner-operators collect your parcels same-day and lodge them directly into the express network for next-day or two-day delivery to your customers.',
      },
      {
        q: 'What are the flat-rate pricing tiers?',
        a: 'MailPlus offers national flat-rate pricing on items up to 5kg, with an additional option for items up to 20kg. Pricing is simple and transparent — no hidden surcharges or fuel levies. Contact us to get a quote tailored to your business.',
      },
      {
        q: 'What is the maximum parcel size for MailPlus Express?',
        a: 'MailPlus Express caters for parcels up to 20kg. Flat-rate pricing applies up to 5kg. Items up to 20kg are also available. For heavier or bulkier freight, please contact our team to discuss the best solution for your needs.',
      },
      {
        q: 'Is same-day collection really guaranteed?',
        a: 'Yes. Guaranteed same-day collections are a core promise of MailPlus. Your dedicated local owner-operator will collect your parcels the same day you book — no waiting, no missed pickups.',
      },
      {
        q: 'Do you offer biodegradable packaging?',
        a: 'Yes. MailPlus offers biodegradable satchels through our Better Packaging Co partnership. These are eco-friendly alternatives to standard plastic satchels and are available to all MailPlus account holders.',
      },
      {
        q: 'Can I send parcels to PO Boxes?',
        a: 'Yes. Through our Post Office Solutions service, MailPlus can clear your PO Box and lodge all outgoing Australia Post parcels same-day. We handle the entire process so you never have to queue at the Post Office again.',
      },
    ],
  },
  {
    id: 'shipmate',
    label: 'ShipMate Platform',
    faqs: [
      {
        q: 'What is ShipMate?',
        a: 'ShipMate is MailPlus\'s free shipping platform. It gives you access to discounted premium carriers, bulk label printing, Google address validation, real-time tracking, and automated customer notifications — all from one easy-to-use dashboard. There are no subscription fees.',
      },
      {
        q: 'Is ShipMate really free?',
        a: 'Yes. ShipMate is completely free to use. There are no subscription fees, no setup costs, and no minimum volumes. You only pay for the shipping labels you use.',
      },
      {
        q: 'Does ShipMate integrate with Shopify?',
        a: 'Yes. ShipMate includes a free Shopify integration that automatically syncs your orders, applies smart product weights, supports tag filtering, and enables bulk label printing. You can install it directly from the Shopify App Store.',
      },
      {
        q: 'What carriers are available through ShipMate?',
        a: 'ShipMate gives you access to MailPlus Express and a range of discounted premium carriers for domestic and international shipments. Our platform lets you choose the best carrier for each shipment based on price, speed, and destination.',
      },
      {
        q: 'Can I print bulk shipping labels through ShipMate?',
        a: 'Yes. ShipMate supports bulk label printing, allowing you to generate and print multiple shipping labels at once. This is particularly useful for e-commerce businesses processing high volumes of orders.',
      },
      {
        q: 'Does ShipMate send tracking notifications to my customers?',
        a: 'Yes. ShipMate automatically sends SMS and email notifications to your customers at key points in the delivery journey — from pickup through to delivery. This reduces "where is my order?" queries and improves your customer experience.',
      },
    ],
  },
  {
    id: 'shopify',
    label: 'Shopify Integration',
    faqs: [
      {
        q: 'How do I install the MailPlus Shopify integration?',
        a: 'The MailPlus Shopify app is available for free on the Shopify App Store. Once installed, it connects directly to your ShipMate account and automatically syncs all your Shopify orders for seamless label generation and dispatch.',
      },
      {
        q: 'Does the Shopify integration support automatic order sync?',
        a: 'Yes. The integration automatically pulls all new orders from your Shopify store into ShipMate. You can then generate labels individually or in bulk, with smart product weight rules already applied.',
      },
      {
        q: 'Can I filter which Shopify orders are synced?',
        a: 'Yes. ShipMate\'s Shopify integration supports tag filtering, so you can choose which orders are synced based on your Shopify order tags. This gives you precise control over your fulfilment workflow.',
      },
      {
        q: 'What happens after I print a label in ShipMate?',
        a: 'After printing a label, your MailPlus owner-operator will collect the parcel same-day. The shipment status is then updated in real-time across ShipMate, and your customer automatically receives tracking notifications.',
      },
      {
        q: 'Is the Shopify integration free?',
        a: 'Yes. The MailPlus Shopify integration is completely free. There are no subscription fees for the app or the ShipMate platform. You only pay for the shipping labels you use.',
      },
    ],
  },
  {
    id: 'api',
    label: 'MailPlus API',
    faqs: [
      {
        q: 'What can I do with the MailPlus API?',
        a: 'The MailPlus API enables automated label generation, real-time tracking updates, live delivery status webhooks, and access to biodegradable packaging options. It is designed for developers, 3PLs, and businesses with custom platforms such as WooCommerce, Squarespace, or proprietary systems.',
      },
      {
        q: 'Is there documentation available for the MailPlus API?',
        a: 'Yes. Full API documentation and onboarding support is available to all MailPlus API partners. Our IT Systems team is only a call or email away if you need technical assistance during or after your integration.',
      },
      {
        q: 'What platforms does the MailPlus API support?',
        a: 'The MailPlus API can integrate with any platform that supports REST API calls — including WooCommerce, Squarespace, Magento, and fully custom-built systems. If you\'re unsure whether your platform is compatible, contact our team to discuss.',
      },
      {
        q: 'Who supports the API integration?',
        a: 'MailPlus provides full integration support through our IT Systems team and Customer Service & Retention team. You\'ll also have direct contact with your local MailPlus owner-operator for collections and deliveries.',
      },
      {
        q: 'Do API customers get the same same-day collection guarantee?',
        a: 'Yes. All MailPlus customers — including API integrations — benefit from guaranteed same-day collections and 1–2 day express delivery Australia-wide.',
      },
    ],
  },
  {
    id: 'tracking',
    label: 'Tracking & Delivery',
    faqs: [
      {
        q: 'How do I track my MailPlus parcel?',
        a: 'Visit our Tracking page and enter your tracking number to see real-time status updates from pickup through to delivery. You can find your tracking number in your shipping confirmation email or inside the ShipMate dashboard.',
      },
      {
        q: 'My tracking number isn\'t working — what should I do?',
        a: 'Tracking numbers can take a few hours to activate after pickup. If your number still isn\'t working after 4 hours, please contact our customer service team on 1300 65 65 95 (Mon–Fri, 9am–5pm AEST) or submit a delivery support form.',
      },
      {
        q: 'Will my customers receive automatic delivery notifications?',
        a: 'Yes. MailPlus automatically sends SMS and email notifications to your customers at each stage of the delivery journey — so they always know when to expect their parcel and are less likely to miss it.',
      },
      {
        q: 'What happens if a delivery attempt is unsuccessful?',
        a: 'If a delivery attempt is unsuccessful, the driver will leave a card with redelivery instructions. Your customer can arrange a redelivery or collect from the nearest facility. Our customer service team is also on hand to help resolve any delivery issues.',
      },
      {
        q: 'Can I get proof of delivery?',
        a: 'Yes. MailPlus provides proof of delivery including electronic signature capture and photo confirmation where applicable. These are accessible through the ShipMate platform and tracking portal.',
      },
    ],
  },
  {
    id: 'po',
    label: 'Post Office Solutions',
    faqs: [
      {
        q: 'What is MailPlus Post Office Solutions?',
        a: 'MailPlus Post Office Solutions is a service where we clear your PO Box and lodge all your outgoing Australia Post parcels and mail — same-day, guaranteed. No more Post Office queues or missed collections.',
      },
      {
        q: 'How does PO Box clearing work?',
        a: 'Your dedicated MailPlus owner-operator visits your PO Box, collects all incoming mail and parcels, and delivers them directly to your business. All outgoing mail and parcels are also lodged at Australia Post same-day on your behalf.',
      },
      {
        q: 'What days does Post Office Solutions operate?',
        a: 'Post Office Solutions operates Monday to Friday. Same-day collection and lodgement is guaranteed on all business days. Contact our team to discuss scheduling that works for your business.',
      },
      {
        q: 'Can I use Post Office Solutions alongside MailPlus Express?',
        a: 'Absolutely. Many MailPlus customers use both Express Delivery and Post Office Solutions together through ShipMate, allowing them to manage all their shipping and mail management needs from one platform.',
      },
    ],
  },
]

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState('general')

  const current = categories.find((c) => c.id === activeCategory) ?? categories[0]

  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Frequently asked questions"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12">

          {/* Sidebar — category nav */}
          <nav aria-label="FAQ categories">
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

            {/* Contact card */}
            <div
              className="mt-10 rounded-2xl p-5"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <p className="font-bold text-sm mb-1" style={{ color: '#095c7b' }}>Still need help?</p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(9,92,123,0.72)' }}>
                Our Aussie-based team is ready to help Monday–Friday, 9am–5pm AEST.
              </p>
              <a
                href="tel:1300656595"
                className="flex items-center gap-2 font-bold text-sm"
                style={{ color: '#095c7b' }}
              >
                <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                1300 65 65 95
              </a>
            </div>
          </nav>

          {/* Main content */}
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
                    className="flex items-center justify-between p-6 font-semibold cursor-pointer list-none transition-colors duration-200 hover:opacity-80"
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

            {/* Inline links to related pages */}
            <div
              className="mt-10 rounded-2xl p-6"
              style={{ backgroundColor: '#DAE8DA', border: '1px solid rgba(9,92,123,0.10)' }}
            >
              <p className="font-bold text-sm mb-4" style={{ color: '#095c7b' }}>Related Pages</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: '/services/express-delivery', label: 'MailPlus Express' },
                  { href: '/services/post-office-solutions', label: 'Post Office Solutions' },
                  { href: '/shipmate', label: 'ShipMate' },
                  { href: '/services/shopify-integration', label: 'Shopify Integration' },
                  { href: '/services/mailplus-api', label: 'MailPlus API' },
                  { href: '/tracking', label: 'Track a Parcel' },
                  { href: '/contact', label: 'Contact Us' },
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
