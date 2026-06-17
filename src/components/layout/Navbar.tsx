'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 920) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="logo">
          <span className="mail">mail</span><span className="plus">plus</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <div 
            className={`nav-dd ${servicesOpen ? 'open' : ''}`} 
            id="servicesDd" 
            ref={servicesRef}
          >
            <button 
              className="nav-link" 
              id="servicesBtn" 
              aria-haspopup="true" 
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <span className="caret">▾</span>
            </button>
            <div className="nav-dd-menu" role="menu" aria-label="Services">
              <Link className="dd-item" href="/express-delivery" role="menuitem" onClick={() => setServicesOpen(false)}>
                <span className="dd-ic">✈️</span>
                <span className="dd-tx">
                  <span className="dd-title">Express Parcel Delivery</span>
                  <span className="dd-sub">1–2 day flat-rate delivery Australia-wide</span>
                </span>
              </Link>
              <Link className="dd-item" href="/post-office-collect-lodge" role="menuitem" onClick={() => setServicesOpen(false)}>
                <span className="dd-ic">📮</span>
                <span className="dd-tx">
                  <span className="dd-title">Post Office Collect &amp; Lodge</span>
                  <span className="dd-sub">We run your Post Office trips for you</span>
                </span>
              </Link>
              <Link className="dd-item" href="/local-delivery" role="menuitem" onClick={() => setServicesOpen(false)}>
                <span className="dd-ic">📍</span>
                <span className="dd-tx">
                  <span className="dd-title">Local Hand-to-Hand Delivery</span>
                  <span className="dd-sub">Same-day, handed straight to the recipient</span>
                </span>
              </Link>
              <Link className="dd-item" href="/shipmate" role="menuitem" onClick={() => setServicesOpen(false)}>
                <span className="dd-ic">📦</span>
                <span className="dd-tx">
                  <span className="dd-title">ShipMate Platform</span>
                  <span className="dd-sub">Free shipping software for your store</span>
                </span>
              </Link>
              <div className="dd-divider"></div>
              <Link className="dd-item" href="/5-free-collections" role="menuitem" onClick={() => setServicesOpen(false)}>
                <span className="dd-ic">💰</span>
                <span className="dd-tx">
                  <span className="dd-title">5 Free Collections</span>
                  <span className="dd-sub">Try MailPlus free — no card, no catch</span>
                </span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="topbar-actions">
          <a href="tel:1300656595" className="strip-phone">
            <span>📞</span>
            <span className="sp-num">1300 65 65 95</span>
          </a>
          <a href="https://shipmate.mailplus.com.au" className="shipmate-login">
            <span>🔑</span><span>ShipMate Login</span>
          </a>
          <Link href="/track" className="track-btn">
            <span>📍</span><span>Track a parcel</span>
          </Link>
        </div>

        <button 
          className="hamburger" 
          id="hamburger" 
          aria-label="Open menu" 
          aria-expanded={menuOpen} 
          aria-controls="mobileNav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* mobile menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} id="mobileNav">
        <div className="mobile-nav-inner">
          <div className="mob-group-label">Services</div>
          <Link className="mob-sub" href="/express-delivery" onClick={() => setMenuOpen(false)}>Express Parcel Delivery</Link>
          <Link className="mob-sub" href="/post-office-collect-lodge" onClick={() => setMenuOpen(false)}>Post Office Collect &amp; Lodge</Link>
          <Link className="mob-sub" href="/local-delivery" onClick={() => setMenuOpen(false)}>Local Hand-to-Hand Delivery</Link>
          <Link className="mob-sub" href="/shipmate" onClick={() => setMenuOpen(false)}>ShipMate Platform</Link>
          <Link className="mob-sub" href="/5-free-collections" onClick={() => setMenuOpen(false)}>5 Free Collections</Link>
          <a href="https://shipmate.mailplus.com.au">🔑 ShipMate Login</a>
          <a href="tel:1300656595">📞 1300 65 65 95</a>
          <Link className="mob-track" href="/track" onClick={() => setMenuOpen(false)}>📍 Track a parcel</Link>
        </div>
      </div>
    </header>
  )
}


