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

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all items from Square Catalog
    const response = await squareClient.catalogApi.listCatalog(undefined, 'ITEM,CATEGORY');
    
    const objects = response.result.objects || [];
    
    // Convert BigInts to regular numbers so JSON can serialize them
    const safeObjects = convertBigIntsToNumbers(objects);

    return NextResponse.json({ success: true, catalog: safeObjects });
  } catch (error: any) {
    console.error("Square API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
