import React, { useEffect, useState } from "react";
import Spinner from "../../assets/SVG/Spinner";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "../../services/socket";
import { useMyChips } from "../../store/myChips";
import { useGame } from "../../store/gameStarted";
import { useRoom } from "../../store/room";
import CheckMark from "../../assets/SVG/CheckMark";
import { startGameAudio } from "../../utils/gameStartAudio";
const OptionButtons = () => {
  const [loading, setLoading] = useState(false);
  const [roomAssigned, setRoomAssigned] = useState(false);
  const { seMyChipsBlue } = useMyChips();
  const { setGameStartedToT } = useGame();
  const { setRoom } = useRoom();
  const handleSearch = () => {
    setLoading(true);
    emitEvent("join_line");
  };
  const handleLeaveLine = () => {
    setLoading(false);
    emitEvent("leave_line");
  };
  useEffect(() => {
    listenToEvent("room-assigned", (data) => {
      startGameAudio();
      setLoading(false);
      setRoomAssigned(true);
      seMyChipsBlue(data.yourTurn);
      setRoom(data.room);
      setTimeout(() => {
        setGameStartedToT();
      }, 2000);
    });

    return () => {
      removeListener("room-assigned");
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-center gap-4 flex-nowrap">
        <button
          onClick={handleSearch}
          disabled={loading || roomAssigned}
          className="bg-[#144891] px-4 py-1 rounded-sm shadow-md hover:opacity-90 transition"
        >
          Find Player
        </button>
        <button
          disabled={loading || roomAssigned}
          className="bg-[#144891] px-4 py-1 rounded-sm shadow-md hover:opacity-90 transition"
        >
          Invite A Friend
        </button>
      </div>
      {loading && (
        <div className="flex flex-col gap-3 pt-5 items-center justify-center w-full">
          <Spinner className="h-8" />
          <span className="pb-2">Searching for players</span>
          <button
            onClick={handleLeaveLine}
            className="bg-[#144891] px-4 py-1 rounded-sm shadow-md hover:opacity-90 transition"
          >
            Leave Queue
          </button>
        </div>
      )}
      {roomAssigned && (
        <div className="flex flex-col items-center justify-center w-full mt-4 gap-2 select-none">
          <CheckMark className="h-7" />
          <span className="text-lg text-slate-300">
            Player joined! Game is starting...
          </span>
        </div>
      )}
    </>
  );
};

export default OptionButtons;
