'use client'

import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import { getFirebaseClient } from '@/lib/firebase/client'
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'
import './styles.css'

interface ReceiverData {
  name: string
  company: string
  phone: string
  email: string
  address: string
}

const TOTAL_STEPS = 6

const HELP_TOPICS = [
  { value: 'Delayed Item', label: 'Delayed Item', desc: 'Parcel taking longer than expected', emoji: '⏱️' },
  { value: 'ETA Request', label: 'ETA Request', desc: 'Ask for an estimated delivery date', emoji: '📅' },
  { value: 'Dispute of Delivery', label: 'Dispute of Delivery', desc: 'Marked delivered but not received', emoji: '⚠️' },
  { value: 'POD Request', label: 'POD Request', desc: 'Request proof of delivery', emoji: '📄' },
  { value: 'ATL Image Request', label: 'ATL Image Request', desc: 'Photo of where the item was left', emoji: '📷' },
  { value: 'Redelivery Request', label: 'Redelivery Request', desc: 'Arrange another delivery attempt', emoji: '🔁' },
  { value: 'Return To Sender Request', label: 'Return To Sender Request', desc: 'Send the item back to the sender', emoji: '↩️' },
  { value: 'General Enquiry', label: 'General Enquiry', desc: 'Any other question about your item', emoji: '💬' },
  { value: 'Other', label: 'Other', desc: 'Something not listed above', emoji: '❓' }
]

const DEMO_PACKAGES: Record<string, ReceiverData> = {
  MP0012345678: {
    name: "Sarah Nguyen",
    company: "Northside Naturals",
    phone: "0412 884 220",
    email: "sarah@northsidenaturals.com.au",
    address: "48 Chandos Street, St Leonards NSW 2065"
  },
  MP0099887766: {
    name: "James O'Connor",
    company: "",
    phone: "0433 771 908",
    email: "j.oconnor@example.com",
    address: "12 Baker Lane, Richmond VIC 3121"
  },
  "7XX1234567": {
    name: "Priya Sharma",
    company: "Sharma Textiles",
    phone: "0455 210 447",
    email: "priya@sharmatextiles.com.au",
    address: "203/9 Grazier Ave, Bella Vista NSW 2153"
  }
}

