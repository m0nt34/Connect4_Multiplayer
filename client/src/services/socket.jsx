import { io } from "socket.io-client";

const socket = io("https://connect4-multiplayer.onrender.com", {
  autoConnect: false,
  reconnection: false, 
});

const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

const emitEvent = (eventName, data) => {
  socket.emit(eventName, data);
};

const listenToEvent = (eventName, callback) => {
  socket.on(eventName, callback);
};

const removeListener = (eventName) => {
  socket.off(eventName);
};

export {
  socket,
  connectSocket,
  disconnectSocket,
  emitEvent,
  listenToEvent,
  removeListener,
};
