'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Force immediate scroll to top on page load/change, overriding any CSS scroll-behavior
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (typeof document !== 'undefined') {
      document.documentElement.scrollTo({ top: 0, behavior: 'auto' })
      document.body.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname])

  return null
}
