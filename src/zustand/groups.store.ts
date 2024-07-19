import { create } from "zustand";
import GroupType from "../entities/Group";
import { getGroups } from "../services/groups";

interface Groupstore {
  groups: GroupType[]
  getGroups: () => Promise<void>
  setGroups: (Groups: GroupType[] | ((prev: GroupType[]) => GroupType[])) => void
  loading: boolean
}

export const useGroupsStore = create<Groupstore>()((set) => ({
  groups: [],
  loading: false,
  setGroups: (groups) => set((state) => ({ 
    groups: typeof groups === 'function' ? groups(state.groups) : groups 
  })),
  getGroups: async () => {
    set(() => ({ loading: true }))
    try {
      const res = await getGroups();
      set(() => ({ groups: res.data.data.list}))
    } catch (err) {
      console.log(err)
    } finally {
      set(() => ({ loading: false }));
    }
  }
}))