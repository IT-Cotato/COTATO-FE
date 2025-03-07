import { create } from 'zustand';

//
//
//

type CotatoFabOpenState = {
  isCotatoFabOpen: boolean;
};

type CotatoFabOpenActions = {
  toggleCotatoFabOpen: () => void;
};

//
//
//

/**
 * cotato floating action button store
 */
export const useCotatoFabOpenStore = create<CotatoFabOpenState & CotatoFabOpenActions>((set) => ({
  isCotatoFabOpen: false,
  toggleCotatoFabOpen: () => set((state) => ({ isCotatoFabOpen: !state.isCotatoFabOpen })),
}));
