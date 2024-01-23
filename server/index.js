const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messsageRoutes = require("./routes/messageRoutes");
require("dotenv").config();
let server = express();

const socket = require("socket.io");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB connection established");
}

server.use(cors());
server.use(express.json());
server.use("/api/auth", userRoutes);
server.use("/api/messages", messsageRoutes);

const app = server.listen(process.env.PORT, () => {
  console.log(`server is connceted on ${process.env.PORT}`);
});

const io = socket(app, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-received", data.message);
    }
  });
});
