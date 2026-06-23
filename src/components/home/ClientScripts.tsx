'use client'

import { useEffect } from 'react'

export function ClientScripts() {
  // 1. RAG Explainer Toggle handled in React (HeroSection.tsx)
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!targets.length) return;

    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('in-view'));
      return;
    }

    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(el => obs.observe(el));
    return () => {
      obs.disconnect();
    }
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCount = (el: Element) => {
      const targetStr = el.getAttribute('data-count') || '0';
      const fromStr = el.getAttribute('data-from') || '0';
      const prefix = el.getAttribute('data-prefix') || '';
      const target = parseInt(targetStr, 10);
      const from = parseInt(fromStr, 10);
      if (isNaN(target)) return;
      if (reduce) {
        el.textContent = `${prefix}${target}`;
        return;
      }

      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        const val = Math.round(from + (target - from) * eased);
        el.textContent = `${prefix}${val}`;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${target}`;
      };
      requestAnimationFrame(tick);
    };

    const banner = document.querySelector('.fact-banner-section');
    if (!banner) return;

    const nums = banner.querySelectorAll('[data-count]');
    const pops = banner.querySelectorAll('[data-pop]');
    const items = Array.from(banner.querySelectorAll('[data-count], [data-pop]'));
    if (!items.length) return;

    // Hold counters at start value
    nums.forEach(el => {
      const from = parseInt(el.getAttribute('data-from') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      if (!reduce) el.textContent = `${prefix}${from}`;
    });
    // Hide pop elements
    if (!reduce) pops.forEach(el => el.classList.add('pop-start'));

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      items.forEach((el, i) => {
        const delay = reduce ? 0 : i * 140; // stagger
        setTimeout(() => {
          if (el.hasAttribute('data-count')) {
            animateCount(el);
          } else {
            el.classList.remove('pop-start');
            el.classList.add('pop-go');
          }
        }, delay);
      });
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(play, 250);
          obs.disconnect();
        }
      });
    }, { threshold: 0.6 });
    obs.observe(banner);

    const onScroll = () => {
      const r = banner.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85) {
        play();
        window.removeEventListener('scroll', onScroll);
        obs.disconnect();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    // 3. Client Form Progress Mock Simulator
    const form = document.getElementById('enquiryForm')
    const checking = document.getElementById('enquiryChecking')
    const success = document.getElementById('enquirySuccess')

    if (form && checking && success) {
      const handleSubmit = (e: Event) => {
        e.preventDefault()
        checking.style.opacity = '1'
        checking.style.pointerEvents = 'auto'
        
        setTimeout(() => {
          checking.style.opacity = '0'
          checking.style.pointerEvents = 'none'
          success.style.opacity = '1'
          success.style.pointerEvents = 'auto'
        }, 1500)
      }
      form.addEventListener('submit', handleSubmit)
      return () => form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  useEffect(() => {
    // 4. FAQ accordion
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

  return null
}
