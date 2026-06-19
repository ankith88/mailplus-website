"use client";

import { useEffect } from 'react';

export default function FranchiseeClient() {
  useEffect(() => {
    // Meet MailPlus — read more / less
    const introToggle = document.getElementById('introToggle');
    const introMore = document.getElementById('introMore');
    if (introToggle && introMore) {
      const toggleHandler = () => {
        const isOpen = introMore.classList.toggle('open');
        introToggle.classList.toggle('open', isOpen);
        introToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const textEl = introToggle.querySelector('.it-text');
        if (textEl) textEl.textContent = isOpen ? 'Read less' : 'Read more';
        introMore.style.maxHeight = isOpen ? introMore.scrollHeight + 'px' : '';
        introMore.style.marginTop = isOpen ? '0' : '';
      };
      introToggle.addEventListener('click', toggleHandler);
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-q');
    faqQuestions.forEach(btn => {
      const faqHandler = () => {
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
      btn.addEventListener('click', faqHandler);
    });

    // Franchise listing -> form location wiring
    const select = document.getElementById('f-location') as HTMLSelectElement | null;
    const chip = document.getElementById('selLocChip');
    const chipText = document.getElementById('selLocText');
    const chipClear = document.getElementById('selLocClear');

    function setLocation(loc: string) {
      if (select) {
        let matched = false;
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value === loc) {
            select.value = loc;
            matched = true;
            break;
          }
        }
        if (!matched && loc) {
          const o = document.createElement('option');
          o.value = loc;
          o.textContent = loc;
          select.appendChild(o);
          select.value = loc;
        }
      }
      if (chip && chipText) {
        if (loc) {
          chipText.textContent = 'Enquiring about: ' + loc;
          chip.classList.add('show');
        } else {
          chip.classList.remove('show');
        }
      }
    }

    const ctaBtns = document.querySelectorAll('.fr-card-cta');
    ctaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const loc = btn.getAttribute('data-location') || '';
        setLocation(loc);
      });
    });

    if (select) {
      select.addEventListener('change', () => {
        setLocation(select.value);
      });
    }

    if (chipClear) {
      chipClear.addEventListener('click', () => {
        if (select) select.value = '';
        setLocation('');
      });
    }

    // Franchise enquiry submit
    const formSubmitBtn = document.querySelector('.form-submit');
    if (formSubmitBtn) {
      formSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const required = ['f-fname','f-lname','f-email','f-phone','f-interest','f-vehicle','f-experience'];
        let ok = true;
        required.forEach(id => {
          const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
          if (el) {
            if (!el.value.trim()) {
              el.style.borderColor = '#E5484D';
              ok = false;
            } else {
              el.style.borderColor = '';
            }
          }
        });
        if (!ok) return;

        const formInner = document.getElementById('enquiryFormInner');
        const success = document.getElementById('enquirySuccess');
        if (formInner) formInner.style.display = 'none';
        if (success) success.classList.add('show');
      });
    }

  }, []);

  return null;
}
