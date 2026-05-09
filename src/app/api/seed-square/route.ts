import { NextResponse } from 'next/server';
import { squareClient } from '@/lib/square';
import { FOOD_ITEMS, COFFEE_ITEMS, NON_COFFEE_ITEMS } from '@/app/menu/data';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const objects: any[] = [];

    // Categories
    objects.push({
      type: 'CATEGORY',
      id: '#category-food',
      categoryData: { name: 'Gourmet SMASH\'d Waffles' }
    });
    objects.push({
      type: 'CATEGORY',
      id: '#category-coffee',
      categoryData: { name: 'Craft Coffee' }
    });
    objects.push({
      type: 'CATEGORY',
      id: '#category-non-coffee',
      categoryData: { name: 'Non-Coffee & Smoothies' }
    });

    // Food Items
    FOOD_ITEMS.forEach(item => {
      objects.push({
        type: 'ITEM',
        id: `#item-${item.id}`,
        itemData: {
          name: item.title,
          description: item.description,
          categoryId: '#category-food',
          variations: [
            {
              type: 'ITEM_VARIATION',
              id: `#item-var-${item.id}`,
              itemVariationData: {
                itemId: `#item-${item.id}`,
                name: 'Regular',
                pricingType: 'FIXED_PRICING',
                priceMoney: {
                  amount: BigInt(item.basePrice * 100),
                  currency: 'USD'
                }
              }
            }
          ]
        }
      });
    });

    // Coffee Items
    COFFEE_ITEMS.forEach(item => {
      const variations = item.prices.map((p, idx) => ({
        type: 'ITEM_VARIATION',
        id: `#item-var-${item.id}-${idx}`,
        itemVariationData: {
          itemId: `#item-${item.id}`,
          name: p.size,
          pricingType: 'FIXED_PRICING',
          priceMoney: {
            amount: BigInt(p.price * 100),
            currency: 'USD'
          }
        }
      }));

      objects.push({
        type: 'ITEM',
        id: `#item-${item.id}`,
        itemData: {
          name: item.title,
          description: item.description,
          categoryId: '#category-coffee',
          variations
        }
      });
    });

    // Non-Coffee Items
    NON_COFFEE_ITEMS.forEach(item => {
      const variations = item.prices.map((p, idx) => ({
        type: 'ITEM_VARIATION',
        id: `#item-var-${item.id}-${idx}`,
        itemVariationData: {
          itemId: `#item-${item.id}`,
          name: p.size,
          pricingType: 'FIXED_PRICING',
          priceMoney: {
            amount: BigInt(p.price * 100),
            currency: 'USD'
          }
        }
      }));

      objects.push({
        type: 'ITEM',
        id: `#item-${item.id}`,
        itemData: {
          name: item.title,
          description: item.description,
          categoryId: '#category-non-coffee',
          variations
        }
      });
    });

    const response = await squareClient.catalogApi.batchUpsertCatalogObjects({
      idempotencyKey: randomUUID(),
      batches: [
        {
          objects
        }
      ]
    });

    return NextResponse.json({ success: true, count: objects.length });
  } catch (error: any) {
    console.error("Square API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
