import { create } from "zustand";

export const useTrainStore = create((set) => ({
  trains: [],
  from: "",
  to: "",
  date: "",
  class: "",
  setTrains: (trains: any) => set({ trains }),
  setFrom: (from: string) => set({ from }),
  setTo: (to: string) => set({ to }),
  setDate: (date: string) => set({ date }),
}));
