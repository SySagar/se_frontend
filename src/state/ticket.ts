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
    passengerList: [],
  },
  setTicket: (ticket: any) => set({ ticket }),
  setPassengerList: (passenger: any) =>
    set((state: any) => ({
      ticket: {
        ...state.ticket,
        passengerList: [...state.ticket.passengerList, passenger],
      },
    })),
}));
