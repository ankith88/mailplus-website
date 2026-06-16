export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo"><span className="mail">mail</span><span className="plus" style={{ color: "var(--cta)" }}>plus</span></div>
            <p>An Australian courier and parcel delivery network built for small businesses.</p>
            <div className="footer-address">
              <span className="fa-label">National Office</span>
              <span>1800 65 65 95</span>
              <span>Sydney, NSW 2000</span>
            </div>
            <a href="tel:1300656595" className="footer-phone">📞 1300 65 65 95</a>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="/express-delivery">Express Delivery</a></li>
              <li><a href="/post-office-collect-lodge">Post Office Solutions</a></li>
              <li><a href="/local-delivery">Local Hand-to-Hand</a></li>
              <li><a href="/shipmate">ShipMate Platform</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/franchise">Franchise Opportunities</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/terms">Terms &amp; Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/fuel-surcharge">Fuel Surcharge Info</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MailPlus Pty Ltd. All rights reserved.</p>
          <div className="footer-hours">Support Hours: Mon-Fri 8am to 6pm AEST</div>
        </div>
      </div>
    </footer>
  )
}
