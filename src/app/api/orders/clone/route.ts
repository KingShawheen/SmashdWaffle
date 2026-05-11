import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();
    
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // 1. Fetch the original order
    const orderRes = await client.ordersApi.retrieveOrder(orderId);
    const originalOrder = orderRes.result.order;

    if (!originalOrder || !originalOrder.lineItems) {
      return NextResponse.json({ error: 'Order not found or has no line items' }, { status: 404 });
    }

    // 2. Map original line items into a clean array for a new order
    // We strip out UID, catalogObjectIds, etc., to allow Square to recalculate pricing against the live catalog
    const clonedLineItems = originalOrder.lineItems.map(item => {
      const newItem: any = {
        quantity: item.quantity,
        name: item.name,
        basePriceMoney: item.basePriceMoney,
        note: item.note
      };

      if (item.catalogObjectId) {
        newItem.catalogObjectId = item.catalogObjectId;
      }

      if (item.modifiers && item.modifiers.length > 0) {
        newItem.modifiers = item.modifiers.map(mod => ({
          catalogObjectId: mod.catalogObjectId,
          name: mod.name,
          basePriceMoney: mod.basePriceMoney
        }));
      }

      return newItem;
    });

    // We do NOT create the order yet. We return the line items so the frontend can populate the user's cart.
    // This allows the user to review the cloned order, change pickup times, or modify items before checking out.
    return NextResponse.json({ 
      success: true, 
      clonedCartItems: clonedLineItems 
    });
  } catch (err: any) {
    console.error("Clone Order Error:", err);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
    return NextResponse.json({ error: 'Cloning failed', details: err.message }, { status: 500 });
  }
}
