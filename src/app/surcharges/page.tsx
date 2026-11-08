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
    <p className="legal-lead">To account for variations in fuel prices and logistics industry costs, we apply a surcharge to our services. This surcharge is subject to change based on market conditions and may increase, decrease, or remain constant. However, to ensure consistent service quality, a minimum surcharge of 32.8% will always apply.</p>
  </div>
</section>


<section className="section" style={{"paddingTop":"36px"}}>
  <div className="wrap">
    <div className="surcharge-wrap">
      <div className="surcharge-card">
        <table className="surcharge-table">
          <thead>
            <tr><th scope="col">Effective Period*</th><th scope="col">Surcharge charged</th></tr>
          </thead>
          <tbody>
            <tr><td>October 2026</td><td className="pct">32.80%</td></tr>
            <tr><td>September 2026</td><td className="pct">28.60%</td></tr>
          </tbody>
        </table>
      </div>

      <p className="table-note">
        <strong>Current limitation:</strong> MailPlus is currently limiting the surcharge charged to 32.80%, although our surcharge methodology calculates a higher rate. This is not a permanent maximum. Any future increase, including the removal of this limitation, will apply in accordance with your contract.
      </p>

      <p className="table-note">
        <strong>Fuel-price reference:</strong> <a href="https://www.aip.com.au/pricing/pump-prices" target="_blank" rel="noopener">AIP Pump Prices</a>.
        <br />
        This is the fuel-price data used in our surcharge methodology, not the MailPlus surcharge rate.
      </p>

      <p className="table-note">* Unless otherwise stated, the published surcharge will apply for the entire calendar month.</p>

      <div className="xlink-card">
        <div>
          <div className="xl-title">Looking for shipping surcharges?</div>
          <div className="xl-sub">Premium (StarTrack) &amp; Express (TGE) shipping surcharges, plus carrier additional-charges links.</div>
        </div>
        <a className="xl-btn" href="/shipping-surcharge">Shipping Surcharge →</a>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}
