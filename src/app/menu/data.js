"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NON_COFFEE_ITEMS = exports.COFFEE_ITEMS = exports.FOOD_ITEMS = void 0;
exports.FOOD_ITEMS = [
    {
        id: 'f1',
        type: 'food',
        title: 'Breakfast SMASH Waffle',
        emojis: '🧇 🥔 🥓 🍳 🧀',
        emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        description: 'Our most popular item! Tater tots pressed into a waffle, loaded with crispy bacon, egg, and cheese. Served with sour cream or salsa.',
        basePrice: 15.00,
        isChefChoice: true,
        imageUrl: '/assets/food/breakfast_smash.png'
    },
    {
        id: 'f2',
        type: 'food',
        title: 'Savory Bacon SMASH',
        emojis: '🧇 🥓 🧀 🧈',
        emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        description: 'Crispy bacon baked directly into our signature golden waffle batter, topped with melted cheese and a dollop of sour cream.',
        basePrice: 15.00,
        imageUrl: '/assets/food/savory_bacon.png'
    },
    {
        id: 'f3',
        type: 'food',
        title: 'Waffle BLT',
        emojis: '🧇 🥓 🥬 🍅 🥑',
        emojiBg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        description: 'A crispy waffle acting as the bread, filled with sizzling bacon, fresh lettuce, sliced tomato, and creamy guacamole.',
        basePrice: 15.00,
        imageUrl: '/assets/food/waffle_blt.png'
    },
    {
        id: 'f4',
        type: 'food',
        title: 'Apple Pie',
        emojis: '🧇 🍎 🥧 🍦',
        emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        description: 'Warm, spiced apple filling over a fresh waffle, drizzled with vanilla icing and topped with whipped cream.',
        basePrice: 14.00,
        dietary: ['V'],
        imageUrl: '/assets/food/apple_cinnamon.png'
    },
    {
        id: 'f5',
        type: 'food',
        title: 'Blueberry Lemon',
        emojis: '🧇 🫐 🍋 🍦',
        emojiBg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
        description: 'Fresh plump blueberries, zesty lemon icing, and a dollop of whipped cream.',
        basePrice: 12.00,
        dietary: ['V'],
        imageUrl: '/assets/food/blueberry_lemon.png'
    },
    {
        id: 'f6',
        type: 'food',
        title: 'Breezy\'s Berry\'s',
        emojis: '🧇 🍓 🫐 🍦',
        emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
        description: 'A mixed berry overload! Strawberries, blueberries, and raspberries topped with whipped cream and berry syrup.',
        basePrice: 12.00,
        dietary: ['V'],
        imageUrl: '/assets/food/breezys_berrys.png'
    },
    {
        id: 'f7',
        type: 'food',
        title: 'Banana, Almond Butter & Honey',
        emojis: '🧇 🍌 🥜 🍯',
        emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        description: 'Freshly sliced bananas, rich almond butter drizzle, and sweet golden honey.',
        basePrice: 12.00,
        dietary: ['V'],
        imageUrl: '/assets/food/pb_banana.png'
    },
    {
        id: 'f8',
        type: 'food',
        title: 'Churro Waffle',
        emojis: '🧇 🥮 🍯 🍦',
        emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
        description: 'Coated in cinnamon sugar and drizzled generously with rich caramel sauce and whipped cream.',
        basePrice: 12.00,
        dietary: ['V'],
        imageUrl: '/assets/food/churro_waffle.png'
    },
    {
        id: 'f9',
        type: 'food',
        title: 'PB & Jelly',
        emojis: '🧇 🥜 🍇 🍦',
        emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        description: 'The classic combo reimagined. Creamy peanut butter drizzle, sweet strawberry jam, and whipped cream.',
        basePrice: 12.00,
        dietary: ['V'],
        imageUrl: '/assets/food/pb_jelly.png'
    },
    {
        id: 'f10',
        type: 'food',
        title: 'Nutella Waffle',
        emojis: '🧇 🍫 🌰 🍦',
        emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
        description: 'Generously smeared and drizzled with thick chocolate hazelnut spread, finished with powdered sugar.',
        basePrice: 12.00,
        dietary: ['V'],
        imageUrl: '/assets/food/nutella_waffle.png'
    },
    {
        id: 'f11',
        type: 'food',
        title: 'Strawberry Chocolate',
        emojis: '🧇 🍓 🍫 🍦',
        emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
        description: 'A golden waffle layered with fresh sliced strawberries, rich chocolate drizzle, and whipped cream.',
        basePrice: 13.00,
        dietary: ['V'],
        imageUrl: '/assets/food/strawberry_chocolate.png'
    }
];
exports.COFFEE_ITEMS = [
    {
        id: 'c1',
        type: 'coffee',
        title: 'Americano',
        description: 'Rich, full-bodied espresso pulled over hot water.',
        emoji: '☕️',
        prices: [
            { size: '12oz', price: 3.00 },
            { size: '16oz', price: 3.50 },
            { size: '20oz', price: 4.00 },
            { size: '24oz', price: 4.50 },
        ]
    },
    {
        id: 'c2',
        type: 'coffee',
        title: 'Longpour',
        description: 'Our signature house drip, roasted to perfection.',
        emoji: '🫗',
        prices: [
            { size: '12oz', price: 2.50 },
            { size: '16oz', price: 3.00 },
            { size: '20oz', price: 3.50 },
            { size: '24oz', price: 4.00 },
        ]
    },
    {
        id: 'c3',
        type: 'coffee',
        title: 'Latte / Mocha / Macchiato',
        description: 'Espresso balanced with expertly steamed milk.',
        emoji: '🥛',
        prices: [
            { size: '12oz', price: 4.00 },
            { size: '16oz', price: 4.50 },
            { size: '20oz', price: 5.00 },
            { size: '24oz', price: 5.50 },
        ]
    },
    {
        id: 'c4',
        type: 'coffee',
        title: 'Big Train Latte (Iced)',
        description: 'Blended or iced specialty latte with intense flavor.',
        emoji: '🧊',
        prices: [
            { size: '12oz', price: 4.50 },
            { size: '16oz', price: 5.00 },
            { size: '20oz', price: 5.50 },
            { size: '24oz', price: 6.00 },
        ]
    }
];
exports.NON_COFFEE_ITEMS = [
    {
        id: 'nc1',
        type: 'non-coffee',
        title: 'Italian Soda',
        description: 'Sparkling soda water customized with your favorite syrup.',
        emoji: '🥤',
        prices: [
            { size: '12oz', price: 4.50 },
            { size: '16oz', price: 5.25 },
            { size: '20oz', price: 6.00 },
            { size: '24oz', price: 6.75 },
        ]
    },
    {
        id: 'nc2',
        type: 'non-coffee',
        title: 'Redbull Italian Soda',
        description: 'High-energy Italian soda infused with Redbull.',
        emoji: '🔋',
        prices: [
            { size: '12oz', price: 5.50 },
            { size: '16oz', price: 6.50 },
            { size: '20oz', price: 7.50 },
            { size: '24oz', price: 8.25 },
        ]
    },
    {
        id: 'nc3',
        type: 'non-coffee',
        title: 'Fruit Smoothie',
        description: 'Blended fresh fruit smoothie. Perfect for a hot day.',
        emoji: '🥭',
        prices: [
            { size: '12oz', price: 4.00 },
            { size: '16oz', price: 4.50 },
            { size: '20oz', price: 5.00 },
            { size: '24oz', price: 5.50 },
        ]
    },
    {
        id: 'nc4',
        type: 'non-coffee',
        title: 'Juice (Orange, Apple)',
        description: 'Classic chilled fruit juices.',
        emoji: '🧃',
        prices: [
            { size: '12oz', price: 2.50 },
        ]
    }
];
