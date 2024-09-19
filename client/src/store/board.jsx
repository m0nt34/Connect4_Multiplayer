import { create } from "zustand";

export const useBoard = create((set) => ({
  board: [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ],
  setBoard: (column, row, isBlue) => {
    set((state) => {
      const newBoard = state.board.map((col, colIndex) =>
        col.map((cell, rowIndex) => {
          if (colIndex === column && rowIndex === row) {
            return isBlue;
          }
          return cell;
        })
      );
      return { board: newBoard };
    });
  },
}));
