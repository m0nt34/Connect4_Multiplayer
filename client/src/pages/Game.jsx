import React, { useEffect } from "react";
import Board from "../components/Board";
import DisplayTurn from "../components/DisplayTurn";
import { connectSocket, disconnectSocket } from "../services/socket";
import Menu from "../components/menu/Menu";
import { GameEnd } from "../components/GameEnd";

const Game = () => {
  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);
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
