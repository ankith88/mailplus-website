import Image from 'next/image'
import Link from 'next/link'

export function NetworkSection() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="diff-band reveal">
          <div className="diff-grid">
            <div className="diff-photo">
              <Image 
                src="/images/mailplus-homepage-alistair-v7.webp" 
                alt="A local MailPlus owner-operator standing in a Melbourne laneway in branded uniform" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
              <span className="photo-tag"><span className="dot"></span> Your local MailPlus owner-operator</span>
            </div>
            <div className="diff-content">
              <div className="diff-intro">
                <h2>One person who <span className="hl">knows your business</span> — not a call centre.</h2>
                <p>With MailPlus you get a local owner-operator who turns up, knows your name, and gets it done — backed by an Aussie support team that actually answers. No depots, no hold music, no bots. It's how we've looked after Australian businesses for almost 30 years.</p>
                <Link href="#" className="diff-compare-link">See how MailPlus compares <span aria-hidden="true">&rarr;</span></Link>
              </div>
              <div className="diff-items reveal-stagger">
                <div className="diff-item">
                  <div className="di-ic">🤝</div>
                  <div>
                    <h4>The same driver, every time</h4>
                    <p>Your courier is a local owner-operator who services your suburb and knows how your business runs — not a different stranger from a national depot each week.</p>
                  </div>
                </div>
                <div className="diff-item">
                  <div className="di-ic">🇦🇺</div>
                  <div>
                    <h4>A real person answers</h4>
                    <p>When you need a hand, you reach a local Aussie support team that responds fast — no long hold times, no bots, no being bounced around.</p>
                  </div>
                </div>
                <div className="diff-item">
                  <div className="di-ic">⚡</div>
                  <div>
                    <h4>Picked up the same day</h4>
                    <p>Your local owner-operator collects same-day, at one flat rate up to 5kg, with delivery anywhere in Australia in 1–2 days. Less waiting, more shipping.</p>
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
