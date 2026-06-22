'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ParallaxInit() {
  const pathname = usePathname()

  useEffect(() => {
    // Select all elements that want parallax behavior
    const targets = document.querySelectorAll('[data-parallax-speed]')
    const animations: gsap.core.Tween[] = []

    targets.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0')
      if (speed === 0) return

      // Animate the element vertically based on its scroll progress
      // negative speed = moves slower/opposite, positive = moves faster
      const yValue = speed * 150 // Scale offset

      const anim = gsap.fromTo(
        el,
        { y: 0 },
        {
          y: yValue,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
      animations.push(anim)
    })

    // Refresh ScrollTrigger to ensure correct placement computations
    ScrollTrigger.refresh()

    return () => {
      animations.forEach((anim) => anim.kill())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [pathname])

  return null
}
