import React from "react";
import { useGame } from "../../store/gameStarted";
import PlayersCount from "./PlayersCount";
import OptionButtons from "./OptionButtons";

const Menu = () => {
  const { gameStarted } = useGame();

  return (
    !gameStarted && (
      <div className="flex items-center justify-center absolute min-h-screen w-full">
        <div className="bg-[#222f44] p-5 pb-6 max-w-[350px] w-full rounded">
          <header className="flex items-center justify-between text-lg mb-5 text-white">
            <p className="flex items-center text-xl">Connect Four</p>
            <PlayersCount />
          </header>
            <OptionButtons />
        </div>
      </div>
    )
  );
};

export default Menu;
