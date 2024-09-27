import React, { useEffect, useRef, useState } from "react";
import Spinner from "../../assets/SVG/Spinner";
import Copy from "../../assets/SVG/Copy";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "../../services/socket";
import { useRoom } from "../../store/room";

const CreatePrivateRoom = ({ setWaitingFriend }) => {
  const [inputValue, setInputValue] = useState("");
  const { room } = useRoom();
  const { setRoom } = useRoom();
  const inputRef = useRef(null);
  const handleLeavePrivateRoom = () => {
    setWaitingFriend(false);
    emitEvent("delete_private_room", room);
  };
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };
  useEffect(() => {
    listenToEvent("get_privat_room_id", (room) => {
      setRoom(room);
      setInputValue(`http://localhost:5173/join?id=${room}`);
    });
    return () => {
      removeListener("get_privat_room_id");
    };
  }, []);
  return (
    <div className="flex flex-col items-center mt-5">
      <Spinner className="h-8" />
      <div className="flex flex-col gap-3 items-center mt-1">
        <span className="text-lg">Waiting for a player to join</span>
        <span className="text-lg">Share the link with your friend:</span>
        <div
          onClick={handleCopy}
          className="flex gap-2 border-b-[#1d1d1d] border-b p-2 px-5 cursor-pointer"
        >
          <input
            type="text"
            disabled
            ref={inputRef}
            className="bg-transparent text-base"
            value={inputValue}
          />
          <Copy className="h-6" fill="#1a5fbe" />
        </div>
        <button
          onClick={handleLeavePrivateRoom}
          className="bg-[#144891] px-4 py-1 mt-2 rounded-sm shadow-md hover:opacity-90 transition"
        >
          Exit Lobby
        </button>
      </div>
    </div>
  );
};

export default CreatePrivateRoom;
