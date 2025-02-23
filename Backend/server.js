import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http"; // For WebSockets
import { connectDB } from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import responderRoutes from "./routes/responderRoutes.js";  // Import responders route




dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "*" },
});

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(morgan("dev"));
app.use("/api/events", eventRoutes);
app.use("/api/responders", responderRoutes); // Mount responder API

app.use(notFound);
app.use(errorHandler);

const users = {}; // Store connected users

io.on("connection", (socket) => {
  console.log(`🔗 New user connected: ${socket.id}`);

  // Store user in active users list
  socket.on("join", (userId) => {
    users[userId] = socket.id;
    console.log(`✅ User ${userId} joined with socket ID ${socket.id}`);
  });

  // Call a user
  socket.on("callUser", ({ userToCall, signalData, from }) => {
    if (users[userToCall]) {
      io.to(users[userToCall]).emit("incomingCall", { from, signal: signalData });
      console.log(`📞 Call request sent from ${from} to ${userToCall}`);
    }
  });

  // Answer the call
  socket.on("answerCall", ({ to, signal }) => {
    io.to(users[to]).emit("callAccepted", signal);
    console.log(`📲 Call accepted by ${to}`);
  });

  // End the call
  socket.on("endCall", ({ to }) => {
    io.to(users[to]).emit("callEnded");
    console.log(`🔴 Call ended by ${to}`);
  });

  // Disconnect user
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    Object.keys(users).forEach((key) => {
      if (users[key] === socket.id) delete users[key];
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
