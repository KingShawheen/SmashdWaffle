import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { FOOD_ITEMS, COFFEE_ITEMS, NON_COFFEE_ITEMS } from '../app/menu/data';

export const seedMenuData = async () => {
  try {
    const batch = writeBatch(db);
    
    // Seed Food Items
    const foodCategoryRef = doc(collection(db, 'menu_categories'), 'food');
    batch.set(foodCategoryRef, { name: 'Gourmet SMASH\'d Waffles', sortOrder: 0 });
    for (const item of FOOD_ITEMS) {
      const itemRef = doc(collection(db, 'menu_items'), item.id);
      batch.set(itemRef, { ...item, categoryId: 'food' });
    }

    // Seed Coffee Items
    const coffeeCategoryRef = doc(collection(db, 'menu_categories'), 'coffee');
    batch.set(coffeeCategoryRef, { name: 'Craft Coffee', sortOrder: 1 });
    for (const item of COFFEE_ITEMS) {
      const itemRef = doc(collection(db, 'menu_items'), item.id);
      batch.set(itemRef, { ...item, categoryId: 'coffee' });
    }

    // Seed Non-Coffee Items
    const nonCoffeeCategoryRef = doc(collection(db, 'menu_categories'), 'non-coffee');
    batch.set(nonCoffeeCategoryRef, { name: 'Non-Coffee & Smoothies', sortOrder: 2 });
    for (const item of NON_COFFEE_ITEMS) {
      const itemRef = doc(collection(db, 'menu_items'), item.id);
      batch.set(itemRef, { ...item, categoryId: 'non-coffee' });
    }

    await batch.commit();
    console.log("Database seeded successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
