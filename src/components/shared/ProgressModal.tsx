'use client';

import React, { useEffect, useState } from 'react';

interface ProgressModalProps {
  isOpen: boolean;
}

export function ProgressModal({ isOpen }: ProgressModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const duration = 48000; // 48 seconds to reach 98%

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 98, 98);
      setProgress(Math.round(percentage));
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Copy mapping
  let copy = 'Checking your pickup address...';
  if (progress >= 15 && progress < 35) {
    copy = 'Looking for your local MailPlus driver...';
  } else if (progress >= 35 && progress < 55) {
    copy = 'Found your patch — matching you with your local operator...';
  } else if (progress >= 55 && progress < 75) {
    copy = 'Getting your details ready for the team...';
  } else if (progress >= 75 && progress < 90) {
    copy = 'Setting up your booking link...';
  } else if (progress >= 90 && progress < 98) {
    copy = 'Almost there — hang tight, this bit takes a moment...';
  } else if (progress >= 98) {
    copy = 'All done! Taking you through now...';
  }

  // Smooth copy transition
  const [displayMessage, setDisplayMessage] = useState(copy);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (copy !== displayMessage) {
      setFading(true);
      const timer = setTimeout(() => {
        setDisplayMessage(copy);
        setFading(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [copy, displayMessage]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        padding: '24px',
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '48px 44px 44px',
          boxShadow: '0 24px 60px rgba(20, 41, 59, 0.28)',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
        role="status"
        aria-live="polite"
      >
        {/* Spinner */}
        <div 
          className="animate-spin"
          style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 28px',
            border: '5px solid #eef1f4',
            borderTopColor: '#1f3a52',
            borderRadius: '50%',
          }}
          aria-hidden="true"
        ></div>

        {/* Status Text (No title element) */}
        <p 
          style={{
            margin: '0 auto 32px',
            maxWidth: '320px',
            minHeight: '48px',
            fontSize: '17px',
            lineHeight: 1.5,
            color: '#14293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.35s ease',
            opacity: fading ? 0 : 1,
          }}
        >
          {displayMessage}
        </p>

        {/* Progress Bar Track */}
        <div 
          style={{
            height: '10px',
            width: '100%',
            backgroundColor: '#eef1f4',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          <div
            style={{
              height: '100%',
              width: `${Math.max(progress, 5)}%`,
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #2e5f86, #1f3a52)',
              transition: 'width 0.4s ease',
            }}
          ></div>
        </div>

        {/* Percentage */}
        <div 
          style={{
            marginTop: '18px',
            fontSize: '20px',
            fontWeight: 700,
            color: '#14293b',
            letterSpacing: '0.01em',
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}
