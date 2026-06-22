const fs = require('fs');

const html = fs.readFileSync('./mockups/V2-final-express-delivery.html', 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = styleMatch ? styleMatch[1] : '';

// Extract schemas
const schemaMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
const schemas = schemaMatches.map(m => m[1]);

// Extract content between header and footer
let body = html.substring(html.indexOf('<!-- ============= BREADCRUMB ============= -->'), html.indexOf('<footer>'));

// Convert class to className, for to htmlFor, etc.
body = body.replace(/class=/g, 'className=')
           .replace(/for=/g, 'htmlFor=')
           .replace(/<!--[\s\S]*?-->/g, '') // remove comments
           .replace(/<br>/g, '<br/>')
           .replace(/<hr>/g, '<hr/>')
           .replace(/<img([^>]*[^/])>/g, '<img$1/>')
           .replace(/<input([^>]*[^/])>/g, '<input$1/>')
           .replace(/autocomplete="off"/g, 'autoComplete="off"')
           .replace(/onclick="[^"]*"/g, '') // Remove inline onclick
           .replace(/style="([^"]*)"/g, (match, p1) => {
               const rules = p1.split(';').filter(Boolean);
               const styleObj = rules.reduce((acc, rule) => {
                   let [key, val] = rule.split(':');
                   if (!key || !val) return acc;
                   key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                   acc[key] = val.trim();
                   return acc;
               }, {});
               return `style={${JSON.stringify(styleObj)}}`;
           });

// Ensure any missing closing tags in inputs are fixed properly
// It's mostly handled above but some edge cases might be present.

const pageContent = `import type { Metadata } from 'next';
import ExpressDeliveryClient from './ExpressDeliveryClient';
import './styles.css';

export const metadata: Metadata = {
  title: 'Express Parcel Delivery Australia | 1–2 Day Flat-Rate Courier | MailPlus',
  description: 'MailPlus Express delivers parcels in 1–2 business days Australia-wide with flat-rate pricing for items up to 5kg. Same-day pickup through local owner-operators, no lock-in contract, no minimum volume.',
};

export default function ExpressDeliveryPage() {
  return (
    <>
      ${schemas.map((s, i) => `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(${s}) }} />`).join('\n      ')}
      <div className="express-delivery-page">
        ${body}
      </div>
      <ExpressDeliveryClient />
    </>
  );
}
`;

const clientContent = `"use client";

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
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
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
      });
    });

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

  }, []);

  return null;
}
`;

fs.writeFileSync('./src/app/express-delivery/page.tsx', pageContent);
fs.writeFileSync('./src/app/express-delivery/ExpressDeliveryClient.tsx', clientContent);
fs.writeFileSync('./src/app/express-delivery/styles.css', css);

console.log("Files updated successfully.");
