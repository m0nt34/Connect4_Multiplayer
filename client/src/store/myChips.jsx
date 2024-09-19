import { create } from "zustand";

export const useMyChips = create((set) => ({
  myChipsBlue: true,
  seMyChipsBlue: (newMC) => set({ myChipsBlue: newMC }),
}));
