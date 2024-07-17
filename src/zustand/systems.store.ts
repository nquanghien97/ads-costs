import { create } from "zustand";
import SystemType from "../entities/System";
import { getAllSystems } from "../services/systems";

interface SystemStore {
  systems: SystemType[]
  getSystems: () => Promise<void>
  setSystems: (systems: SystemType[] | ((prev: SystemType[]) => SystemType[])) => void
  loading: boolean
}

export const useSystemsStore = create<SystemStore>()((set) => ({
  systems: [],
  loading: false,
  setSystems: (systems) => set((state) => ({ 
    systems: typeof systems === 'function' ? systems(state.systems) : systems 
  })),
  getSystems: async () => {
    set(() => ({ loading: true }))
    try {
      const res = await getAllSystems();
      set(() => ({ systems: res.data.data.list}))
    } catch (err) {
      console.log(err)
    } finally {
      set(() => ({ loading: false }));
    }
  }
}))