'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getFirebaseClient } from '@/lib/firebase/client'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import Script from 'next/script'

// Categories matching screenshot
interface Category {
  id: string
  title: string
  description: string
  icon: string
}

const CATEGORIES: Category[] = [
  { id: 'Delayed Item', title: 'Delayed Item', description: 'Parcel taking longer than expected', icon: '⏱️' },
  { id: 'ETA Request', title: 'ETA Request', description: 'Ask for an estimated delivery date', icon: '📅' },
  { id: 'Dispute of Delivery', title: 'Dispute of Delivery', description: 'Marked delivered but not received', icon: '❗️' },
  { id: 'POD Request', title: 'POD Request', description: 'Request proof of delivery', icon: '📝' },
  { id: 'ATL Image Request', title: 'ATL Image Request', description: 'Photo of where the item was left', icon: '📷' },
  { id: 'Redelivery Request', title: 'Redelivery Request', description: 'Arrange another delivery attempt', icon: '🔄' },
  { id: 'Return To Sender Request', title: 'Return To Sender Request', description: 'Send the item back to the sender', icon: '↩️' },
  { id: 'General Enquiry', title: 'General Enquiry', description: 'Any other question about your item', icon: '💬' },
  { id: 'Other', title: 'Other', description: 'Something not listed above', icon: '✏️' },
]

interface FormState {
  issueCategory: string
  trackingIdentifier: string
  // Receiver details
  receiverName: string
  receiverAddress: string
  useCustomReceiver: boolean
  // Enquirer details
  enquirerName: string
  enquirerEmail: string
  enquirerPhone: string
  // Notes
  freightNotes: string
  notes: string
  // Hidden/API payload helpers
  customerCompany: string
  customerAccountNumber: string
}

const initialForm: FormState = {
  issueCategory: '',
  trackingIdentifier: '',
  receiverName: '',
  receiverAddress: '',
  useCustomReceiver: false,
  enquirerName: '',
  enquirerEmail: '',
  enquirerPhone: '',
  freightNotes: '',
  notes: '',
  customerCompany: '',
  customerAccountNumber: '',
}

const inputCls =
  'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 bg-white border-slate-200 focus:border-[#095c7b] focus:ring-1 focus:ring-[#095c7b]'
const labelStyle = { color: '#095c7b' }
const errorStyle = { color: '#e53e3e' }

