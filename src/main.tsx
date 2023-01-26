import React from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import { SocketContext } from "src/context";
import { wsServer } from "src/context";
import { HashRouter } from "react-router-dom";
import Router from "src/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <SocketContext.Provider value={wsServer}>
      <Router />
    </SocketContext.Provider>
  </HashRouter>
);
