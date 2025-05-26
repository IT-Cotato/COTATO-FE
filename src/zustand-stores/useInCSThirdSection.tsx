import { create } from 'zustand';

//
//
//

type IsInCSThridSecionState = {
  isInCSThridSecion: boolean;
};

type IsInCSSecondSectionAction = {
  setIsInCSThirdSection: (value: boolean) => void;
};

//
//
//

export const useIsInCSThirdSection = create<IsInCSThridSecionState & IsInCSSecondSectionAction>(
  (set) => ({
    isInCSThridSecion: false,
    setIsInCSThirdSection: (value: boolean) => set({ isInCSThridSecion: value }),
  }),
);
