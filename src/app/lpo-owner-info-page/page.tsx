import type { Metadata } from 'next';
import LpoOwnerInfoClient from './LpoOwnerInfoClient';
import './styles.css';

export const metadata: Metadata = {
  title: 'LPO Owner Information | MailPlus',
  description: 'Express your interest in our Licensed Post Office owner operations program for 2026. Explore how a commercial relationship with MailPlus can benefit your operations.',
  alternates: { canonical: 'https://mailplus.com.au/lpo-owner-info-page' },
};

export default function LpoOwnerInfoPage() {
  return (
    <>
      <LpoOwnerInfoClient />
    </>
  );
}
