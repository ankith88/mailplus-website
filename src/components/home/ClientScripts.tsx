'use client'

import { useEffect } from 'react'

export function ClientScripts() {
  useEffect(() => {
    // 1. RAG Explainer Toggle
    const introToggle = document.getElementById('introToggle')
    const introMore = document.getElementById('introMore')
    
    if (introToggle && introMore) {
      const handleToggle = () => {
        const isOpen = introMore.style.maxHeight !== '0px' && introMore.style.maxHeight !== ''
        if (isOpen) {
          introMore.style.maxHeight = '0px'
          introToggle.textContent = 'Read More'
        } else {
          introMore.style.maxHeight = introMore.scrollHeight + 'px'
          introToggle.textContent = 'Read Less'
        }
      }
      introToggle.addEventListener('click', handleToggle)
      // Cleanup
      return () => introToggle.removeEventListener('click', handleToggle)
    }
  }, [])

  useEffect(() => {
    // 2. Asynchronous Easing Metrics Loop
    const animateCount = (el: Element) => {
      const targetStr = el.getAttribute('data-count') || '0'
      const prefix = el.getAttribute('data-prefix') || ''
      const target = parseInt(targetStr, 10)
      if (isNaN(target)) return

      const duration = 1100
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        
        // Cubic ease out
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(easeProgress * target)
        
        el.textContent = `${prefix}${current}`
        
        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          el.textContent = `${prefix}${target}`
        }
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target)
          observer.unobserve(entry.target) // Only animate once
        }
      })
    }, { threshold: 0.5 })

    document.querySelectorAll('.num[data-count]').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // 3. Client Form Progress Mock Simulator
    const form = document.getElementById('enquiryForm')
    const checking = document.getElementById('enquiryChecking')
    const success = document.getElementById('enquirySuccess')

    if (form && checking && success) {
      const handleSubmit = (e: Event) => {
        e.preventDefault()
        checking.style.opacity = '1'
        checking.style.pointerEvents = 'auto'
        
        setTimeout(() => {
          checking.style.opacity = '0'
          checking.style.pointerEvents = 'none'
          success.style.opacity = '1'
          success.style.pointerEvents = 'auto'
        }, 1500)
      }
      form.addEventListener('submit', handleSubmit)
      return () => form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return null
}
