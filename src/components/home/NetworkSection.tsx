import Image from 'next/image'
import Link from 'next/link'

export function NetworkSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="diff-band reveal">
          <div className="diff-grid">
            <div className="diff-photo">
              {/* Note: Use standard img or next/image as appropriate. Make sure the source exists, using a placeholder or the actual image path */}
              <Image src="/images/mailplus-homepage-alistair.png" alt="MailPlus local driver with van" fill style={{ objectFit: 'cover' }} />
              <div className="photo-tag"><span className="dot"></span> 100% locally owned franchises</div>
            </div>
            
            <div className="diff-content">
              <div className="diff-intro">
                <h2>A network of locals. <br /><span className="hl">Not a faceless corporation.</span></h2>
                <p>MailPlus operates on a franchise model. That means the courier who collects your parcels owns their territory. It&apos;s their business, which means they actually care about yours.</p>
              </div>

              <div className="diff-items reveal-stagger">
                <div className="diff-item">
                  <div className="di-ic">🤝</div>
                  <div className="di-text">
                    <h4>Direct accountability</h4>
                    <p>No call centres. You have the direct mobile number of the operator handling your freight.</p>
                  </div>
                </div>
                
                <div className="diff-item">
                  <div className="di-ic">⏱️</div>
                  <div className="di-text">
                    <h4>Same-day collection guaranteed</h4>
                    <p>We don&apos;t bounce pickups to tomorrow. Your local driver is always in your area.</p>
                  </div>
                </div>
                
                <div className="diff-item">
                  <div className="di-ic">🛡️</div>
                  <div className="di-text">
                    <h4>Secure chain of custody</h4>
                    <p>Your freight goes from your hands, to your local driver, directly into the express network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
