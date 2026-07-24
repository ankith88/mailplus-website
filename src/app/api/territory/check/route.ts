import { NextResponse } from 'next/server';

interface CachedResponse {
  data: any;
  timestamp: number;
}

const memoryCache = new Map<string, CachedResponse>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour TTL

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postcode, city } = body || {};

    const key = postcode && city ? `${String(postcode).trim()}_${String(city).trim().toUpperCase()}` : null;

    if (key && memoryCache.has(key)) {
      const cached = memoryCache.get(key)!;
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return NextResponse.json(cached.data, {
          headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
            'X-Cache': 'HIT',
          },
        });
      }
    }

    const response = await fetch('https://prospectplus.com.au/api/territory/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '454e75f843954875ccff72537d7702ba1ab6f65c',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to check territory', details: data }, { status: response.status });
    }

    if (key) {
      memoryCache.set(key, {
        data,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error proxying territory check request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

