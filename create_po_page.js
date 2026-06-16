const fs = require('fs');

const html = fs.readFileSync('./mockups/mailplus-post-office-collect-lodge.html', 'utf8');

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
           .replace(/autocomplete=/g, 'autoComplete=')
           .replace(/onclick="[^"]*"/g, '')
           .replace(/<!--[\s\S]*?-->/g, '') // remove comments
           .replace(/<br>/g, '<br/>')
           .replace(/<hr>/g, '<hr/>')
           .replace(/<img([^>]*[^/])>/g, '<img$1/>')
           .replace(/<input([^>]*[^/])>/g, '<input$1/>')
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

const pageContent = `import type { Metadata } from 'next';
import PostOfficeClient from './PostOfficeClient';
import './styles.css';

export const metadata: Metadata = {
  title: 'Post Office Collect & Lodge | We Run Your Post Office Trips | MailPlus',
  description: 'MailPlus collects and lodges your parcels and mail and clears your business PO Boxes, with same-day collection through a local owner-operator. Skip the Post Office queue — your team never has to leave the office.',
};

export default function PostOfficeCollectLodgePage() {
  return (
    <>
      ${schemas.map((s, i) => `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(${s}) }} />`).join('\n      ')}
      <div className="post-office-page">
        ${body}
      </div>
      <PostOfficeClient />
    </>
  );
}
`;

const clientContent = `"use client";

import { useEffect } from 'react';

export default function PostOfficeClient() {
  useEffect(() => {
    // Intro read more / less
    const introToggle = document.getElementById('introToggle');
    const introMore = document.getElementById('introMore');
    if (introToggle && introMore) {
      introToggle.addEventListener('click', () => {
        const isOpen = introMore.classList.toggle('open');
        introToggle.classList.toggle('open', isOpen);
        introToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const textEl = introToggle.querySelector('.it-text');
        if (textEl) textEl.textContent = isOpen ? 'Read less' : 'Read more';
        introMore.style.maxHeight = isOpen ? introMore.scrollHeight + 'px' : '';
        introMore.style.marginTop = isOpen ? '0' : '';
      });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const answer = item.querySelector('.faq-a');
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
    function animateCount(el) {
      const targetText = el.getAttribute('data-count') || el.innerText;
      const target = parseInt(targetText.replace(/[^0-9]/g, ''), 10) || 0;
      if (target === 0 && !targetText.match(/[0-9]/)) return; // Don't animate non-numbers like 'AM'
      
      const prefix = el.getAttribute('data-prefix') || '';
      const dur = 1100, start = performance.now();
      function tick(now) {
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
          const el = document.getElementById(id);
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

fs.mkdirSync('./src/app/post-office-collect-lodge', { recursive: true });
fs.writeFileSync('./src/app/post-office-collect-lodge/page.tsx', pageContent);
fs.writeFileSync('./src/app/post-office-collect-lodge/PostOfficeClient.tsx', clientContent);
fs.writeFileSync('./src/app/post-office-collect-lodge/styles.css', css);

console.log("Files created successfully.");
