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
    imageUrl: '/assets/food/savory_bacon.png'

  },
  {
    id: 'f12',
    type: 'food',
    title: 'Plain Waffle',
    emojis: '🧇 🧈 🍁',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    dietary: ['V'],
    imageUrl: '/assets/food/plain_waffle.png'
  },
  {
    id: 'f13',
    type: 'food',
    title: 'Signature Waffle',
    emojis: '🧇 🍓 🍫 🧁',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    imageUrl: '/assets/food/signature_waffle.png'
  },
  {
    id: 'f14',
    type: 'food',
    title: 'Biscuit Waffle & Gravy',
    emojis: '🧇 🥓 🍳 🥘',
    emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    imageUrl: '/assets/food/biscuit_gravy_waffle.png'
  },
  {
    id: 'f15',
    type: 'food',
    title: 'Extra Sauce',
    emojis: '🥣 🧈 🍯',
    emojiBg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    imageUrl: '/assets/food/extra_sauce.png'
  },
  {
    id: 'f16',
    type: 'food',
    title: 'Jr Waffle',
    emojis: '🧇 🧈',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    imageUrl: '/assets/food/jr_waffle.png'
  },
  {
    id: 'f17',
    type: 'food',
    title: 'Garden Waffle',
    emojis: '🧇 🥬 🥓 🍳 🧀',
    emojiBg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    imageUrl: '/assets/food/garden_waffle.png'
  },
  {
    id: 'f18',
    type: 'food',
    title: 'Omelette Waffle',
    emojis: '🧇 🍳 🧀 🍄 🫑',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    imageUrl: '/assets/food/omelette_waffle.png'
  },
  {
    id: 'f19',
    type: 'food',
    title: 'Side of Gravy',
    emojis: '🥣 🥘',
    emojiBg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    imageUrl: '/assets/food/side_gravy.png'
  },
  {
    id: 'f20',
    type: 'food',
    title: 'Dessert Waffle',
    emojis: '🧇 🍬 🍫 ☁️',
    emojiBg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    imageUrl: '/assets/food/dessert_waffle.png'
  },
  {
    id: 'f21',
    type: 'food',
    title: 'Acai Bowl',
    emojis: '🥣 🫐 🍓 🍌',
    emojiBg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    imageUrl: '/assets/food/acai_bowl.png'
  },
  {
    id: 'f22',
    type: 'food',
    title: 'Limited Time Breakfast Special',
    emojis: '🧇 ✨ 🍓 🍳',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    imageUrl: '/assets/food/limited_special.png'
  },
  {
    id: 'f23',
    type: 'food',
    title: 'Breakfast Special',
    emojis: '🧇 🥓 🍳 🍓 ☕',
    emojiBg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    imageUrl: '/assets/food/breakfast_special.png'
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
    title: 'Latte',
    emoji: '🥛',
    imageUrl: '/assets/drinks/latte.png'
  },
  {
    id: 'c3_1',
    type: 'coffee',
    title: 'Mocha',
    emoji: '🍫',
    imageUrl: '/assets/drinks/mocha.png'
  },
  {
    id: 'c3_2',
    type: 'coffee',
    title: 'Macchiato',
    emoji: '☕️',
    imageUrl: '/assets/drinks/macchiato.png'
  },
  {
    id: 'c4',
    type: 'coffee',
    title: 'Big Train',
    emoji: '🧊',
    imageUrl: '/assets/drinks/iced_latte.png'
  },
  {
    id: 'c5',
    type: 'coffee',
    title: 'Espresso Extra Shot',
    emoji: '☕️',
    imageUrl: '/assets/drinks/espresso_shot.png'
  },
  {
    id: 'c6',
    type: 'coffee',
    title: 'Drip Coffee',
    emoji: '☕️',
    imageUrl: '/assets/drinks/drip_coffee.png'
  },
  {
    id: 'c7',
    type: 'coffee',
    title: 'Breve',
    emoji: '🥛',
    imageUrl: '/assets/drinks/breve.png'
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
    title: 'Kids 12oz Juice',
    emoji: '🧃',
    imageUrl: '/assets/drinks/juice.png'
  },
  {
    id: 'nc5',
    type: 'non-coffee',
    title: 'Iced Tea',
    emoji: '🍋',
    imageUrl: '/assets/drinks/iced_tea.png'
  },
  {
    id: 'nc6',
    type: 'non-coffee',
    title: 'Chai Tea',
    emoji: '🍵',
    imageUrl: '/assets/drinks/chai_tea.png'
  },
  {
    id: 'nc7',
    type: 'non-coffee',
    title: 'Lotus Drink',
    emoji: '🪷',
    imageUrl: '/assets/drinks/lotus.png'
  },
  {
    id: 'nc8',
    type: 'non-coffee',
    title: 'Hot Chocolate',
    emoji: '🍫',
    imageUrl: '/assets/drinks/hot_chocolate.png'
  },
  {
    id: 'nc9',
    type: 'non-coffee',
    title: 'Seasonal 32 Oz Bucket',
    emoji: '🪣',
    imageUrl: '/assets/drinks/bucket_drink.png'
  },
  {
    id: 'nc10',
    type: 'non-coffee',
    title: 'Extra Flavoring',
    emoji: '🍯',
    imageUrl: '/assets/drinks/extra_flavoring.png'
  }
];