export function SupportTicketForm() {
  const [step, setStep] = useState<number>(1)
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [searchingPackage, setSearchingPackage] = useState(false)
  const [packageFound, setPackageFound] = useState<boolean | null>(null)
  const [dbReceiver, setDbReceiver] = useState<{ name: string; address: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Autocomplete ref
  const addressInputRef = useRef<HTMLInputElement>(null)
  const autocompleteInitialized = useRef(false)

  const setField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // Google Places Autocomplete logic
  const initAutocomplete = useCallback(() => {
    if (autocompleteInitialized.current) return
    if (!addressInputRef.current || !window.google?.maps?.places) return
    autocompleteInitialized.current = true

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      componentRestrictions: { country: 'au' },
      types: ['address'],
      fields: ['formatted_address'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place?.formatted_address) {
        setForm((prev) => ({ ...prev, receiverAddress: place.formatted_address || '' }))
        setErrors((prev) => ({ ...prev, receiverAddress: undefined }))
      }
    })
  }, [])

  useEffect(() => {
    if (step === 3 && form.useCustomReceiver) {
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
  }, [step, form.useCustomReceiver, initAutocomplete])

  // Search packages in Firestore
  const searchPackage = async () => {
    if (!form.trackingIdentifier.trim()) {
      setErrors((prev) => ({ ...prev, trackingIdentifier: 'Please enter a barcode or connote number' }))
      return
    }
    setErrors((prev) => ({ ...prev, trackingIdentifier: undefined }))
    setSearchingPackage(true)
    setPackageFound(null)
    setDbReceiver(null)

    try {
      const { db } = getFirebaseClient()
      interface PackageData {
        receiverName?: string
        receiver_name?: string
        receiver?: {
          name?: string
          address?: string
          company?: string
        }
        receiverAddress?: string
        receiver_address?: string
        receiverCompany?: string
        receiver_company?: string
        customerCompany?: string
        customerAccountNumber?: string
        accountNumber?: string
        barcode?: string
        connote?: string
        trackingNumber?: string
        trackingIdentifier?: string
      }
      let packageData: PackageData | null = null

      // 1. Try looking up by Document ID directly
      const docRef = doc(db, 'packages', form.trackingIdentifier.trim())
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        packageData = docSnap.data()
      } else {
        // 2. Try looking up via field queries
        const queryFields = ['barcode', 'connote', 'trackingNumber', 'trackingIdentifier']
        for (const field of queryFields) {
          const q = query(collection(db, 'packages'), where(field, '==', form.trackingIdentifier.trim()))
          const querySnapshot = await getDocs(q)
          if (!querySnapshot.empty) {
            packageData = querySnapshot.docs[0].data()
            break
          }
        }
      }

      if (packageData) {
        const name = packageData.receiverName || packageData.receiver_name || packageData.receiver?.name || ''
        const address = packageData.receiverAddress || packageData.receiver_address || packageData.receiver?.address || ''
        const company = packageData.customerCompany || packageData.receiverCompany || packageData.receiver_company || packageData.receiver?.company || ''
        const accNo = packageData.customerAccountNumber || packageData.accountNumber || ''

        setDbReceiver({ name, address })
        setForm((prev) => ({
          ...prev,
          customerCompany: company || prev.customerCompany,
          customerAccountNumber: accNo || prev.customerAccountNumber,
        }))
        setPackageFound(true)
        // Advance to next step
        setStep(3)
      } else {
        setPackageFound(false)
        // If package not found, we still advance to step 3, but custom inputs will be forced
        setForm((prev) => ({ ...prev, useCustomReceiver: true }))
        setStep(3)
      }
    } catch (err) {
      console.error('Error searching packages:', err)
      setPackageFound(false)
      setForm((prev) => ({ ...prev, useCustomReceiver: true }))
      setStep(3)
    } finally {
      setSearchingPackage(false)
    }
  }

  const validateStep = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (step === 1 && !form.issueCategory) {
      e.issueCategory = 'Please select a category.'
    }
    if (step === 2 && !form.trackingIdentifier.trim()) {
      e.trackingIdentifier = 'Barcode or connote number is required.'
    }
    if (step === 3 && form.useCustomReceiver) {
      if (!form.receiverName.trim()) e.receiverName = 'Receiver name is required.'
      if (!form.receiverAddress.trim()) e.receiverAddress = 'Receiver address is required.'
    }
    if (step === 4) {
      if (!form.enquirerName.trim()) e.enquirerName = 'Name is required.'
      if (!form.enquirerEmail.trim()) {
        e.enquirerEmail = 'Email is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.enquirerEmail)) {
        e.enquirerEmail = 'Please enter a valid email.'
      }
      if (!form.enquirerPhone.trim()) e.enquirerPhone = 'Phone number is required.'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step === 2) {
        searchPackage()
      } else {
        setStep((prev) => prev + 1)
      }
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return
    setSubmitting(true)

    // Build payload
    const payload = {
      trackingIdentifier: form.trackingIdentifier,
      issueCategory: [form.issueCategory],
      enquirySource: 'Website',
      enquirerName: form.enquirerName,
      enquirerEmail: form.enquirerEmail,
      enquirerPhone: form.enquirerPhone,
      notes: form.notes,
      freightNotes: form.freightNotes,
      customerCompany: form.customerCompany || 'MailPlus Australia',
      customerAccountNumber: form.customerAccountNumber || 'MP12345',
      newReceiverName: form.useCustomReceiver ? form.receiverName : (dbReceiver?.name || ''),
      newReceiverAddress: form.useCustomReceiver ? form.receiverAddress : (dbReceiver?.address || ''),
    }

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to submit support ticket.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl px-8 py-14 text-center max-w-lg mx-auto" style={{ backgroundColor: '#DAE8DA' }}>
        <h2 className="text-2xl font-bold mb-5" style={{ color: '#095c7b' }}>
          Ticket Successfully Submitted!
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#095c7b' }}>
          Your ticket has been lodged. Our support team will investigate the issue and get back to you shortly.
        </p>
        <button
          onClick={() => {
            setForm(initialForm)
            setStep(1)
            setSubmitted(false)
            setPackageFound(null)
            setDbReceiver(null)
          }}
          className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: '#095c7b', color: '#ffffff' }}
        >
          Raise Another Ticket
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-[#095c7b] transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#095c7b' }}>
              What can we help with?
            </h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Select the issue that best describes your situation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => {
                const isSelected = form.issueCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setField('issueCategory', cat.id)}
                    className={`flex items-start text-left p-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none hover:shadow-md ${
                      isSelected
                        ? 'border-[#095c7b] bg-[#095c7b]/5'
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="text-3xl mr-4">{cat.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: '#095c7b' }}>
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
            {errors.issueCategory && (
              <p className="mt-4 text-xs text-center" style={errorStyle}>
                {errors.issueCategory}
              </p>
            )}

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-full font-bold text-sm bg-[#095c7b] text-white hover:opacity-90 transition-opacity"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Barcode / Connote */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#095c7b' }}>
              Enter barcode or connote number
            </h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Please enter the tracking identifier for the package.
            </p>

            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={form.trackingIdentifier}
                onChange={(e) => setField('trackingIdentifier', e.target.value)}
                placeholder="e.g. 2QQZ50248045FPP00001"
                className={inputCls}
                style={{ borderColor: errors.trackingIdentifier ? '#e53e3e' : undefined }}
              />
              {errors.trackingIdentifier && (
                <p className="mt-2 text-xs" style={errorStyle}>
                  {errors.trackingIdentifier}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-full font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={searchingPackage}
                className="px-8 py-3 rounded-full font-bold text-sm bg-[#095c7b] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {searchingPackage ? 'Searching package...' : 'Next Step'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Receiver Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#095c7b' }}>
              Receiver Details
            </h2>

            {packageFound ? (
              <div className="bg-slate-50 p-6 rounded-2xl mb-6 border border-slate-100 max-w-lg mx-auto">
                <h3 className="font-bold text-sm mb-3" style={{ color: '#095c7b' }}>
                  Receiver details found in system:
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-500">Name:</span> {dbReceiver?.name || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-500">Address:</span>{' '}
                    {dbReceiver?.address || 'N/A'}
                  </p>
                </div>

                <label className="flex items-center gap-3 mt-6 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.useCustomReceiver}
                    onChange={(e) => setField('useCustomReceiver', e.target.checked)}
                    className="w-4 h-4 rounded text-[#095c7b] focus:ring-[#095c7b]"
                  />
                  <span className="text-sm font-medium" style={{ color: '#095c7b' }}>
                    These details are incorrect / I want to update receiver details
                  </span>
                </label>
              </div>
            ) : (
              <p className="text-amber-600 text-sm text-center mb-6 bg-amber-50 py-3 rounded-xl max-w-lg mx-auto border border-amber-100">
                ⚠️ Package details could not be found. Please enter receiver details manually.
              </p>
            )}

            {(form.useCustomReceiver || !packageFound) && (
              <div className="space-y-4 max-w-lg mx-auto">
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                  <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                    strategy="lazyOnload"
                    onLoad={initAutocomplete}
                  />
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                    Receiver Name *
                  </label>
                  <input
                    type="text"
                    value={form.receiverName}
                    onChange={(e) => setField('receiverName', e.target.value)}
                    placeholder="Enter receiver's name"
                    className={inputCls}
                    style={{ borderColor: errors.receiverName ? '#e53e3e' : undefined }}
                  />
                  {errors.receiverName && (
                    <p className="mt-1 text-xs" style={errorStyle}>
                      {errors.receiverName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                    Receiver Address *
                  </label>
                  <input
                    ref={addressInputRef}
                    type="text"
                    value={form.receiverAddress}
                    onChange={(e) => setField('receiverAddress', e.target.value)}
                    placeholder="Start typing the address..."
                    className={inputCls}
                    style={{ borderColor: errors.receiverAddress ? '#e53e3e' : undefined }}
                  />
                  {errors.receiverAddress && (
                    <p className="mt-1 text-xs" style={errorStyle}>
                      {errors.receiverAddress}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-full font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-full font-bold text-sm bg-[#095c7b] text-white hover:opacity-90 transition-opacity"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Enquirer Details */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#095c7b' }}>
              Enquirer Details
            </h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Please provide your contact details.
            </p>

            <div className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                  Name *
                </label>
                <input
                  type="text"
                  value={form.enquirerName}
                  onChange={(e) => setField('enquirerName', e.target.value)}
                  placeholder="Your Name"
                  className={inputCls}
                  style={{ borderColor: errors.enquirerName ? '#e53e3e' : undefined }}
                />
                {errors.enquirerName && (
                  <p className="mt-1 text-xs" style={errorStyle}>
                    {errors.enquirerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                  Email *
                </label>
                <input
                  type="email"
                  value={form.enquirerEmail}
                  onChange={(e) => setField('enquirerEmail', e.target.value)}
                  placeholder="your.email@example.com"
                  className={inputCls}
                  style={{ borderColor: errors.enquirerEmail ? '#e53e3e' : undefined }}
                />
                {errors.enquirerEmail && (
                  <p className="mt-1 text-xs" style={errorStyle}>
                    {errors.enquirerEmail}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                  Phone *
                </label>
                <input
                  type="tel"
                  value={form.enquirerPhone}
                  onChange={(e) => setField('enquirerPhone', e.target.value)}
                  placeholder="e.g. 0400000000"
                  className={inputCls}
                  style={{ borderColor: errors.enquirerPhone ? '#e53e3e' : undefined }}
                />
                {errors.enquirerPhone && (
                  <p className="mt-1 text-xs" style={errorStyle}>
                    {errors.enquirerPhone}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-full font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-full font-bold text-sm bg-[#095c7b] text-white hover:opacity-90 transition-opacity"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Freight & Additional Notes */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#095c7b' }}>
              Freight & Additional Details
            </h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Please enter notes regarding freight and any other additional information.
            </p>

            <div className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                  Freight Details Notes
                </label>
                <textarea
                  value={form.freightNotes}
                  onChange={(e) => setField('freightNotes', e.target.value)}
                  placeholder="Enter details on the freight (e.g. dimensions, weight, packaging type...)"
                  className={`${inputCls} min-h-[100px] resize-y`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
                  Additional Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setField('notes', e.target.value)}
                  placeholder="Any other helpful notes for the support team..."
                  className={`${inputCls} min-h-[100px] resize-y`}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-full font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 rounded-full font-bold text-sm bg-[#EAF044] text-[#103d39] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
