import { NextResponse } from 'next/server'

const PROSPECTPLUS_API_URL = process.env.PROSPECTPLUS_API_URL || 'https://prospectplus.com.au'
const PROSPECTPLUS_API_KEY = process.env.PROSPECTPLUS_API_KEY || ''

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerid = searchParams.get('customerid')
    const loginemail = searchParams.get('loginemail')

    if (!customerid || !loginemail) {
      return NextResponse.json({ error: 'Missing customerid or loginemail' }, { status: 400 })
    }

    const response = await fetch(
      `${PROSPECTPLUS_API_URL}/api/localmile/message-operator?customerid=${customerid}&loginemail=${encodeURIComponent(loginemail)}`,
      {
        method: 'GET',
        headers: {
          'x-api-key': PROSPECTPLUS_API_KEY,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to verify customer details' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error proxying GET message-operator request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${PROSPECTPLUS_API_URL}/api/localmile/message-operator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': PROSPECTPLUS_API_KEY,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to send message to operator' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error proxying POST message-operator request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
