import type { Metadata } from 'next';
import Link from 'next/link';
import './styles.css';

export const metadata: Metadata = {
  title: 'Shipping Surcharge | MailPlus',
  description:
    'With fluctuations in logistics industry costs, the surcharge may increase, decrease, remain constant, or be removed, depending on fuel price movement, security and surcharge levies incurred.',
  alternates: { canonical: 'https://mailplus.com.au/shipping-surcharge' },
};

const shippingRates = [
  { date: 'November 9th 2026', express: '39.11%', premium: '30.55%', current: true },
  { date: 'November 2nd 2026', express: '38.15%', premium: '30.55%' },
  { date: 'October 26th 2026', express: '37.65%', premium: '28.55%' },
  { date: 'October 19th 2026', express: '37.46%', premium: '28.55%' },
  { date: 'October 12th 2026', express: '36.97%', premium: '28.55%' },
  { date: 'October 5th 2026', express: '36.10%', premium: '28.55%' },
  { date: 'September 30th 2026', express: '35.15%', premium: '28.55%' },
  { date: 'September 28th 2026', express: '35.15%', premium: '23.95%' },
  { date: 'September 21st 2026', express: '34.14%', premium: '23.95%' },
  { date: 'September 14th 2026', express: '33.37%', premium: '23.95%' },
  { date: 'September 7th 2026', express: '32.76%', premium: '23.95%' },
  { date: 'August 31st 2026', express: '32.71%', premium: '23.95%' },
  { date: 'August 24th 2026', express: '31.29%', premium: '26.95%' },
  { date: 'August 17th 2026', express: '31.26%', premium: '26.95%' },
  { date: 'August 10th 2026', express: '30.15%', premium: '26.95%' },
  { date: 'August 3rd 2026', express: '28.61%', premium: '26.95%' },
  { date: 'July 27th 2026', express: '28.73%', premium: '29.35%' },
  { date: 'July 20th 2026', express: '28.73%', premium: '29.35%' },
  { date: 'July 13th 2026', express: '28.73%', premium: '29.35%' },
  { date: 'July 6th 2026', express: '31.14%', premium: '29.35%' },
  { date: 'June 29th 2026', express: '32.13%', premium: '29.35%' },
  { date: 'June 22nd 2026', express: '33.55%', premium: '36.55%' },
  { date: 'June 15th 2026', express: '34.94%', premium: '36.55%' },
  { date: 'June 8th 2026', express: '36.30%', premium: '36.55%' },
  { date: 'June 1st 2026', express: '38.11%', premium: '36.55%' },
];

export default function Page() {
  return (
    <div className="surcharge-page-layout">
      <section className="legal-hero">
        <div className="wrap">
          <div className="surcharge-wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span>{' '}
              <span aria-current="page">Shipping Surcharge</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot" aria-hidden="true"></span> Pricing references
            </div>
            <h1>Shipping Surcharge</h1>
            <p className="legal-lead">
              With fluctuations in logistics industry costs, the surcharge may increase, decrease, remain constant, or be removed, depending on fuel price movement, security and surcharge levies incurred.
            </p>
          </div>
        </div>
      </section>

      <section className="section surcharge-section">
        <div className="wrap">
          <div className="surcharge-wrap">
            <div className="surcharge-card">
              <div className="surcharge-table-scroll">
                <table className="surcharge-table">
                  <thead>
                    <tr>
                      <th scope="col">Effective Date*</th>
                      <th scope="col" className="num-col">Express</th>
                      <th scope="col" className="num-col">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRates.map((row) => (
                      <tr key={row.date} className={row.current ? 'current' : undefined}>
                        <td>
                          {row.current ? (
                            <span className="period-cell">
                              <span>{row.date}</span>
                              <span className="current-badge">Current</span>
                            </span>
                          ) : (
                            row.date
                          )}
                        </td>
                        <td className="pct num-col">{row.express}</td>
                        <td className="pct num-col">{row.premium}</td>
                      </tr>
                    ))}

                    <tr className="links">
                      <td>Additional Charges</td>
                      <td className="num-col">
                        <a
                          href="https://mailplus.com.au/wp-content/uploads/2023/07/2023-TGE-Surcharges.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="carrier-link"
                        >
                          <span>TGE surcharges (PDF)</span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      </td>
                      <td className="num-col">
                        <a
                          href="https://startrack.com.au/pricing-updates"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="carrier-link"
                        >
                          <span>StarTrack pricing updates</span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="table-note">
              * Unless otherwise stated, the published surcharge will apply for the entire calendar month.
            </p>

            <div className="xlink-card">
              <div>
                <div className="xl-title">Looking for service surcharges?</div>
                <div className="xl-sub">
                  Monthly fuel and logistics surcharge rates for MailPlus Services and Extra Services.
                </div>
              </div>
              <Link className="xl-btn" href="/surcharges">
                Service Surcharge
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
