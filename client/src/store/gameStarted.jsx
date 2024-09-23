import { create } from "zustand";

export const useGame = create((set) => ({
  gameStarted: false,
  setGameStartedToT: () => set({ gameStarted: true }),
  setGameStartedToF: () => set({ gameStarted: false }),
}));
