import { create } from 'zustand';

interface UiState {
  activeMenuTab: 'food' | 'drinks';
  setActiveMenuTab: (tab: 'food' | 'drinks') => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeMenuTab: 'food',
  setActiveMenuTab: (tab) => set({ activeMenuTab: tab }),
}));
