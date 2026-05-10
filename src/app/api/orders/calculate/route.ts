import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';
import { FOOD_ITEMS, COFFEE_ITEMS, NON_COFFEE_ITEMS } from '@/app/menu/data';

// ==========================================
// ANTI-BOT SPAM PROTECTION (Rate Limiting)
// ==========================================
const calcRateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkCalcRateLimit(ip: string): boolean {
  const WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 30; // Max 30 calculation attempts per minute per IP (Higher limit since it recalculates on cart changes)

  const now = Date.now();
  const record = calcRateLimitMap.get(ip);

  if (!record) {
    calcRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > WINDOW_MS) {
    calcRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up the memory map periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of calcRateLimitMap.entries()) {
    if (now - record.lastReset > 60 * 1000) {
      calcRateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 mins

// JSON stringify replacer for BigInt
const stringifyBigInt = (obj: any) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
};

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkCalcRateLimit(ip)) {
      console.warn(`[SECURITY] Bot blocked. Too many calculation attempts from IP: ${ip}`);
      return NextResponse.json({ error: 'Too many requests. Please wait a minute before trying again.' }, { status: 429 });
    }

    const body = await request.json();
    const { items } = body;
    const safeLocationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

    if (!items || items.length === 0 || !safeLocationId) {
      return NextResponse.json({ error: 'Missing required fields or server configuration' }, { status: 400 });
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
        console.error(`[CRITICAL SECURITY WARNING] Ad-hoc item requested with no Square ID: ${item.title}`);
        throw new Error(`Invalid item: ${item.title}`);
      }

      if (item.modifiers && item.modifiers.length > 0) {
        lineItem.note = item.modifiers.map((m: any) => `+ ${m.name}`).join(', ');
      }

      return lineItem;
    });

    // Use CalculateOrder to get the exact Square totals (Bankers' rounding, native taxes)
    const orderPayload: any = {
      locationId: safeLocationId,
      lineItems,
      pricingOptions: {
        autoApplyTaxes: true,
        autoApplyDiscounts: true,
      }
    };


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
