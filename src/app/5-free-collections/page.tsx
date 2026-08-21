import type { Metadata } from 'next';
import Script from 'next/script';
import FiveFreeCollectionsClient from './FiveFreeCollectionsClient';
import './styles.css';

export const metadata: Metadata = {
  title: '5 Free Collections | Try MailPlus Free — No Card, No Catch',
  description: 'New business customers get 5 free parcel collections from MailPlus — your local owner-operator collects from your premises and lodges at the Post Office for you. No credit card, no obligation, no contract.',
  alternates: { canonical: 'https://mailplus.com.au/5-free-collections' },
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

export default function FiveFreeCollectionsPage() {
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
  "serviceType": "Parcel collection and Post Office lodgement",
  "name": "MailPlus 5 Free Collections",
  "provider": {
    "@type": "LocalBusiness",
    "name": "MailPlus",
    "url": "https://mailplus.com.au",
    "telephone": "+61-1300-65-65-95",
    "foundingDate": "1997",
    "areaServed": "AU"
  },
  "areaServed": { "@type": "Country", "name": "Australia" },
  "description": "New MailPlus business customers get five free parcel collections. A local owner-operator collects parcels from your premises and lodges them at the Post Office for you, removing the Post Office run. No credit card and no obligation to continue.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "price": "0",
    "description": "Five free parcel collections for new business customers. No credit card required, no obligation, no contract. A local MailPlus owner-operator collects from your premises and lodges at the Post Office on your behalf."
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
      "name": "What are MailPlus 5 free collections?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's a free trial for new business customers who send with Australia Post: five collections, completely free. A local MailPlus owner-operator collects your parcels and mail from your premises and lodges them at the Post Office on your own Aus Post account — so your rates and tracking don't change. There's no credit card, no invoice, and no obligation to continue."
      }
    },
    {
      "@type": "Question",
      "name": "Is there really no catch with the free collections?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No catch. MailPlus has worked with Licensed Post Offices across Australia for almost 30 years, so we'd rather show you the service than try to convince you. Five collections are on us, with nothing on your card and nothing to cancel. If it doesn't save your team time, you haven't lost a thing."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a credit card to start the free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. You don't enter any card details to claim your five free collections. Just enter your business address on this page to check your area, and if there's a local owner-operator near you, register on LocalMile and book your first collection. There is no invoice and no obligation during the trial."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need an Australia Post account?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — this offer is for businesses already sending with Australia Post, whether that's eParcel, MyPost Business or general mail items on an Aus Post account. Your local driver lodges everything on your own account, so your rates, tracking and invoicing don't change. If you're not sending with Australia Post, or want to switch, our Express Delivery service may be the better fit."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after the 5 free collections?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most businesses choose to keep going. If you book as you need it, ad hoc collections are $15 + GST each. If you'd rather a scheduled, regular service, your Account Manager tailors the pricing to your business during the trial. There's no lock-in, and the choice is entirely yours once you've seen the service for yourself."
      }
    },
    {
      "@type": "Question",
      "name": "How soon will my parcels be collected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During the trial, same-day collections need to be booked before 12pm, so your local owner-operator has plenty of time to fit you into their run. Book after that and your collection rolls to the next business day. Either way, you'll see it confirmed in LocalMile, so you always know a pickup is on the way."
      }
    },
    {
      "@type": "Question",
      "name": "What if I already use another courier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "That's no problem — this isn't about replacing your courier. The free trial covers the trip to the Post Office that you're doing yourself. If you're still doing that run, your owner-operator can take it off your hands, alongside whatever courier you already use."
      }
    },
    {
      "@type": "Question",
      "name": "How does MailPlus collection work with my local Post Office?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MailPlus is the collection arm for selected Licensed Post Offices across Australia. Your local owner-operator comes to your business, collects your parcels and mail, and lodges them at the Post Office for you. It bridges the gap between your business and the Post Office, on a schedule that suits you, so your team never has to make the run themselves."
      }
    },
    {
      "@type": "Question",
      "name": "What is LocalMile and how do I book my collections?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LocalMile is the free MailPlus platform for booking your local pickups online. Once your area is confirmed, you register on LocalMile and book each collection in a few taps. Your local owner-operator is sent the job automatically, accepts it, and comes to your premises to collect — so you can manage everything from one simple dashboard. It is a separate platform from ShipMate: LocalMile is for your regular local Post Office collections, while ShipMate is for Australia-wide express shipping."
      }
    }
  ]
}
      ) }} />
      <FiveFreeCollectionsClient />
    </>
  );
}

