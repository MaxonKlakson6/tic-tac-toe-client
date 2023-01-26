import { io } from "socket.io-client";
import { createContext } from "react";

export const wsServer = io("http://localhost:5000");

export const SocketContext = createContext(wsServer);
