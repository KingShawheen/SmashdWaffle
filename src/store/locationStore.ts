import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Location {
  id: string;
  name: string;
  state: string;
  taxRate: number;
  squareLocationId: string;
}

export const LOCATIONS: Location[] = [
  { 
    id: 'deer-park', 
    name: 'Deer Park - FloState', 
    state: 'WA', 
    taxRate: 0.081, 
    squareLocationId: 'YOUR_SANDBOX_LOCATION_ID' 
  },
  { 
    id: 'coeur-dalene', 
    name: 'Coeur d\'Alene - Downtown', 
    state: 'ID', 
    taxRate: 0.06, 
    squareLocationId: 'IDAHO_LOCATION_ID' 
  }
];

interface LocationState {
  activeLocation: Location;
  setLocation: (locId: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      activeLocation: LOCATIONS[0],
      setLocation: (locId) => set({ activeLocation: LOCATIONS.find(l => l.id === locId) || LOCATIONS[0] })
    }),
    {
      name: 'smashd-location-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
