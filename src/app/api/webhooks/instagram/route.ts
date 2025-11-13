export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received Instagram webhook:', body);

    // Process webhook events here (e.g., handle user login confirmations)
    // Example: Check for 'user' or 'page' events and update your database accordingly
    if (body.entry && body.entry.length > 0) {
      for (const entry of body.entry) {
        if (entry.messaging) {
          // Handle messaging events if applicable
          console.log('Messaging event:', entry.messaging);
        }
        // Add logic for other event types (e.g., feed updates, story insights)
      }
    }

    // Respond with 200 to acknowledge receipt
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Instagram webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}