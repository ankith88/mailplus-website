'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface Card3DProps {
  children: ReactNode
  className?: string
  hoverZ?: number
}

export function Card3D({ children, className, hoverZ = 10 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 → +0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5

    // Tilt — max ±12° for a subtle, readable feel
    card.style.setProperty('--rx', `${-y * 12}deg`)
    card.style.setProperty('--ry', `${x  * 12}deg`)
    card.style.setProperty('--tz', `${hoverZ}px`)

    // Shine intensity follows pointer distance from centre
    const dist = Math.sqrt(x * x + y * y)           // 0 → ~0.7
    card.style.setProperty('--shine-opacity', `${dist * 0.7}`)

    // Shadow deepens with tilt — simulates lifting off the surface
    card.style.setProperty('--shadow-y',    `${6  + dist * 22}px`)
    card.style.setProperty('--shadow-blur', `${16 + dist * 36}px`)
    card.style.setProperty('--shadow-a',    `${0.08 + dist * 0.18}`)
  }

  function handlePointerLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx',           '0deg')
    card.style.setProperty('--ry',           '0deg')
    card.style.setProperty('--tz',           '0px')
    card.style.setProperty('--shine-opacity','0')
    card.style.setProperty('--shadow-y',     '6px')
    card.style.setProperty('--shadow-blur',  '16px')
    card.style.setProperty('--shadow-a',     '0.08')
  }

  return (
    <div
      ref={cardRef}
      className={cn('card-3d relative', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="card-3d__shine" aria-hidden="true" />
      {children}
    </div>
  )
}
