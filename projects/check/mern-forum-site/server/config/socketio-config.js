import express from "express";
import { Server } from "socket.io";
import http from "http";

const appSocket = express();
const server = http.createServer(appSocket);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:5173`],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log({ socket });
  console.log(`a user connected to ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`user disconnected from ${socket.id}`);
  });
});

const port = 5001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
