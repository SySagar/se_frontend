import { create } from "zustand";

export const isLoginRegister = create((set) => ({
  isLoggingIn: true,
  setState: (state: boolean) => set({ isLoggingIn: state }),
}));

export const authStore = create((set) => ({
  auth: localStorage.getItem("token") || null,
  setAuth: (state:any) => set({ auth: state }),
}));
