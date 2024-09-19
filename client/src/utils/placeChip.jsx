import { useBoard } from "../store/board";
import { useMyChips } from "../store/myChips";
import { useTurn } from "../store/turn";

export const placeChip = (column, board) => {
  const { isBluePlayerTurn, setTurn } = useTurn.getState();
  const { myChipsBlue } = useMyChips.getState();
  if ((!isBluePlayerTurn && myChipsBlue) || (isBluePlayerTurn && !myChipsBlue))
    return;
  const { setBoard } = useBoard.getState();

  let row = 0;

  while (board[column][row] !== null) {
    row++;
    if (row > 5) return;
  }

  setBoard(column, row, true);
  setTurn(!isBluePlayerTurn);
};