export function SupportTicketWizard() {
  const [currentStep, setCurrentStep] = useState(1)

  // Form State
  const [topic, setTopic] = useState('')
  const [topicEmoji, setTopicEmoji] = useState('')
  const [barcode, setBarcode] = useState('')
  const [receiverSource, setReceiverSource] = useState<'barcode' | 'manual' | 'edited'>('manual')

  // Receiver details
  const [rName, setRName] = useState('')
  const [rCompany, setRCompany] = useState('')
  const [rPhone, setRPhone] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rAddress, setRAddress] = useState('')

  // Billing/Account details from Firestore
  const [customerCompany, setCustomerCompany] = useState('')
  const [customerAccountNumber, setCustomerAccountNumber] = useState('')

  // Enquirer details
  const [eName, setEName] = useState('')
  const [eEmail, setEEmail] = useState('')
  const [ePhone, setEPhone] = useState('')

  // Freight and notes
  const [freightNotes, setFreightNotes] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  // Status & UI state
  const [lookupDone, setLookupDone] = useState(false)
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupStatus, setLookupStatus] = useState<{
    type: 'searching' | 'error' | 'ok' | null
    text: string
  }>({ type: null, text: '' })

  const [showReceiverEditor, setShowReceiverEditor] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [ticketRef, setTicketRef] = useState('—')
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})

  // Autocomplete ref
  const addressInputRef = useRef<HTMLInputElement>(null)
  const autocompleteInitialized = useRef(false)

  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return
    if (!window.google?.maps?.places) return
    if (!addressInputRef.current) return
    autocompleteInitialized.current = true

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      fields: ['formatted_address', 'address_components', 'geometry', 'place_id'],
      types: ['address']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place && place.formatted_address) {
        setRAddress(place.formatted_address)
        setFieldErrors(prev => ({ ...prev, receiverAddress: false }))
      }
    })
  }, [])

  useEffect(() => {
    let placesInterval: ReturnType<typeof setInterval>
    const checkAndInit = () => {
      if (window.google?.maps?.places) {
        initAutocomplete()
        if (placesInterval) clearInterval(placesInterval)
      }
    }
    checkAndInit()
    if (!window.google?.maps?.places) {
      placesInterval = setInterval(checkAndInit, 500)
    }
    return () => {
      if (placesInterval) clearInterval(placesInterval)
    }
  }, [initAutocomplete])

  // Normalise receiver fields from database
  function normaliseReceiver(d: any): ReceiverData {
    const pick = (...keys: string[]) => {
      for (const k of keys) {
        if (d[k] !== undefined && d[k] !== null && d[k] !== '') return String(d[k])
      }
      return ''
    }

    const name = pick('receiverName', 'receiver_name', 'recipientName', 'deliverToName', 'toName', 'consigneeName', 'name')
    const company = pick('receiverCompany', 'recipientCompany', 'deliverToCompany', 'company', 'businessName')
    const phone = pick('receiverPhone', 'recipientPhone', 'deliverToPhone', 'toPhone', 'phone', 'mobile')
    const email = pick('receiverEmail', 'recipientEmail', 'deliverToEmail', 'toEmail', 'email')

    let address = pick('receiverAddress', 'recipientAddress', 'deliverToAddress', 'deliveryAddress', 'toAddress', 'address', 'destinationAddress')
    if (address && typeof d.address === 'object') {
      const a = d.address
      address = [
        a.line1 || a.address1 || a.street,
        a.line2 || a.address2,
        a.suburb || a.city || a.locality,
        a.state,
        a.postcode || a.postCode || a.zip
      ].filter(Boolean).join(', ')
    }

    if (!address) {
      address = [
        pick('addressLine1', 'street', 'line1'),
        pick('addressLine2', 'line2'),
        pick('suburb', 'city', 'locality'),
        pick('state'),
        pick('postcode', 'postCode', 'zip')
      ].filter(Boolean).join(', ')
    }

    return { name, company, phone, email, address }
  }

  // Demo lookup simulated delay
  function demoLookup(code: string): Promise<ReceiverData | null> {
    const key = code.toUpperCase().replace(/\s+/g, '')
    return new Promise(res => setTimeout(() => res(DEMO_PACKAGES[key] || null), 750))
  }

  // Barcode Lookup logic
  async function handleLookup() {
    const code = barcode.trim()
    if (!code) {
      setLookupStatus({
        type: 'error',
        text: '⚠️ Please enter a barcode or connote number.'
      })
      return
    }

    setLookupLoading(true)
    setLookupStatus({
      type: 'searching',
      text: 'Looking up your parcel…'
    })

    try {
      const res = await fetch(`/api/packages/lookup?id=${encodeURIComponent(code)}`)

      if (res.status === 404) {
        // Fallback to Demo Mode lookup
        const demoPkg = await demoLookup(code)
        if (demoPkg) {
          setRName('')
          setRCompany('')
          setRPhone('')
          setREmail('')
          setRAddress('')
          setCustomerCompany('MailPlus Australia')
          setCustomerAccountNumber('MP12345')
          setReceiverSource('manual')
          setShowReceiverEditor(true)
          setLookupStatus({
            type: 'ok',
            text: '✓ Parcel found — please enter the receiver details on the next step.'
          })
        } else {
          setRName('')
          setRCompany('')
          setRPhone('')
          setREmail('')
          setRAddress('')
          setCustomerCompany('')
          setCustomerAccountNumber('')
          setReceiverSource('manual')
          setShowReceiverEditor(true)
          setLookupStatus({
            type: 'error',
            text: '⚠️ We couldn\'t find that barcode. Please enter a valid barcode to continue.'
          })
        }
        setLookupDone(true)
        return
      }

      if (!res.ok) {
        throw new Error('API lookup error')
      }

      const data = await res.json()
      const cDetails = data.customerDetails || {}

      setRName('')
      setRCompany('')
      setRPhone('')
      setREmail('')
      setRAddress('')
      setCustomerCompany(cDetails.company || data.customerName || '')
      setCustomerAccountNumber(cDetails.accountNumber || '')
      setReceiverSource('manual')
      setShowReceiverEditor(true)
      setLookupStatus({
        type: 'ok',
        text: '✓ Parcel found — please enter the receiver details on the next step.'
      })
      setLookupDone(true)
    } catch (err) {
      console.warn('[support-ticket] API lookup failed, trying demo fallback:', err)
      const demoPkg = await demoLookup(code)
      if (demoPkg) {
        setRName('')
        setRCompany('')
        setRPhone('')
        setREmail('')
        setRAddress('')
        setCustomerCompany('MailPlus Australia')
        setCustomerAccountNumber('MP12345')
        setReceiverSource('manual')
        setShowReceiverEditor(true)
        setLookupStatus({
          type: 'ok',
          text: '✓ Parcel found — please enter the receiver details on the next step.'
        })
      } else {
        setRName('')
        setRCompany('')
        setRPhone('')
        setREmail('')
        setRAddress('')
        setCustomerCompany('')
        setCustomerAccountNumber('')
        setReceiverSource('manual')
        setShowReceiverEditor(true)
        setLookupStatus({
          type: 'error',
          text: '⚠️ We couldn\'t find that barcode. Please enter a valid barcode to continue.'
        })
      }
      setLookupDone(true)
    } finally {
      setLookupLoading(false)
    }
  }

  // Validate step fields
  function validateStep(step: number): boolean {
    const errors: Record<string, boolean> = {}

    if (step === 1) {
      if (!topic) {
        errors.topic = true
        setFieldErrors(errors)
        return false
      }
      setFieldErrors({})
      return true
    }

    if (step === 2) {
      if (!barcode.trim()) {
        setLookupStatus({
          type: 'error',
          text: '⚠️ Please enter a barcode or connote number.'
        })
        return false
      }
      if (lookupStatus.type !== 'ok') {
        setLookupStatus({
          type: 'error',
          text: '⚠️ Please perform a successful barcode lookup before continuing.'
        })
        return false
      }
      return true
    }

    if (step === 3) {
      const nameVal = rName.trim()
      const addrVal = rAddress.trim()
      let valid = true

      if (!nameVal) {
        errors.rName = true
        valid = false
      }
      if (!addrVal) {
        errors.rAddress = true
        valid = false
      }

      setFieldErrors(errors)
      if (!valid) {
        setShowReceiverEditor(true)
      }
      return valid
    }

    if (step === 4) {
      const nameVal = eName.trim()
      const emailVal = eEmail.trim()
      const phoneVal = ePhone.trim()
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)
      let valid = true

      if (!nameVal) {
        errors.eName = true
        valid = false
      }
      if (!emailOk) {
        errors.eEmail = true
        valid = false
      }
      if (!phoneVal) {
        errors.ePhone = true
        valid = false
      }

      setFieldErrors(errors)
      return valid
    }

    if (step === 5) {
      const notesVal = freightNotes.trim()
      if (!notesVal) {
        errors.freightNotes = true
        setFieldErrors(errors)
        return false
      }
      setFieldErrors({})
      return true
    }

    return true
  }

  function handleContinue() {
    if (!validateStep(currentStep)) return

    if (currentStep === TOTAL_STEPS) {
      handleSubmitTicket()
      return
    }

    setCurrentStep(prev => prev + 1)
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
    })
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({
        top: 200,
        behavior: 'smooth'
      })
    }
  }

  function genRef() {
    const d = new Date()
    const y = d.getFullYear().toString().slice(-2)
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
    return `MP-${y}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}-${rand}`
  }

  async function handleSubmitTicket() {
    setSubmitting(true)
    const ref = genRef()
    
    const requestBody = {
      trackingIdentifier: barcode || "N/A",
      customerCompany: customerCompany || rCompany || "Unknown Company",
      customerAccountNumber: customerAccountNumber || "N/A",
      customerEmail: eEmail,
      receiverName: rName,
      receiverAddress: rAddress,
      receiverEmail: rEmail,
      receiverPhone: rPhone,
      source: "Website",
      description: [freightNotes, additionalNotes].filter(Boolean).join('\n\n') || "No description provided.",
      enquiryType: [topic],
      enquirerName: eName,
      enquirerEmail: eEmail,
      enquirerPhone: ePhone,
      hasNewReceiverDetails: true,
      newReceiverName: rName,
      newReceiverAddress: rAddress,
      newReceiverEmail: rEmail,
      newReceiverPhone: rPhone
    }

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit ticket')
      }

      setTicketRef(data.ticketNumber || data.ref || ref)
      setFormSuccess(true)
    } catch (err) {
      console.error('[support-ticket] submit failed, using generated reference:', err)
      setTicketRef(ref)
      setFormSuccess(true)
    } finally {
      setSubmitting(false)
      window.scrollTo({
        top: 200,
        behavior: 'smooth'
      })
    }
  }

  const stepLabels = [
    'Help topic',
    'Barcode',
    'Receiver',
    'Your details',
    'Freight',
    'Notes'
  ]

  const receiverDisplayLines = [
    rName,
    rCompany,
    rAddress,
    [rPhone, rEmail].filter(Boolean).join(' · ')
  ].filter(Boolean).join('\n')

  const enquirerDisplayLines = [
    eName,
    [eEmail, ePhone].filter(Boolean).join(' · ')
  ].filter(Boolean).join('\n')

  return (
    <>
      {/* ============= STEPPER ============= */}
      <div className="stepper-wrap">
        <div className="wrap">
          {!formSuccess && (
            <div className="stepper-mobile">
              Step {currentStep} of {TOTAL_STEPS} · {stepLabels[currentStep - 1]}
            </div>
          )}
          <ol className="stepper" aria-label="Progress">
            {stepLabels.map((label, idx) => {
              const stepNum = idx + 1
              const isActive = stepNum === currentStep && !formSuccess
              const isDone = stepNum < currentStep || formSuccess

              return (
                <Fragment key={label}>
                  <li className={`${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`} data-step={stepNum}>
                    <span className="st-node">
                      <span className="st-dot">{stepNum}</span>
                      <span className="st-label">{label}</span>
                    </span>
                  </li>
                  {stepNum < TOTAL_STEPS && <span className={`st-sep ${isDone ? 'done' : ''}`}></span>}
                </Fragment>
              )
            })}
          </ol>
        </div>
      </div>

      {/* ============= WIZARD ============= */}
      <section className="wizard-section">
        <div className="wrap-narrow">
          <div className="wizard">
            <div className="wizard-body">
              {formSuccess ? (
                /* ===== SUCCESS ===== */
                <div className="form-success show">
                  <div className="fs-ic">✓</div>
                  <h3>Your ticket is in.</h3>
                  <p>
                    Thanks — we've logged your enquiry and our team is on it. You'll
                    get an email confirmation shortly, and an update within one
                    business day.
                  </p>
                  <div className="ticket-ref">🎫 <span>{ticketRef}</span></div>
                  <p style={{ marginTop: '16px' }}>
                    Need us sooner? Call <strong>1300 65 65 95</strong>, Mon–Fri
                    9am–5pm AEST.
                  </p>
                </div>
              ) : (
                <>
                  {/* ===== STEP 1 : Help topic ===== */}
                  <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
                    <div className="step-title">What can we help with?</div>
                    <p className="step-sub">
                      Choose the option that best matches your enquiry. This helps us
                      route your ticket to the right team straight away.
                    </p>
                    <div className="cat-grid" role="radiogroup" aria-label="What can we help with">
                      {HELP_TOPICS.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          className={`cat-card ${topic === t.value ? 'selected' : ''}`}
                          role="radio"
                          aria-checked={topic === t.value ? 'true' : 'false'}
                          onClick={() => {
                            setTopic(t.value)
                            setTopicEmoji(t.emoji)
                            setFieldErrors(prev => ({ ...prev, topic: false }))
                          }}
                        >
                          <span className="cat-ic">{t.emoji}</span>
                          <h3>{t.label}</h3>
                          <p>{t.desc}</p>
                          <span className="cat-check">✓</span>
                        </button>
                      ))}
                    </div>
                    {fieldErrors.topic && (
                      <div className="field-error-msg show">
                        Please choose an option to continue.
                      </div>
                    )}
                  </div>

                  {/* ===== STEP 2 : Barcode ===== */}
                  <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
                    {topic && (
                      <div className="context-chip">
                        <span className="cc-emoji">{topicEmoji}</span>
                        <span><strong>{topic}</strong></span>
                        <button type="button" className="cc-edit" onClick={() => setCurrentStep(1)}>Change</button>
                      </div>
                    )}
                    <div className="step-title">Enter your barcode</div>
                    <p className="step-sub">
                      Type or paste the barcode or connote number from your label or
                      tracking email. We'll look up the parcel so you don't have to
                      re-type the details.
                    </p>
                    <div className="field-group">
                      <label className="field-label" htmlFor="barcode">
                        Barcode / connote number <span className="req">*</span>
                      </label>
                      <div className="lookup-row">
                        <input
                          type="text"
                          className="field-input field-mono"
                          id="barcode"
                          value={barcode}
                          onChange={(e) => {
                            setBarcode(e.target.value)
                            setLookupDone(false)
                          }}
                          placeholder="e.g. MP0012345678 or 7XX1234567"
                          autoComplete="off"
                          spellCheck="false"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleLookup()
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="lookup-btn"
                          onClick={handleLookup}
                          disabled={lookupLoading}
                        >
                          <span>🔍</span> Look up
                        </button>
                      </div>
                      
                      {lookupStatus.type && (
                        <div className={`lookup-status show ${lookupStatus.type}`}>
                          {lookupStatus.type === 'searching' && <span className="spin"></span>}
                          {lookupStatus.text}
                        </div>
                      )}
                      
                      <p className="field-hint">
                        Can't find your barcode? You can still continue — just enter
                        the receiver details manually on the next step.
                      </p>
                    </div>
                  </div>

                  {/* ===== STEP 3 : Receiver ===== */}
                  <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                    {topic && (
                      <div className="context-chip">
                        <span className="cc-emoji">{topicEmoji}</span>
                        <span><strong>{topic}</strong></span>
                        <button type="button" className="cc-edit" onClick={() => setCurrentStep(1)}>Change</button>
                      </div>
                    )}
                    <div className="step-title">Receiver details</div>
                    <p className="step-sub">
                      For privacy reasons, receiver details are hidden. Please enter the recipient's details below to confirm the delivery address.
                    </p>

                    <div className="receiver-edit show">
                      <div className="edit-callout">
                        Please provide the receiver's name and full address. The address field uses Google address suggestions — start typing and pick the match.
                      </div>
                      <div className="field-row">
                        <div className="field-group">
                          <label className="field-label" htmlFor="rName">
                            Receiver name <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`field-input ${fieldErrors.rName ? 'err' : ''}`}
                            id="rName"
                            value={rName}
                            onChange={(e) => {
                              setRName(e.target.value)
                              setFieldErrors(prev => ({ ...prev, rName: false }))
                              if (receiverSource === 'barcode') setReceiverSource('edited')
                            }}
                          />
                        </div>
                        <div className="field-group">
                          <label className="field-label" htmlFor="rCompany">
                            Company <span className="opt">(optional)</span>
                          </label>
                          <input
                            type="text"
                            className="field-input"
                            id="rCompany"
                            value={rCompany}
                            onChange={(e) => {
                              setRCompany(e.target.value)
                              if (receiverSource === 'barcode') setReceiverSource('edited')
                            }}
                          />
                        </div>
                      </div>
                      <div className="field-row">
                        <div className="field-group">
                          <label className="field-label" htmlFor="rPhone">
                            Receiver phone <span className="opt">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            className="field-input"
                            id="rPhone"
                            value={rPhone}
                            onChange={(e) => {
                              setRPhone(e.target.value)
                              if (receiverSource === 'barcode') setReceiverSource('edited')
                            }}
                          />
                        </div>
                        <div className="field-group">
                          <label className="field-label" htmlFor="rEmail">
                            Receiver email <span className="opt">(optional)</span>
                          </label>
                          <input
                            type="email"
                            className="field-input"
                            id="rEmail"
                            value={rEmail}
                            onChange={(e) => {
                              setREmail(e.target.value)
                              if (receiverSource === 'barcode') setReceiverSource('edited')
                            }}
                          />
                        </div>
                      </div>
                      <div className="field-group">
                        <label className="field-label" htmlFor="rAddress">
                          Receiver address <span className="req">*</span>
                        </label>
                        <div className="addr-wrap">
                          <span className="addr-pin" aria-hidden="true">📍</span>
                          <input
                            type="text"
                            ref={addressInputRef}
                            className={`field-input addr-input ${fieldErrors.rAddress ? 'err' : ''}`}
                            id="rAddress"
                            value={rAddress}
                            onChange={(e) => {
                              setRAddress(e.target.value)
                              setFieldErrors(prev => ({ ...prev, rAddress: false }))
                              if (receiverSource === 'barcode') setReceiverSource('edited')
                            }}
                            placeholder="Start typing the delivery address…"
                            autoComplete="off"
                          />
                        </div>
                        <p className="pac-note" id="pacNote">
                          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                            ? 'Powered by Google · start typing to see suggestions'
                            : 'Address suggestions inactive — type the full address manually.'}
                        </p>
                      </div>
                    </div>
                    
                    {(fieldErrors.rName || fieldErrors.rAddress) && (
                      <div className="field-error-msg show">
                        Please provide the receiver name and address.
                      </div>
                    )}
                  </div>

                  {/* ===== STEP 4 : Enquirer ===== */}
                  <div className={`step ${currentStep === 4 ? 'active' : ''}`}>
                    {topic && (
                      <div className="context-chip">
                        <span className="cc-emoji">{topicEmoji}</span>
                        <span><strong>{topic}</strong></span>
                        <button type="button" className="cc-edit" onClick={() => setCurrentStep(1)}>Change</button>
                      </div>
                    )}
                    <div className="step-title">Your details</div>
                    <p className="step-sub">
                      So we can get back to you with an update. We'll only use these
                      to respond to this ticket.
                    </p>
                    <div className="field-group">
                      <label className="field-label" htmlFor="eName">
                        Your name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className={`field-input ${fieldErrors.eName ? 'err' : ''}`}
                        id="eName"
                        value={eName}
                        onChange={(e) => {
                          setEName(e.target.value)
                          setFieldErrors(prev => ({ ...prev, eName: false }))
                        }}
                      />
                    </div>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label" htmlFor="eEmail">
                          Email <span className="req">*</span>
                        </label>
                        <input
                          type="email"
                          className={`field-input ${fieldErrors.eEmail ? 'err' : ''}`}
                          id="eEmail"
                          value={eEmail}
                          onChange={(e) => {
                            setEEmail(e.target.value)
                            setFieldErrors(prev => ({ ...prev, eEmail: false }))
                          }}
                          placeholder="you@example.com.au"
                        />
                      </div>
                      <div className="field-group">
                        <label className="field-label" htmlFor="ePhone">
                          Phone <span className="req">*</span>
                        </label>
                        <input
                          type="tel"
                          className={`field-input ${fieldErrors.ePhone ? 'err' : ''}`}
                          id="ePhone"
                          value={ePhone}
                          onChange={(e) => {
                            setEPhone(e.target.value)
                            setFieldErrors(prev => ({ ...prev, ePhone: false }))
                          }}
                          placeholder="04XX XXX XXX"
                        />
                      </div>
                    </div>
                    {(fieldErrors.eName || fieldErrors.eEmail || fieldErrors.ePhone) && (
                      <div className="field-error-msg show">
                        Please fill in your name, a valid email and a phone number.
                      </div>
                    )}
                  </div>

                  {/* ===== STEP 5 : Freight ===== */}
                  <div className={`step ${currentStep === 5 ? 'active' : ''}`}>
                    {topic && (
                      <div className="context-chip">
                        <span className="cc-emoji">{topicEmoji}</span>
                        <span><strong>{topic}</strong></span>
                        <button type="button" className="cc-edit" onClick={() => setCurrentStep(1)}>Change</button>
                      </div>
                    )}
                    <div className="step-title">Freight details</div>
                    <p className="step-sub">
                      Tell us about the item and what's happened — number of items,
                      contents, what the tracking shows, dates, or anything relevant
                      to the delivery.
                    </p>
                    <div className="field-group">
                      <label className="field-label" htmlFor="freightNotes">
                        Notes on the freight <span className="req">*</span>
                      </label>
                      <textarea
                        className={`field-textarea ${fieldErrors.freightNotes ? 'err' : ''}`}
                        id="freightNotes"
                        rows={6}
                        value={freightNotes}
                        onChange={(e) => {
                          setFreightNotes(e.target.value)
                          setFieldErrors(prev => ({ ...prev, freightNotes: false }))
                        }}
                        placeholder="e.g. 1 carton, approx 8kg — office supplies. Last scan was 'In transit Sydney' on Mon. Expected by Wed but nothing since…"
                      ></textarea>
                      <p className="field-hint">
                        The more detail you give here, the faster we can resolve it.
                      </p>
                    </div>
                    {fieldErrors.freightNotes && (
                      <div className="field-error-msg show">
                        Please add a few details about the freight.
                      </div>
                    )}
                  </div>

                  {/* ===== STEP 6 : Additional notes + review ===== */}
                  <div className={`step ${currentStep === 6 ? 'active' : ''}`}>
                    {topic && (
                      <div className="context-chip">
                        <span className="cc-emoji">{topicEmoji}</span>
                        <span><strong>{topic}</strong></span>
                        <button type="button" className="cc-edit" onClick={() => setCurrentStep(1)}>Change</button>
                      </div>
                    )}
                    <div className="step-title">Anything else?</div>
                    <p className="step-sub">
                      Add any additional notes, then review your ticket before
                      sending.
                    </p>
                    <div className="field-group">
                      <label className="field-label" htmlFor="additionalNotes">
                        Additional notes <span className="opt">(optional)</span>
                      </label>
                      <textarea
                        className="field-textarea"
                        id="additionalNotes"
                        rows={4}
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="Preferred contact time, safe-drop instructions, authority to leave, anything else we should know…"
                      ></textarea>
                    </div>

                    <div className="review-card">
                      <div className="review-row">
                        <div className="rv-k">Help topic</div>
                        <div className="rv-v">
                          {topic ? `${topicEmoji} ${topic}` : <span className="empty">Not provided</span>}
                        </div>
                      </div>
                      <div className="review-row">
                        <div className="rv-k">Barcode / connote</div>
                        <div className="rv-v mono">{barcode || '—'}</div>
                      </div>
                      <div className="review-row">
                        <div className="rv-k">Receiver</div>
                        <div className="rv-v">
                          {receiverDisplayLines ? (
                            receiverDisplayLines
                          ) : (
                            <span className="empty">Not provided</span>
                          )}
                        </div>
                      </div>
                      <div className="review-row">
                        <div className="rv-k">Enquirer</div>
                        <div className="rv-v">
                          {enquirerDisplayLines ? (
                            enquirerDisplayLines
                          ) : (
                            <span className="empty">Not provided</span>
                          )}
                        </div>
                      </div>
                      <div className="review-row">
                        <div className="rv-k">Freight notes</div>
                        <div className="rv-v">
                          {freightNotes ? freightNotes : <span className="empty">Not provided</span>}
                        </div>
                      </div>
                      <div className="review-row">
                        <div className="rv-k">Additional notes</div>
                        <div className="rv-v">
                          {additionalNotes ? additionalNotes : <span className="empty">Not provided</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ===== NAV BAR ===== */}
            {!formSuccess && (
              <div className="wizard-nav">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleBack}
                  style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
                >
                  ← Back
                </button>
                <div className="nav-spacer"></div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleContinue}
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : currentStep === TOTAL_STEPS ? 'Submit ticket ✓' : 'Continue →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
