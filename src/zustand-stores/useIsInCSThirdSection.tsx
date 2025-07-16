import { create } from 'zustand';

//
//
//

type IsInCSThirdSecionState = {
  isInCSThirdSection: boolean;
};

type IsInCSThirdSecionAction = {
  setIsInCSThirdSection: (value: boolean) => void;
};

//
//
//

export const useIsInCSThirdSection = create<IsInCSThirdSecionState & IsInCSThirdSecionAction>(
  (set) => ({
    isInCSThirdSection: false,
    setIsInCSThirdSection: (value: boolean) => set({ isInCSThirdSection: value }),
  }),
);
