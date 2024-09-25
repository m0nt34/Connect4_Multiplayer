import { useBoard } from "../store/board";
import { useGameEnd } from "../store/gameEnd";
import { useGame } from "../store/gameStarted";
import { useRoom } from "../store/room";
import { useTurn } from "../store/turn";

export const resetGame = () => {
  const { setGameEndedToF, setWinner } = useGameEnd.getState();
  const { setGameStartedToF } = useGame.getState();
  const { setToDefault } = useBoard.getState();
  const { setTurn } = useTurn.getState();
  const { setRoom } = useRoom.getState();
  setWinner(null);
  setGameEndedToF();
  setGameStartedToF();
  setToDefault();
  setTurn(true);
  setRoom("");
};
