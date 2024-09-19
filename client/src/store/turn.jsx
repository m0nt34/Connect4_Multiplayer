import { create } from "zustand";

export const useTurn = create((set) => ({
  isBluePlayerTurn: true,
  setTurn: (newTurn) => set({ isBluePlayerTurn: newTurn }),
}));
