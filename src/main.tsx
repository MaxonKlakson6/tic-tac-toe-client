import React from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import { io } from "socket.io-client";

const wsServer = io("http://localhost:5000");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div>Tic-tac-toe</div>
  </React.StrictMode>
);
