'use client'

import { useEffect } from 'react'

/**
 * ScrollRevealProvider
 *
 * Auto-applies scroll-reveal animations to every top-level <section> on the
 * page (sections nested inside another section are skipped). The first visible
 * section (hero) is excluded so it doesn't flash.
 *
 * Animation variants are set via data-reveal attributes on the section:
 *   data-reveal="up"    → parcel landing flat (default)
 *   data-reveal="left"  → conveyor from left
 *   data-reveal="right" → conveyor from right
 *   data-reveal="scale" → package arriving/expanding
 *   data-reveal="fade"  → simple fade only
 *
 * Add data-stagger to a container to stagger its direct children on reveal.
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    // Only top-level sections — skip sections nested inside another section
    const topLevelSections = Array.from(document.querySelectorAll('section')).filter(
      el => !el.parentElement?.closest('section')
    )

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -56px 0px' }
    )

    topLevelSections.forEach((el, i) => {
      // Skip the hero (first section) — it's already fully visible
      if (i === 0) return

      // Default variant is "up" if none is specified
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up')
      }

      el.classList.add('scroll-reveal')

      const rect = el.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (alreadyVisible) {
        // Reveal after two frames so the CSS hidden state registers first
        requestAnimationFrame(() => {
          requestAnimationFrame(() => el.classList.add('scroll-revealed'))
        })
      } else {
        observer.observe(el)
      }
    })

    // Also observe any manually marked [data-reveal] elements (non-sections)
    const manualEls = document.querySelectorAll('[data-reveal]:not(section)')
    manualEls.forEach(el => {
      el.classList.add('scroll-reveal')
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => el.classList.add('scroll-revealed'))
        })
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
