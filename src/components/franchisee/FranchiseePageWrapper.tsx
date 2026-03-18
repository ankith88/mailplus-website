'use client'

import { useEffect, useState } from 'react'
import { FranchiseeModal } from './FranchiseeModal'

export function FranchiseePageWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[href="#franchise-enquire"]')
      if (!target) return
      e.preventDefault()
      setIsOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {children}
      <FranchiseeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
