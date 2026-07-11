'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Loader2, Phone, X } from 'lucide-react'

// Issue Categories matching Step 1
const ISSUE_CATEGORIES = [
  { id: 'Delayed Item', label: 'Delayed Item', desc: 'Parcel taking longer than expected', emoji: '⏱️' },
  { id: 'ETA Request', label: 'ETA Request', desc: 'Ask for an estimated delivery date', emoji: '📅' },
  { id: 'Dispute of Delivery', label: 'Dispute of Delivery', desc: 'Marked delivered but not received', emoji: '❗️' },
  { id: 'POD Request', label: 'POD Request', desc: 'Request proof of delivery', emoji: '📝' },
  { id: 'ATL Image Request', label: 'ATL Image Request', desc: 'Photo of where the item was left', emoji: '📷' },
  { id: 'Redelivery Request', label: 'Redelivery Request', desc: 'Arrange another delivery attempt', emoji: '🔄' },
  { id: 'Return To Sender Request', label: 'Return To Sender Request', desc: 'Send the item back to the sender', emoji: '↩️' },
  { id: 'General Enquiry', label: 'General Enquiry', desc: 'Any other question about your item', emoji: '💬' },
  { id: 'Other', label: 'Other', desc: 'Something not listed above', emoji: '✏️' },
]

