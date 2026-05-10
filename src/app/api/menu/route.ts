import { NextResponse } from 'next/server';
import { squareClient } from '@/lib/square';

function convertBigIntsToNumbers(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return Number(obj);
  if (Array.isArray(obj)) return obj.map(convertBigIntsToNumbers);
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = convertBigIntsToNumbers(obj[key]);
    }
    return newObj;
  }
  return obj;
}

// ==========================================
// ANTI-BOT SPAM PROTECTION (Rate Limiting)
// ==========================================
const menuRateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkMenuRateLimit(ip: string): boolean {
  const WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 60; // Max 60 menu fetches per minute per IP

  const now = Date.now();
  const record = menuRateLimitMap.get(ip);

  if (!record) {
    menuRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > WINDOW_MS) {
    menuRateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of menuRateLimitMap.entries()) {
    if (now - record.lastReset > 60 * 1000) {
      menuRateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkMenuRateLimit(ip)) {
      console.warn(`[SECURITY] Bot blocked. Too many menu fetch attempts from IP: ${ip}`);
      return NextResponse.json({ error: 'Too many requests. Please wait a minute before trying again.' }, { status: 429 });
    }
    // Fetch all items from Square Catalog, including Images
    const response = await squareClient.catalogApi.listCatalog(undefined, 'ITEM,CATEGORY,IMAGE');
    
    const objects = response.result.objects || [];
    
    // Create an image map
    const imageMap = new Map();
    objects.filter(obj => obj.type === 'IMAGE').forEach(img => {
      if (img.imageData && img.imageData.url) {
        imageMap.set(img.id, img.imageData.url);
      }
    });

    // Attach image URLs to items
    const itemsWithImages = objects.map(obj => {
      if (obj.type === 'ITEM' && obj.itemData && obj.itemData.imageIds && obj.itemData.imageIds.length > 0) {
        const primaryImageId = obj.itemData.imageIds[0];
        if (imageMap.has(primaryImageId)) {
          return {
            ...obj,
            resolvedImageUrl: imageMap.get(primaryImageId)
          };
        }
      }
      return obj;
    });

    // Convert BigInts to regular numbers so JSON can serialize them
    const safeObjects = convertBigIntsToNumbers(itemsWithImages);

    return NextResponse.json({ success: true, catalog: safeObjects });
  } catch (error: any) {
    console.error("Square API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
