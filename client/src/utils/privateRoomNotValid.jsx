import { useBoard } from "../store/board";
import { useGameEnd } from "../store/gameEnd";
import { useGame } from "../store/gameStarted";
import { useMyChips } from "../store/myChips";
import { useResultText } from "../store/resultText";
import { useTurn } from "../store/turn";

export const handlePRNValid = () => {
  const { setGameEndedToT, setWinner } = useGameEnd.getState();
  const { setGameStartedToF } = useGame.getState();
  const { setToDefault } = useBoard.getState();
  const { setTurn } = useTurn.getState();
  const { setText } = useResultText.getState();
  const { seMyChipsBlue } = useMyChips.getState();

  setText("The private game you tried to join doesn't exist anymore.");
  setWinner(null);
  setGameEndedToT();
  setGameStartedToF();
  setToDefault();
  setTurn(true);
  seMyChipsBlue(null);
};
