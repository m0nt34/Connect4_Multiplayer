import { useBoard } from "../store/board";
import { useGameEnd } from "../store/gameEnd";
import { useGame } from "../store/gameStarted";
import { useMyChips } from "../store/myChips";
import { useTurn } from "../store/turn";

export const rematchFunc = () => {
  const { setGameEndedToF, setWinner } = useGameEnd.getState();
  const { setGameStartedToT } = useGame.getState();
  const { setToDefault } = useBoard.getState();
  const { setTurn } = useTurn.getState();
  const { myChipsBlue, seMyChipsBlue } = useMyChips.getState();

  setGameEndedToF();
  setGameStartedToT();
  setToDefault();
  setWinner(null);
  seMyChipsBlue(!myChipsBlue);
  setTurn(true);
};
