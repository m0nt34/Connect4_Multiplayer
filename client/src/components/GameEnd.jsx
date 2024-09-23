import React from "react";
import { useGameEnd } from "../store/gameEnd";
import { useMyChips } from "../store/myChips";
import Back from "../assets/SVG/Back";
import { useGame } from "../store/gameStarted";
import { useBoard } from "../store/board";
import { useTurn } from "../store/turn";

export const GameEnd = () => {
  const { gameEnded, winner, setGameEndedToF } = useGameEnd();
  const { setGameStartedToF } = useGame();
  const { myChipsBlue } = useMyChips();
  const { setToDefault } = useBoard();
  const { setTurn } = useTurn();

  return (
    gameEnded && (
      <div className="flex items-center justify-center absolute min-h-screen w-full">
        <div className="bg-[#222f44] p-5 pb-6 max-w-[350px] w-full rounded">
          <header className="flex items-center justify-between text-xl mb-2 text-white">
            Game End
          </header>
          <div className="flex items-center justify-center">
            {(myChipsBlue && winner) || (!myChipsBlue && !winner) ? (
              <span className="text-lg text-green-500">You Won!</span>
            ) : (
              <span className="text-lg text-red-500">You Lose!</span>
            )}
          </div>
          <div></div>
          <div className="flex w-full items-center justify-center mt-4">
            <button
              onClick={() => {
                setGameEndedToF();
                setGameStartedToF();
                setToDefault();
                setTurn(true);
                setRoom("");
              }}
              className="flex items-center justify-center gap-2 bg-[#144891] px-4 py-2 rounded-sm shadow-md hover:opacity-90 transition"
            >
              <Back className={"w-5"} />
              Menu
            </button>
          </div>
        </div>
      </div>
    )
  );
};
