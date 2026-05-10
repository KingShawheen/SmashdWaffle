import { Client, Environment } from 'square/legacy';
import { FOOD_ITEMS, COFFEE_ITEMS, NON_COFFEE_ITEMS } from './src/app/menu/data';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '.env.local') });

const squareClient = new Client({
  environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

async function checkSync() {
  try {
    const response = await squareClient.catalogApi.listCatalog(undefined, 'ITEM');
    const squareItems = response.result.objects || [];
    const squareNames = squareItems.map((s: any) => s.itemData?.name);

    const localItems = [...FOOD_ITEMS, ...COFFEE_ITEMS, ...NON_COFFEE_ITEMS];
    const localNames = localItems.map(l => l.title);

    console.log("=== ITEMS IN SQUARE BUT MISSING FROM PWA (EXTRAS) ===");
    const missingFromLocal = squareNames.filter(name => !localNames.includes(name));
    missingFromLocal.forEach(n => console.log(`- ${n}`));

    console.log("\n=== ITEMS IN PWA BUT MISSING FROM SQUARE (FAKE/SOLD OUT) ===");
    const missingFromSquare = localNames.filter(name => !squareNames.includes(name));
    missingFromSquare.forEach(n => console.log(`- ${n}`));

  } catch (error) {
    console.error("Error:", error);
  }
}

checkSync();
