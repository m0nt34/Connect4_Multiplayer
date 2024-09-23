import { useBoard } from "../store/board";
import { useMyChips } from "../store/myChips";
import { useTurn } from "../store/turn";
import { emitEvent } from "../services/socket";
import { useRoom } from "../store/room";
import { checkMove } from "./checkMove";
export const placeChip = (column, board) => {
  const { isBluePlayerTurn, setTurnToOpposite } = useTurn.getState();
  const { myChipsBlue } = useMyChips.getState();
  const { room } = useRoom.getState();
  if ((!isBluePlayerTurn && myChipsBlue) || (isBluePlayerTurn && !myChipsBlue))
    return;
  const { setBoard } = useBoard.getState();

  let row = 0;

  while (board[column][row] !== null) {
    row++;
    if (row > 5) return;
  }
  setBoard(column, row, myChipsBlue);
  emitEvent("make_move", { column, row, isBlue: myChipsBlue, room });
  checkMove();
  setTurnToOpposite();
};
