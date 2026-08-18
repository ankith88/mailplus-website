"use client";

import { useEffect } from 'react';

export default function MailplusApiClient() {
  useEffect(() => {
    // Meet MailPlus — read more / less
    const introToggle = document.getElementById('introToggle');
    const introMore = document.getElementById('introMore');
    if (introToggle && introMore) {
      const handleIntro = () => {
        const isOpen = introMore.classList.toggle('open');
        introToggle.classList.toggle('open', isOpen);
        introToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const textEl = introToggle.querySelector('.it-text');
        if (textEl) textEl.textContent = isOpen ? 'Read less' : 'Read more';
        (introMore as HTMLElement).style.maxHeight = isOpen ? introMore.scrollHeight + 'px' : '';
        (introMore as HTMLElement).style.marginTop = isOpen ? '0' : '';
      };
      introToggle.addEventListener('click', handleIntro);
    }

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

    // Count-up animation for hero stats
    function animateCount(el: Element) {
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const dur = 1100, start = performance.now();
      function tick(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.num[data-count]').forEach(animateCount);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) statObserver.observe(heroCard);

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
