import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { orderId, refundAmountCents, reason } = await request.json();
    
    if (!orderId || !refundAmountCents) {
      return NextResponse.json({ error: 'Order ID and refundAmountCents are required' }, { status: 400 });
    }

    // 1. Fetch Order to get the payment ID
    const orderRes = await client.ordersApi.retrieveOrder(orderId);
    const order = orderRes.result.order;

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 2. Find the payment to refund
    // In complex scenarios there might be multiple tenders (split payments). We default to the first one here.
    const tender = order.tenders?.[0];
    if (!tender || !tender.id) {
      return NextResponse.json({ error: 'No successful payment found on this order to refund' }, { status: 400 });
    }

    // Ensure we don't refund more than the original payment
    if (refundAmountCents > Number(tender.amountMoney?.amount)) {
      return NextResponse.json({ error: 'Refund amount cannot exceed original payment amount' }, { status: 400 });
    }

    // 3. Issue the Partial/Full Refund without modifying the order's active state
    // (This allows the kitchen to still fulfill the rest of the items)
    const refundRes = await client.refundsApi.refundPayment({
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: refundAmountCents,
        currency: 'USD'
      },
      paymentId: tender.id,
      reason: reason || 'Partial refund issued by admin'
    });

    return NextResponse.json({ success: true, refund: refundRes.result.refund });
  } catch (err: any) {
    console.error("Refund Order Error:", err);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
    return NextResponse.json({ error: 'Refund failed', details: err.message }, { status: 500 });
  }
}