export function SupportTicketForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSearchingBarcode, setIsSearchingBarcode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Form State
  const [issueCategory, setIssueCategory] = useState<string>('')
  const [trackingId, setTrackingId] = useState<string>('')
  
  // Receiver Details
  const [receiverName, setReceiverName] = useState<string>('')
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false)
  
  // Manual Address Fields (if enters new address)
  const [searchAddress, setSearchAddress] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [streetAddress, setStreetAddress] = useState<string>('')
  const [suburb, setSuburb] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [postcode, setPostcode] = useState<string>('')
  const [contactNumber, setContactNumber] = useState<string>('')
  
  // Fetched address that was stored on the package
  const [resolvedAddress, setResolvedAddress] = useState<string>('')

  // Customer / Sender Info resolved from DB lookup
  const [customerCompany, setCustomerCompany] = useState<string>('')
  const [customerAccountNumber, setCustomerAccountNumber] = useState<string>('')

  // Enquirer Details
  const [enquirerName, setEnquirerName] = useState<string>('')
  const [enquirerEmail, setEnquirerEmail] = useState<string>('')
  const [enquirerPhone, setEnquirerPhone] = useState<string>('')

  // Notes
  const [freightNotes, setFreightNotes] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  // Form Errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Autocomplete Setup
  const addressInputRef = useRef<HTMLInputElement>(null)
  const autocompleteInitialized = useRef(false)

  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return
    if (!addressInputRef.current || !window.google?.maps?.places) return
    autocompleteInitialized.current = true

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      types: ['address'],
      fields: ['address_components', 'formatted_address'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place?.address_components) return

      let streetNumber = ''
      let route = ''
      let locality = ''
      let adminArea = ''
      let postVal = ''

      for (const component of place.address_components) {
        const types = component.types
        if (types.includes('street_number')) streetNumber = component.long_name
        if (types.includes('route')) route = component.long_name
        if (types.includes('locality')) locality = component.long_name
        if (types.includes('administrative_area_level_1')) adminArea = component.short_name
        if (types.includes('postal_code')) postVal = component.long_name
      }

      const street = [streetNumber, route].filter(Boolean).join(' ')
      setStreetAddress(street)
      setSuburb(locality)
      setState(adminArea)
      setPostcode(postVal)
      setSearchAddress(place.formatted_address || '')
      
      setErrors((prev) => ({ ...prev, searchAddress: '', streetAddress: '', suburb: '', state: '', postcode: '' }))
    })
  }, [])

  useEffect(() => {
    if (step === 3 && isNewAddress) {
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
    }
  }, [step, isNewAddress, initAutocomplete])

  // Handle barcode lookup
  const handleBarcodeLookup = async () => {
    if (!trackingId.trim()) {
      setErrors({ trackingId: 'Carrier tracking number is required' })
      return
    }

    setIsSearchingBarcode(true)
    setErrors({})

    try {
      const res = await fetch(`/api/packages/lookup?id=${encodeURIComponent(trackingId.trim())}`)
      if (res.ok) {
        const data = await res.json()
        setReceiverName(data.receiverDetails?.name || '')
        setResolvedAddress(data.receiverDetails?.address || '')
        setContactNumber(data.receiverDetails?.phone || '')
        setCustomerCompany(data.customerDetails?.company || 'MailPlus Australia')
        setCustomerAccountNumber(data.customerDetails?.accountNumber || 'MP12345')
        setIsNewAddress(false) // default to showing the resolved address
      } else {
        // Fallback / not found - let them enter details
        setReceiverName('')
        setResolvedAddress('')
        setCustomerCompany('MailPlus Australia')
        setCustomerAccountNumber('MP12345')
        setIsNewAddress(true) // force entering new address
      }
      setStep(3)
    } catch (e) {
      console.error(e)
      // Fallback
      setIsNewAddress(true)
      setStep(3)
    } finally {
      setIsSearchingBarcode(false)
    }
  }

  // Next Step Action
  const nextStep = () => {
    setErrors({})
    if (step === 1) {
      if (!issueCategory) {
        setErrors({ issueCategory: 'Please select an issue category' })
        return
      }
      setStep(2)
    } else if (step === 2) {
      handleBarcodeLookup()
    } else if (step === 3) {
      const errs: Record<string, string> = {}
      if (!receiverName.trim()) errs.receiverName = 'Receiver name is required'
      
      if (isNewAddress) {
        if (!streetAddress.trim()) errs.streetAddress = 'Street address is required'
        if (!suburb.trim()) errs.suburb = 'Suburb is required'
        if (!state.trim()) errs.state = 'State is required'
        if (!postcode.trim()) errs.postcode = 'Postcode is required'
      } else {
        if (!resolvedAddress.trim()) errs.resolvedAddress = 'Delivery address is required'
      }

      if (!contactNumber.trim()) {
        errs.contactNumber = 'Contact number is required'
      }

      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
      setStep(4)
    } else if (step === 4) {
      const errs: Record<string, string> = {}
      if (!enquirerName.trim()) errs.enquirerName = 'Enquirer name is required'
      if (!enquirerEmail.trim()) {
        errs.enquirerEmail = 'Enquirer email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquirerEmail)) {
        errs.enquirerEmail = 'Please enter a valid email address'
      }
      if (!enquirerPhone.trim()) {
        errs.enquirerPhone = 'Enquirer phone is required'
      }

      if (Object.keys(errs).length > 0) {
        setErrors(errs)
        return
      }
      setStep(5)
    } else if (step === 5) {
      setStep(6)
    }
  }

  // Prev Step Action
  const prevStep = () => {
    setErrors({})
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Final submit
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    // Build the final receiver address string
    let finalReceiverAddress = resolvedAddress
    if (isNewAddress) {
      const parts = [unit, streetAddress, suburb, state, postcode].filter(Boolean)
      finalReceiverAddress = parts.join(', ')
    }

    const payload = {
      trackingIdentifier: trackingId.trim(),
      issueCategory: [issueCategory],
      enquirySource: 'Website',
      enquirerName: enquirerName.trim(),
      enquirerEmail: enquirerEmail.trim(),
      enquirerPhone: enquirerPhone.trim(),
      notes: notes.trim() || 'No additional notes',
      freightNotes: freightNotes.trim(),
      customerCompany: customerCompany || 'MailPlus Australia',
      customerAccountNumber: customerAccountNumber || 'MP12345',
      newReceiverName: receiverName.trim(),
      newReceiverAddress: finalReceiverAddress
    }

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        router.push('/confirmation?type=ticket')
      } else {
        const errorData = await res.json()
        setSubmitError(errorData.error || 'Failed to submit the support ticket. Please try again.')
      }
    } catch (e) {
      console.error(e)
      setSubmitError('A network error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full border border-gray-100">
      {/* Form Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-display)' }}>
            Submit a support ticket
          </h1>
          <button 
            onClick={() => router.back()} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        {/* BLUF Summary Paragraph under 160 chars for AI Overview citation */}
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Submit a MailPlus support ticket to resolve parcel tracking, delivery disputes, redeliveries, and general delivery enquiries across Australia.
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="px-8 pt-6">
        <div className="flex gap-1.5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`flex-1 h-full rounded-full transition-all duration-300 ${
                i <= step ? 'bg-emerald-800' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-3">
          Step {step} of 6
        </div>
      </div>

      {/* Step Content */}
      <div className="px-8 py-6 min-h-[350px]">
        {/* STEP 1: What can we help with */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-bold text-emerald-950 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              What can we help with?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Select the issue that best describes your situation.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {ISSUE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setIssueCategory(cat.id)}
                  className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 ${
                    issueCategory === cat.id
                      ? 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800'
                      : 'border-gray-200 hover:border-emerald-700/50 hover:bg-emerald-50/10'
                  }`}
                >
                  <span className="text-2xl mb-2" role="img" aria-label={cat.label}>
                    {cat.emoji}
                  </span>
                  <span className="font-semibold text-sm text-gray-800 mb-0.5">{cat.label}</span>
                  <span className="text-xs text-gray-500 leading-normal">{cat.desc}</span>
                </button>
              ))}
            </div>
            {errors.issueCategory && (
              <p className="text-red-500 text-xs mt-3">{errors.issueCategory}</p>
            )}
          </div>
        )}

        {/* STEP 2: Tracking details */}
        {step === 2 && (
          <div>
            <h3 className="text-2xl font-bold text-emerald-950 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Tracking details
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter the carrier tracking number — not the MP reference ID.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="trackingId" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Carrier tracking number <span className="text-red-500">*</span>
                </label>
                <input
                  id="trackingId"
                  type="text"
                  placeholder="e.g. 2QQ4827193AU or MPXL prefix"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
                />
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                  Accepted formats: full <span className="font-semibold">2QQ</span> or <span className="font-semibold">MPXL</span> tracking IDs only. MP reference IDs not accepted here.
                </p>
                {errors.trackingId && (
                  <p className="text-red-500 text-xs mt-1">{errors.trackingId}</p>
                )}
              </div>

              {/* Call center card */}
              <div className="flex gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 items-center mt-6">
                <div className="p-3 bg-emerald-800 rounded-2xl text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Prefer to call? Speak to support directly</div>
                  <a href="tel:1300656595" className="text-lg font-bold text-emerald-950 hover:underline">
                    1300 65 65 95
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Receiver details */}
        {step === 3 && (
          <div>
            <h3 className="text-2xl font-bold text-emerald-950 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Receiver details
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              So we know who the parcel is for.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="receiverName" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Receiver name <span className="text-red-500">*</span>
                </label>
                <input
                  id="receiverName"
                  type="text"
                  placeholder="e.g. Alex Singh"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-xs mt-1">{errors.receiverName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Delivery address <span className="text-red-500">*</span>
                </label>

                {!isNewAddress && resolvedAddress ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-800 bg-emerald-50/20 text-sm text-gray-800">
                      <span className="truncate max-w-[85%]">{resolvedAddress}</span>
                      <button
                        type="button"
                        onClick={() => setIsNewAddress(true)}
                        className="text-xs font-bold text-emerald-800 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      ref={addressInputRef}
                      type="text"
                      placeholder="Search address (Google Autocomplete)"
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Unit / Level (optional)</label>
                        <input
                          type="text"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Street address *</label>
                        <input
                          type="text"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Suburb *</label>
                        <input
                          type="text"
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">State *</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Postcode *</label>
                        <input
                          type="text"
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800"
                        />
                      </div>
                    </div>

                    {resolvedAddress && (
                      <button
                        type="button"
                        onClick={() => setIsNewAddress(false)}
                        className="text-xs text-gray-500 hover:text-emerald-800 underline block"
                      >
                        Cancel and use original address
                      </button>
                    )}
                  </div>
                )}
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
                {errors.suburb && <p className="text-red-500 text-xs mt-1">{errors.suburb}</p>}
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Contact number <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactNumber"
                  type="text"
                  placeholder="e.g. 0412 345 678"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Enquirer details */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Your details
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                So we can contact you regarding this enquiry.
              </p>
            </div>

            <div>
              <label htmlFor="enquirerName" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="enquirerName"
                type="text"
                placeholder="e.g. Ankith Ravindran"
                value={enquirerName}
                onChange={(e) => setEnquirerName(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
              />
              {errors.enquirerName && (
                <p className="text-red-500 text-xs mt-1">{errors.enquirerName}</p>
              )}
            </div>

            <div>
              <label htmlFor="enquirerEmail" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="enquirerEmail"
                type="email"
                placeholder="e.g. ankith@example.com"
                value={enquirerEmail}
                onChange={(e) => setEnquirerEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
              />
              {errors.enquirerEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.enquirerEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="enquirerPhone" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="enquirerPhone"
                type="text"
                placeholder="e.g. 0402 712 233"
                value={enquirerPhone}
                onChange={(e) => setEnquirerPhone(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm"
              />
              {errors.enquirerPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.enquirerPhone}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Freight details */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Freight details
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Optional — Tell us about the contents and packaging if relevant to your issue.
              </p>
            </div>

            <div>
              <label htmlFor="freightNotes" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Comments on contents & packaging (optional)
              </label>
              <textarea
                id="freightNotes"
                rows={5}
                placeholder="e.g. Cardboard box, contains glassware, original packaging undamaged at time of lodgement..."
                value={freightNotes}
                onChange={(e) => setFreightNotes(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Additional notes */}
        {step === 6 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-emerald-950 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Additional notes
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Include any extra information that might help us resolve this query.
              </p>
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                Comments / Notes
              </label>
              <textarea
                id="notes"
                rows={5}
                placeholder="e.g. Package has not arrived yet. Please provide update."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors text-sm resize-none"
              />
            </div>

            {submitError && (
              <p className="text-red-500 text-sm mt-2">{submitError}</p>
            )}
          </div>
        )}
      </div>

      {/* Form Footer */}
      <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            disabled={isSearchingBarcode || isSubmitting}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-emerald-800 transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}

        {step < 6 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={isSearchingBarcode}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-amber-200 text-gray-900 font-bold text-sm hover:bg-amber-300 transition-all shadow-sm hover:scale-[1.02]"
          >
            {isSearchingBarcode ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Searching...
              </>
            ) : (
              <>
                Next <ArrowRight size={16} />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-all shadow-sm hover:scale-[1.02] disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting...
              </>
            ) : (
              'Submit Support Ticket'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
