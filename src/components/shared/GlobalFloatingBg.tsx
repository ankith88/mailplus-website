'use client'

import { useEffect, useRef } from 'react'

/* ─── Primitives ─────────────────────────────────────────────── */

function IsoBox({
  size = 80,
  top, left, right, bottom,
  tint = 'teal',
  delay = '0s',
  duration = '9s',
  className = '',
}: {
  size?: number
  top?: string; left?: string; right?: string; bottom?: string
  tint?: 'teal' | 'yellow'
  delay?: string
  duration?: string
  className?: string
}) {
  const t = tint === 'yellow'
    ? { top: 'rgba(234,240,68,0.13)', left: 'rgba(234,240,68,0.09)', right: 'rgba(234,240,68,0.06)', stroke: 'rgba(200,204,0,0.28)' }
    : { top: 'rgba(9,92,123,0.09)',   left: 'rgba(9,92,123,0.06)',   right: 'rgba(9,92,123,0.04)', stroke: 'rgba(9,92,123,0.20)' }

  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        animation: `float-slow ${duration} ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
      }}
    >
      <polygon points="50,0 100,20 50,40 0,20"  fill={t.top}   stroke={t.stroke} strokeWidth="1.5" />
      <polygon points="0,20 50,40 50,80 0,60"   fill={t.left}  stroke={t.stroke} strokeWidth="1.5" />
      <polygon points="50,40 100,20 100,60 50,80" fill={t.right} stroke={t.stroke} strokeWidth="1.5" />
      <line x1="50" y1="0" x2="50" y2="40" stroke={t.stroke} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
    </svg>
  )
}

function Envelope({
  size = 60,
  top, left, right, bottom,
  tint = 'teal',
  delay = '0s',
  duration = '10s',
  className = '',
}: {
  size?: number
  top?: string; left?: string; right?: string; bottom?: string
  tint?: 'teal' | 'yellow'
  delay?: string
  duration?: string
  className?: string
}) {
  const stroke = tint === 'yellow' ? 'rgba(200,204,0,0.30)' : 'rgba(9,92,123,0.24)'
  const fill   = tint === 'yellow' ? 'rgba(234,240,68,0.08)' : 'rgba(9,92,123,0.05)'
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 80 56"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        animation: `float-slow ${duration} ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
      }}
    >
      <rect x="1" y="1" width="78" height="54" rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <polyline points="1,1 40,32 79,1" stroke={stroke} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function Pin({
  size = 26,
  top, left, right, bottom,
  tint = 'teal',
  pulse = false,
  delay = '0s',
  duration = '9s',
  className = '',
}: {
  size?: number
  top?: string; left?: string; right?: string; bottom?: string
  tint?: 'teal' | 'yellow'
  pulse?: boolean
  delay?: string
  duration?: string
  className?: string
}) {
  const color = tint === 'yellow' ? 'rgba(200,204,0,0.50)' : 'rgba(9,92,123,0.38)'
  return (
    <span
      aria-hidden="true"
      className={`inline-flex relative ${className}`}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        animation: `float-slow ${duration} ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
      }}
    >
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: color, opacity: 0.25, animationDuration: '2.5s' }}
        />
      )}
      <svg width={size} height={size * 1.3} viewBox="0 0 24 32" fill="none">
        <path d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 17 9 17s9-10.25 9-17c0-4.97-4.03-9-9-9z" fill={color} />
        <circle cx="12" cy="9" r="3.5" fill="rgba(255,255,255,0.4)" />
      </svg>
    </span>
  )
}

function Arc({
  width = 220,
  height = 80,
  top, left, right, bottom,
  tint = 'teal',
  className = '',
}: {
  width?: number; height?: number
  top?: string; left?: string; right?: string; bottom?: string
  tint?: 'teal' | 'yellow'
  className?: string
}) {
  const stroke = tint === 'yellow' ? 'rgba(200,204,0,0.28)' : 'rgba(9,92,123,0.18)'
  const dot    = tint === 'yellow' ? 'rgba(234,240,68,0.75)' : 'rgba(9,92,123,0.50)'
  const path   = `M 16 ${height - 8} Q ${width / 2} 8 ${width - 16} ${height - 8}`
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', top, left, right, bottom, pointerEvents: 'none' }}
    >
      <path d={path} stroke={stroke} strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="16"          cy={height - 8} r="3.5" fill={stroke} />
      <circle cx={width - 16}  cy={height - 8} r="3.5" fill={stroke} />
      <circle r="4" fill={dot} stroke={stroke} strokeWidth="1">
        <animateMotion dur={`${3.5 + (width / 100)}s`} repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  )
}

function Dot({
  size = 5,
  top, left, right, bottom,
  tint = 'teal',
  delay = '0s',
  duration = '8s',
  className = '',
}: {
  size?: number
  top?: string; left?: string; right?: string; bottom?: string
  tint?: 'teal' | 'yellow'
  delay?: string
  duration?: string
  className?: string
}) {
  const color = tint === 'yellow' ? 'rgba(200,204,0,0.40)' : 'rgba(9,92,123,0.28)'
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        width: size, height: size,
        borderRadius: '50%',
        backgroundColor: color,
        animation: `float-slow ${duration} ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─── Global background ──────────────────────────────────────── */

export function GlobalFloatingBg() {
  return null
}

