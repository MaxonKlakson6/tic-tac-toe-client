import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import GameRoomLayout from "src/pages/GameRoom/components/GameRoomLayout";
import { SocketContext } from "src/context";
import { ROUTE_NAMES } from "src/router/routeNames";
import type { User } from "src/types/user";
import type { Room } from "src/types/room";

const GameRoomContainer = (): JSX.Element => {
  const navigate = useNavigate();
  const roomId = localStorage.getItem("roomId");
  const wsServer = useContext(SocketContext);

  const [user, setUser] = useState<User>({ id: "", name: "", symbol: "" });
  const [room, setRoom] = useState<Room>({
    id: "",
    name: "",
    fields: [],
    users: [],
    turn: "",
  });
  const [finishGameMessage, setFinishGameMessage] = useState<string>("");

  const handleTurn = (index: number) => {
    if (room.turn === user.symbol && !room.fields[index]) {
      wsServer.emit("change-turn", { index, symbol: user.symbol, roomId });
    }
  };

  wsServer
    .off("take-game-data")
    .on("take-game-data", ({ user, room }: { user: User; room: Room }) => {
      if (!user) {
        navigate(ROUTE_NAMES.ROOMS);
      }

      setUser(user);
      setRoom(room);
    });
  wsServer.off("update-room").on("update-room", (room: Room) => {
    setRoom(room);
  });
  wsServer.off("game-finished").on("game-finished", (message) => {
    setFinishGameMessage(message);
  });

  useEffect(() => {
    wsServer.emit("get-game-data", roomId);

    return () => {
      wsServer.emit("leave-room", roomId);
      if (!finishGameMessage) {
        wsServer.emit("reset-room", roomId);
      }
    };
  }, []);
  return (
    <GameRoomLayout
      room={room}
      user={user}
      handleChangeTurn={handleTurn}
      finishGameMessage={finishGameMessage}
    />
  );
};

export default GameRoomContainer;
