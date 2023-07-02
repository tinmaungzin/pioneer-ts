import React from "react";
import socketIO from "socket.io-client";

export const socket = socketIO.connect(process.env.NEXT_PUBLIC_NOTI, {transports: ['websocket']});
export const SocketContext = React.createContext(socket);
