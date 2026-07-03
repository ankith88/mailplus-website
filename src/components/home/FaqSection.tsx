'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  faqs: FAQItem[]
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
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-q" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                <div 
                  className="faq-a" 
                  style={{ 
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <div className="faq-a-inner">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
