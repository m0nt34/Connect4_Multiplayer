import { create } from "zustand";

export const useTurn = create((set) => ({
  isBluePlayerTurn: true,

  setTurnToOpposite: () =>
    set((state) => ({ isBluePlayerTurn: !state.isBluePlayerTurn })),
  setTurn: (newTurn) => set({ isBluePlayerTurn: newTurn }),
}));
