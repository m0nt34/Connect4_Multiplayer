import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { truncate } from "fs";
import { generateRoomId } from "./utils/generateID.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
var users = 0;
const waitingLine = [];
const rooms = {};
const PrivateRooms = {};
io.on("connection", (socket) => {
  users += 1;
  io.emit("user_count", users);
  socket.on("get_count", () => {
    socket.emit("user_count", users);
  });
  socket.on("join_line", () => {
    waitingLine.push(socket.id);
    if (waitingLine.length >= 2) {
      const user1 = waitingLine.shift();
      const user2 = waitingLine.shift();

      const room = `${user1}-${user2}`;
      io.sockets.sockets.get(user1)?.join(room);
      io.sockets.sockets.get(user2)?.join(room);
      rooms[room] = { user1, user2, currentTurn: user1 };

      io.to(user1).emit("room-assigned", {
        room,
        yourTurn: true,
      });
      io.to(user2).emit("room-assigned", {
        room,
        yourTurn: false,
      });
    }
  });
  socket.on("leave_line", () => {
    const index = waitingLine.indexOf(socket.id);
    if (index > -1) {
      waitingLine.splice(index, 1);
    }
  });
  socket.on("make_move", (data) => {
    const { column, row, isBlue, room } = data;
    const currentRoom = rooms[room];

    if (currentRoom) {
      const { user1, user2, currentTurn } = currentRoom;
      if (currentTurn === socket.id) {
        const opponentID = currentTurn === user1 ? user2 : user1;
        io.to(opponentID).emit("opponent_move", { column, row, isBlue });
        currentRoom.currentTurn = opponentID;
      }
    }
  });
  socket.on("offer_rematch", (room) => {
    const currentRoom = rooms[room];
    if (currentRoom) {
      const { user1, user2 } = currentRoom;
      const opponentID = user1 === socket.id ? user2 : user1;
      io.to(opponentID).emit("get_rematch_offer");
    } else {
      socket.emit("get_rematch_offer_decline", {
        message: "Opponent has already left the room",
      });
    }
  });
  socket.on("send_decline_offer", (room) => {
    const currentRoom = rooms[room];
    if (currentRoom) {
      const { user1, user2 } = currentRoom;
      const opponentID = user1 === socket.id ? user2 : user1;
      io.to(opponentID).emit("get_rematch_offer_decline", {
        message: "Your rematch offer was declined",
      });
      delete rooms[room];
    }
  });
  socket.on("send_accept_offer", (room) => {
    const currentRoom = rooms[room];

    if (currentRoom) {
      const { user1, user2 } = currentRoom;
      const opponentID = user1 === socket.id ? user2 : user1;
      io.to(opponentID).emit("get_rematch_offer_accepted");
    } else {
      socket.emit("get_rematch_offer_decline", {
        message: "Opponent has already left the room",
      });
    }
  });
  socket.on("delete_room", (room) => {
    const roomToDelete = rooms[room];
    if (roomToDelete) {
      delete rooms[room];
    }
  });
  socket.on("create_private_room", () => {
    const newPR = generateRoomId();
    if (!PrivateRooms[newPR]) {
      PrivateRooms[newPR] = { creator: socket.id };
      socket.emit("get_privat_room_id", newPR);
    }
  });
  socket.on("delete_private_room", (room) => {
    if (PrivateRooms[room]) {
      delete PrivateRooms[room];
    }
  });
  socket.on("check_room", (room) => {
    if (PrivateRooms[room]) {
      io.to(PrivateRooms[room].creator).emit("join_private_room");
    } else {
      socket.emit("private_room_is_not_valid");
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    users -= 1;
    io.emit("user_count", users);

    let roomToRemove;
    for (const [room, { user1, user2 }] of Object.entries(rooms)) {
      if (user1 === socket.id || user2 === socket.id) {
        roomToRemove = room;
        break;
      }
    }

    if (roomToRemove) {
      const { user1, user2 } = rooms[roomToRemove];
      const opponentID = user1 === socket.id ? user2 : user1;

      io.to(opponentID).emit("opponent_disconnected");
      delete rooms[roomToRemove];
    }
    let privateroomToRemove;

    for (const [room, { creator }] of Object.entries(PrivateRooms)) {
      if (creator === socket.id) {
        privateroomToRemove = room;

        break;
      }
    }
    if (privateroomToRemove) {
      delete PrivateRooms[privateroomToRemove];
    }
    const indexOfUser = waitingLine.findIndex((user) => user === socket.id);
    if (indexOfUser !== -1) {
      waitingLine.splice(indexOfUser, 1);
    }
  });
});
server.listen(3000, () => console.log(`Server running on port 3000`));
