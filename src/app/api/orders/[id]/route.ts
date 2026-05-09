import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';

// JSON stringify replacer for BigInt
const stringifyBigInt = (obj: any) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: orderId } = await params;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const response = await client.ordersApi.retrieveOrder(orderId);
    
    if (!response.result.order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = JSON.parse(stringifyBigInt(response.result.order));

    return NextResponse.json({ success: true, order });

  } catch (error: any) {
    console.error("Square Retrieve Order API Error:", error);
    return NextResponse.json({ error: 'Failed to retrieve order' }, { status: 500 });
  }
}
