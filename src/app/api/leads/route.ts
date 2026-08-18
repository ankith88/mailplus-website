import { NextResponse, after } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.companyName) {
      return NextResponse.json({ error: 'Missing required field: companyName' }, { status: 400 });
    }

    const prospectPlusUrl = process.env.PROSPECTPLUS_API_URL || 'https://prospectplus.com.au';
    const apiKey = process.env.PROSPECTPLUS_API_KEY || '454e75f843954875ccff72537d7702ba1ab6f65c';

    // Dispatch lead creation to ProspectPlus in background using Next.js after()
    after(async () => {
      try {
        const res = await fetch(`${prospectPlusUrl}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          console.error(`[Background Lead Dispatch] ProspectPlus API returned ${res.status}:`, errText);
        } else {
          console.log(`[Background Lead Dispatch] Successfully dispatched lead for ${body.companyName}`);
        }
      } catch (err) {
        console.error('[Background Lead Dispatch] Network error dispatching lead to ProspectPlus:', err);
      }
    });

    // Return instant optimistic response so client navigates to /confirmation immediately
    return NextResponse.json({
      success: true,
      message: 'Lead received successfully and processing in background.',
      outOfTerritory: !!body.noFranchisees,
      localMilePlusAuthLink: 'https://localmile.mailplus.com.au',
      bookingUrlId: null,
    });
  } catch (error) {
    console.error('Error handling lead request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

