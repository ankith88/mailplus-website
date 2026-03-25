import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Surcharge | MailPlus',
  description:
    'To account for variations in fuel prices and logistics industry costs, we apply a surcharge to our services. View current monthly surcharge rates.',
  alternates: { canonical: 'https://mailplus.com.au/surcharge' },
}

const RATES = [
  { date: 'March 2026', rate: '14.50%' },
  { date: 'February 2026', rate: '14.50%' },
  { date: 'January 2026', rate: '14.50%' },
]

export default function SurchargePage() {
  return (
    <main style={{ backgroundColor: '#DAE8DA' }} className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h1
          className="text-5xl font-bold text-center mb-8"
          style={{ color: '#063040' }}
        >
          Surcharge
        </h1>

        {/* Intro */}
        <p
          className="text-center text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: '#063040' }}
        >
          To account for variations in fuel prices and logistics industry costs, we apply a
          surcharge to our services. This surcharge is subject to change based on market
          conditions and may increase, decrease, or remain constant. However, to ensure
          consistent service quality, a minimum surcharge of 14.5% will always apply.
        </p>

        {/* Table */}
        <div className="rounded-xl overflow-hidden shadow-sm mb-8">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th
                  className="py-4 px-6 text-white font-semibold text-base w-1/2"
                  style={{ backgroundColor: '#063040' }}
                >
                  Effective Date*
                </th>
                <th
                  className="py-4 px-6 text-white font-semibold text-base w-1/2"
                  style={{ backgroundColor: '#095c7b' }}
                >
                  Services
                </th>
              </tr>
            </thead>
            <tbody>
              {RATES.map(({ date, rate }, i) => (
                <tr key={date} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f5f9f5' }}>
                  <td className="py-4 px-6 font-medium" style={{ color: '#063040' }}>
                    {date}
                  </td>
                  <td
                    className="py-4 px-6 font-semibold"
                    style={{ backgroundColor: '#095c7b', color: 'white' }}
                  >
                    {rate}
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#f5f9f5' }}>
                <td className="py-4 px-6 font-medium" style={{ color: '#063040' }}>
                  Fuel Index
                </td>
                <td
                  className="py-4 px-6"
                  style={{ backgroundColor: '#095c7b' }}
                >
                  <a
                    href="https://www.racq.com.au/cars-and-driving/driving/fuel-watch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:opacity-80 transition-opacity"
                    style={{ color: '#EAF044' }}
                  >
                    LINK
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Shipping Surcharges link */}
        <div className="mb-2">
          <Link
            href="/shipping-surcharge"
            className="font-semibold hover:underline"
            style={{ color: '#063040' }}
          >
            Shipping Surcharges
          </Link>
        </div>

        <div className="mb-12">
          <a
            href="https://mailplus.com.au/wp-content/uploads/2023/06/TGE-Fees-Surcharges.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:opacity-80 transition-opacity"
            style={{ color: '#EAF044' }}
          >
            LINK
          </a>
        </div>

        {/* Footnote */}
        <p className="text-center text-sm" style={{ color: '#063040', opacity: 0.7 }}>
          * Unless otherwise stated, the published surcharge will apply for the entire calendar month.
        </p>
      </div>
    </main>
  )
}
