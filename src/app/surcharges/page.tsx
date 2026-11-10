import type { Metadata } from 'next';
import Link from 'next/link';
import './styles.css';

export const metadata: Metadata = {
  title: 'Surcharge | MailPlus',
  description:
    'To account for variations in fuel prices and logistics industry costs, MailPlus applies a fuel and logistics surcharge to Services and Extra Services. View current and historical monthly surcharge rates.',
  alternates: { canonical: 'https://mailplus.com.au/surcharges' },
};

export default function Page() {
  return (
    <div className="surcharge-page-layout">
      <section className="legal-hero">
        <div className="wrap">
          <div className="surcharge-wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span>{' '}
              <span aria-current="page">Service Surcharge</span>
            </nav>
            <div className="hero-eyebrow">
              <span className="dot" aria-hidden="true"></span> Pricing reference
            </div>
            <h1>Surcharge</h1>

            <p className="legal-lead">
              To account for variations in fuel prices and logistics industry costs, MailPlus applies a fuel and logistics surcharge to Services and Extra Services, as defined in our{' '}
              <Link href="/terms" className="inline-link">
                Terms and Conditions
              </Link>
              . The surcharge is calculated as a percentage of the charges for those services.
            </p>

            <div className="policy-overview-card">
              <p>
                We review the surcharge monthly using our surcharge methodology, which takes account of AIP pump-price data. The surcharge may increase, decrease or remain unchanged, subject to a minimum rate of <strong>22.8%</strong>.
              </p>
              <p>
                MailPlus may limit the surcharge charged to customers to a rate below the rate calculated under that methodology. The table below shows the surcharge actually charged, which may therefore be lower than the calculated rate.
              </p>
              <p>
                Any future increase, including the removal of a temporary limitation, will apply in accordance with your contract.
              </p>
            </div>
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
                      <th scope="col">Effective Period</th>
                      <th scope="col" className="num-col">Surcharge charged</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="current">
                      <td>
                        <span className="period-cell">
                          <span>November 2026</span>
                          <span className="current-badge">Current</span>
                        </span>
                      </td>
                      <td className="pct num-col">32.80%</td>
                    </tr>
                    <tr>
                      <td>October 2026</td>
                      <td className="pct num-col">32.80%</td>
                    </tr>
                    <tr>
                      <td>September 2026</td>
                      <td className="pct num-col">28.60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="surcharge-callout surcharge-callout-limit" role="note" aria-label="Current surcharge limitation">
              <div className="callout-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <p className="callout-body">
                <strong>Current limitation:</strong> Since 1 October 2026, MailPlus has been limiting the surcharge charged to 32.80%, although our surcharge methodology calculates a higher rate. This is not a permanent maximum. Any future increase, including the removal of this limitation, will apply in accordance with your contract.
              </p>
            </div>

            <div className="surcharge-callout surcharge-callout-ref">
              <div className="callout-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <p className="callout-body">
                <strong>Fuel-price reference:</strong>{' '}
                <a
                  href="https://www.aip.com.au/pricing/pump-prices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link"
                >
                  AIP Pump Prices
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
                . This is the fuel-price data used in our surcharge methodology, not the MailPlus surcharge rate.
              </p>
            </div>

            <p className="table-note">
              Rates are reviewed monthly. The rate applicable to your services is determined under your contract and the surcharge schedule. Any increase applies prospectively, after the required written notice period, and not retrospectively.
            </p>

            <div className="xlink-card">
              <div>
                <div className="xl-title">Looking for shipping surcharges?</div>
                <div className="xl-sub">
                  Premium (StarTrack) &amp; Express (TGE) shipping surcharges, plus carrier additional-charges links.
                </div>
              </div>
              <Link className="xl-btn" href="/shipping-surcharge">
                Shipping Surcharge
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
