import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";

const port = 5000;
const port1 = 5001;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // send to all
  socket.on("send-message", (data) => {
    const message = {
      id: socket.id,
      message: data,
      timestamp: new Date().toISOString(),
    };
    io.emit("receive-messages", message);
  });
  // send to all except the sender
  socket.on("send-message-except-sender", (data) => {
    const message = {
      id: socket.id,
      message: data,
      timestamp: new Date().toISOString(),
    };
    socket.broadcast.emit("receive-messages-except-sender", message);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.listen(port1, () => {
  console.log(`Server is running on port ${port1}`);
});
app.post(`/create-message`, async (req, res, next) => {
  try {
    const body = req.body;
    const io = req.io;

    const message = {
      message: body.message,
      timestamp: new Date().toISOString(),
    };

    // send to all
    io.emit(`notification`, (data) => {
      console.log({ data });
    });

    res.status(200).json({
      message: "Message sent successfully",
      data: body,
    });
  } catch (error) {
    next(error);
  }
});
