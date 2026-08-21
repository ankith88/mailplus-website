'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LeadPayload, LeadResponse } from '@/utils/submitLead';
import { trackConfirmationPageViewed } from '@/lib/posthog';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const isLpo = searchParams.get('type') === 'lpo';
  const [data, setData] = useState<{ result: LeadResponse; payload: LeadPayload } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLpo) {
      setLoading(false);
      trackConfirmationPageViewed('lpo_owner_info', undefined, { isLpo: true });
      return;
    }
    const serviceParam = searchParams.get('service');
    const outOfTerritoryParam = searchParams.get('outOfTerritory') === 'true';
    if (serviceParam) {
      setData({
        result: { success: true, outOfTerritory: outOfTerritoryParam },
        payload: { interestedIn: serviceParam, sourcePage: 'Preview' } as any
      });
      setLoading(false);
      return;
    }
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
  }, [isLpo, searchParams]);

  useEffect(() => {
    if (!data) return;

    const outOfTerritory = !!data.result.outOfTerritory;
    const interestedIn = data.payload.interestedIn;

    let contentName = 'Corporate / Multi-site';
    let coverageStatus = 'confirmed';

    if (outOfTerritory) {
      contentName = 'Pending coverage check';
      coverageStatus = 'pending_manual_check';
    } else if (interestedIn === '5-free') {
      contentName = '5 Free Collections';
    } else if (interestedIn === 'express') {
      contentName = 'Express & ShipMate';
    } else if (interestedIn === 'not-sure') {
      contentName = 'Not sure / Need both';
    }

    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: contentName,
        content_category: 'enquiry',
        coverage_status: coverageStatus,
      });
    }

    const submitTsStr = sessionStorage.getItem('lead_submit_timestamp');
    let waitTimeMs: number | undefined;
    if (submitTsStr) {
      const submitTs = parseFloat(submitTsStr);
      if (!isNaN(submitTs)) {
        waitTimeMs = performance.now() - submitTs;
      }
    }

    trackConfirmationPageViewed(data.payload.sourcePage || interestedIn, waitTimeMs, {
      interestedIn,
      outOfTerritory,
      contentName,
      coverageStatus,
    });
  }, [data]);


  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body, sans-serif)' }}>
        <p style={{ fontSize: '18px', color: '#004751' }}>Loading confirmation...</p>
      </div>
    );
  }

  if (isLpo) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body, sans-serif)', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#004751', fontFamily: 'var(--font-display, serif)', marginBottom: '16px' }}>Thank you for your enquiry.</h2>
        <p style={{ fontSize: '18px', color: '#386373', maxWidth: '600px', margin: '0 0 32px 0', lineHeight: '1.6' }}>
          You will be sent an email during business hours with prices and an opportunity to book a call or sign up now.
        </p>
        <Link href="/" style={{ display: 'inline-block', backgroundColor: '#004751', color: '#fff', padding: '12px 28px', borderRadius: '30px', textDecoration: 'none', fontWeight: '600', transition: 'background-color 0.2s' }}>
          Back to Home
        </Link>
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

  // 1. OUT OF TERRITORY / MULTIPLE FRANCHISEES PENDING COVERAGE CHECK
  if (outOfTerritory || (interestedIn === '5-free' && !localMilePlusAuthLink)) {
    return (
      <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
        <section className="res-hero" id="main">
          <div className="res-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Enquiry received</span>
            </nav>
            <h1>That&rsquo;s everything we need — <span className="hl">now we&rsquo;re confirming your local driver.</span></h1>
            <p className="res-lead">
              Your address sits right at the edge of a couple of our local runs &mdash; close enough that we&rsquo;d rather check with the drivers than guess. Whichever MailPlus service you&rsquo;re after, <strong>we&rsquo;ll be in touch within one business day</strong> (Mon&ndash;Fri 9am&ndash;5pm AEST) &mdash; usually much sooner.
            </p>
          </div>
        </section>

        <section className="res-body">
          <div className="res-cards">
            <div className="res-card">
              <span className="rc-tag">● WHAT HAPPENS NEXT</span>
              <h2>We&rsquo;re checking with our drivers</h2>
              <p style={{ marginBottom: '20px', lineHeight: '1.6', color: 'var(--ink-2, #386373)' }}>
                Nothing more to do on your end &mdash; here&rsquo;s what happens behind the scenes:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '15px', color: 'var(--ink-2, #386373)', lineHeight: '1.6' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DCEBDB', color: '#095C7B', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>1</span>
                  <div>
                    <strong>We check the runs around you.</strong> Our team looks at the local driver runs near your address to see who&rsquo;s best placed to cover you.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '15px', color: 'var(--ink-2, #386373)', lineHeight: '1.6' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DCEBDB', color: '#095C7B', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>2</span>
                  <div>
                    <strong>We confirm your local driver.</strong> A team member confirms coverage with the drivers nearby &mdash; most checks are sorted the same day.
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '15px', color: 'var(--ink-2, #386373)', lineHeight: '1.6' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DCEBDB', color: '#095C7B', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>3</span>
                  <div>
                    <strong>We come straight back to you.</strong> You&rsquo;ll hear from us within one business day to get you set up &mdash; it may come from an unfamiliar mobile, so keep an eye on your phone.
                  </div>
                </li>
              </ul>
              <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: 'var(--ink-2, #386373)' }}>
                Need us sooner? Call <a href="tel:1300656595" style={{ color: 'var(--brand)', fontWeight: '700', textDecoration: 'none' }}>1300 65 65 95</a>.
              </p>
            </div>
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
            <p className="res-lead">
              Your <strong>LocalMile</strong> activation code is on its way by <strong>SMS and email</strong>. It should land within a minute.
            </p>
          </div>
        </section>

        <section className="res-body">
          <div className="res-cards two">
            <div className="res-card">
              <span className="rc-tag">● FASTEST WAY TO START</span>
              <h2>Claim your five free collections</h2>
              <p style={{ marginBottom: '14px', lineHeight: '1.6' }}>
                Grab the code from the SMS or email, follow the link, enter the code and set a password. About two minutes, and you can book your first pickup straight away.
              </p>
              <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Your parcels are still lodged on your own <strong>Australia Post account &mdash;</strong> same rates, same tracking. MailPlus is a separate business from Australia Post; we&rsquo;re simply the local driver who does the Post Office run for you.
              </p>
              <a href={localMilePlusAuthLink} className="btn btn-cta" style={{ marginTop: '0', marginBottom: '20px', display: 'inline-block' }}>
                Open LocalMile activation &rarr;
              </a>
              <p className="rc-foot" style={{ marginTop: '0', lineHeight: '1.6' }}>
                Haven&rsquo;t got it yet? Check junk,{' '}
                <button 
                  type="button" 
                  onClick={() => {
                    alert('Resend request sent. Please check your email inbox and SMS in a moment.');
                  }}
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'var(--brand)', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
                >
                  resend my code
                </button>
                , or call <a href="tel:1300656595" style={{ color: 'var(--brand)', fontWeight: 600 }}>1300 65 65 95</a>.
              </p>
            </div>

            <div className="res-card">
              <span className="rc-tag">● PREFER TO TALK FIRST</span>
              <h2>Book a call</h2>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                Your Account Manager will call you during business hours (Mon–Fri, 9am–5pm AEST) to confirm pickup details &mdash; so there&rsquo;s nothing you need to do. Want to lock in a time that suits you instead? Pick a slot below.
              </p>
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

        <section className="res-body res-body-tail">
          <div className="res-card res-card-solo" style={{ textAlign: 'left' }}>
            <span className="rc-tag">● KNOW THE DETAILS</span>
            <h2>What&rsquo;s included</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ fontSize: '15px', color: 'var(--ink-2, #386373)', lineHeight: '1.6' }}>
                ✓ Five collections, on us &mdash; no card, no invoice, nothing to cancel
              </li>
              <li style={{ fontSize: '15px', color: 'var(--ink-2, #386373)', lineHeight: '1.6' }}>
                ✓ For businesses already sending on <strong>eParcel or MyPost Business &mdash;</strong> your Australia Post account stays exactly as it is
              </li>
              <li style={{ fontSize: '15px', color: 'var(--ink-2, #386373)', lineHeight: '1.6' }}>
                ✓ After your five, book ad hoc or have your Account Manager set up a regular service. No lock-in either way.
              </li>
            </ul>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/5-free-collections" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '16px', color: 'var(--brand)', textDecoration: 'none' }}>
                Full details on 5 Free Collections &rarr;
              </Link>
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

  // 4. NOT SURE / NEED BOTH CONFIRMATION
  if (interestedIn === 'not-sure') {
    return (
      <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
        <section className="res-hero" id="main">
          <div className="res-hero-inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Enquiry received</span>
            </nav>
            <h1>Thanks — <span className="hl">let&rsquo;s find the right fit together.</span></h1>
            <p className="res-lead">
              We&rsquo;ve got your details. Not sure which service suits, or need a bit of both? That&rsquo;s exactly what a quick call is for &mdash; tell us what you send and we&rsquo;ll recommend the right setup, no obligation. Book a time below, or we&rsquo;ll call you.
            </p>
          </div>
        </section>

        <section className="res-body">
          <div className="res-cards">
            <div className="res-card">
              <span className="rc-tag">● Book a time</span>
              <h2>Pick a time that suits you</h2>
              <p><strong>Prefer we just call you?</strong> No need to do anything &mdash; our team will reach out within one business day (Mon–Fri 9am–5pm AEST).</p>
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
                  <div className="cs-note">We will call you within one business day (Mon–Fri 9am–5pm AEST) to arrange your call.</div>
                </div>
              )}
              <p className="rc-foot">Rather phone us? Call <a href="tel:1300656595">1300 65 65 95</a>.</p>
            </div>
          </div>
        </section>

        <section className="res-body res-body-tail">
          <div className="res-card res-card-solo res-card-wide" style={{ textAlign: 'center' }}>
            <span className="rc-tag">● LEARN MORE</span>
            <h2>The two services, side by side</h2>
            <p style={{ maxWidth: '640px', margin: '12px auto 24px', lineHeight: '1.7', color: 'var(--ink-2, #386373)' }}>
              In short: with <strong>5 Free Collections</strong> your local driver runs your parcels to the Post Office and lodges them on your Australia Post account (your first five runs are free). With <strong>Express Delivery</strong> we deliver door-to-door in 1–2 days Australia-wide. Plenty of businesses end up using both &mdash; your call will sort out what fits.
            </p>
            <div className="rc-btn-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <Link href="/5-free-collections" className="btn btn-outline" style={{ minWidth: '220px', textAlign: 'center' }}>
                5 Free Collections &rarr;
              </Link>
              <Link href="/express-delivery" className="btn btn-outline" style={{ minWidth: '220px', textAlign: 'center' }}>
                Express Delivery &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 5. CORPORATE & MULTISITE CONFIRMATION
  return (
    <div style={{ minHeight: '90vh', background: 'var(--paper)', padding: '0 0 60px 0' }}>
      <section className="res-hero" id="main">
        <div className="res-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Enquiry received</span>
          </nav>
          <h1>Thank you — <span className="hl">let&rsquo;s talk corporate mail.</span></h1>
          <p className="res-lead">We&rsquo;ve got your details. Whether it&rsquo;s clearing PO boxes, lodging corporate mail, or covering multiple sites, our corporate team will scope the right setup with you &mdash; book a time below, or we&rsquo;ll call you.</p>
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

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body, sans-serif)' }}>
        <p style={{ fontSize: '18px', color: '#004751' }}>Loading confirmation...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
