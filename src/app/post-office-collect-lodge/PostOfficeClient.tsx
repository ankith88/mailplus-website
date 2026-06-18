"use client";

import { useEffect } from 'react';

export default function PostOfficeClient() {
  useEffect(() => {
    // Google Places Autocomplete
    let placesInterval: ReturnType<typeof setInterval>;
    const initPlaces = () => {
      const addressInput = document.getElementById('f-address') as HTMLInputElement;
      if (!addressInput) return;
      if (window.google && window.google.maps && window.google.maps.places) {
        if (placesInterval) clearInterval(placesInterval);
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
          componentRestrictions: { country: 'au' },
          types: ['address'],
          fields: ['address_components', 'geometry'],
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place || !place.address_components || !place.geometry) return;
          let streetNumber = '';
          let route = '';
          let city = '';
          let state = '';
          let zip = '';
          for (const component of place.address_components) {
            const types = component.types;
            if (types.includes('street_number')) streetNumber = component.long_name;
            if (types.includes('route')) route = component.long_name;
            if (types.includes('locality')) city = component.long_name;
            if (types.includes('administrative_area_level_1')) state = component.long_name;
            if (types.includes('postal_code')) zip = component.long_name;
          }
          const street = [streetNumber, route].filter(Boolean).join(' ');
          addressInput.value = street;
          addressInput.dataset.lat = place.geometry.location?.lat().toString() || '';
          addressInput.dataset.lng = place.geometry.location?.lng().toString() || '';
          addressInput.dataset.city = city;
          addressInput.dataset.state = state;
          addressInput.dataset.zip = zip;
          addressInput.style.borderColor = ''; // clear error state if any
        });
      }
    };
    initPlaces();
    if (!(window.google && window.google.maps && window.google.maps.places)) {
      placesInterval = setInterval(initPlaces, 500);
    }

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
      const targetText = el.getAttribute('data-count') || (el as HTMLElement).innerText;
      const target = parseInt(targetText.replace(/[^0-9]/g, ''), 10) || 0;
      if (target === 0 && !targetText.match(/[0-9]/)) return; // Don't animate non-numbers like 'AM'
      
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
      formBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const required = ['f-fname', 'f-lname', 'f-company', 'f-address', 'f-email', 'f-phone', 'f-interest', 'f-volume'];
        let ok = true;
        required.forEach(id => {
          const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
          if (el) {
            const wrapper = document.getElementById(`wrapper-${id}`);
            const targetEl = wrapper ? (wrapper.querySelector('.custom-select-trigger') as HTMLElement || wrapper) : el;
            if (!el.value.trim()) { targetEl.style.borderColor = '#E5484D'; ok = false; }
            else { targetEl.style.borderColor = ''; }
          }
        });
        if (!ok) return;

        const formInner = document.getElementById('enquiryFormInner');
        const checking = document.getElementById('enquiryChecking');
        if (formInner) formInner.style.display = 'none';
        if (checking) checking.classList.add('show');

        // Dynamic import to avoid SSR issues with utils
        const { submitLead } = await import('@/utils/submitLead');
        const { showLeadModal } = await import('@/utils/LeadModal');

        const addressEl = document.getElementById('f-address') as HTMLInputElement;
        const payload = {
          companyName: (document.getElementById('f-company') as HTMLInputElement).value,
          customerPhone: (document.getElementById('f-phone') as HTMLInputElement).value,
          customerServiceEmail: (document.getElementById('f-email') as HTMLInputElement).value,
          interestedIn: (document.getElementById('f-interest') as HTMLInputElement).value,
          weeklyParcels: (document.getElementById('f-volume') as HTMLInputElement).value,
          bucket: 'inbound',
          address: {
            address1: '',
            street: addressEl.value,
            city: addressEl.dataset.city || '',
            state: addressEl.dataset.state || '',
            zip: addressEl.dataset.zip || '',
            latitude: parseFloat(addressEl.dataset.lat || '0'),
            longitude: parseFloat(addressEl.dataset.lng || '0')
          },
          contacts: [{
            name: `${(document.getElementById('f-fname') as HTMLInputElement).value} ${(document.getElementById('f-lname') as HTMLInputElement).value}`,
            email: (document.getElementById('f-email') as HTMLInputElement).value,
            phone: (document.getElementById('f-phone') as HTMLInputElement).value
          }]
        };

        const result = await submitLead(payload);

        if (checking) checking.classList.remove('show');
        
        if (result.success) {
          showLeadModal(!!result.outOfTerritory, result.accountManagerName, result.accountManagerCalendly);
        } else {
          // If failed, just show a fallback success or error message inline.
          const successMsg = document.getElementById('enquirySuccess');
          if (successMsg) successMsg.classList.add('show');
        }
      });
    }

    return () => {
      if (placesInterval) clearInterval(placesInterval);
    };
  }, []);

  return null;
}
