import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Surcharge | MailPlus',
  description: 'To account for variations in fuel prices and logistics industry costs, we apply a surcharge to our services. This surcharge is subject to change based on market conditions.',
  alternates: { canonical: 'https://mailplus.com.au/surcharges' },
};

export default function Page() {
  return (
    <div className="surcharge-page-layout">
      <section className="legal-hero">
  <div className="wrap">
    <div className="crumb"><a href="/">Home</a> <span>/</span> Service Surcharge</div>
    <div className="hero-eyebrow"><span className="dot"></span> Pricing reference</div>
    <h1>Surcharge</h1>
    <p className="legal-lead">To account for variations in fuel prices and logistics industry costs, we apply a surcharge to our services. This surcharge is subject to change based on market conditions and may increase, decrease, or remain constant. However, to ensure consistent service quality, a minimum surcharge of 19.5% will always apply.</p>
  </div>
</section>


<section className="section" style={{"paddingTop":"36px"}}>
  <div className="wrap">
    <div className="surcharge-wrap">
      <div className="surcharge-card">
        <table className="surcharge-table">
          <thead>
            <tr><th scope="col">Effective Date*</th><th scope="col">Services</th></tr>
          </thead>
          <tbody>
        <tr><td>August 2026</td><td className="pct">19.50%</td></tr>
        <tr><td>July 2026</td><td className="pct">19.50%</td></tr>
        <tr><td>June 2026</td><td className="pct">19.50%</td></tr>
        <tr><td>May 2026</td><td className="pct">19.50%</td></tr>
        <tr><td>April 2026</td><td className="pct">26.70%</td></tr>
            <tr className="links"><td>Fuel Index</td><td><a href="https://www.aip.com.au/pricing/pump-prices" target="_blank" rel="noopener">AIP pump prices ↗</a></td></tr>
          </tbody>
        </table>
      </div>
      <div className="xlink-card">
        <div>
          <div className="xl-title">Looking for shipping surcharges?</div>
          <div className="xl-sub">Premium (StarTrack) &amp; Express (TGE) shipping surcharges, plus carrier additional-charges links.</div>
        </div>
        <a className="xl-btn" href="/shipping-surcharge">Shipping Surcharge →</a>
      </div>

      <p className="table-note">* Unless otherwise stated, the published surcharge will apply for the entire calendar month.</p>
    </div>
  </div>
</section>


    </div>
  );
}
