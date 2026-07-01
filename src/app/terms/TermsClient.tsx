"use client";

import { useEffect } from 'react';

export default function TermsClient() {
  useEffect(() => {
    // FAQ accordion handler
    const handleFaqClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.faq-q');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      if (!item) return;
      const answer = item.querySelector('.faq-a') as HTMLElement;
      if (!answer) return;
      
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    };

    document.addEventListener('click', handleFaqClick);

    return () => {
      document.removeEventListener('click', handleFaqClick);
    };
  }, []);

  return null;
}
