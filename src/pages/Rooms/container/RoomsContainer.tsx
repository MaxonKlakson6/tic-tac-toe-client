import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import RoomsLayout from "src/pages/Rooms/components/RoomsLayout";
import { SocketContext } from "src/context";
import { ROUTE_NAMES } from "src/router/routeNames";
import type { Room } from "src/types/room";

const RoomsContainer = (): JSX.Element => {
  const wsServer = useContext(SocketContext);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [idToJoin, setIdToJoin] = useState<string>("");

  const handleCreateRoom = (roomName: string): void => {
    wsServer.emit("create-room", roomName);
  };

  const handleJoinRoom = (userName: string): void => {
    if (idToJoin) {
      wsServer.emit("join-room", { name: userName, roomId: idToJoin });
    }
  };

  const changeIdToJoin = (id: string) => {
    setIdToJoin(id);
  };

  wsServer.off("take-rooms").on("take-rooms", (tookRooms: Room[]) => {
    setRooms(tookRooms);
  });

  wsServer.off("user-joined").on("user-joined", (roomId: string) => {
    localStorage.setItem("roomId", roomId);
    navigate(ROUTE_NAMES.GAME_ROOM);
  });

  useEffect(() => {
    wsServer.emit("get-rooms");
  }, []);

  return (
    <RoomsLayout
      rooms={rooms}
      handleCreateRoom={handleCreateRoom}
      changeIdToJoin={changeIdToJoin}
      handleJoinRoom={handleJoinRoom}
    />
  );
};

export default RoomsContainer;
