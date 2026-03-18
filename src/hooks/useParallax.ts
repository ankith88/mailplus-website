'use client'

import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', String(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
