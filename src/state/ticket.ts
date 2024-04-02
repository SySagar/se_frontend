import { create } from "zustand";

export const useTicketStore = create((set) => ({
  ticket: {
    train: {
      id: "",
      name: "",
      from: "",
      to: "",
      date: "",
      time: "",
      price: "",
    },
    passenger: {
      name: "",
      age: "",
      gender: "",
    },
  },
  setTicket: (ticket: any) => set({ ticket }),
}));
