import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  isChangePassword: boolean;
  setIsChangePassword: (changed: boolean) => void;
}

export const useChangePasswordStore = create<UserState>()(
  persist(
    (set) => ({
      isChangePassword: false,
      setIsChangePassword: (changed) => set({ isChangePassword: changed }),
    }),
    {
      name: 'is-change-password', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
