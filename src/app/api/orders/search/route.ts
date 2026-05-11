import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stateFilter, customerId, dateRange, limit = 50 } = body;
    const safeLocationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

    // Construct the query object dynamically based on provided filters
    const query: any = {
      filter: {
        stateFilter: stateFilter ? { states: stateFilter } : undefined,
        customerFilter: customerId ? { customerIds: [customerId] } : undefined,
      },
      sort: {
        sortField: 'CREATED_AT',
        sortOrder: 'DESC'
      }
    };

    if (dateRange && dateRange.startAt && dateRange.endAt) {
      query.filter.dateTimeFilter = {
        createdAt: {
          startAt: dateRange.startAt,
          endAt: dateRange.endAt
        }
      };
    }

    const searchResponse = await client.ordersApi.searchOrders({
      locationIds: [safeLocationId],
      query: query,
      limit: limit
    });

    return NextResponse.json({ 
      success: true, 
      orders: searchResponse.result.orders || [],
      cursor: searchResponse.result.cursor
    });
  } catch (err: any) {
    console.error("Search Orders Error:", err);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
    return NextResponse.json({ error: 'Search failed', details: err.message }, { status: 500 });
  }
}
