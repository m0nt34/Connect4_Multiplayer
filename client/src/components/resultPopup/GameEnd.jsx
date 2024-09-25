import React from "react";
import OfferBox from "./OfferBox";
import { useGameEnd } from "../../store/gameEnd";
import { useMyChips } from "../../store/myChips";

export const GameEnd = () => {
  const { gameEnded, winner } = useGameEnd();
  const { myChipsBlue } = useMyChips();

  return (
    gameEnded && (
      <div className="flex items-center justify-center absolute min-h-screen w-full">
        <div className="bg-[#222f44] p-5 pb-8 max-w-[350px] w-full rounded">
          <header className="flex items-center justify-between text-xl mb-2 text-white">
            Game End
          </header>
          <div className="flex items-center justify-center">
            {(myChipsBlue && winner) || (!myChipsBlue && !winner) ? (
              <span className="text-xl text-green-600">You Won!</span>
            ) : (
              <span className="text-lg text-red-700">You Lost</span>
            )}
          </div>
          <OfferBox />
        </div>
      </div>
    )
  );
};
