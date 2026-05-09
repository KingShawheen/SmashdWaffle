import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';
import crypto from 'crypto';

// JSON stringify replacer for BigInt
const stringifyBigInt = (obj: any) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, items, customerDetails, locationId, idempotencyKey } = body;

    const sourceId = typeof token === 'string' ? token : token.token;

    if (!sourceId || !items || !locationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Resolve Square Customer (For Loyalty Integration)
    let customerId: string | undefined = undefined;
    
    if (customerDetails.phone || customerDetails.email) {
      try {
        const rawPhone = customerDetails.phone ? customerDetails.phone.replace(/\D/g, '') : '';
        const normalizedPhone = rawPhone.length === 10 ? `+1${rawPhone}` : (rawPhone ? `+${rawPhone}` : undefined);

        // Step 1: Search for existing customer by Phone or Email
        const searchResponse = await client.customersApi.searchCustomers({
          query: {
            filter: {
              emailAddress: customerDetails.email ? { exact: customerDetails.email } : undefined,
              phoneNumber: normalizedPhone ? { exact: normalizedPhone } : undefined,
            }
          }
        });

        if (searchResponse.result.customers && searchResponse.result.customers.length > 0) {
          customerId = searchResponse.result.customers[0].id;
        } else {
          // Step 2: Create new customer if not found
          const createResponse = await client.customersApi.createCustomer({
            givenName: customerDetails.name?.split(' ')[0],
            familyName: customerDetails.name?.split(' ').slice(1).join(' '),
            emailAddress: customerDetails.email || undefined,
            phoneNumber: normalizedPhone || undefined,
            idempotencyKey: idempotencyKey ? `${idempotencyKey}-customer` : crypto.randomUUID()
          });
          customerId = createResponse.result.customer?.id;
        }
      } catch (custError) {
        console.error("Warning: Failed to resolve Square Customer. Order will proceed as guest.", custError);
        // Continue without customerId to ensure payment succeeds even if CRM fails
      }
    }

    // 2. Construct Square Line Items
    const lineItems = items.map((item: any) => {
      // Calculate total item price (base + modifiers) per quantity 1
      const priceInCents = Math.round(item.price * 100);

      const lineItem: any = {
        name: item.title,
        quantity: item.quantity.toString(),
        basePriceMoney: {
          amount: BigInt(priceInCents),
          currency: 'USD'
        }
      };

      if (item.squareVariationId) {
        lineItem.catalogObjectId = item.squareVariationId;
      }

      // Add modifiers as notes or custom line items if needed
      if (item.modifiers && item.modifiers.length > 0) {
        lineItem.note = item.modifiers.map((m: any) => `+ ${m.name}`).join(', ');
      }

      return lineItem;
    });

    // 3. Create the Order in Square
    // We delegate tax and discount math entirely to Square's native configuration.
    const orderResponse = await client.ordersApi.createOrder({
      order: {
        locationId,
        lineItems,
        pricingOptions: {
          autoApplyTaxes: true,
          autoApplyDiscounts: true,
        },
        customerId: customerId, // Links order to Loyalty Program
        fulfillments: [
          {
            type: 'PICKUP',
            state: 'PROPOSED',
            pickupDetails: {
              recipient: {
                displayName: customerDetails.name || 'Guest',
                emailAddress: customerDetails.email || undefined,
                phoneNumber: customerDetails.phone || undefined
              },
              scheduleType: 'ASAP',
              pickupAt: new Date(Date.now() + 15 * 60000).toISOString(),
              note: customerDetails.orderNotes || undefined
            }
          }
        ]
      },
      idempotencyKey: idempotencyKey ? `${idempotencyKey}-order` : crypto.randomUUID()
    });

    const order = orderResponse.result.order;
    if (!order || !order.id) {
      throw new Error("Order creation failed");
    }

    // 3. Process Payment using the Order ID and exact order amount
    const paymentAmount = order.totalMoney?.amount;
    
    if (!paymentAmount) {
      throw new Error("Order total could not be determined");
    }

    const paymentResponse = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: idempotencyKey ? `${idempotencyKey}-payment` : crypto.randomUUID(),
      amountMoney: {
        amount: paymentAmount,
        currency: 'USD'
      },
      orderId: order.id,
      customerId: customerId, // Links payment to customer CRM
      buyerEmailAddress: customerDetails.email || undefined,
      note: `Pickup: ${customerDetails.pickupTime} | Name: ${customerDetails.name} | Phone: ${customerDetails.phone} | Notes: ${customerDetails.orderNotes}`
    });

    const parsedPayment = JSON.parse(stringifyBigInt(paymentResponse.result));
    const parsedOrder = JSON.parse(stringifyBigInt(order));

    return NextResponse.json({ success: true, payment: parsedPayment, order: parsedOrder });

  } catch (error: any) {
    console.error("Order API Error:", error);
    // Extract Square specific errors if present
    if (error.errors) {
      console.error(JSON.stringify(error.errors, null, 2));
    }
    return NextResponse.json({ error: 'Failed to process order', details: error.message }, { status: 500 });
  }
}
