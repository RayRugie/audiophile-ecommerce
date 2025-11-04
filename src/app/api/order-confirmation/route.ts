import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      to,
      customerName,
      orderId,
      items,
      grandTotal,
      shipping,
      orderUrl,
    } = body || {};

    if (!to || !customerName || !orderId || !Array.isArray(items) || !grandTotal || !shipping || !orderUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendOrderConfirmationEmail({
      to,
      customerName,
      orderId,
      items,
      grandTotal,
      shipping,
      orderUrl,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (err) {
    console.error('order-confirmation POST error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


