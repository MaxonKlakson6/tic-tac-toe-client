import { useContext, useEffect, useState } from "react";
import { SocketContext } from "src/context";
import RoomsLayout from "src/pages/Rooms/components/RoomsLayout";
import type { Room } from "src/types/room";

const RoomsContainer = (): JSX.Element => {
  const wsServer = useContext(SocketContext);
  const [rooms, setRooms] = useState<Room[]>([]);

  wsServer.on("take-rooms", (tookRooms: Room[]) => {
    setRooms(tookRooms);
  });
  const handleCreateRoom = (roomName: string): void => {
    wsServer.emit("create-room", roomName);
  };

  useEffect(() => {
    wsServer.emit("get-rooms");
  }, []);

  return <RoomsLayout handleCreateRoom={handleCreateRoom} />;
};

export default RoomsContainer;
