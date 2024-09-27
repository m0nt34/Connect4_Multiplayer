import React, { useEffect } from "react";
import Board from "../components/Board";
import DisplayTurn from "../components/DisplayTurn";
import {
  connectSocket,
  disconnectSocket,
  emitEvent,
  listenToEvent,
  removeListener,
} from "../services/socket";
import Menu from "../components/menu/Menu";
import { GameEnd } from "../components/resultPopup/GameEnd";
import { useMyChips } from "../store/myChips";
import { useGameEnd } from "../store/gameEnd";
import { useResultText } from "../store/resultText";
import { useLocation, useSearchParams } from "react-router-dom";

const Game = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { setGameEndedToT, setWinner } = useGameEnd();
  const { setText } = useResultText();
  const { myChipsBlue } = useMyChips();
  useEffect(() => {
    connectSocket();
    const handleOpponentDisconnected = () => {
      setText("Your opponent left the game");
      setWinner(myChipsBlue);
      setGameEndedToT();
    };
    if (checkIfPrivate()) {
      const roomId = searchParams.get("id");
      emitEvent("check_room", roomId);
    }
    
    listenToEvent("opponent_disconnected", handleOpponentDisconnected);
    
    return () => {
      removeListener("opponent_disconnected", handleOpponentDisconnected);
      disconnectSocket();
    };
  }, []);
  console.log("rerendered");
  const checkIfPrivate = () => {
    const pathname = location.pathname;
    return pathname.endsWith("/join");
  };
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full px-20">
      <Board />
      <DisplayTurn />
      <Menu />
      <GameEnd />
    </div>
  );
};

export default Game;
