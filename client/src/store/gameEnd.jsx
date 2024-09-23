import { create } from "zustand";

export const useGameEnd = create((set) => ({
  gameEnded: false,
  winner: null,
  setGameEndedToT: () => set({ gameEnded: true }),
  setGameEndedToF: () => set({ gameEnded: false }),
  setWinner: (newWinner) => set({ winner: newWinner }),
}));
