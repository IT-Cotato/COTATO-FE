import { create } from 'zustand';

//
//
//

type JoinusModalOpenState = {
  isJoinusModalOpen: boolean;
};

type JoinusModalOpenAction = {
  setIsJoinusModalOpen: (isOpen: boolean) => void;
};

//
//
//

/**
 * Store for managing the state of the JoinUS modal in Home First Section.
 */
export const useJoinusModalOpenStore = create<JoinusModalOpenState & JoinusModalOpenAction>(
  (set) => ({
    isJoinusModalOpen: false,
    setIsJoinusModalOpen: (isOpen: boolean) => {
      set({ isJoinusModalOpen: isOpen });
    },
  }),
);
