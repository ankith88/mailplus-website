'use client'

import { useEffect, useState, useCallback } from 'react'
import { GetStartedForm } from './GetStartedForm'

export function GetStartedModal() {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => {
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
    document.body.style.overflow = ''
    // Clear the hash without scrolling
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    // Open if page loads with #get-started hash
    if (window.location.hash === '#get-started') openModal()

    const onHashChange = () => {
      if (window.location.hash === '#get-started') openModal()
    }
    window.addEventListener('hashchange', onHashChange)

    // Intercept clicks on any [href="#get-started"] element — needed because
    // Next.js <Link> uses history.pushState and does NOT fire hashchange.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[href="#get-started"]')
      if (!target) return
      e.preventDefault()
      openModal()
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick)
    }
  }, [openModal])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  if (!open) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-6"
      style={{ zIndex: 200, backgroundColor: 'rgba(6,48,64,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      {/* Card */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between px-8 pt-8 pb-4"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div>
            <h2
              id="modal-heading"
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: '#095c7b' }}
            >
              Get started,{' '}
              <span
                className="italic"
                style={{
                  textDecoration: 'underline',
                  textDecorationColor: '#EAF044',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '4px',
                }}
              >
                today.
              </span>
            </h2>
            <p className="text-sm mt-2 max-w-md" style={{ color: '#103d39', opacity: 0.75 }}>
              Create a free MailPlus account. No contracts, no minimum volume — a team member
              will reach out to confirm your unique business needs.
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={closeModal}
            aria-label="Close"
            className="flex-none ml-4 mt-1 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: 'rgba(9,92,123,0.1)', color: '#095c7b' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-8 h-px" style={{ backgroundColor: 'rgba(9,92,123,0.1)' }} />

        {/* Form */}
        <div className="px-8 py-6">
          <GetStartedForm onSuccess={closeModal} />
        </div>
      </div>
    </div>
  )
}
