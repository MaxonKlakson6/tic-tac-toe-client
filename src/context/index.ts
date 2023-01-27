import { io } from "socket.io-client";
import { createContext } from "react";

export const wsServer = io("https://tic-tac-toe-hwia.onrender.com");

export const SocketContext = createContext(wsServer);
