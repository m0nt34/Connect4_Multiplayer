import React, { useEffect } from "react";
import Board from "../components/Board";
import DisplayTurn from "../components/DisplayTurn";
import { connectSocket, disconnectSocket } from "../services/socket";

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
    </div>
  );
};

export default Game;
