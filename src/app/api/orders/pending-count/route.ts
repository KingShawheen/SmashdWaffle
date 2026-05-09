import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json({ count: 0 });
    }

    const response = await client.ordersApi.searchOrders({
      locationIds: [locationId],
      query: {
        filter: {
          stateFilter: {
            states: ['OPEN']
          }
        }
      },
      limit: 50 // We just need a rough count for load balancing
    });

    const count = response.result.orders ? response.result.orders.length : 0;
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching pending order count from Square:", error);
    return NextResponse.json({ count: 0 });
  }
}
