"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { submitLpoOwnerToNetSuite } from '@/lib/netsuite';

export default function LpoOwnerInfoClient() {
  const [formFields, setFormFields] = useState({
    lpoName: '',
    lpoOwnerName: '',
    email: '',
    phone: '',
    address1: '', // Unit Number/Level
    address2: '', // Street No. & Name
    city: '',
    state: '',
    postcode: '',
    notes: '',
    lat: '',
    lng: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteInitialized = useRef(false);

  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return;
    if (!window.google?.maps?.places) return;
    if (!addressInputRef.current) return;
    autocompleteInitialized.current = true;

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      fields: ['geometry', 'address_components', 'formatted_address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location && place.address_components) {
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
          if (types.includes('administrative_area_level_1')) state = component.short_name;
          if (types.includes('postal_code')) zip = component.long_name;
        }

        const street = [streetNumber, route].filter(Boolean).join(' ');
        
        setFormFields((prev) => ({
          ...prev,
          address2: street || place.formatted_address || '',
          city,
          state,
          postcode: zip,
          lat: place.geometry!.location!.lat().toString(),
          lng: place.geometry!.location!.lng().toString(),
        }));

        setFieldErrors((prev) => ({ ...prev, address2: false }));
      }
    });
  }, []);

  useEffect(() => {
    let placesInterval: ReturnType<typeof setInterval>;
    const checkAndInit = () => {
      if (window.google?.maps?.places) {
        initAutocomplete();
        if (placesInterval) clearInterval(placesInterval);
      }
    };
    checkAndInit();
    if (!window.google?.maps?.places) {
      placesInterval = setInterval(checkAndInit, 1000);
    }
    return () => {
      if (placesInterval) clearInterval(placesInterval);
    };
  }, [initAutocomplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormFields((prev) => ({ ...prev, [id]: value }));
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormFields((prev) => ({ ...prev, address2: value }));
    if (fieldErrors.address2) {
      setFieldErrors((prev) => ({ ...prev, address2: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ['lpoName', 'lpoOwnerName', 'email', 'phone', 'address2'];
    let hasError = false;
    const newErrors: Record<string, boolean> = {};

    requiredFields.forEach((field) => {
      const val = formFields[field as keyof typeof formFields];
      if (!val || !val.trim()) {
        newErrors[field] = true;
        hasError = true;
      }
    });

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formFields.email && !emailRegex.test(formFields.email)) {
      newErrors.email = true;
      hasError = true;
    }

    setFieldErrors(newErrors);
    if (hasError) return;

    setSubmitting(true);
    try {
      // 1. Submit to NetSuite
      try {
        await submitLpoOwnerToNetSuite({
          business_name: formFields.lpoName,
          lpo_owner_name: formFields.lpoOwnerName,
          email: formFields.email,
          phone_number: formFields.phone,
          address1: formFields.address1,
          address2: formFields.address2,
          city: formFields.city,
          state: formFields.state,
          postcode: formFields.postcode,
          lat: formFields.lat,
          lng: formFields.lng,
          notes: formFields.notes,
          pageURL: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch (nsErr) {
        console.error('Error submitting form to NetSuite:', nsErr);
      }

      // 2. Submit to prospectplus-application
      try {
        await fetch('/api/lpo-leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lpoName: formFields.lpoName,
            lpoOwnerName: formFields.lpoOwnerName,
            email: formFields.email,
            phone: formFields.phone,
            address1: formFields.address1,
            address2: formFields.address2,
            city: formFields.city,
            state: formFields.state,
            postcode: formFields.postcode,
            lat: formFields.lat,
            lng: formFields.lng,
            notes: formFields.notes,
            pageURL: typeof window !== 'undefined' ? window.location.href : '',
          }),
        });
      } catch (ppErr) {
        console.error('Error submitting form to ProspectPlus:', ppErr);
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/confirmation?type=lpo';
      }, 1000);
    } catch (err) {
      console.error('Unhandled form submission error:', err);
      window.location.href = '/confirmation?type=lpo';
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="lpo-owner-page">
      <div className="lpo-container">
        <h1 className="main-text-form">Express Your Interest</h1>
        
        {/* BLUF Summary Paragraph under 160 chars for AI Overview citation */}
        <p className="lpo-bluf-summary">
          MailPlus is launching a Licensed Post Office (LPO) owner partnership program in 2026 to optimize commercial logistics partnerships across Australia.
        </p>

        <h4 className="sub-text-form">
          We’re launching a new program in 2026. If you’re interested in exploring how a commercial relationship with MailPlus could benefit your operations, express your interest today.
        </h4>

        {/* Indexable LPO Program Highlights list for AI Overview lists extraction */}
        <div className="lpo-program-highlights">
          <h3 className="highlights-title">LPO Program Highlights</h3>
          <ul className="highlights-list">
            <li><strong>Who it is for:</strong> Licensed Post Office (LPO) owners looking to expand logistics operations.</li>
            <li><strong>What is offered:</strong> Dedicated driver collections, same-day dispatch integration, and direct API support.</li>
            <li><strong>Launch year:</strong> 2026 operations window.</li>
            <li><strong>Availability:</strong> All metro and selected regional hubs across Australia.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="lpo-row">
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="lpoName">
                LPO Location/Name<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="lpoName"
                className={`input-field-default ${fieldErrors.lpoName ? 'input-field-error' : ''}`}
                required
                type="text"
                value={formFields.lpoName}
                onChange={handleChange}
              />
            </div>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="lpoOwnerName">
                LPO Owner Name<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="lpoOwnerName"
                className={`input-field-default ${fieldErrors.lpoOwnerName ? 'input-field-error' : ''}`}
                required
                type="text"
                value={formFields.lpoOwnerName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="lpo-row">
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="email">
                Contact Email<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="email"
                className={`input-field-default ${fieldErrors.email ? 'input-field-error' : ''}`}
                required
                type="email"
                value={formFields.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="phone">
                Contact Phone<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="phone"
                className={`input-field-default ${fieldErrors.phone ? 'input-field-error' : ''}`}
                required
                type="text"
                value={formFields.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="lpo-row" style={{ gridTemplateColumns: '3fr 1fr' }}>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="address2">
                Street No. & Name<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="address2"
                ref={addressInputRef}
                className={`input-field-default ${fieldErrors.address2 ? 'input-field-error' : ''}`}
                required
                type="text"
                value={formFields.address2}
                onChange={handleAddressChange}
                placeholder="Start typing your LPO address..."
              />
            </div>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="address1">
                Unit / Level
              </label>
              <input
                id="address1"
                className="input-field-default"
                type="text"
                value={formFields.address1}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="lpo-row" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="city">
                Suburb
              </label>
              <input
                id="city"
                className="input-field-default"
                disabled
                type="text"
                value={formFields.city}
              />
            </div>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="state">
                State
              </label>
              <input
                id="state"
                className="input-field-default"
                disabled
                type="text"
                value={formFields.state}
              />
            </div>
            <div className="form-label-group">
              <label className="input-field-label" htmlFor="postcode">
                Postcode
              </label>
              <input
                id="postcode"
                className="input-field-default"
                disabled
                type="text"
                value={formFields.postcode}
              />
            </div>
          </div>

          <div className="form-label-group">
            <label className="input-field-label" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              className="input-field-default"
              rows={4}
              value={formFields.notes}
              onChange={handleChange}
            />
          </div>

          <p className="lpo-contact-note">
            If you would like to discuss this opportunity now, please contact Kerry O’Neill on{' '}
            <a href="tel:0409244890">0409 244 890</a> or email{' '}
            <a href="mailto:kerry.oneill@mailplus.com.au">kerry.oneill@mailplus.com.au</a>.
          </p>

          <div style={{ marginTop: '24px' }}>
            <button
              className="btn btn-primary get-in-touch-button"
              disabled={submitting || success}
              type="submit"
            >
              {success ? 'Thank You!' : submitting ? 'Please wait...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
