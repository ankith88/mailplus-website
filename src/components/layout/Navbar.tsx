'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

const servicesSubmenu = [
  { href: '/services/post-office-solutions', label: 'Post Office Solutions' },
  { href: '/services/express-delivery', label: 'Express Delivery' },
  { href: '/services/shopify-integration', label: 'Shopify Integration' },
  { href: '/services/mailplus-api', label: 'MailPlus API' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close submenu on outside click
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
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4">
      <div
        className={cn(
          'w-full max-w-5xl rounded-2xl transition-all duration-500',
          scrolled ? 'shadow-xl' : 'shadow-lg'
        )}
        style={{
          backgroundColor: scrolled ? 'rgba(9,48,64,0.98)' : 'rgba(9,48,64,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <nav className="flex items-center justify-between px-5 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-none">
            <span
              className="text-xl font-bold tracking-tight group-hover:opacity-80 transition-opacity duration-200"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span style={{ color: '#ffffff' }}>mail</span>
              <span style={{ color: '#EAF044' }}>plus</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {/* Our Services with submenu */}
            <li ref={servicesRef} className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.85)' }}
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Our Services
                <svg
                  className={cn('w-3.5 h-3.5 transition-transform duration-200', servicesOpen && 'rotate-180')}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  'absolute top-full left-0 mt-2 min-w-[220px] rounded-xl overflow-hidden transition-all duration-200',
                  servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                )}
                style={{
                  backgroundColor: 'rgba(9,48,64,0.98)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                }}
              >
                {servicesSubmenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-150 hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <Link
                href="/tracking"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                Tracking
              </Link>
            </li>
            <li>
              <Link
                href="/shipmate"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                ShipMate
              </Link>
            </li>
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="tel:1300656595"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              <svg className="w-3.5 h-3.5 flex-none" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              1300 65 65 95
            </a>

            <div className="w-px h-5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

            <a
              href="#get-started"
              className="px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: '#EAF044', color: '#103d39' }}
            >
              Start Saving
            </a>

            <a
              href="https://customer.mailplus.com.au/?_ga=2.39213163.939872740.1773781280-647668585.1772665064"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: '#F3C6E2', color: '#103d39' }}
            >
              Login
            </a>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:1300656595"
              className="text-xs font-semibold"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              aria-label="Call 1300 65 65 95"
            >
              1300 65 65 95
            </a>
            <button
              className="w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={cn('block w-5 h-0.5 bg-current rounded-full transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block w-5 h-0.5 bg-current rounded-full transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
              <span className={cn('block w-5 h-0.5 bg-current rounded-full transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={cn('md:hidden overflow-hidden transition-all duration-300', menuOpen ? 'max-h-[480px]' : 'max-h-0')}>
          <div
            className="mx-3 mb-3 rounded-xl p-4 space-y-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            {/* Our Services accordion */}
            <button
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Our Services
              <svg
                className={cn('w-3.5 h-3.5 transition-transform duration-200', mobileServicesOpen && 'rotate-180')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={cn('overflow-hidden transition-all duration-300', mobileServicesOpen ? 'max-h-60' : 'max-h-0')}>
              <div className="pl-3 pt-1 space-y-0.5">
                {servicesSubmenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-white/10"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onClick={() => { setMenuOpen(false); setMobileServicesOpen(false) }}
                  >
                    <span className="w-1 h-1 rounded-full mr-2.5 flex-none" style={{ backgroundColor: '#EAF044' }} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/tracking"
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              onClick={() => setMenuOpen(false)}
            >
              Tracking
            </Link>
            <Link
              href="/shipmate"
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.85)' }}
              onClick={() => setMenuOpen(false)}
            >
              ShipMate
            </Link>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href="#get-started"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-center transition-all duration-200 hover:brightness-105"
                style={{ backgroundColor: '#EAF044', color: '#103d39' }}
                onClick={() => setMenuOpen(false)}
              >
                Start Saving
              </a>
              <a
                href="https://customer.mailplus.com.au/?_ga=2.39213163.939872740.1773781280-647668585.1772665064"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-center transition-all duration-200 hover:brightness-105"
                style={{ backgroundColor: '#F3C6E2', color: '#103d39' }}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
