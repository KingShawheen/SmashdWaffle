import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    // 1. Fetch Order to get the payment ID and location ID
    const orderRes = await client.ordersApi.retrieveOrder(orderId);
    const order = orderRes.result.order;

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Don't allow canceling if order is already completed
    if (order.state === 'COMPLETED' || order.fulfillments?.[0]?.state === 'COMPLETED' || order.state === 'CANCELED') {
      return NextResponse.json({ error: 'Order cannot be canceled at this stage. Please call the store.' }, { status: 400 });
    }

    // 2. Find the payment to refund
    const tender = order.tenders?.[0];
    if (tender && tender.id) {
      // Refund the exact amount of the tender
      await client.refundsApi.refundPayment({
        idempotencyKey: crypto.randomUUID(),
        amountMoney: tender.amountMoney!,
        paymentId: tender.id,
        reason: 'Customer requested cancellation via website'
      });
    }

    // 3. Cancel the order so it clears off the Kitchen Display
    await client.ordersApi.updateOrder(order.id!, {
      order: {
        locationId: order.locationId!,
        version: order.version,
        state: 'CANCELED'
      },
      idempotencyKey: crypto.randomUUID()
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Cancel Order Error:", err);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
    return NextResponse.json({ error: 'Cancellation failed. Please call the store for a refund.' }, { status: 500 });
  }
}
