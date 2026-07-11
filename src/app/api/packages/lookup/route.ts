import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const identifier = searchParams.get('id')?.trim()

    if (!identifier) {
      return NextResponse.json({ error: 'Missing package identifier' }, { status: 400 })
    }

    const response = await fetch(`https://prospectplus.com.au/api/packages/lookup?id=${encodeURIComponent(identifier)}`, {
      method: 'GET',
      headers: {
        'x-api-key': '454e75f843954875ccff72537d7702ba1ab6f65c',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to lookup package', details: data },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error proxying package lookup request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
