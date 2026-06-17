'use client'

import React, { useState, useRef, useEffect } from 'react'

export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  id?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({ id, options, value: propValue, onChange, placeholder = "Please select...", className = '' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(propValue || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const value = propValue !== undefined ? propValue : internalValue;
  const selectedOption = options.find(o => o.value === value) || (value ? { value, label: value } : null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef} id={id ? `wrapper-${id}` : undefined}>
      {id && (
        <input 
          type="hidden" 
          id={id} 
          value={value} 
          ref={hiddenInputRef} 
          onChange={() => {}} 
        />
      )}
      <div 
        className={`custom-select-trigger w-full bg-[var(--card)] border rounded-[10px] px-[14px] py-[12px] text-[14px] cursor-pointer flex justify-between items-center transition-shadow ${isOpen ? 'border-[var(--brand)] ring-2 ring-[var(--brand)]/10' : 'border-[var(--line)]'}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: selectedOption ? 'var(--ink)' : 'var(--muted)' }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute left-0 right-0 top-[calc(100%+4px)] bg-[var(--card)] border border-[var(--brand)] rounded-[10px] py-1 z-[9999] overflow-hidden"
          style={{ boxShadow: '0 4px 12px rgba(10,50,66,.1)' }}
        >
          {options.map((option, idx) => (
            <div
              key={option.value}
              className={`px-[14px] py-[10px] text-[14px] cursor-pointer transition-colors duration-150 flex items-center ${idx !== 0 ? 'border-t border-[var(--line)]' : ''}`}
              style={{
                color: value === option.value ? 'var(--brand)' : 'var(--ink-2)',
                fontWeight: value === option.value ? '700' : '400',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--info-tint)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => {
                if (propValue === undefined) setInternalValue(option.value);
                if (onChange) onChange(option.value);
                setIsOpen(false);
                // Trigger change event for vanilla JS compatibility
                if (hiddenInputRef.current) {
                  hiddenInputRef.current.value = option.value;
                  const event = new Event('change', { bubbles: true });
                  hiddenInputRef.current.dispatchEvent(event);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
