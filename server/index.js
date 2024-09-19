import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
}); 

io.on("connection", (socket) => {
  console.log(socket.id); 

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});
server.listen(3000, () => console.log(`Server running on port 3000`));
