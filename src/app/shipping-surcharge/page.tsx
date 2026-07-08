import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Shipping Surcharge | MailPlus',
  description: 'With fluctuations in logistics industry costs, the surcharge may increase, decrease, remain constant, or be removed, depending on fuel price movement, security and surcharge levies incurred.',
};

export default function Page() {
  return (
    <div className="surcharge-page-layout">
      <section className="legal-hero">
  <div className="wrap">
    <div className="crumb"><a href="/">Home</a> <span>/</span> Shipping Surcharge</div>
    <div className="hero-eyebrow"><span className="dot"></span> Pricing reference</div>
    <h1>Shipping Surcharge</h1>
    <p className="legal-lead">With fluctuations in logistics industry costs, the surcharge may increase, decrease, remain constant, or be removed, depending on fuel price movement, security and surcharge levies incurred.</p>
  </div>
</section>


<section className="section" style={{"paddingTop":"36px"}}>
  <div className="wrap">
    <div className="surcharge-wrap">
      <div className="surcharge-card">
        <table className="surcharge-table">
          <thead>
            <tr><th scope="col">Effective Date*</th><th scope="col">Express</th><th scope="col">Premium</th></tr>
          </thead>
          <tbody>
        <tr><td>July 6th 2026</td><td className="pct">31.14%</td><td className="pct">29.35%</td></tr>
        <tr><td>June 29th 2026</td><td className="pct">32.13%</td><td className="pct">29.35%</td></tr>
        <tr><td>June 22nd 2026</td><td className="pct">33.55%</td><td className="pct">36.55%</td></tr>
        <tr><td>June 15th 2026</td><td className="pct">34.94%</td><td className="pct">36.55%</td></tr>
        <tr><td>June 8th 2026</td><td className="pct">36.30%</td><td className="pct">36.55%</td></tr>
        <tr><td>June 1st 2026</td><td className="pct">38.11%</td><td className="pct">36.55%</td></tr>
        <tr><td>May 25th 2026</td><td className="pct">37.81%</td><td className="pct">29.05%</td></tr>
        <tr><td>May 18th 2026</td><td className="pct">37.77%</td><td className="pct">29.05%</td></tr>
        <tr><td>May 11th 2026</td><td className="pct">38.81%</td><td className="pct">29.05%</td></tr>
        <tr><td>May 4th 2026</td><td className="pct">40.12%</td><td className="pct">29.05%</td></tr>
            <tr className="links"><td>Additional Charges</td><td><a href="https://mailplus.com.au/wp-content/uploads/2023/07/2023-TGE-Surcharges.pdf" target="_blank" rel="noopener">TGE surcharges (PDF) ↗</a></td><td><a href="https://startrack.com.au/pricing-updates" target="_blank" rel="noopener">StarTrack pricing updates ↗</a></td></tr>
          </tbody>
        </table>
      </div>
      <p className="table-note">* Unless otherwise stated, the published surcharge will apply for the entire calendar month.</p>
    </div>
  </div>
</section>


    </div>
  );
}
