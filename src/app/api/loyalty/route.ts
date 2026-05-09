import { NextResponse } from 'next/server';
import { squareClient as client } from '@/lib/square';

// JSON stringify replacer for BigInt
const stringifyBigInt = (obj: any) => {
  return JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Square CRM works best with E.164 format. Ensure phone starts with +1 if it's 10 digits
    const normalizedPhone = phone.length === 10 ? `+1${phone}` : (phone.startsWith('+') ? phone : `+${phone}`);

    // 1. Search for Customer by Phone
    const searchResponse = await client.customersApi.searchCustomers({
      query: {
        filter: {
          phoneNumber: { exact: normalizedPhone }
        }
      }
    });

    let customers = searchResponse.result.customers || [];
    
    if (customers.length === 0) {
      // Try searching with the original numeric phone just in case it was saved without +1
      const fallbackSearch = await client.customersApi.searchCustomers({
        query: {
          filter: {
            phoneNumber: { exact: phone }
          }
        }
      });
      if (fallbackSearch.result.customers && fallbackSearch.result.customers.length > 0) {
        const fallbackCustomerId = fallbackSearch.result.customers[0].id;
        if (!fallbackCustomerId) return NextResponse.json({ points: 0, newCustomer: true });
        // Set up variables for later
        customers = [fallbackSearch.result.customers[0]];
      } else {
        return NextResponse.json({ points: 0, newCustomer: true });
      }
    }

    const customerId = customers[0].id;

    if (!customerId) {
      return NextResponse.json({ points: 0, newCustomer: true });
    }

    // 2. Fetch Loyalty Account for this Customer
    const loyaltyResponse = await client.loyaltyApi.searchLoyaltyAccounts({
      query: {
        customerIds: [customerId]
      }
    });

    const accounts = loyaltyResponse.result.loyaltyAccounts;

    if (!accounts || accounts.length === 0) {
      return NextResponse.json({ points: 0, customerId });
    }

    const account = accounts[0];
    const points = account.balance || 0;

    return NextResponse.json(JSON.parse(stringifyBigInt({ points, customerId, account })));

  } catch (error: any) {
    console.error("Loyalty API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch loyalty data' }, { status: 500 });
  }
}
