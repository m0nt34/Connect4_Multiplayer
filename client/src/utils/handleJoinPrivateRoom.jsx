import { useBoard } from "../store/board";
import { useGameEnd } from "../store/gameEnd";
import { useGame } from "../store/gameStarted";
import { useMyChips } from "../store/myChips";
import { useResultText } from "../store/resultText";
import { useTurn } from "../store/turn";

export const handleJoinPrivateRoom = (isBlue) => {
  const { setGameEndedToF, setWinner } = useGameEnd.getState();
  const { setGameStartedToT } = useGame.getState();
  const { setToDefault } = useBoard.getState();
  const { setTurn } = useTurn.getState();
  const { setText } = useResultText.getState();
  const { seMyChipsBlue } = useMyChips.getState();

  setText("");
  setWinner(null);
  setGameEndedToF();
  setGameStartedToT();
  setToDefault();
  setTurn(true);
  seMyChipsBlue(isBlue);
};
