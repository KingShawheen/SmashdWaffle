import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, fieldsToUpdate } = body;
    const safeLocationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

    if (!orderId || !fieldsToUpdate) {
      return NextResponse.json({ error: 'Order ID and fieldsToUpdate are required' }, { status: 400 });
    }

    // 1. Fetch current order to get the latest version number
    const orderRes = await client.ordersApi.retrieveOrder(orderId);
    const currentOrder = orderRes.result.order;

    if (!currentOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 2. Perform the update
    // Note: The fieldsToUpdate object must map precisely to Square's Order object properties
    const updateResponse = await client.ordersApi.updateOrder(orderId, {
      order: {
        locationId: safeLocationId,
        version: currentOrder.version, // Version must match to avoid concurrency conflicts
        ...fieldsToUpdate
      },
      idempotencyKey: crypto.randomUUID()
    });

    return NextResponse.json({ success: true, order: updateResponse.result.order });
  } catch (err: any) {
    console.error("Update Order Error:", err);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
    return NextResponse.json({ error: 'Update failed', details: err.message }, { status: 500 });
  }
}
