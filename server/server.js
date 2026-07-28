 const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express(); 

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/meeting", meetingRoutes);

app.get("/", (req, res) => {
  res.send("MeetSync Server Running 🚀");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log("🟢 Connected:", socket.id);

  socket.on("join-room", (roomId) => {

    socket.on("join-room", (roomId) => {
  socket.join(roomId);

  const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

  console.log("===============");
  console.log("JOIN ROOM");
  console.log("Socket :", socket.id);
  console.log("Room   :", roomId);
  console.log("Clients:", clients);

  const others = clients.filter(id => id !== socket.id);

  console.log("Others :", others);

  socket.emit("all-users", others);

  socket.to(roomId).emit("user-joined", socket.id);
});

    socket.join(roomId);

    const clients = [...io.sockets.adapter.rooms.get(roomId) || []];

    console.log("Room:", roomId);
    console.log("Clients:", clients);

    const others = clients.filter(id => id !== socket.id);

    socket.emit("all-users", others);

    socket.to(roomId).emit("user-joined", socket.id);

  });

  socket.on("offer", ({ target, offer }) => {

    io.to(target).emit("offer", {
      from: socket.id,
      offer,
    });

  });

  socket.on("answer", ({ target, answer }) => {

    io.to(target).emit("answer", {
      from: socket.id,
      answer,
    });

  });

  socket.on("ice-candidate", ({ target, candidate }) => {

    io.to(target).emit("ice-candidate", {
      from: socket.id,
      candidate,
    });

  });

  socket.on("send-message", (data) => {

    io.to(data.roomId).emit("receive-message", data);

  });

  socket.on("disconnecting", () => {

    socket.rooms.forEach((room) => {

      socket.to(room).emit("user-left", socket.id);

    });

  });

  socket.on("disconnect", () => {

    console.log("🔴 Disconnected:", socket.id);

  });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(`🚀 Server Running on ${PORT}`);

});