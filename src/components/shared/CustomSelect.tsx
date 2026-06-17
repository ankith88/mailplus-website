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
  triggerClassName?: string;
  required?: boolean;
  dropdownPosition?: 'top' | 'bottom';
}

export function CustomSelect({ id, options, value: propValue, onChange, placeholder = "Please select...", className = '', triggerClassName, required, dropdownPosition = 'bottom' }: CustomSelectProps) {
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
          type="text"
          className="absolute opacity-0 w-0 h-0 pointer-events-none"
          tabIndex={-1}
          id={id} 
          value={value} 
          ref={hiddenInputRef} 
          onChange={() => {}} 
          required={required}
        />
      )}
      <div 
        className={`custom-select-trigger cursor-pointer flex justify-between items-center transition-shadow ${triggerClassName || 'w-full bg-[var(--card)] border rounded-[10px] px-[14px] py-[12px] text-[14px] border-[var(--line)]'} ${isOpen && !triggerClassName ? 'border-[var(--brand)] ring-2 ring-[var(--brand)]/10' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: selectedOption ? 'var(--ink)' : 'var(--muted)' }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className={`absolute left-0 right-0 ${dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full'} pac-container`}>
          {options.map((option, idx) => (
            <div
              key={option.value}
              className={`pac-item ${value === option.value ? 'pac-item-selected' : ''}`}
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
              <span className="pac-item-query">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
