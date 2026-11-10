'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    id: 'general',
    label: 'General',
    faqs: [
      {
        q: 'What does MailPlus do?',
        a: 'MailPlus is an Australian courier network for small business, founded in 1997, with around 300 vehicles on the road across all metro areas and regional hubs. We do three things: express parcel delivery in 1–2 days Australia-wide, Post Office collect & lodge so you never queue, and same-day local hand-to-hand delivery — all from one trusted local driver.',
      },
      {
        q: 'How much does MailPlus cost?',
        a: "Express parcels are flat-rate for anything up to 5kg, so your shipping costs stay predictable with no surprise bills. There's no lock-in contract, and no minimum volume — you only pay for what you send. New businesses can also start with five free collections, with no card required.",
      },
      {
        q: 'Can MailPlus handle my Post Office run?',
        a: "Yes — that's one of the things we're known for. Your local owner-operator collects your parcels and mail, lodges them at the Post Office for you, and clears your business PO Boxes, all same-day. Your team never has to queue or leave the office, which is ideal for busy multi-site and corporate operations.",
      },
      {
        q: 'How fast can MailPlus deliver across Australia?',
        a: 'MailPlus delivers parcels in 1–2 business days anywhere in Australia, with 95% of shipments arriving overnight on business days — collected in Sydney today, in Perth tomorrow. Book same-day collection with your local owner-operator before the daily cut-off, or set up a scheduled service so your regular pickups just happen without you having to book each time.',
      },
      {
        q: 'Does MailPlus work with Shopify and my online store?',
        a: 'Yes. Our free shipping platform, ShipMate, plugs straight into Shopify and WooCommerce — orders sync automatically, labels print in a few clicks, and tracking updates in real time. Prefer to build your own setup? The MailPlus API connects your systems directly for automated bookings, labels and tracking at scale.',
      },
      {
        q: 'How are the 5 free collections free?',
        a: "We'd rather show you than tell you. Businesses that send with Australia Post get five collections completely free — your local owner-operator picks up your parcels and mail and lodges them at the Post Office on your own Aus Post account, so your rates and tracking don't change. No credit card and no obligation — it's the simplest way to see how much time the service saves before you commit.",
      },
      {
        q: 'Why choose MailPlus over Australia Post?',
        a: "You get a dedicated local owner-operator who comes to you and knows your business — not a depot drop-off or a different contract driver with no stake in your service. Flat-rate pricing keeps costs predictable, and a local Aussie support team answers fast — no hold times, no bots. And if you send with Australia Post, nothing changes: we collect and lodge on your own account, working alongside the Post Office rather than replacing it.",
      },
    ],
  },
  {
    id: 'offers',
    label: 'Offers & Trials',
    faqs: [
      {
        q: 'What is the 5 Free Collections offer?',
        a: '5 Free Collections is a free trial for new MailPlus business customers who already send with Australia Post (eParcel, MyPost Business, or general mail on an Australia Post account). A local owner-operator collects from your premises and lodges on your own Australia Post account. Rates, tracking, and invoicing do not change. Cost is $0, with no credit card, no invoice, and no contract.',
      },
      {
        q: 'How do I start the 5 Free Collections trial?',
        a: 'Enter your business address on our 5 Free Collections page to check for a local owner-operator. Once confirmed, you receive an activation code for LocalMile (our free booking app for Australia Post customers) by SMS and email, and you can book your first collection immediately.',
      },
      {
        q: 'What is the ShipMate platform offer?',
        a: 'ShipMate is our free shipping platform with no subscription fees, no setup fees, and no minimum volume. It gives online merchants and small businesses access to discounted flat-rate express shipping, bulk label printing, live tracking, and seamless Shopify and WooCommerce sync.',
      },
    ],
  },
  {
    id: 'express',
    label: 'Express Delivery',
    faqs: [
      {
        q: 'How does MailPlus Express Parcel Delivery work?',
        a: 'You print your label in ShipMate, which assigns the pickup to your local owner-operator. Your driver collects the parcel from your premises the same day. Partner carriers complete the national line-haul, and MailPlus remains your single point of contact for end-to-end tracking and customer support.',
      },
      {
        q: 'What parcel weights and sizes are supported?',
        a: 'We offer national flat-rate pricing for parcels up to 5kg. Heavier items up to 20kg can also be sent through the express network.',
      },
      {
        q: 'What are the pickup coverage areas for Express Delivery?',
        a: 'Pickup is provided across all major Australian cities (Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Darwin) and selected regional centres including Sunshine Coast, Central Coast, Geelong, Byron Bay, and Southeast Queensland. Express delivery is nationwide.',
      },
      {
        q: 'Is there a minimum volume requirement for pickups?',
        a: 'No lock-in contract and no minimum volume. A collection fee may apply for lower-volume businesses and is agreed upfront.',
      },
    ],
  },
  {
    id: 'post-office',
    label: 'Post Office Collect & Lodge',
    faqs: [
      {
        q: 'What is Post Office Collect & Lodge?',
        a: 'MailPlus handles your business Post Office trips on a reliable scheduled run. In the morning, your local driver collects inbound mail and parcels and clears business PO Boxes. In the afternoon, outbound mail and parcels are collected and lodged at Australia Post before daily cutoff. Express banking runs are also available.',
      },
      {
        q: 'Do I need to book every time for Post Office runs?',
        a: 'No. Post Office Collect & Lodge operates on a set schedule agreed with your business, so your regular morning and afternoon runs happen automatically without needing daily booking.',
      },
      {
        q: 'How is Post Office Collect & Lodge priced?',
        a: 'Pricing is tailored to your business schedule, volume, and whether you require service across a single site or multiple locations.',
      },
    ],
  },
  {
    id: 'shipmate',
    label: 'ShipMate Platform',
    faqs: [
      {
        q: 'What is ShipMate?',
        a: 'ShipMate is the free shipping platform from MailPlus. It allows you to book pickups, print labels in bulk, access discounted flat rates across premium carriers, validate addresses with Google, track parcels in real time, and message your local driver directly.',
      },
      {
        q: 'Can non-ecommerce businesses use ShipMate?',
        a: 'Yes. While ShipMate has one-click integrations for Shopify and WooCommerce, any business that sends parcels — including corporate offices, dental practices, legal firms, and schools — can use ShipMate standalone to manage shipping.',
      },
      {
        q: 'What is the MailPlus API?',
        a: 'The MailPlus API connects your warehouse, ERP, or custom order management system directly to MailPlus for automated label generation, live tracking updates, and automated customer notifications at scale.',
      },
    ],
  },
  {
    id: 'company',
    label: 'Company & Franchising',
    faqs: [
      {
        q: 'When was MailPlus founded and who owns it?',
        a: 'MailPlus was founded in 1997 by Managing Director Chris Burgess. Headquartered at Level 16, 175 Pitt Street, Sydney NSW, MailPlus has nearly 30 years of history supporting Australian small and medium businesses.',
      },
      {
        q: 'Is MailPlus a franchise?',
        a: 'Yes. MailPlus operates over 120 exclusive franchised territories across Australia with approximately 300 vehicles on the road. Each territory is owned and run by a local owner-operator who personally services businesses in their local community.',
      },
      {
        q: 'How can I become a MailPlus Franchisee?',
        a: 'Exclusive territories are available across NSW, ACT, QLD, VIC, and TAS. Visit our Become a Franchisee page to learn about territory availability, initial setup, vehicle leasing, and full head-office training and support.',
      },
      {
        q: 'How do I contact MailPlus support?',
        a: 'Our Australian customer support team is available Monday to Friday from 9am to 5pm Sydney time on 1300 65 65 95. Existing customers can also log in to ShipMate or submit support requests via track.mailplus.com.au.',
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
                Our Aussie-based team is ready to help Monday–Friday, 9am–5pm Sydney time.
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
                  { href: '/5-free-collections', label: '5 Free Collections' },
                  { href: '/express-delivery', label: 'Express Parcel Delivery' },
                  { href: '/post-office-collect-lodge', label: 'Post Office Collect & Lodge' },
                  { href: '/shipmate-platform', label: 'ShipMate Platform' },
                  { href: '/mailplus-api', label: 'MailPlus API' },
                  { href: '/become-a-franchisee', label: 'Become a Franchisee' },
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
