export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface Service {
  slug: string
  name: string
  tagline: string
  bluf: string
  description: string
  heroLabel: string
  features: ServiceFeature[]
  faqs: ServiceFAQ[]
  startingPrice: string
  priceUnit: string
  deliveryTime: string
  schemaServiceType: string
  metaTitle: string
  metaDescription: string
}

export const services: Service[] = [
  {
    slug: 'courier',
    name: 'Same-Day Courier',
    tagline: 'Sydney Delivered in Hours',
    heroLabel: 'Same-Day',
    bluf: 'MailPlus same-day courier collects from your door and delivers anywhere in the Sydney metro area within 2–4 hours. All consignments are GPS-tracked, insured, and handled by dedicated drivers — not shared freight networks.',
    description: 'Our same-day courier service is built for businesses and individuals who cannot afford delays. From Waterloo to Parramatta, from Alexandria to Manly — MailPlus covers the full Greater Sydney network with real-time tracking and proof of delivery.',
    features: [
      { icon: '⚡', title: 'Pickup in 60 Minutes', description: 'A driver is dispatched the moment you book. Average pickup time across Sydney is under 60 minutes.' },
      { icon: '📍', title: 'GPS Live Tracking', description: 'Track your parcel on a live map from pickup to drop-off. Share the tracking link with your recipient.' },
      { icon: '🔒', title: 'Fully Insured', description: 'Every consignment is covered up to $500 by default. Additional cover available at checkout.' },
      { icon: '📋', title: 'Proof of Delivery', description: 'Electronic signature and geo-tagged photo sent automatically to your inbox on delivery.' },
      { icon: '🏢', title: 'Business Accounts', description: 'Consolidated weekly invoicing, API integration, and dedicated account managers for 5+ deliveries per week.' },
      { icon: '🌙', title: 'After-Hours Available', description: 'Evening and weekend pickups available with 2-hour advance notice. No surcharge before 9 PM.' },
    ],
    faqs: [
      { question: 'How do I book a same-day courier in Sydney?', answer: 'Book online at mailplus.com.au, call our depot on +61 2 9000 0000, or use our mobile app. Provide pickup and delivery addresses, parcel dimensions, and your preferred pickup window. A driver is assigned within minutes.' },
      { question: 'How fast is same-day delivery in Sydney?', answer: 'MailPlus delivers within 2–4 hours of pickup for most Sydney metro locations. Destinations in the outer suburbs (Penrith, Campbelltown) may take up to 5 hours depending on traffic.' },
      { question: 'What is the maximum parcel size for same-day courier?', answer: 'Our vans handle parcels up to 20kg and 1.5m in any dimension. For larger freight — pallets, furniture, equipment — see our Logistics service.' },
      { question: 'Do you offer same-day courier for medical or legal documents?', answer: 'Yes. We have a specialist Medical & Legal track with trained handlers, chain-of-custody documentation, and priority dispatch. Contact our team to set up an account.' },
      { question: 'What areas does MailPlus same-day courier cover?', answer: 'We cover all 658 Sydney suburbs, plus Wollongong and Newcastle with 4-hour notice. Our depots in Waterloo and Alexandria give us exceptional coverage of the inner city, eastern suburbs, and south-west corridor.' },
    ],
    startingPrice: '15',
    priceUnit: 'AUD',
    deliveryTime: '2–4 hours',
    schemaServiceType: 'Courier Service',
    metaTitle: 'Same-Day Courier Sydney | 2–4 Hour Delivery | MailPlus',
    metaDescription: 'MailPlus same-day courier delivers anywhere in Sydney within 2–4 hours. GPS tracking, proof of delivery, insured. Book online or call our Waterloo depot.',
  },
  {
    slug: 'parcel-delivery',
    name: 'Parcel Delivery',
    tagline: 'Interstate & Local, Tracked End-to-End',
    heroLabel: 'Parcels',
    bluf: 'MailPlus parcel delivery connects Sydney to every Australian capital and regional centre with next-day metro delivery and 2–5 day interstate transit. Every parcel is barcoded, scanned at each hub, and tracked online.',
    description: 'Whether you are sending a single parcel or running a high-volume e-commerce operation, MailPlus provides reliable, competitively priced delivery with a network that reaches every Australian postcode.',
    features: [
      { icon: '🇦🇺', title: 'Australia-Wide Network', description: 'Delivery to all 8,100+ Australian postcodes including remote areas via our carrier partners.' },
      { icon: '📦', title: 'Next-Day Sydney Metro', description: 'Parcels lodged before 4 PM at our Waterloo or Alexandria depots are delivered the next business day within Sydney.' },
      { icon: '🔍', title: 'End-to-End Tracking', description: 'Scan events at pickup, each transit hub, and delivery. SMS and email notifications at each stage.' },
      { icon: '💼', title: 'E-Commerce Integration', description: 'Shopify, WooCommerce, and Magento plugins generate labels and book pickups automatically.' },
      { icon: '📊', title: 'Bulk Rates', description: 'Volume discounts start at 20 parcels per week. Dedicated pricing for 100+ parcels/week.' },
      { icon: '↩️', title: 'Returns Management', description: 'Pre-paid return labels, QR code returns, and a branded returns portal for your customers.' },
    ],
    faqs: [
      { question: 'How much does parcel delivery cost in Sydney?', answer: 'MailPlus parcel delivery starts from $8.50 for a 500g satchel within Sydney metro. Interstate rates start from $12.00 for the same weight. Use our online calculator for an instant quote based on weight and dimensions.' },
      { question: 'How do I send a parcel with MailPlus in Sydney?', answer: 'Print a label from mailplus.com.au, attach it to your parcel, and drop it at either our Waterloo or Alexandria depot, or book a free pickup. Pickups are available Monday–Saturday for account holders.' },
      { question: 'How long does interstate parcel delivery take from Sydney?', answer: 'Sydney to Melbourne and Canberra is 1–2 business days. Sydney to Brisbane is 1–3 days. Sydney to Perth is 3–5 days. Adelaide 2–4 days. All with tracking at every step.' },
      { question: 'What are the maximum parcel dimensions for standard delivery?', answer: 'Standard service accepts parcels up to 25kg and a maximum dimension of 1.05m on the longest side. Cubic weight rules apply: a 30cm x 30cm x 30cm box is charged at 250g cubic regardless of actual weight.' },
      { question: 'Does MailPlus offer Saturday parcel delivery?', answer: 'Yes — Saturday delivery is available in Sydney metro, Melbourne metro, and Brisbane metro at a small surcharge of $3.50. Book by Friday 2 PM to guarantee Saturday delivery.' },
    ],
    startingPrice: '8.50',
    priceUnit: 'AUD',
    deliveryTime: 'Next day (metro)',
    schemaServiceType: 'Parcel Delivery Service',
    metaTitle: 'Parcel Delivery Sydney | Next-Day Metro | MailPlus',
    metaDescription: 'Fast, tracked parcel delivery from Sydney to all Australian capitals. Next-day metro, 2–5 day interstate. E-commerce integrations. From $8.50.',
  },
  {
    slug: 'mail-management',
    name: 'Mail Management',
    tagline: 'Outsource Your Mailroom',
    heroLabel: 'Mailroom',
    bluf: 'MailPlus mail management handles your entire business mail cycle — receiving, sorting, scanning, forwarding, and archiving — so your team never has to manage a mailroom again. Ideal for companies with 10–500 staff or distributed remote teams.',
    description: 'Our Waterloo mailroom facility receives all your business correspondence, scans documents to your secure cloud portal within 4 hours of arrival, and physically forwards items on your schedule — daily, weekly, or on-demand.',
    features: [
      { icon: '📥', title: 'Dedicated PO Box Address', description: 'A professional Sydney CBD-adjacent address (Waterloo NSW 2017) for all your business mail.' },
      { icon: '🖥️', title: 'Same-Day Digital Scan', description: 'Every item is scanned in high-resolution and uploaded to your secure web portal within 4 hours of arrival.' },
      { icon: '🔄', title: 'Physical Forwarding', description: 'Bulk forward to any address on your schedule, or trigger on-demand forwarding for urgent items via your portal.' },
      { icon: '🔐', title: 'Secure Destruction', description: 'Confidential shredding with a certificate of destruction for sensitive documents. GDPR and Privacy Act compliant.' },
      { icon: '🏷️', title: 'Smart Sorting', description: 'AI-assisted categorisation sorts your mail into categories (invoices, legal, HR, marketing) before it hits your portal.' },
      { icon: '👥', title: 'Multi-Staff Access', description: 'Role-based portal access so each department only sees their mail. Full audit trail of who viewed what.' },
    ],
    faqs: [
      { question: 'What is a mail management service and how does it work?', answer: 'A mail management service receives your physical business mail on your behalf, scans each item digitally, and forwards originals as needed. MailPlus handles this from our Waterloo facility: your mail arrives, is opened and scanned within 4 hours, and appears in your secure online portal.' },
      { question: 'How much does mail management cost for a small business?', answer: 'MailPlus mail management starts from $89/month for the Starter plan (up to 50 items/month, digital scan, PO box address). The Business plan at $199/month covers 200 items plus physical forwarding. Enterprise plans for 500+ items are custom-quoted.' },
      { question: 'Can I use MailPlus as my registered business address?', answer: 'Yes. Our Waterloo address (Suite XX, XX Botany Road, Waterloo NSW 2017) can be used as your registered business address with ASIC for Pty Ltd companies. This is included in all mail management plans.' },
      { question: 'How secure is digital mail scanning?', answer: 'All scans are encrypted in transit (TLS 1.3) and at rest (AES-256) in Australian AWS data centres. Access is protected by MFA. We hold ISO 27001 certification and comply with the Australian Privacy Act 1988.' },
      { question: 'What happens to my physical mail after scanning?', answer: 'You choose: store it at our facility for up to 90 days (included), forward in bulk weekly, forward on-demand, or securely destroy it. Destruction includes a certificate for compliance records.' },
    ],
    startingPrice: '89',
    priceUnit: 'AUD/month',
    deliveryTime: 'Scanned same day',
    schemaServiceType: 'Mail Management Service',
    metaTitle: 'Mail Management Sydney | Mailroom Outsourcing | MailPlus',
    metaDescription: 'Outsource your Sydney business mailroom to MailPlus. Digital scanning, secure forwarding, PO box address. From $89/month. Waterloo NSW depot.',
  },
  {
    slug: 'logistics',
    name: 'Logistics & Warehousing',
    tagline: 'B2B Distribution from Sydney',
    heroLabel: 'Logistics',
    bluf: 'MailPlus logistics provides contract warehousing, pick-and-pack fulfilment, and B2B last-mile distribution from our 3,000 sqm Alexandria facility. Ideal for businesses shipping 500–50,000 orders per month who need a scalable, outsourced 3PL partner.',
    description: 'Our Alexandria operations hub connects to the M5 Motorway and Port Botany for efficient inbound freight. We integrate with your ERP or e-commerce platform to provide real-time inventory visibility, same-day dispatch, and flexible storage pricing.',
    features: [
      { icon: '🏭', title: '3,000 sqm Warehouse', description: 'Climate-controlled storage in Alexandria, 4km from Sydney CBD. Ambient and cold-chain options available.' },
      { icon: '📦', title: 'Pick, Pack & Despatch', description: 'Orders received by 2 PM despatched same day. Multi-SKU kitting, custom packaging, and branded inserts available.' },
      { icon: '🔗', title: 'ERP & Platform Integration', description: 'Connect via API or EDI to SAP, NetSuite, Shopify Plus, Cin7, and 40+ other platforms for automated order flow.' },
      { icon: '📈', title: 'Scalable Storage', description: 'Pay only for the pallet positions you use each month. Scale from 10 pallets to 1,000+ with no long-term contract required.' },
      { icon: '🚛', title: 'Last-Mile Distribution', description: 'B2B deliveries to retailers, offices, and sites across NSW with MailPlus vehicles and carrier partnerships.' },
      { icon: '🧾', title: 'Real-Time Inventory', description: 'Web portal and API access to live stock levels, inbound manifests, and outbound despatch confirmations.' },
    ],
    faqs: [
      { question: 'What is a 3PL warehouse and does MailPlus offer it in Sydney?', answer: 'A 3PL (third-party logistics) warehouse stores your stock, picks and packs orders, and despatches them to customers on your behalf. MailPlus operates a 3PL facility in Alexandria, Sydney, 4km from the CBD and close to Port Botany for easy inbound freight.' },
      { question: 'How much does warehousing cost in Sydney?', answer: 'MailPlus charges $28 per pallet position per month for ambient storage, or $45 for temperature-controlled. Pick-and-pack fees start from $1.20 per order plus $0.30 per item picked. Inbound receival is $15 per pallet. Volume discounts apply from 50 pallets.' },
      { question: 'What is the minimum contract length for MailPlus logistics?', answer: 'There is no minimum contract. MailPlus operates on a rolling monthly agreement. We require 60 days notice to vacate stored stock, giving both parties flexibility.' },
      { question: 'Does MailPlus handle cold-chain or pharmaceutical logistics?', answer: 'Yes. Our Alexandria facility has a 500 sqm cold-chain zone maintained at 2–8°C. We hold TGA and food-grade certification for pharmaceutical and perishable distribution. GDP documentation is provided for all cold-chain movements.' },
      { question: 'How does MailPlus integrate with my e-commerce platform?', answer: 'We have pre-built integrations for Shopify, WooCommerce, Magento, and Cin7. For ERP systems (SAP, NetSuite, MYOB Advanced) we use EDI or REST API. Setup takes 5–10 business days. Your orders flow in automatically and tracking numbers flow back to your platform.' },
    ],
    startingPrice: '28',
    priceUnit: 'AUD/pallet/month',
    deliveryTime: 'Same-day despatch',
    schemaServiceType: 'Logistics Service',
    metaTitle: 'Logistics & Warehousing Sydney | 3PL Alexandria | MailPlus',
    metaDescription: '3PL warehousing and B2B distribution from MailPlus Alexandria, Sydney. Pick-and-pack, e-commerce fulfilment, cold chain. From $28/pallet/month.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
