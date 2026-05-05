export type FoodItem = {
  id: string;
  type: 'food';
  title: string;
  emojis: string;
  emojiBg: string;
  description: string;
  basePrice: number;
  isChefChoice?: boolean;
};

export type DrinkItem = {
  id: string;
  type: 'coffee' | 'non-coffee';
  title: string;
  prices: { size: string; price: number }[];
};

export type MenuItem = FoodItem | DrinkItem;

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    type: 'food',
    title: 'Breakfast SMASH',
    emojis: '🧇 🥓 🍳 🧀 🥔',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Bacon, Egg, Cheese, and Tater Tots.',
    basePrice: 15.00,
    isChefChoice: true,
  },
  {
    id: 'f2',
    type: 'food',
    title: "SMASH'D Omelette",
    emojis: '🥩 🥚 🫑 🍄 🧀',
    emojiBg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    description: '3 Eggs, Ham/Sausage, Bell Peppers, Mushrooms, Cheese. [GF]',
    basePrice: 13.00,
  },
  {
    id: 'f3',
    type: 'food',
    title: 'Plain Waffle',
    emojis: '🧇 🧈 🍁',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Classic golden waffle. [V] [Gluten-Friendly Option]',
    basePrice: 10.00,
  },
  {
    id: 'f4',
    type: 'food',
    title: 'Dessert Waffles',
    emojis: '🧇 🍪 🍫 🍨',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Oreo, Reese’s, or Ice Cream topping. [V]',
    basePrice: 15.00,
  },
  {
    id: 'f5',
    type: 'food',
    title: 'Waffle BLT',
    emojis: '🧇 🥓 🥬 🍅 🥑',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Bacon, Lettuce, Tomato, Guacamole.',
    basePrice: 15.00,
  },
  {
    id: 'f6',
    type: 'food',
    title: 'Acai Bowl',
    emojis: '🥣 🍌 🫐 🥜 🍯',
    emojiBg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    description: 'Acai, Granola, Banana, Blueberries, PB & Honey. [V] [GF]',
    basePrice: 15.00,
  }
];

export const COFFEE_ITEMS: DrinkItem[] = [
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

export const NON_COFFEE_ITEMS: DrinkItem[] = [
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
