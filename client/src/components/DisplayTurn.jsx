import React from "react";
import { useTurn } from "../store/turn";
import Chip from "../assets/SVG/Chip";
import { useMyChips } from "../store/myChips";
const DisplayTurn = () => {
  const { isBluePlayerTurn } = useTurn();
  const { myChipsBlue } = useMyChips();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" sm:h-[50px] sm:w-[50px] h-[35px] w-[35px]">
        <Chip blue={isBluePlayerTurn} />
      </div>
      <span className="text-[16px] sm:text-[22px]">
        {(myChipsBlue && isBluePlayerTurn) ||
        (!myChipsBlue && !isBluePlayerTurn)
          ? "It's your turn"
          : "Opponent's turn"}
      </span>
    </div>
  );
};

export default DisplayTurn;
