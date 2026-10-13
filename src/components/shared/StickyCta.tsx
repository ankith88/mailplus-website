'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Returns the button text according to current pathname:
 * - /5-free-collections: "Claim 5 free collections →"
 * - /become-a-franchisee: "Enquire about a franchise →"
 * - everywhere else: "Check my area →"
 */
export function getCtaButtonText(pathname: string): string {
  const cleanPath = pathname.replace(/\/$/, '') || '/'
  if (cleanPath === '/5-free-collections') {
    return 'Claim 5 free collections →'
  }
  if (cleanPath === '/become-a-franchisee') {
    return 'Enquire about a franchise →'
  }
  return 'Check my area →'
}

/**
 * Smooth-scrolls to #enquire with a 72px offset for the sticky top bar,
 * sets #enquire in the URL, and focuses #f-address once the scroll settles.
 */
export function scrollToEnquire() {
  const target = document.getElementById('enquire')
  if (!target) return

  const elementPosition = target.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - 72

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })

  // Set #enquire in the URL
  if (window.location.hash !== '#enquire') {
    window.history.pushState(null, '', '#enquire')
  }

  // Focus #f-address once the scroll settles
  const focusAddressInput = () => {
    const addressInput = document.getElementById('f-address') as HTMLInputElement | null
    if (addressInput) {
      addressInput.focus({ preventScroll: true })
    } else {
      const fallback = target.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        'input[type="text"], input[type="search"], input:not([type="hidden"]), textarea'
      )
      fallback?.focus({ preventScroll: true })
    }
  }

  let settled = false
  const handleSettled = () => {
    if (settled) return
    settled = true
    window.removeEventListener('scrollend', onScrollEnd)
    clearTimeout(safetyTimer)
    focusAddressInput()
  }

  const onScrollEnd = () => handleSettled()
  window.addEventListener('scrollend', onScrollEnd, { once: true })
  const safetyTimer = setTimeout(handleSettled, 800)
}

/**
 * Hook to detect whether the current page contains an #enquire element.
 */
export function useHasEnquire(): boolean {
  const pathname = usePathname()
  const [hasEnquire, setHasEnquire] = useState(() => {
    if (typeof document !== 'undefined') {
      return !!document.getElementById('enquire')
    }
    return false
  })

  useEffect(() => {
    const check = () => {
      setHasEnquire(!!document.getElementById('enquire'))
    }

    check()

    const observer = new MutationObserver(check)
    observer.observe(document.body, { childList: true, subtree: true })

    const raf = requestAnimationFrame(check)
    const timer1 = setTimeout(check, 50)
    const timer2 = setTimeout(check, 200)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname])

  return hasEnquire
}

export function StickyCta() {
  const pathname = usePathname()
  const hasEnquire = useHasEnquire()
  const [visible, setVisible] = useState(false)

  const checkConditions = useCallback(() => {
    // Only applies on mobile (920px and under)
    if (window.innerWidth > 920) {
      setVisible(false)
      return
    }

    const enquireEl = document.getElementById('enquire')
    if (!enquireEl) {
      setVisible(false)
      return
    }

    // Condition 1: The hero CTA (first a.btn in the first section) has scrolled above the viewport.
    // On pages without a hero button, after 60% of a screen height.
    let heroPassed = false
    const heroBtn = document.querySelector<HTMLElement>(
      '.hero a.btn, .hero a[class*="btn"], section:first-of-type a.btn, section a.btn'
    )
    if (heroBtn) {
      const rect = heroBtn.getBoundingClientRect()
      heroPassed = rect.bottom <= 0
    } else {
      heroPassed = window.scrollY > window.innerHeight * 0.6
    }

    if (!heroPassed) {
      setVisible(false)
      return
    }

    // Condition 2: Less than 160px of the #enquire section is on screen.
    const eqRect = enquireEl.getBoundingClientRect()
    const vTop = Math.max(0, eqRect.top)
    const vBottom = Math.min(window.innerHeight, eqRect.bottom)
    const visibleHeight = Math.max(0, vBottom - vTop)

    if (visibleHeight >= 160) {
      setVisible(false)
      return
    }

    // Condition 3: No input, select or textarea has focus (keyboard is down).
    const activeEl = document.activeElement
    if (activeEl) {
      const tag = activeEl.tagName.toUpperCase()
      if (
        tag === 'INPUT' ||
        tag === 'SELECT' ||
        tag === 'TEXTAREA' ||
        activeEl.getAttribute('contenteditable') === 'true'
      ) {
        setVisible(false)
        return
      }
    }

    // Condition 4: The mobile menu is closed (#hamburger[aria-expanded="true"] hides it).
    const hamburger = document.getElementById('hamburger')
    if (hamburger && hamburger.getAttribute('aria-expanded') === 'true') {
      setVisible(false)
      return
    }
    const mobileNav = document.getElementById('mobileNav')
    if (mobileNav && mobileNav.classList.contains('open')) {
      setVisible(false)
      return
    }

    // Condition 5: The out-of-area modal (.mp-modal-overlay) is not showing.
    const modalOpen = !!document.querySelector('.mp-modal-overlay.open')
    if (modalOpen) {
      setVisible(false)
      return
    }

    // All 5 conditions are satisfied!
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!hasEnquire) {
      setVisible(false)
      return
    }

    checkConditions()

    let ticking = false
    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkConditions()
          ticking = false
        })
        ticking = true
      }
    }

    const onFocusIn = () => {
      checkConditions()
    }

    const onFocusOut = () => {
      setTimeout(checkConditions, 50)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    document.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('touchmove', onScrollOrResize, { passive: true })
    window.addEventListener('touchend', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusOut)

    // Watch for class, style, aria-expanded changes on hamburger and modal
    const observer = new MutationObserver(() => {
      checkConditions()
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-expanded'],
    })

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      document.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('touchmove', onScrollOrResize)
      window.removeEventListener('touchend', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusOut)
      observer.disconnect()
    }
  }, [hasEnquire, checkConditions])

  // Manage body class for bottom padding and back to top button lifting
  useEffect(() => {
    if (visible) {
      document.body.classList.add('has-sticky-cta')
    } else {
      document.body.classList.remove('has-sticky-cta')
    }
    return () => {
      document.body.classList.remove('has-sticky-cta')
    }
  }, [visible])

  // The CTA is rendered only when the page has an #enquire element
  if (!hasEnquire) {
    return null
  }

  const ctaText = getCtaButtonText(pathname)

  return (
    <div
      className={`sticky-cta ${visible ? 'showing' : ''}`}
      aria-hidden={!visible}
    >
      <div className="sticky-cta-inner">
        <button
          type="button"
          className="sticky-cta-btn"
          onClick={scrollToEnquire}
          tabIndex={visible ? 0 : -1}
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
}
