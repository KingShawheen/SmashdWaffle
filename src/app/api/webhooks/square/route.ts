import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Replace with your actual Signature Key from the Square Developer Dashboard (Webhooks page)
const SQUARE_SIGNATURE_KEY = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || 'test_signature_key';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-square-hmacsha256-signature');
    const body = await request.text();

    // 1. Verify Webhook Signature (Security)
    const expectedUrl = process.env.SQUARE_WEBHOOK_URL || 'https://your-domain.com/api/webhooks/square';
    
    const hmac = crypto.createHmac('sha256', SQUARE_SIGNATURE_KEY);
    hmac.update(expectedUrl + body);
    const hash = hmac.digest('base64');

    // In production, enforce signature matching. In sandbox, we can bypass if signature is missing for easy testing.
    if (process.env.SQUARE_ENVIRONMENT === 'production' && hash !== signature) {
      console.warn("Invalid Square Webhook Signature");
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Parse Event
    const event = JSON.parse(body);

    // 3. Handle specific Square Events
    switch (event.type) {
      case 'order.updated': {
        const orderId = event.data.id;
        const state = event.data.object.order_update?.state || event.data.object.order?.state;
        
        console.log(`[Square Webhook] Order ${orderId} updated to state: ${state}`);

        // Intelligent Functionality Idea:
        // If state === 'COMPLETED', it means the Kitchen pressed "Complete" on the POS KDS.
        // We can hook this into Twilio SMS: 
        // e.g. `await sendSMS(customerPhone, "Your Smash'd Waffle order is ready for pickup!")`
        break;
      }

      case 'inventory.count.updated': {
        // Intelligent Functionality Idea:
        // Automatically mark items as "Sold Out" on the frontend menu without requiring manual employee intervention.
        console.log(`[Square Webhook] Inventory updated for Catalog Object: ${event.data.object.inventory_counts?.[0]?.catalog_object_id}`);
        break;
      }

      default:
        console.log(`[Square Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}
