'use client'

import { useEffect, useRef, useState } from 'react'

export function ShipMateClientWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intro band toggle
    const introToggle = document.getElementById('introToggle')
    const introMore = document.getElementById('introMore')
    if (introToggle && introMore) {
      const handleIntroToggle = () => {
        const isOpen = introMore.classList.toggle('open')
        introToggle.classList.toggle('open', isOpen)
        introToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
        const textSpan = introToggle.querySelector('.it-text')
        if (textSpan) textSpan.textContent = isOpen ? 'Read less' : 'Read more'
        introMore.style.maxHeight = isOpen ? introMore.scrollHeight + 'px' : ''
        introMore.style.marginTop = isOpen ? '0' : ''
      }
      introToggle.addEventListener('click', handleIntroToggle)
      return () => introToggle.removeEventListener('click', handleIntroToggle)
    }
  }, [])

  useEffect(() => {
    // FAQ accordion
    const handleFaqClick = (btn: Element) => {
      const item = btn.closest('.faq-item')
      if (!item) return
      const answer = item.querySelector('.faq-a') as HTMLElement
      const isOpen = item.classList.contains('open')
      if (isOpen) {
        item.classList.remove('open')
        if (answer) answer.style.maxHeight = ''
      } else {
        item.classList.add('open')
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px'
      }
    }
    
    const faqButtons = document.querySelectorAll('.faq-q')
    const listeners: { btn: Element, handler: EventListener }[] = []
    
    faqButtons.forEach(btn => {
      const handler = () => handleFaqClick(btn)
      btn.addEventListener('click', handler)
      listeners.push({ btn, handler })
    })

    return () => {
      listeners.forEach(({ btn, handler }) => btn.removeEventListener('click', handler))
    }
  }, [])

  useEffect(() => {
    // Count-up animation for hero stats
    function animateCount(el: Element) {
      const target = parseInt((el as HTMLElement).dataset.count || '0', 10)
      const prefix = (el as HTMLElement).dataset.prefix || ''
      const dur = 1100
      const start = performance.now()
      function tick(now: number) {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = prefix + Math.round(target * eased)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.num[data-count]').forEach(animateCount)
          obs.disconnect()
        }
      })
    }, { threshold: 0.4 })
    const heroCard = document.querySelector('.hero-card')
    if (heroCard) statObserver.observe(heroCard)
    
    return () => statObserver.disconnect()
  }, [])

  useEffect(() => {
    // Enquiry form logic
    const handleEnquirySubmit = () => {
      const required = ['f-fname', 'f-lname', 'f-company', 'f-address', 'f-email', 'f-phone', 'f-interest', 'f-volume']
      let ok = true
      required.forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement
        if (el) {
          if (!el.value.trim()) { 
            el.style.borderColor = '#E5484D'
            ok = false 
          } else { 
            el.style.borderColor = '' 
          }
        }
      })
      if (!ok) return

      const enquiryFormInner = document.getElementById('enquiryFormInner')
      const enquiryChecking = document.getElementById('enquiryChecking')
      const enquirySuccess = document.getElementById('enquirySuccess')

      if (enquiryFormInner) enquiryFormInner.style.display = 'none'
      if (enquiryChecking) enquiryChecking.classList.add('show')

      const NEXT_PAGE_URL = '#' // TODO: point at the "local driver found" page
      setTimeout(() => {
        if (NEXT_PAGE_URL && NEXT_PAGE_URL !== '#') {
          window.location.href = NEXT_PAGE_URL
        } else {
          if (enquiryChecking) enquiryChecking.classList.remove('show')
          if (enquirySuccess) enquirySuccess.classList.add('show')
        }
      }, 1600)
    }

    // Attach to window so onclick works, or attach directly to button
    ;(window as any).submitEnquiry = handleEnquirySubmit

    // Alternatively, attach to button directly to be cleaner
    const submitBtn = document.querySelector('.form-submit')
    if (submitBtn) {
      // Remove onclick attribute and use event listener
      submitBtn.removeAttribute('onclick')
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        handleEnquirySubmit()
      })
    }
    
    return () => {
      if (submitBtn) submitBtn.removeEventListener('click', handleEnquirySubmit)
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
