import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "Socket.IO";

const SocketHandler = (req: NextApiRequest, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);

      socket.on("event-update", (msg) => {
        socket.broadcast.emit("event-receive", msg);
      });

      socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
      });
      
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

    });
  }
  res.end();
};

export default SocketHandler;
