import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';

// JSON stringify replacer for BigInt
const stringifyBigInt = (obj: any) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, locationId } = body;

    if (!items || !locationId || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Construct Square Line Items
    const lineItems = items.map((item: any) => {
      const priceInCents = Math.round(item.price * 100);

      const lineItem: any = {
        quantity: item.quantity.toString()
      };

      if (item.squareVariationId) {
        lineItem.catalogObjectId = item.squareVariationId;
      } else {
        // Fallback for custom or unmapped items
        lineItem.name = item.title;
        lineItem.basePriceMoney = {
          amount: BigInt(priceInCents),
          currency: 'USD'
        };
      }

      if (item.modifiers && item.modifiers.length > 0) {
        lineItem.note = item.modifiers.map((m: any) => `+ ${m.name}`).join(', ');
      }

      return lineItem;
    });

    // Use CalculateOrder to get the exact Square totals (Bankers' rounding, native taxes)
    const orderPayload: any = {
      locationId,
      lineItems,
      pricingOptions: {
        autoApplyTaxes: true,
        autoApplyDiscounts: true,
      }
    };

    if (body.taxRate) {
      orderPayload.taxes = [
        {
          name: 'Sales Tax',
          percentage: (body.taxRate * 100).toString(),
          scope: 'ORDER'
        }
      ];
    }

    const calculateResponse = await client.ordersApi.calculateOrder({
      order: orderPayload
    });

    const order = calculateResponse.result.order;
    
    if (!order) {
      throw new Error("Calculation failed");
    }

    return NextResponse.json(JSON.parse(stringifyBigInt(order)));

  } catch (error: any) {
    console.error("Calculate Order API Error:", error);
    if (error.errors) {
      console.error(JSON.stringify(error.errors, null, 2));
    }
    return NextResponse.json({ error: 'Failed to calculate order' }, { status: 500 });
  }
}
