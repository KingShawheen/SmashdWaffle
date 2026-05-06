import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string; // Unique instance ID for the cart entry
  menuItemId: string;
  title: string;
  type: 'food' | 'coffee' | 'non-coffee';
  size?: string;
  basePrice: number;
  price: number; // Total price = basePrice + modifiers
  modifiers?: { name: string; price: number }[];
  quantity: number;
  imageUrl?: string;
  emoji?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (newItem) => set((state) => {
        // Check if identical item (same ID, size, and modifiers) already exists
        const existingIndex = state.items.findIndex((item) => {
          const sameItemAndSize = item.menuItemId === newItem.menuItemId && item.size === newItem.size;
          if (!sameItemAndSize) return false;
          
          const itemMods = item.modifiers || [];
          const newMods = newItem.modifiers || [];
          if (itemMods.length !== newMods.length) return false;
          
          // Sort and compare modifier names to ensure identical
          const itemModNames = itemMods.map(m => m.name).sort().join(',');
          const newModNames = newMods.map(m => m.name).sort().join(',');
          return itemModNames === newModNames;
        });

        if (existingIndex >= 0) {
          // Increment quantity if it already exists
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += newItem.quantity;
          return { items: updatedItems };
        }

        // Otherwise, add as a new item with a unique ID
        return { 
          items: [...state.items, { ...newItem, id: Math.random().toString(36).substring(2, 9) }] 
        };
      }),

      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),

      updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      })),

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'smashd-cart-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
