"use client";

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!data) return;

    const outOfTerritory = !!data.result.outOfTerritory;
    const { accountManagerCalendly, accountManagerName, internalid, customerEntityId } = data.result;

    if (!outOfTerritory && accountManagerCalendly) {
      // Dynamic import or loading of Calendly script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [data]);

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
        <a href="/" style={{ display: 'inline-block', backgroundColor: '#004751', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          Back to Home
        </a>
      </div>
    );
  }

  const outOfTerritory = !!data.result.outOfTerritory;
  const { accountManagerName, accountManagerCalendly, internalid, customerEntityId } = data.result;
  
  // Extract contact info from payload
  const contact = data.payload.contacts && data.payload.contacts.length > 0 ? data.payload.contacts[0] : null;
  const leadName = contact ? contact.name : '';
  const leadEmail = contact ? contact.email : '';

  let calendlyUrl = accountManagerCalendly || '';
  if (accountManagerCalendly) {
    try {
      const urlObj = new URL(accountManagerCalendly);
      if (leadName) urlObj.searchParams.set('name', leadName);
      if (leadEmail) urlObj.searchParams.set('email', leadEmail);
      if (internalid) urlObj.searchParams.set('a1', internalid);
      if (customerEntityId) urlObj.searchParams.set('a2', customerEntityId);
      urlObj.searchParams.set('a3', 'website');
      
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      urlObj.searchParams.set('month', `${yyyy}-${mm}`);
      
      calendlyUrl = urlObj.toString();
    } catch (e) {
      console.error("Invalid calendly URL", e);
    }
  }

  const amString = accountManagerName ? accountManagerName : 'an Account Manager';

  return (
    <div style={{ minHeight: '90vh', backgroundColor: outOfTerritory ? '#fff' : '#f4f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', fontFamily: 'var(--font-body, sans-serif)' }}>
      {!outOfTerritory ? (
        // In-Territory Page
        <div style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#D5E0D5', // Pale green
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          padding: '40px 40px 60px 40px',
          color: '#004751',
          position: 'relative'
        }}>
          {/* Top Badge: "✓ YOU'RE IN TERRITORY" */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '20px',
            padding: '4px 12px',
            marginBottom: '24px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '1px',
            color: '#2E6E45'
          }}>
            <span style={{
              backgroundColor: '#4A8C5B',
              color: '#fff',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
              fontSize: '10px'
            }}>✓</span>
            YOU&apos;RE IN TERRITORY
          </div>
          
          {/* Heading */}
          <h1 style={{
            margin: '0 0 16px 0',
            fontSize: '46px',
            fontWeight: '700',
            lineHeight: '1.1',
            fontFamily: 'var(--font-display, serif)'
          }}>
            Good news — you&apos;re in our patch.
          </h1>
          
          {/* Text */}
          <p style={{
            fontSize: '18px',
            lineHeight: '1.5',
            margin: '0 0 32px 0',
            opacity: '0.9'
          }}>
            There&apos;s a local MailPlus owner-operator covering your area. <strong>We&apos;ve got your details</strong>, and {amString} will call within one business day — or pick a time that suits you below.
          </p>
          
          {/* Calendly Card */}
          {calendlyUrl && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1px',
                color: '#1A3D33',
                marginBottom: '12px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#4A8C5B',
                  marginRight: '8px'
                }} />
                BOOK A TIME
              </div>
              
              <h2 style={{
                margin: '0 0 12px 0',
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'var(--font-display, serif)',
                color: '#004751'
              }}>
                Pick a time that suits you
              </h2>
              
              <p style={{
                margin: '0 0 24px 0',
                fontSize: '15px',
                lineHeight: '1.5',
                color: '#3F3F46'
              }}>
                <strong>Prefer we just call you?</strong> No need to do anything — {amString} will be in touch within one business day (Mon–Fri 9am–5pm AEST).
              </p>
              
              <div 
                className="calendly-inline-widget" 
                data-url={calendlyUrl} 
                style={{ minWidth: '320px', height: '600px' }} 
              />
            </div>
          )}
        </div>
      ) : (
        // Out of Territory Page
        <div style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          padding: '60px 50px',
          textAlign: 'center',
          color: '#004751'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#D5E0D5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px auto',
            fontSize: '36px'
          }}>
            📍
          </div>
          
          <h1 style={{
            margin: '0 0 24px 0',
            fontSize: '32px',
            fontWeight: '700',
            fontFamily: 'var(--font-display, serif)',
            color: '#004751'
          }}>
            We&apos;re not in your area just yet.
          </h1>
          
          <p style={{
            color: '#386373',
            fontSize: '17px',
            lineHeight: '1.6',
            margin: '0 0 32px 0'
          }}>
            Sorry, but we couldn&apos;t find a local MailPlus driver covering your address right now. You&apos;re welcome to check back any time.
          </p>

          <a href="/" style={{ display: 'inline-block', backgroundColor: '#004751', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
}
