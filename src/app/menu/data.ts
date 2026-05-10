export type FoodItem = {
  id: string;
  type: 'food';
  title: string;
  emojis: string;
  emojiBg: string;
  
  isChefChoice?: boolean;
  isSoldOut?: boolean;
  dietary?: ('V' | 'GF')[];
  imageUrl?: string;
};

export type DrinkItem = {
  id: string;
  type: 'coffee' | 'non-coffee';
  title: string;
  emoji: string;
  isSoldOut?: boolean;
  
  imageUrl?: string;
};

export type MenuItem = FoodItem | DrinkItem;

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'f1',
    type: 'food',
    title: 'Breakfast SMASH Waffle',
    emojis: '🧇 🥓 🍳 🧀 🥔 🧅',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    isChefChoice: true,
    imageUrl: '/assets/food/breakfast_smash.png'
  },
  {
    id: 'f2',
    type: 'food',
    title: 'Savory Bacon SMASH',
    emojis: '🧇 🥓 🍳 🧀',
    emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    imageUrl: '/assets/food/savory_bacon.png'
  },
  {
    id: 'f3',
    type: 'food',
    title: 'Waffle BLT',
    emojis: '🧇 🥓 🥬 🍅',
    emojiBg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    imageUrl: '/assets/food/waffle_blt.png'
  },
  {
    id: 'f4',
    type: 'food',
    title: 'Apple Pie',
    emojis: '🧇 🍎 🥧 ☁️',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    imageUrl: '/assets/food/apple_cinnamon.png'
  },
  {
    id: 'f5',
    type: 'food',
    title: 'Blueberry Lemon',
    emojis: '🧇 🫐 🍋 ☁️',
    emojiBg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    imageUrl: '/assets/food/blueberry_lemon.png'
  },
  {
    id: 'f6',
    type: 'food',
    title: "Breezy's Berry's",
    emojis: '🧇 🍓 🫐 ☁️',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    imageUrl: '/assets/food/breezys_berrys.png'
  },
  {
    id: 'f7',
    type: 'food',
    title: 'Banana, Almond Butter & Honey',
    emojis: '🧇 🍌 🥜 🍯',
    emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    imageUrl: '/assets/food/pb_banana.png'
  },
  {
    id: 'f8',
    type: 'food',
    title: 'Churro Waffle',
    emojis: '🧇 🤎 ☁️',
    emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    imageUrl: '/assets/food/churro_waffle.png'
  },
  {
    id: 'f9',
    type: 'food',
    title: 'PB & Jelly',
    emojis: '🧇 🥜 🍓',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    imageUrl: '/assets/food/pb_jelly.png'
  },
  {
    id: 'f10',
    type: 'food',
    title: 'Nutella Waffle',
    emojis: '🧇 🍫 🤎',
    emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    imageUrl: '/assets/food/nutella_waffle.png'
  },
  {
    id: 'f11',
    type: 'food',
    title: 'Strawberry Chocolate',
    emojis: '🧇 🍓 🍫 ☁️',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    imageUrl: '/assets/food/strawberry_chocolate.png'
  }
];

export const COFFEE_ITEMS: DrinkItem[] = [
  {
    id: 'c1',
    type: 'coffee',
    title: 'Americano',
    emoji: '☕️',
    imageUrl: '/assets/drinks/americano.png'
  },
  {
    id: 'c2',
    type: 'coffee',
    title: 'Longpour',
    emoji: '🫗',
    imageUrl: '/assets/drinks/longpour.png'
  },
  {
    id: 'c3',
    type: 'coffee',
    title: 'Latte / Mocha / Macchiato',
    emoji: '☕️',
    imageUrl: '/assets/drinks/latte.png'
  },
  {
    id: 'c4',
    type: 'coffee',
    title: 'Big Train Latte (Iced)',
    emoji: '🧊',
    imageUrl: '/assets/drinks/iced_latte.png'
  }
];

export const NON_COFFEE_ITEMS: DrinkItem[] = [
  {
    id: 'nc1',
    type: 'non-coffee',
    title: 'Italian Soda',
    emoji: '🥤',
    imageUrl: '/assets/drinks/italian_soda.png'
  },
  {
    id: 'nc2',
    type: 'non-coffee',
    title: 'Redbull Italian Soda',
    emoji: '🔋',
    imageUrl: '/assets/drinks/redbull_soda.png'
  },
  {
    id: 'nc3',
    type: 'non-coffee',
    title: 'Fruit Smoothie',
    emoji: '🥭',
    imageUrl: '/assets/drinks/smoothie.png'
  },
  {
    id: 'nc4',
    type: 'non-coffee',
    title: 'Juice (Orange, Apple)',
    emoji: '🧃',
    imageUrl: '/assets/drinks/juice.png'
  }
];
