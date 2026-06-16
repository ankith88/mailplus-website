export function TestimonialsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="testimonial-section">
          <div className="reviews-badge">
            <span className="stars">★★★★★</span>
            <span className="rb-text">Rated <strong>4.8/5</strong> by Australian businesses</span>
          </div>

          <div className="review-cards">
            <div className="review-card">
              <div className="rc-stars">★★★★★</div>
              <p className="rc-quote">"MailPlus has completely changed how we handle our shipping. Our driver, Mark, is here every single afternoon without fail. The flat-rate pricing also means no more bill shock at the end of the month."</p>
              <div className="rc-author">
                <div className="rc-avatar">S</div>
                <div className="rc-text">
                  <div className="rc-name">Sarah Jenkins</div>
                  <div className="rc-meta">E-commerce Manager</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div className="rc-stars">★★★★★</div>
              <p className="rc-quote">"The ShipMate platform is brilliant. It synced instantly with our Shopify store. We used to spend two hours a day printing labels, now it takes ten minutes. And the express delivery is genuinely overnight to most cities."</p>
              <div className="rc-author">
                <div className="rc-avatar">M</div>
                <div className="rc-text">
                  <div className="rc-name">Michael T.</div>
                  <div className="rc-meta">Operations Director</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div className="rc-stars">★★★★★</div>
              <p className="rc-quote">"We use MailPlus for our Post Office runs across 14 clinics. Before them, our staff were wasting their lunch breaks queueing at the PO. Now, the mail just arrives in the morning and goes out at night. Flawless service."</p>
              <div className="rc-author">
                <div className="rc-avatar">L</div>
                <div className="rc-text">
                  <div className="rc-name">Dr. Lisa Wong</div>
                  <div className="rc-meta">Medical Group CEO</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reviews-widget-note">
            // Note: In production, replace this static grid with the official REVIEWS.io dynamic widget snippet.
          </div>
        </div>
      </div>
    </section>
  )
}
