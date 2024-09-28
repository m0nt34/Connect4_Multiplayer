import React, { useEffect, useState } from "react";
import { listenToEvent, removeListener, emitEvent } from "../../services/socket";
import Spinner from "../../assets/SVG/Spinner";
import ArrowsCClockWise from "../../assets/SVG/ArrowsCClockWise";
import Back from "../../assets/SVG/Back";
import { useRoom } from "../../store/room";
import { resetGame } from "../../utils/resetGame";
import CheckMark from "../../assets/SVG/CheckMark";
import XMark from "../../assets/SVG/XMark";
import { rematchFunc } from "../../utils/rematchFunction";
import { useResultText } from "../../store/resultText";
const OfferBox = () => {
  const [sendOffer, setSendOffer] = useState(false);
  const [getOffer, setGetOffer] = useState(false);
  const { room } = useRoom();
  const { text, setText } = useResultText();
  useEffect(() => {
    listenToEvent("get_rematch_offer", () => {
      setText("You received a rematch request");
      setGetOffer(true);
    });
    listenToEvent("get_rematch_offer_decline", (data) => {
      setSendOffer(false);
      setText(data.message);
    });
    listenToEvent("get_rematch_offer_accepted", () => {
      setSendOffer(false);
      rematchFunc();
    });

    return () => {
      removeListener("get_rematch_offer");
      removeListener("get_rematch_offer_decline");
      removeListener("get_rematch_offer_accepted");
    };
  }, [room]);
  const handleOfferSend = () => {
    emitEvent("offer_rematch", room);
    setText("Waiting for response of opponet");
    setSendOffer(true);
  };
  return (
    <div>
      {sendOffer && (
        <div className="flex items-center justify-center my-3 w-full">
          <Spinner className={"h-7"} />
        </div>
      )}
      {text.length !== 0 && (
        <div className="flex w-full items-center justify-center text-center text-slate-300 text-lg">
          {text}
        </div>
      )}
      {getOffer && (
        <div className="flex items-center justify-center gap-4 flex-nowrap mt-4">
          <button
            onClick={() => {
              emitEvent("send_accept_offer", room);
              setGetOffer(false);
              rematchFunc();
            }}
            className="flex items-center justify-center gap-2 bg-[#144891] px-4 py-1 rounded-sm shadow-md hover:opacity-90 transition"
          >
            <CheckMark className={"h-5"} fill="white" />
            Accept
          </button>
          <button
            onClick={() => {
              emitEvent("send_decline_offer", room);
              setGetOffer(false);
              setText("You declined rematch offer");
            }}
            className="flex items-center justify-center gap-2 bg-[#144891] px-4 py-1 rounded-sm shadow-md hover:opacity-90 transition"
          >
            <XMark className={"h-5"} />
            Decline
          </button>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full items-center justify-center mt-4">
        {!getOffer && !sendOffer && text.length === 0 && (
          <button
            onClick={handleOfferSend}
            className="flex items-center justify-center gap-2 bg-[#144891] px-4 py-2 rounded-sm shadow-md hover:opacity-90 transition"
          >
            <ArrowsCClockWise className={"w-5"} />
            Rematch
          </button>
        )}
        <button
          onClick={() => {
            resetGame();
            setText("");
            if (getOffer) {
              emitEvent("send_decline_offer", room);
            } else {
              emitEvent("delete_room", room);
            }
          }}
          className="flex items-center justify-center gap-2 bg-[#144891] px-4 py-2 rounded-sm shadow-md hover:opacity-90 transition"
        >
          <Back className={"w-5"} />
          Menu
        </button>
      </div>
    </div>
  );
};

export default OfferBox;
