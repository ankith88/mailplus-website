'use client'

import { useTrustSignals } from '@/hooks/useTrustSignals'
import { type TrustSignals } from '@/lib/firebase/trust-signals'

interface TrustSignalBarProps {
  initial: TrustSignals
}

export function TrustSignalBar({ initial }: TrustSignalBarProps) {
  const { data } = useTrustSignals(initial)

  const items = [
    {
      icon: '📦',
      value: data.parcels_delivered_today.toLocaleString(),
      label: 'Parcels Today',
    },
    {
      icon: '🚗',
      value: data.active_drivers.toString(),
      label: 'Drivers Active',
    },
    {
      icon: '⏱️',
      value: `${data.on_time_rate}%`,
      label: 'On-Time Rate',
    },
    {
      icon: '⭐',
      value: data.five_star_reviews.toLocaleString(),
      label: '5-Star Reviews',
    },
    {
      icon: '🏢',
      value: `${data.business_clients}+`,
      label: 'Business Clients',
    },
  ]

  return (
    <section
      className="glass-dark border-y border-earth-800 overflow-x-auto"
      aria-label="Live trust signals"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-stretch min-w-max md:min-w-0 md:justify-between divide-x divide-earth-800">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-6 py-4"
            >
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="text-lg font-semibold text-earth-100" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.value}
                </p>
                <p className="text-xs text-earth-500 uppercase tracking-wider">{item.label}</p>
              </div>
            </div>
          ))}
          <div className="hidden md:flex items-center gap-2 px-6 py-4 ml-auto">
            <span className="w-2 h-2 rounded-full bg-moss-400 animate-pulse" />
            <span className="text-xs text-earth-500">
              Live — updated {new Date(data.last_updated).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
