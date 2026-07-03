import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying territory check request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
