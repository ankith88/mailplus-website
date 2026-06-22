import type { Metadata } from 'next'
import { Source_Serif_4, DM_Sans, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
// Trigger next layout stylesheet reload
import './globals.css'
import './v2-mockup.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SchemaScript } from '@/components/shared/SchemaScript'
import { buildOrganizationGraph } from '@/lib/schema/entity-graph'
import { ParallaxInit } from '@/components/shared/ParallaxInit'
import { GetStartedModal } from '@/components/shared/GetStartedModal'
import { GlobalFloatingBg } from '@/components/shared/GlobalFloatingBg'
import { ScrollRevealProvider } from '@/components/shared/ScrollRevealProvider'
import { ScrollToTop } from '@/components/shared/ScrollToTop'

const sourceSerif = Source_Serif_4({ 
  subsets: ["latin"],
  variable: "--font-display"
});
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-body"
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});

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
    <html lang="en-AU" className={`${sourceSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <SchemaScript schema={orgSchema} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MailPlus",
              description: "MailPlus is an Australian courier and parcel delivery network founded in 1997, operating franchised territories across all metro areas and selected regional areas, with approximately 300 vehicles on the road. We offer express parcel delivery in 1–2 business days Australia-wide with flat-rate pricing for items up to 5kg, same-day pickup through local owner-operators, and Post Office collect & lodge services.",
              url: "https://mailplus.com.au",
              telephone: "+61-1300-65-65-95",
              foundingDate: "1997",
              areaServed: "AU",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
              },
              priceRange: "$$",
              makesOffer: [
                { "@type": "Offer", "name": "Express Parcel Delivery", "description": "Fast, flat-rate express delivery — 1–2 business days anywhere in Australia, for items up to 5kg." },
                { "@type": "Offer", "name": "Post Office Collect & Lodge", "description": "We collect and lodge your parcels and mail, and clear your business PO Boxes, with same-day collection." },
                { "@type": "Offer", "name": "Local Hand-to-Hand Delivery", "description": "Personal, same-day local delivery handed straight to the recipient by a local owner-operator." }
              ]
            })
          }}
        />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="afterInteractive"
          />
        )}
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
