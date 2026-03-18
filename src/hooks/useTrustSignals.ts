'use client'

import { useEffect, useState } from 'react'
import { TRUST_SIGNALS_FALLBACK, type TrustSignals } from '@/lib/firebase/trust-signals'

export function useTrustSignals(initial: TrustSignals = TRUST_SIGNALS_FALLBACK) {
  const [data, setData] = useState<TrustSignals>(initial)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate live updates — in production, subscribe to Firestore onSnapshot
    // This avoids requiring Firebase config for the demo
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        parcels_delivered_today: prev.parcels_delivered_today + Math.floor(Math.random() * 3),
        active_drivers: 12 + Math.floor(Math.random() * 5),
        last_updated: new Date().toISOString(),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return { data, loading }
}
