import React, { useEffect } from "react";
import { useBoard } from "../store/board";
import EmptyChip from "../assets/SVG/EmptyChip";
import Chip from "../assets/SVG/Chip";
import { placeChip } from "../utils/placeChip";
import { listenToEvent, removeListener } from "../services/socket";
import { useTurn } from "../store/turn";
import { checkMove } from "../utils/checkMove";
const Board = () => {
  const { board, setBoard } = useBoard();
  const { setTurnToOpposite } = useTurn();
  useEffect(() => {
    listenToEvent("opponent_move", (data) => {
      setBoard(data.column, data.row, data.isBlue);
      checkMove();
      setTurnToOpposite();
    });
    return () => {
      removeListener("opponent_move");
    };
  }, []);
  return (
    <div className="relative mt-2 bg-[#5f6a7d] rounded-3xl w-full grid grid-cols-7 p-[5px] max-w-[700px]  aspect-[7/6]">
      {board.map((column, i) => {
        return (
          <section
            key={i}
            className="flex flex-col-reverse"
            onClick={() => {
              placeChip(i, board);
            }}
          >
            {column.map((chip, j) => {
              return chip === null ? (
                <EmptyChip key={i + " " + j} />
              ) : chip ? (
                <Chip key={i + " " + j} blue={true} />
              ) : (
                <Chip key={i + " " + j} blue={false} />
              );
            })}
          </section>
        );
      })}
    </div>
  );
};

export default Board;
