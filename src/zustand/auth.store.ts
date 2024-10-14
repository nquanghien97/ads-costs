import { create } from "zustand";
import { getUser, getUserId } from "../services/users";
import User from "../entities/User";

interface AuthStore {
  user: User
  getUser: () => Promise<void>
  setUser: (user: User | ((prev: User) => User)) => void
  loading: boolean
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: {
    id: -1,
    username: '',
    name: '',
    group_id: -1,
    group: {
      id: -1,
      name: '',
    },
    system_id: -1,
    system: {
      id: -1,
      name: '',
    },
    role: '',
    is_blocked: false
  },
  loading: false,
  setUser: (item) =>
    set((state) => ({
      user: typeof item === "function" ? item(state.user) : item,
    })),
  getUser: async () => {
    const userId = getUserId()
    set(() => ({ loading: true }))
    try {
      const res = await getUser(userId);
      set(() => ({ user: res.data.data}))
    } catch (err) {
      console.log(err)
    } finally {
      set(() => ({ loading: false }));
    }
  },
}))