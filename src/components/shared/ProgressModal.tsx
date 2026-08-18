'use client';

import React, { useEffect, useState } from 'react';

interface ProgressModalProps {
  isOpen: boolean;
  onComplete?: () => void;
}

export function ProgressModal({ isOpen, onComplete }: ProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCompleted(false);
      return;
    }

    const startTime = Date.now();
    const duration = 650; // Fast 650ms animation to reach 100%

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      const rounded = Math.round(pct);
      setProgress(rounded);

      if (rounded >= 100) {
        clearInterval(timer);
        setCompleted(true);
        if (onComplete) {
          setTimeout(onComplete, 180);
        }
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isOpen, onComplete]);

  // Status message for rapid animation
  let copy = 'Confirming your pickup address...';
  if (progress >= 35 && progress < 80) {
    copy = 'Matching with your local MailPlus driver...';
  } else if (progress >= 80) {
    copy = 'All done! Redirecting to confirmation...';
  }

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
        backgroundColor: 'rgba(0, 20, 30, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '24px',
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '36px 32px 32px',
          boxShadow: '0 24px 60px rgba(0, 71, 81, 0.3)',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
        role="status"
        aria-live="polite"
      >
        {/* Icon */}
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          {completed ? (
            <div 
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 'bold',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
              }}
            >
              ✓
            </div>
          ) : (
            <div 
              className="animate-spin"
              style={{
                width: '46px',
                height: '46px',
                border: '4px solid #E2E8F0',
                borderTopColor: '#004751',
                borderRadius: '50%',
              }}
              aria-hidden="true"
            ></div>
          )}
        </div>

        {/* Copy */}
        <p 
          style={{
            margin: '0 auto 20px',
            maxWidth: '300px',
            minHeight: '44px',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.4,
            color: '#004751',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {copy}
        </p>

        {/* Track */}
        <div 
          style={{
            height: '8px',
            width: '100%',
            backgroundColor: '#F1F5F9',
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
              background: completed ? '#10B981' : 'linear-gradient(90deg, #004751, #007A87)',
              transition: 'width 0.08s linear, background-color 0.2s ease',
            }}
          ></div>
        </div>

        {/* Percentage */}
        <div 
          style={{
            marginTop: '12px',
            fontSize: '15px',
            fontWeight: 700,
            color: completed ? '#10B981' : '#004751',
            letterSpacing: '0.02em',
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}

