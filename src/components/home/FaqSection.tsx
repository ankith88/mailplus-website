'use client'

import { useState, useRef, useEffect } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  faqs: FAQItem[]
}

function FaqItemRow({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('0px')

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current?.scrollHeight || 0}px`)
    } else {
      setHeight('0px')
    }
  }, [isOpen])

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button 
        className="faq-q" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <span className="faq-toggle">+</span>
      </button>
      <div 
        className="faq-a"
        ref={contentRef}
        style={{ 
          maxHeight: height,
          transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="faq-a-inner">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="section faq-section" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="section-eyebrow">Frequently asked questions</div>
          <h2>Quick answers about MailPlus.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <FaqItemRow
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onToggle={() => toggleFaq(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
