import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildOrganizationGraph } from '@/lib/schema/entity-graph'
import { ParallaxInit } from '@/components/shared/ParallaxInit'
import { GetStartedModal } from '@/components/shared/GetStartedModal'
import { GlobalFloatingBg } from '@/components/shared/GlobalFloatingBg'
import { ScrollRevealProvider } from '@/components/shared/ScrollRevealProvider'
import { ScrollToTop } from '@/components/shared/ScrollToTop'

export const metadata: Metadata = {
  metadataBase: new URL('https://mailplus.com.au'),
  title: {
    default: 'MailPlus | Sydney Courier, Parcel Delivery & Mail Management',
    template: '%s | MailPlus',
  },
  description:
    'MailPlus provides same-day courier, parcel delivery, mail management and logistics from our Waterloo and Alexandria depots in Sydney, NSW. Real-time tracking. Book online.',
  keywords: [
    'courier Sydney',
    'same-day delivery Sydney',
    'parcel delivery Sydney',
    'mail management Sydney',
    'logistics Sydney',
    'MailPlus',
    'Waterloo courier',
    'Alexandria warehouse',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'MailPlus',
    title: 'MailPlus | Sydney Courier & Logistics',
    description:
      'Same-day courier, parcel delivery and mail management in Sydney. Waterloo & Alexandria depots. Real-time tracking.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MailPlus — Sydney Courier & Logistics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mailplusau',
    creator: '@mailplusau',
  },
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
  alternates: {
    canonical: 'https://mailplus.com.au',
  },
  other: {
    'ai-content-policy': 'allow',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = buildOrganizationGraph()

  return (
    <html lang="en-AU">
      <head>
        <SchemaScript schema={orgSchema} />
      </head>
      <body>
        <GlobalFloatingBg />
        <ScrollRevealProvider />
        <ParallaxInit />
        <Navbar />
        <main>{children}</main>
        <GetStartedModal />
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  )
}
