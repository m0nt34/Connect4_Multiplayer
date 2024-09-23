import React, { useEffect, useState } from "react";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "../../services/socket";

const PlayersCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    emitEvent("get_count", (newCount) => {
      setCount(newCount);
    });
    listenToEvent("user_count", (newCount) => {
      setCount(newCount);
    });
    return () => {
      removeListener("user_count");
    };
  }, []);
  return (
    <p className="text-sm flex items-center text-[#cecece]">
      Online players {count}
    </p>
  );
};

export default PlayersCount;
