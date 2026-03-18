import { NextResponse } from 'next/server'
import { fetchTrustSignalsSSR } from '@/lib/firebase/trust-signals'

export const revalidate = 60 // Revalidate every 60 seconds

export async function GET() {
  try {
    const data = await fetchTrustSignalsSSR()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch trust signals' },
      { status: 500 }
    )
  }
}
