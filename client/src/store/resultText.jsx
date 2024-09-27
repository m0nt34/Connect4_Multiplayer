import { create } from "zustand";

export const useResultText = create((set) => ({
  text: "",
  setText: (newText) => set({ text: newText }),
}));
