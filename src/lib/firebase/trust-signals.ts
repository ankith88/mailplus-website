export interface TrustSignals {
  parcels_delivered_today: number
  active_drivers: number
  on_time_rate: number
  last_updated: string
  locations_served: number
  avg_delivery_hours: number
  total_parcels_alltime: number
  years_operating: number
  five_star_reviews: number
  business_clients: number
}

export const TRUST_SIGNALS_FALLBACK: TrustSignals = {
  parcels_delivered_today: 1247,
  active_drivers: 14,
  on_time_rate: 98.4,
  last_updated: new Date().toISOString(),
  locations_served: 47,
  avg_delivery_hours: 3.2,
  total_parcels_alltime: 2400000,
  years_operating: 14,
  five_star_reviews: 2847,
  business_clients: 680,
}

export async function fetchTrustSignalsSSR(): Promise<TrustSignals> {
  // Returns fallback data - in production this would use Firebase Admin SDK
  // to read from Firestore server-side
  return TRUST_SIGNALS_FALLBACK
}
