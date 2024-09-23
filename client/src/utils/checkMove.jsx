import { useBoard } from "../store/board";
import { resultFunction } from "./resultFunction";

export const checkMove = () => {
  const { board } = useBoard.getState();
  console.log(board);

  for (let c = 0; c <= 3; c++) {
    for (let r = 0; r < 6; r++) {
      if (
        board[c][r] !== null &&
        board[c][r] === board[c + 1][r] &&
        board[c + 1][r] === board[c + 2][r] &&
        board[c + 2][r] === board[c + 3][r]
      ) {
        resultFunction(board[c][r]);
        return;
      }
    }
  }

  for (let c = 0; c < 7; c++) {
    for (let r = 0; r <= 2; r++) {
      if (
        board[c][r] !== null &&
        board[c][r] === board[c][r + 1] &&
        board[c][r + 1] === board[c][r + 2] &&
        board[c][r + 2] === board[c][r + 3]
      ) {
        resultFunction(board[c][r]);
        return;
      }
    }
  }
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r <= 2; r++) {
      if (
        board[c][r] !== null &&
        board[c][r] === board[c + 1][r + 1] &&
        board[c + 1][r + 1] === board[c + 2][r + 2] &&
        board[c + 2][r + 2] === board[c + 3][r + 3]
      ) {
        resultFunction(board[c][r]);
        return;
      }
    }
  }
  for (let c = 3; c < 7; c++) {
    for (let r = 0; r <= 2; r++) {
      if (
        board[c][r] !== null &&
        board[c][r] === board[c - 1][r + 1] &&
        board[c - 1][r + 1] === board[c - 2][r + 2] &&
        board[c - 2][r + 2] === board[c - 3][r + 3]
      ) {
        resultFunction(board[c][r]);
        return;
      }
    }
  }
};
