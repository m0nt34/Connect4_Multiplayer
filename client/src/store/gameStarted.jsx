import { create } from "zustand";

export const useGame = create((set) => ({
  gameStarted: true,
  setGameStartedToT: () => set({ gameStarted: true }),
  setGameStartedToF: () => set({ gameStarted: false }),
}));
