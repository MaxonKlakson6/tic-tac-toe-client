import { Route, Routes } from "react-router";

import RoomsContainer from "src/pages/Rooms/container/RoomsContainer";
import GameRoomContainer from "src/pages/GameRoom/container/GameRoomContainer";

import { ROUTE_NAMES } from "src/router/routeNames";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.ROOMS} element={<RoomsContainer />} />
      <Route path={ROUTE_NAMES.GAME_ROOM} element={<GameRoomContainer />} />
    </Routes>
  );
};

export default Router;
