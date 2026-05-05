"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMenuData = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("./firebase");
const data_1 = require("../app/menu/data");
const seedMenuData = async () => {
    try {
        const batch = (0, firestore_1.writeBatch)(firebase_1.db);
        // Seed Food Items
        const foodCategoryRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'menu_categories'), 'food');
        batch.set(foodCategoryRef, { name: 'Gourmet SMASH\'d Waffles', sortOrder: 0 });
        for (const item of data_1.FOOD_ITEMS) {
            const itemRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'menu_items'), item.id);
            batch.set(itemRef, { ...item, categoryId: 'food' });
        }
        // Seed Coffee Items
        const coffeeCategoryRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'menu_categories'), 'coffee');
        batch.set(coffeeCategoryRef, { name: 'Craft Coffee', sortOrder: 1 });
        for (const item of data_1.COFFEE_ITEMS) {
            const itemRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'menu_items'), item.id);
            batch.set(itemRef, { ...item, categoryId: 'coffee' });
        }
        // Seed Non-Coffee Items
        const nonCoffeeCategoryRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'menu_categories'), 'non-coffee');
        batch.set(nonCoffeeCategoryRef, { name: 'Non-Coffee & Smoothies', sortOrder: 2 });
        for (const item of data_1.NON_COFFEE_ITEMS) {
            const itemRef = (0, firestore_1.doc)((0, firestore_1.collection)(firebase_1.db, 'menu_items'), item.id);
            batch.set(itemRef, { ...item, categoryId: 'non-coffee' });
        }
        await batch.commit();
        console.log("Database seeded successfully!");
        return true;
    }
    catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
};
exports.seedMenuData = seedMenuData;
