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

      if (item.modifiers && item.modifiers.length > 0) {
        lineItem.note = item.modifiers.map((m: any) => `+ ${m.name}`).join(', ');
      }

      return lineItem;
    });

    // Use CalculateOrder to get the exact Square totals (Bankers' rounding, native taxes)
    const calculateResponse = await client.ordersApi.calculateOrder({
      order: {
        locationId,
        lineItems,
        pricingOptions: {
          autoApplyTaxes: true,
          autoApplyDiscounts: true,
        }
      }
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
