import React from 'react';

export function ReviewsHeaderBanner() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <div style={{
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#025D7C',
        marginBottom: '12px',
        fontFamily: 'var(--font-body)'
      }}>
        WHAT OUR CUSTOMERS SAY
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 4.5vw, 44px)',
        fontWeight: 700,
        color: '#0A3242',
        lineHeight: 1.15,
        margin: '0 0 24px 0',
        letterSpacing: '-0.01em'
      }}>
        Trusted by small businesses across<br />Australia.
      </h2>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: '#FFFFFF',
        borderRadius: '999px',
        padding: '10px 24px',
        boxShadow: '0 2px 8px rgba(10, 50, 66, 0.08)'
      }}>
        <div style={{ display: 'flex', gap: '3px', color: '#FFB800', fontSize: '18px', lineHeight: 1 }} aria-label="5 stars">
          ★★★★★
        </div>
        <div style={{ fontSize: '14px', color: '#5B6E66', fontFamily: 'var(--font-body)' }}>
          <strong style={{ color: '#0A3242', fontWeight: 700 }}>Excellent</strong> · Rated by businesses on Reviews.io
        </div>
      </div>
    </div>
  );
}
export default ReviewsHeaderBanner;
