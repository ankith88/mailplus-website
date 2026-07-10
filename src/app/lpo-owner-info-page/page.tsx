import type { Metadata } from 'next';
import LpoOwnerInfoClient from './LpoOwnerInfoClient';
import './styles.css';

export const metadata: Metadata = {
  title: 'LPO Owner Information | MailPlus',
  description: 'Express your interest in our Licensed Post Office owner operations program for 2026. Explore how a commercial relationship with MailPlus can benefit your operations.',
  alternates: { canonical: 'https://mailplus.com.au/lpo-owner-info-page' },
};

export default function LpoOwnerInfoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "LPO Owner Information | MailPlus",
    "description": "Express interest in the 2026 MailPlus Licensed Post Office (LPO) owner logistics operations and driver partnership program.",
    "url": "https://mailplus.com.au/lpo-owner-info-page",
    "publisher": {
      "@id": "https://mailplus.com.au/#organization"
    },
    "mainEntity": {
      "@type": "ContactPoint",
      "telephone": "+61-0409-244-890",
      "contactType": "Kerry O’Neill — LPO Operations & Sales",
      "email": "kerry.oneill@mailplus.com.au",
      "availableLanguage": "English"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LpoOwnerInfoClient />
    </>
  );
}
