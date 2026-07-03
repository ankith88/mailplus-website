import type { Metadata } from 'next';
import PostOfficeClient from './PostOfficeClient';
import './styles.css';

export const metadata: Metadata = {
  title: 'Post Office Collect & Lodge | We Run Your Post Office Trips | MailPlus',
  description: 'MailPlus collects and lodges your parcels and mail and clears your business PO Boxes, with same-day collection through a local owner-operator. Skip the Post Office queue — your team never has to leave the office.',
  alternates: { canonical: 'https://mailplus.com.au/post-office-collect-lodge' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function PostOfficeCollectLodgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "serviceType": "Post Office collect and lodge", "name": "MailPlus Post Office Collect & Lodge", "provider": { "@type": "LocalBusiness", "name": "MailPlus", "url": "https://mailplus.com.au", "telephone": "+61-1300-65-65-95", "foundingDate": "1997", "areaServed": "AU" }, "areaServed": { "@type": "Country", "name": "Australia" }, "description": "MailPlus bridges the gap between businesses and the Post Office \u2014 we collect and lodge your parcels and mail, and clear your business PO Boxes, with same-day collection through a local owner-operator.", "offers": { "@type": "Offer", "priceCurrency": "AUD", "description": "Same-day collect and lodge and PO Box clearing, handled by your local owner-operator. A collection fee may apply for lower-volume businesses, agreed upfront at signup." } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is MailPlus Post Office collect & lodge?", "acceptedAnswer": { "@type": "Answer", "text": "It's the service that runs your Post Office trips for you. Each morning, your local owner-operator brings in your incoming mail and parcels from Australia Post and clears your business PO Boxes; each afternoon, they collect your outgoing mail and parcels and lodge them for same-day processing. Your team never has to queue or leave the office." } }, { "@type": "Question", "name": "Does MailPlus lodge Australia Post mail and parcels?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 and it means no one on your team ever queues at the Post Office again. We pick up your Australia Post mail and parcels and lodge them on your behalf, same-day. Your local owner-operator handles it as part of their daily run, bridging the gap between your business and the Post Office." } }, { "@type": "Question", "name": "Can MailPlus clear my business PO Box?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PO Box clearing is part of our Post Office Solutions service. Your local owner-operator collects and lodges your parcels and mail and clears your business PO Boxes, all with same-day collection. It's one service that bridges your business and the Post Office, so nobody on your team has to make the run." } }, { "@type": "Question", "name": "How is MailPlus different from going to the Post Office yourself?", "acceptedAnswer": { "@type": "Answer", "text": "Doing it yourself means finding a park, waiting in the queue, and losing half a morning \u2014 every time. MailPlus comes to you instead: your local owner-operator collects and lodges your mail and parcels as part of their daily run, no trip required. We're an independent alternative to Australia Post and traditional couriers." } }] }) }} />
      <PostOfficeClient />
    </>
  );
}
