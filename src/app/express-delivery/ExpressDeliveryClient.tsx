"use client";

import { useEffect } from 'react';

export default function ExpressDeliveryClient() {
  useEffect(() => {
    // Meet MailPlus — read more / less
    const introToggle = document.getElementById('introToggle');
    const introMore = document.getElementById('introMore');
    if (introToggle && introMore) {
      introToggle.addEventListener('click', () => {
        const isOpen = introMore.classList.toggle('open');
        introToggle.classList.toggle('open', isOpen);
        introToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const textEl = introToggle.querySelector('.it-text');
        if (textEl) textEl.textContent = isOpen ? 'Read less' : 'Read more';
        (introMore as HTMLElement).style.maxHeight = isOpen ? introMore.scrollHeight + 'px' : '';
        (introMore as HTMLElement).style.marginTop = isOpen ? '0' : '';
      });
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

    // Form submission
    const formBtn = document.querySelector('.form-submit');
    if (formBtn) {
      formBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const required = ['f-fname', 'f-lname', 'f-company', 'f-address', 'f-email', 'f-phone', 'f-interest', 'f-volume'];
        let ok = true;
        required.forEach(id => {
          const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
          if (el) {
            if (!el.value.trim()) { el.style.borderColor = '#E5484D'; ok = false; }
            else { el.style.borderColor = ''; }
          }
        });
        if (!ok) return;

        const formInner = document.getElementById('enquiryFormInner');
        const checking = document.getElementById('enquiryChecking');
        if (formInner) formInner.style.display = 'none';
        if (checking) checking.classList.add('show');

        setTimeout(() => {
          if (checking) checking.classList.remove('show');
          const success = document.getElementById('enquirySuccess');
          if (success) success.classList.add('show');
        }, 1600);
      });
    }

    return () => {
      document.removeEventListener('click', handleFaqClick);
    };
  }, []);

  return null;
}
