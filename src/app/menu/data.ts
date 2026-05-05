export type FoodItem = {
  id: string;
  type: 'food';
  title: string;
  emojis: string;
  emojiBg: string;
  description: string;
  basePrice: number;
  isChefChoice?: boolean;
  dietary?: ('V' | 'GF')[];
  imageUrl?: string;
};

export type DrinkItem = {
  id: string;
  type: 'coffee' | 'non-coffee';
  title: string;
  description: string;
  emoji: string;
  prices: { size: string; price: number }[];
};

export type MenuItem = FoodItem | DrinkItem;

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    type: 'food',
    title: 'Savory Bacon SMASH',
    emojis: '🧇 🥓 🧀 🧅',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Bacon baked into the waffle, topped with sour cream and scallions.',
    basePrice: 15.00,
    isChefChoice: true,
    imageUrl: '/assets/food/savory_bacon.png'
  },
  {
    id: 'f2',
    type: 'food',
    title: 'Strawberry Chocolate',
    emojis: '🧇 🍓 🍫 🍦',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    description: 'Fresh strawberries, chocolate drizzle, and whipped cream.',
    basePrice: 13.00,
    dietary: ['V'],
    imageUrl: '/assets/food/strawberry_chocolate.png'
  },
  {
    id: 'f3',
    type: 'food',
    title: 'PB & Jelly Waffle',
    emojis: '🧇 🥜 🍇 🍦',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Peanut butter drizzle, strawberry jam, and whipped cream.',
    basePrice: 12.00,
    dietary: ['V'],
    imageUrl: '/assets/food/pb_jelly.png'
  },
  {
    id: 'f4',
    type: 'food',
    title: 'Apple Cinnamon',
    emojis: '🧇 🍎 🍯 🍦',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Warm spiced apples, vanilla icing, and whipped cream.',
    basePrice: 14.00,
    dietary: ['V'],
    imageUrl: '/assets/food/apple_cinnamon.png'
  },
  {
    id: 'f5',
    type: 'food',
    title: 'PB & Banana',
    emojis: '🧇 🥜 🍌',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Fresh banana slices and creamy peanut butter drizzle.',
    basePrice: 12.00,
    dietary: ['V'],
    imageUrl: '/assets/food/pb_banana.png'
  },
  {
    id: 'f6',
    type: 'food',
    title: 'Waffle BLT',
    emojis: '🧇 🥓 🥬 🍅 🥑',
    emojiBg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    description: 'Bacon, Lettuce, Tomato, Guacamole.',
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
