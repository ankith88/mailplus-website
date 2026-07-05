"use client";

import { useEffect } from 'react';

export default function AboutClient() {
  useEffect(() => {
    // FAQ accordion
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

    // Scroll reveal animation for .reveal / .reveal-stagger elements
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.reveal, .reveal-stagger');
    let revealObserver: IntersectionObserver | null = null;
    if (targets.length) {
      if (reduce || !('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('in-view'));
      } else {
        revealObserver = new IntersectionObserver((entries, o) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              o.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        targets.forEach(el => revealObserver?.observe(el));
      }
    }

    return () => {
      document.removeEventListener('click', handleFaqClick);
      if (revealObserver) {
        revealObserver.disconnect();
      }
    };
  }, []);

  return null;
}


