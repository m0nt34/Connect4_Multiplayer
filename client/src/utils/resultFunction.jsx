import { useGameEnd } from "../store/gameEnd";

export const resultFunction = (winner) => {
  const { setGameEndedToT, setWinner } = useGameEnd.getState();
  setWinner(winner);
  setGameEndedToT();
};
