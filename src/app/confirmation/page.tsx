'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LeadPayload, LeadResponse } from '@/utils/submitLead';

export default function ConfirmationPage() {
  const [data, setData] = useState<{ result: LeadResponse; payload: LeadPayload } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from sessionStorage
    const stored = sessionStorage.getItem('lead_submission_data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
      } catch (e) {
        console.error("Error parsing stored lead data", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body, sans-serif)' }}>
        <p style={{ fontSize: '18px', color: '#004751' }}>Loading confirmation...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body, sans-serif)', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#004751', fontFamily: 'var(--font-display, serif)', marginBottom: '16px' }}>No submission found</h2>
        <p style={{ fontSize: '18px', color: '#386373', maxWidth: '500px', margin: '0 0 24px 0' }}>
          It looks like you navigated to this page directly or your session has expired.
        </p>
        <Link href="/" style={{ display: 'inline-block', backgroundColor: '#004751', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const outOfTerritory = !!data.result.outOfTerritory;
  const interestedIn = data.payload.interestedIn; // '5-free' | 'express' | 'corporate'
  const { bookingUrlId, localMilePlusAuthLink } = data.result;

  const iframeUrl = bookingUrlId ? `https://prospectplus.com.au/book/${bookingUrlId}?embed=true` : '';
  const localMileLink = localMilePlusAuthLink || 'https://localmile.plus/register';

  // 1. OUT OF TERRITORY PAGE (Pending/Edge-of-run/Out-of-territory manual confirmation)
  if (outOfTerritory) {
    return (
      <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
        <section className="res-hero" id="main">
          <div className="res-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Enquiry received</span>
            </nav>
            <h1>Thank you — <span className="hl">we&rsquo;re confirming who covers you.</span></h1>
            <p className="res-lead">
              Your address sits right on the edge of a local driver&rsquo;s run, so we&rsquo;re checking with the drivers nearby to confirm your coverage. <strong>We&rsquo;ll be in touch within one business day</strong> (Mon&ndash;Fri 9am&ndash;5pm AEST) — usually sooner.
            </p>
          </div>
        </section>

        <section className="res-body">
          <div className="res-cards">
            <div className="res-card">
              <span className="rc-tag">● What happens next</span>
              <h2>We&rsquo;re checking with our drivers</h2>
              <p>Nothing more to do on your end — here&rsquo;s what happens behind the scenes:</p>
              <ol className="next-steps" style={{ marginTop: '16px', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>We check the runs around you.</strong> Our team looks at the local driver runs near your address to see who&rsquo;s best placed to cover you.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>We confirm your local driver.</strong> A team member confirms coverage with the drivers nearby — most checks are sorted the same day.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>We come straight back to you.</strong> You&rsquo;ll hear from us within one business day to get you set up.
                </li>
              </ol>
              <p className="rc-foot" style={{ marginTop: '24px' }}>
                Need us sooner? Call <a href="tel:1300656595" style={{ fontWeight: '600', color: 'var(--brand)' }}>1300 65 65 95</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="res-body res-body-tail">
          <div className="res-card res-card-solo">
            <span className="rc-tag">● Learn more</span>
            <h2>While you wait</h2>
            <p>Meet the network of local owner-drivers who&rsquo;ll be looking after your parcels.</p>
            <Link href="/about" className="btn btn-outline" style={{ marginTop: '16px', display: 'inline-block' }}>
              About MailPlus &rarr;
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // 2. 5 FREE COLLECTIONS CONFIRMATION
  if (interestedIn === '5-free') {
    return (
      <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
        <section className="res-hero" id="main">
          <div className="res-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Enquiry received</span>
            </nav>
            <h1>You&rsquo;re all set — <span className="hl">let&rsquo;s get started.</span></h1>
            <p className="res-lead">Thanks — we&rsquo;ve got your details, and your <strong>five free collections</strong> are ready to go. Just choose how you&rsquo;d like to start below.</p>
          </div>
        </section>

        <section className="res-body">
          <div className="res-cards two">
            <div className="res-card">
              <span className="rc-tag">● Fastest way to start</span>
              <h2>Register on LocalMile</h2>
              <p>Set up your free LocalMile account and book your first of five pickups straight away — your local driver comes to you.</p>
              <a href={localMileLink} className="btn btn-cta">Register now on LocalMile &rarr;</a>
              <p className="rc-foot">Takes about 2 minutes. No card required.</p>
              <div className="rc-divider"></div>
              <span className="rc-tag">● Know the details</span>
              <h2>Not sure how it works yet?</h2>
              <p>If you jumped straight to the free offer, it&rsquo;s worth a quick read first — see exactly what&rsquo;s included in your five free collections, with no card and no catch, so you know what to expect.</p>
              <Link href="/5-free-collections" className="btn btn-outline">Read more on 5 Free Collections &rarr;</Link>
            </div>
            
            <div className="res-card">
              <span className="rc-tag">● Prefer to talk first</span>
              <h2>Book a call</h2>
              <p>Want to talk it through before you start? Grab a time with your Account Manager.</p>
              {iframeUrl ? (
                <iframe 
                  src={iframeUrl}
                  style={{
                    width: '100%',
                    height: '520px',
                    border: 'none',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    marginTop: '16px'
                  }}
                  title="Schedule Discussion"
                />
              ) : (
                <div className="cal-host">
                  <div className="cs-ic">📅</div>
                  <div className="cs-label">No appointment link available</div>
                  <div className="cs-note">We will call you within one business day (Mon–Fri 9am–5pm AEST) to arrange your trial.</div>
                </div>
              )}
              <p className="rc-foot">Rather phone us? Call <a href="tel:1300656595">1300 65 65 95</a>, Mon–Fri 9am–5pm AEST.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 3. EXPRESS DELIVERY & SHIPMATE CONFIRMATION
  if (interestedIn === 'express') {
    return (
      <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
        <section className="res-hero" id="main">
          <div className="res-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Enquiry received</span>
            </nav>
            <h1>Thanks — <span className="hl">let&rsquo;s get you moving.</span></h1>
            <p className="res-lead">We&rsquo;ve got your details. Express delivery runs through <strong>ShipMate</strong>, our free booking platform — an Account Manager will be in touch soon, or grab a time that suits you below.</p>
          </div>
        </section>

        <section className="res-body">
          <div className="res-cards">
            <div className="res-card">
              <span className="rc-tag">● Book a time</span>
              <h2>Pick a time that suits you</h2>
              <p><strong>Prefer we just call you?</strong> No need to do anything — an Account Manager will be in touch within one business day (Mon–Fri 9am–5pm AEST).</p>
              {iframeUrl ? (
                <iframe 
                  src={iframeUrl}
                  style={{
                    width: '100%',
                    height: '520px',
                    border: 'none',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    marginTop: '16px'
                  }}
                  title="Schedule Discussion"
                />
              ) : (
                <div className="cal-host">
                  <div className="cs-ic">📅</div>
                  <div className="cs-label">No appointment link available</div>
                  <div className="cs-note">We will call you within one business day (Mon–Fri 9am–5pm AEST) to arrange your demo.</div>
                </div>
              )}
              <p className="rc-foot">Rather phone us? Call <a href="tel:1300656595">1300 65 65 95</a>.</p>
            </div>
          </div>
        </section>

        <section className="res-body res-body-tail">
          <div className="res-card res-card-solo res-card-wide">
            <span className="rc-tag">● Learn more</span>
            <h2>Read up while you wait</h2>
            <p>See how Express Delivery and ShipMate work.</p>
            <div className="rc-btn-row">
              <Link href="/express-delivery" className="btn btn-outline">Express Delivery &rarr;</Link>
              <Link href="/shipmate-platform" className="btn btn-outline">ShipMate &rarr;</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 4. CORPORATE & MULTISITE CONFIRMATION
  return (
    <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
      <section className="res-hero" id="main">
        <div className="res-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Enquiry received</span>
          </nav>
          <h1>Thank you — <span className="hl">let&rsquo;s chat about your corporate courier needs.</span></h1>
          <p className="res-lead">We&rsquo;ve got your details for corporate and/or multi-site solutions. One of our team will be in touch soon to scope the right setup — or book a time below.</p>
        </div>
      </section>

      <section className="res-body">
        <div className="res-cards">
          <div className="res-card">
            <span className="rc-tag">● Book a time</span>
            <h2>Pick a time that suits you</h2>
            <p><strong>Prefer we just call you?</strong> No need to do anything — our team will reach out within one business day (Mon–Fri 9am–5pm AEST).</p>
            {iframeUrl ? (
              <iframe 
                src={iframeUrl}
                style={{
                  width: '100%',
                  height: '520px',
                  border: 'none',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  marginTop: '16px'
                }}
                title="Schedule Discussion"
              />
            ) : (
              <div className="cal-host">
                <div className="cs-ic">📅</div>
                <div className="cs-label">No appointment link available</div>
                <div className="cs-note">We will call you within one business day (Mon–Fri 9am–5pm AEST) to arrange your custom solution.</div>
              </div>
            )}
            <p className="rc-foot">Rather phone us? Call <a href="tel:1300656595">1300 65 65 95</a>.</p>
          </div>
        </div>
      </section>

      <section className="res-body res-body-tail">
        <div className="res-card res-card-solo">
          <span className="rc-tag">● Learn more</span>
          <h2>While you wait</h2>
          <p>See how we take the regular Post Office run off your team&rsquo;s hands.</p>
          <Link href="/post-office-collect-lodge" className="btn btn-outline">Post Office Collect &amp; Lodge &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
