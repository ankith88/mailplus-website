'use client';

import React from 'react';

interface ProgressModalProps {
  isOpen: boolean;
}

export function ProgressModal({ isOpen }: ProgressModalProps) {
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        padding: '20px',
      }}
      role="status"
      aria-live="polite"
    >
      <style>{`
        @keyframes truckDrive {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            offset-distance: 92%;
            opacity: 0;
          }
        }
        
        /* Fallback animation if offset-path is unsupported */
        @keyframes truckMoveFallback {
          0% {
            transform: translate(0px, 12px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(140px, -6px);
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translate(270px, 6px);
            opacity: 0;
          }
        }

        .truck-animated {
          offset-path: path('M 12 36 Q 160 8 300 28');
          animation: truckDrive 3.5s ease-in-out infinite;
        }

        @supports not (offset-path: path('M 0 0')) {
          .truck-animated {
            animation: truckMoveFallback 3.5s ease-in-out infinite;
          }
        }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'linear-gradient(180deg, #0e4b5a 0%, #093846 50%, #072631 100%)',
          borderRadius: '24px',
          padding: '36px 36px 32px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(14, 75, 90, 0.4)',
          color: '#ffffff',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Header Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#d9e021',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              color: '#d9e021',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ONE MOMENT
          </span>
        </div>

        {/* Title Headline */}
        <h2
          style={{
            fontSize: '26px',
            lineHeight: 1.25,
            fontWeight: 700,
            margin: '0 0 14px 0',
            fontFamily: 'var(--font-serif, Georgia, serif)',
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}
        >
          Almost done — please{' '}
          <span style={{ color: '#d9e021' }}>keep this window open</span>
        </h2>

        {/* Body Description */}
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.55,
            color: '#94a3b8',
            margin: '0 0 24px 0',
            fontWeight: 400,
          }}
        >
          Hang tight until the confirmation screen appears — that&apos;s how you&apos;ll
          know your enquiry has landed safely with your local team. It only takes
          about 30 seconds.
        </p>

        {/* Truck Animation Graphic */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '56px',
            margin: '10px 0 24px',
          }}
        >
          {/* Dashed SVG Path */}
          <svg
            width="100%"
            height="56"
            viewBox="0 0 340 56"
            fill="none"
            style={{ overflow: 'visible' }}
          >
            <path
              d="M 12 36 Q 160 8 300 28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="2"
              strokeDasharray="4 5"
            />
            {/* Target Destination Circle */}
            <circle
              cx="300"
              cy="28"
              r="7"
              fill="#d9e021"
              stroke="#093846"
              strokeWidth="2"
            />
            <circle
              cx="300"
              cy="28"
              r="11"
              fill="none"
              stroke="rgba(217, 224, 33, 0.4)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Animated Truck Icon */}
          <div
            className="truck-animated"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '32px',
              height: '24px',
              marginTop: '-12px',
              marginLeft: '-16px',
              pointerEvents: 'none',
            }}
          >
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Truck Cargo Body */}
              <rect x="2" y="4" width="18" height="13" rx="2" fill="#d9e021" />
              {/* Truck Cabin */}
              <path
                d="M20 8H26C27.1046 8 28 8.89543 28 10V17H20V8Z"
                fill="#d9e021"
              />
              {/* Window */}
              <path d="M21 10H25V13H21V10Z" fill="#072631" />
              {/* Wheels */}
              <circle
                cx="7"
                cy="17"
                r="3"
                fill="#072631"
                stroke="#d9e021"
                strokeWidth="1.5"
              />
              <circle
                cx="23"
                cy="17"
                r="3"
                fill="#072631"
                stroke="#d9e021"
                strokeWidth="1.5"
              />
              {/* Wheel Caps */}
              <circle cx="7" cy="17" r="1" fill="#d9e021" />
              <circle cx="23" cy="17" r="1" fill="#d9e021" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            marginBottom: '20px',
          }}
        />

        {/* UP NEXT Section */}
        <div>
          <div
            style={{
              color: '#d9e021',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            UP NEXT
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* List Item 1 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.5L4.33333 7.5L11 1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '14px',
                  color: '#e2e8f0',
                  fontWeight: 500,
                }}
              >
                Your next steps, matched to your enquiry
              </span>
            </div>

            {/* List Item 2 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.5L4.33333 7.5L11 1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '14px',
                  color: '#e2e8f0',
                  fontWeight: 500,
                }}
              >
                Prefer to chat? Grab a time with your local team (optional)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

