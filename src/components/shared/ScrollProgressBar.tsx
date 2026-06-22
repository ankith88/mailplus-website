'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgressBar() {
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = progressBarRef.current
    if (!el) return

    // Animate scaleX from 0 to 1 based on page scroll
    const anim = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1, // Slight scrub latency makes it feel smooth and premium
        },
      }
    )

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      ref={progressBarRef}
      className="fixed top-0 left-0 w-full h-[4px] z-[9999] origin-left pointer-events-none transform-gpu bg-gradient-to-r from-[#025D7C] via-[#3DA14B] to-[#E3F046]"
      aria-hidden="true"
    />
  )
}
