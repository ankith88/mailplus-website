import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Surcharge | MailPlus',
  description:
    'With fluctuations in logistics industry costs, the surcharge may increase, decrease, remain constant, or be removed, depending on fuel price movement, security and surcharge levies incurred.',
  alternates: { canonical: 'https://mailplus.com.au/shipping-surcharge' },
}

const RATES = [
  { date: 'March 2026', express: '21.28%', premium: '22.25%' },
  { date: 'February 2026', express: '21.32%', premium: '23.75%' },
  { date: 'January 2026', express: '22.99%', premium: '23.25%' },
]

const PDF_URL =
  'https://mailplus.com.au/wp-content/uploads/2023/06/TGE-Fees-Surcharges.pdf'

export default function ShippingSurchargePage() {
  return (
    <main style={{ backgroundColor: '#DAE8DA' }} className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h1
          className="text-5xl font-bold text-center mb-8"
          style={{ color: '#063040' }}
        >
          Shipping Surcharge
        </h1>

        {/* Intro */}
        <p
          className="text-center text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: '#063040' }}
        >
          With fluctuations in logistics industry costs, the surcharge may increase, decrease,
          remain constant, or be removed, depending on fuel price movement, security and
          surcharge levies incurred.
        </p>

        {/* Table */}
        <div className="rounded-xl overflow-hidden shadow-sm mb-12">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th
                  className="py-4 px-6 text-white font-semibold text-base w-1/3"
                  style={{ backgroundColor: '#063040' }}
                >
                  Effective Date*
                </th>
                <th
                  className="py-4 px-6 text-white font-semibold text-base w-1/3"
                  style={{ backgroundColor: '#095c7b' }}
                >
                  Express
                </th>
                <th
                  className="py-4 px-6 text-white font-semibold text-base w-1/3"
                  style={{ backgroundColor: '#4a9aba' }}
                >
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {RATES.map(({ date, express, premium }, i) => (
                <tr key={date} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f5f9f5' }}>
                  <td className="py-4 px-6 font-medium" style={{ color: '#063040' }}>
                    {date}
                  </td>
                  <td
                    className="py-4 px-6 font-semibold"
                    style={{ backgroundColor: '#095c7b', color: 'white' }}
                  >
                    {express}
                  </td>
                  <td
                    className="py-4 px-6 font-semibold"
                    style={{ backgroundColor: '#4a9aba', color: 'white' }}
                  >
                    {premium}
                  </td>
                </tr>
              ))}
              {/* Additional Charges row */}
              <tr style={{ backgroundColor: '#f5f9f5' }}>
                <td className="py-4 px-6 font-medium" style={{ color: '#063040' }}>
                  Additional Charges
                </td>
                <td
                  className="py-4 px-6"
                  style={{ backgroundColor: '#095c7b' }}
                >
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:opacity-80 transition-opacity"
                    style={{ color: '#EAF044' }}
                  >
                    LINK
                  </a>
                </td>
                <td
                  className="py-4 px-6"
                  style={{ backgroundColor: '#4a9aba' }}
                >
                  <a
                    href={PDF_URL}
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

        {/* Footnote */}
        <p className="text-center text-sm" style={{ color: '#063040', opacity: 0.7 }}>
          * Unless otherwise stated, the published surcharge will apply for the entire calendar month.
        </p>
      </div>
    </main>
  )
}
