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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf: number
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 14
        el.style.transform = `translate(${x}px, ${y}px)`
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Mouse-parallax inner layer */}
      <div
        ref={ref}
        style={{ position: 'absolute', inset: '-3%', transition: 'transform 0.18s ease-out', willChange: 'transform' }}
      >

        {/* ── Top-left cluster ── */}
        <IsoBox size={130} top="6%"  left="1.5%" tint="teal"   delay="0s"   duration="10s" />
        <Envelope size={64} top="20%" left="6%"  tint="teal"   delay="3s"   duration="11s" />
        <Pin      size={26} top="14%" left="18%" tint="teal"   pulse delay="2s" duration="9s" />
        <Dot      size={5}  top="32%" left="10%" tint="teal"   delay="1s"   duration="8s" />

        {/* ── Top-right cluster ── */}
        <IsoBox   size={90}  top="4%"  right="5%"  tint="yellow" delay="1.5s" duration="12s" className="hidden md:block" />
        <Envelope size={50}  top="18%" right="14%" tint="teal"   delay="4s"   duration="9s"  className="hidden md:block" />
        <Pin      size={22}  top="28%" right="8%"  tint="yellow" pulse delay="0.5s" duration="11s" className="hidden md:block" />
        <Dot      size={4}   top="10%" right="22%" tint="yellow" delay="2.5s" duration="10s" className="hidden md:block" />

        {/* ── Mid-left cluster ── */}
        <IsoBox size={70}  top="42%" left="3%"  tint="yellow" delay="2s"   duration="8s" />
        <Arc    width={200} height={70} top="52%" left="8%"  tint="teal"            className="hidden sm:block" />
        <Dot    size={6}   top="58%" left="2%"  tint="teal"   delay="0.5s" duration="9s" />
        <Pin    size={20}  top="65%" left="22%" tint="teal"   delay="3.5s" duration="10s" />

        {/* ── Mid-right cluster ── */}
        <IsoBox   size={110} top="38%" right="2%"  tint="teal"   delay="3s"   duration="11s" className="hidden md:block" />
        <Dot      size={5}   top="48%" right="16%" tint="teal"   delay="1.5s" duration="8s"  className="hidden md:block" />
        <Envelope size={55}  top="56%" right="8%"  tint="yellow" delay="2.5s" duration="10s" className="hidden md:block" />
        <Arc      width={180} height={65} top="44%" right="18%" tint="yellow" className="hidden lg:block" />

        {/* ── Bottom-left cluster ── */}
        <IsoBox size={85}  bottom="8%"  left="5%"  tint="teal"   delay="4s"   duration="9s" />
        <Pin    size={24}  bottom="20%" left="15%" tint="yellow" pulse delay="1s" duration="12s" />
        <Dot    size={4}   bottom="14%" left="28%" tint="yellow" delay="3s"   duration="7s" />

        {/* ── Bottom-right cluster ── */}
        <IsoBox   size={100} bottom="6%"  right="3%"  tint="yellow" delay="0.8s" duration="10s" className="hidden md:block" />
        <Envelope size={60}  bottom="18%" right="12%" tint="teal"   delay="4.5s" duration="11s" className="hidden md:block" />
        <Arc      width={240} height={85} bottom="22%" right="5%"  tint="teal"                   className="hidden lg:block" />
        <Pin      size={20}  bottom="30%" right="24%" tint="teal"   delay="2s"   duration="9s"   className="hidden md:block" />
        <Dot      size={6}   bottom="10%" right="28%" tint="teal"   delay="1s"   duration="8s"   className="hidden md:block" />

        {/* ── Centre scattered ── */}
        <IsoBox size={55}  top="50%" left="44%" tint="teal"   delay="5s"  duration="13s" className="hidden lg:block" />
        <Dot    size={4}   top="35%" left="50%" tint="yellow" delay="2s"  duration="9s"  className="hidden md:block" />
        <Dot    size={3}   top="70%" left="55%" tint="teal"   delay="4s"  duration="11s" className="hidden md:block" />

      </div>
    </div>
  )
}
