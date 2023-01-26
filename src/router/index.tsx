import { Route, Routes } from "react-router";

import RoomsContainer from "src/pages/Rooms/container/RoomsContainer";

import { ROUTE_NAMES } from "src/router/routeNames";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.ROOMS} element={<RoomsContainer />} />
    </Routes>
  );
};

export default Router;
