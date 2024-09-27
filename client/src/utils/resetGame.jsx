import { useBoard } from "../store/board";
import { useGameEnd } from "../store/gameEnd";
import { useGame } from "../store/gameStarted";
import { useResultText } from "../store/resultText";
import { useRoom } from "../store/room";
import { useTurn } from "../store/turn";

export const resetGame = () => {
  const { setGameEndedToF, setWinner } = useGameEnd.getState();
  const { setGameStartedToF } = useGame.getState();
  const { setToDefault } = useBoard.getState();
  const { setTurn } = useTurn.getState();
  const { setRoom } = useRoom.getState();
  const { setText } = useResultText.getState();

  setText("");
  setWinner(null);
  setGameEndedToF();
  setGameStartedToF();
  setToDefault();
  setTurn(true);
  setRoom("");
};
