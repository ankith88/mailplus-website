import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="mail">mail</span><span className="plus">plus</span>
            </Link>
            <p>
              An Australian courier and parcel delivery network for small to medium sized business, founded in 1997. Express delivery, Post Office collect &amp; lodge, and local hand-to-hand delivery — backed by local owner-operators.
            </p>
            <a href="tel:1300656595" className="footer-phone">
              <span>📞</span> 1300 65 65 95
            </a>
            <div className="footer-social">
              <a 
                href="https://www.instagram.com/mailplus" 
                className="social-link" 
                aria-label="MailPlus on Instagram" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.14 0-3.51.01-4.75.07-.92.04-1.42.2-1.75.33-.44.17-.75.37-1.08.7-.33.33-.53.64-.7 1.08-.13.33-.29.83-.33 1.75-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.92.2 1.42.33 1.75.17.44.37.75.7 1.08.33.33.64.53 1.08.7.33.13.83.29 1.75.33 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.92-.04 1.42-.2 1.75-.33.44-.17.75-.37 1.08-.7.33-.33.53-.64.7-1.08.13-.33.29-.83.33-1.75.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.92-.2-1.42-.33-1.75a2.9 2.9 0 0 0-.7-1.08 2.9 2.9 0 0 0-1.08-.7c-.33-.13-.83-.29-1.75-.33-1.24-.06-1.61-.07-4.75-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm6.95-9.22a1.28 1.28 0 1 1-2.55 0 1.28 1.28 0 0 1 2.55 0Z" />
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/mailplus" 
                className="social-link" 
                aria-label="MailPlus on Facebook" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/5-free-collections">5 Free Collections</Link></li>
              <li><Link href="/express-delivery">Express Delivery</Link></li>
              <li><Link href="/post-office-collect-lodge">Post Office Collect &amp; Lodge</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link href="/shipmate-platform">ShipMate</Link></li>
              <li><Link href="/mailplus-api">MailPlus API</Link></li>
              <li><Link href="/track">Track a Parcel</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/resources">Resource Hub</Link></li>
              <li><Link href="/resources/how-to-choose-a-courier">How to choose a courier</Link></li>
              <li><Link href="/resources/what-is-flat-rate-shipping">What is flat-rate shipping?</Link></li>
              <li><Link href="/resources/same-day-delivery-guide">Same-day delivery guide</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About MailPlus</Link></li>
              <li><Link href="/#faq">FAQs</Link></li>
              <li><Link href="/track#support">Create a Support Ticket</Link></li>
              <li><Link href="/pay-invoice">Pay My Invoice</Link></li>
              <li><Link href="/become-a-franchisee">Become a Franchisee</Link></li>
            </ul>
            <address className="footer-address">
              <span className="fa-label">Head office</span>
              <span>L16, 175 Pitt Street,<br />Sydney NSW 2000</span>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MailPlus Pty Ltd.</p>
          <nav className="footer-legal" aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
