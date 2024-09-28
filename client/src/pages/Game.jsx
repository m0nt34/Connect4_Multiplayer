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
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { handleJoinPrivateRoom } from "../utils/handleJoinPrivateRoom";
import { handlePRNValid } from "../utils/privateRoomNotValid";
import { useRoom } from "../store/room";
const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { setGameEndedToT, setWinner } = useGameEnd();
  const { setText } = useResultText();
  const { setRoom } = useRoom();
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
      console.log(roomId);
      if (performance.getEntriesByType("navigation")[0].type === "reload") {
        navigate("/", { replace: true });
      } else {
        setRoom(roomId);
        emitEvent("check_room", roomId);
      }
    }

    listenToEvent("opponent_disconnected", handleOpponentDisconnected);
    listenToEvent("join_private_room", handleJoinPrivateRoom);
    listenToEvent("private_room_is_not_valid", handlePRNValid);

    return () => {
      removeListener("opponent_disconnected", handleOpponentDisconnected);
      removeListener("join_private_room", handleJoinPrivateRoom);
      removeListener("private_room_is_not_valid", handlePRNValid);
      disconnectSocket();
    };
  }, []);
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
