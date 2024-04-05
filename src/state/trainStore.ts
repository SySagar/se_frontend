import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useTrainStore = create( persist((set) => ({
  trains: [],
  from: "",
  to: "",
  date: "",
  class: "",
  setTrains: (trains: any) => set({ trains }),
  setFrom: (from: string) => set({ from }),
  setTo: (to: string) => set({ to }),
  setDate: (date: string) => set({ date }),
}),{
  name: 'tab-storage',
  getStorage: () => sessionStorage,
}));
