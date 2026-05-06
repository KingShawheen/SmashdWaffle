export type FoodItem = {
  id: string;
  type: 'food';
  title: string;
  emojis: string;
  emojiBg: string;
  description: string;
  basePrice: number;
  isChefChoice?: boolean;
  isSoldOut?: boolean;
  dietary?: ('V' | 'GF')[];
  imageUrl?: string;
};

export type DrinkItem = {
  id: string;
  type: 'coffee' | 'non-coffee';
  title: string;
  description: string;
  emoji: string;
  isSoldOut?: boolean;
  prices: { size: string; price: number }[];
  imageUrl?: string;
};

export type MenuItem = FoodItem | DrinkItem;

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    type: 'food',
    title: 'Breakfast SMASH Waffle',
    emojis: '🧇 🥔 🥓 🍳 🧀',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Our most popular item! Tater tots pressed into a waffle, loaded with crispy bacon, egg, and cheese. Served with sour cream or salsa.',
    basePrice: 15.00,
    isChefChoice: true,
    imageUrl: '/assets/food/savory_bacon.png'
  },
  {
    id: 'f2',
    type: 'food',
    title: 'Savory Bacon SMASH',
    emojis: '🧇 🥓 🧀 🧈',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Crispy bacon baked directly into our signature golden waffle batter, topped with melted cheese and a dollop of sour cream.',
    basePrice: 15.00,
    imageUrl: '/assets/food/savory_bacon_new.png'
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
    ],
    imageUrl: '/assets/drinks/americano.png'
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
    ],
    imageUrl: '/assets/drinks/longpour.png'
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
    ],
    imageUrl: '/assets/drinks/latte.png'
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
    ],
    imageUrl: '/assets/drinks/iced_latte.png'
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
    ],
    imageUrl: '/assets/drinks/italian_soda.png'
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
    ],
    imageUrl: '/assets/drinks/redbull_soda.png'
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
    ],
    imageUrl: '/assets/drinks/smoothie.png'
  },
  {
    id: 'nc4',
    type: 'non-coffee',
    title: 'Juice (Orange, Apple)',
    description: 'Classic chilled fruit juices.',
    emoji: '🧃',
    prices: [
      { size: '12oz', price: 2.50 },
    ],
    imageUrl: '/assets/drinks/juice.png'
  }
];
