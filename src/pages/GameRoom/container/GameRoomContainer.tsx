import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import GameRoomLayout from "src/pages/GameRoom/components/GameRoomLayout";
import SnackBar from "src/components/SnackBar";

import { createPosition } from "src/helpers/createPosition";
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
  const [error, setError] = useState<string>("");

  const handleTurn = (index: number): void => {
    if (room.turn !== user.symbol) {
      setError("Now enemy turn");
    }

    if (room.turn === user.symbol && !room.fields[index]) {
      wsServer.emit("change-turn", { index, symbol: user.symbol, roomId });
    }
  };

  const resetError = (): void => {
    setError("");
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
      wsServer.emit("reset-room", roomId);
    };
  }, []);
  return (
    <>
      <GameRoomLayout
        room={room}
        user={user}
        handleChangeTurn={handleTurn}
        finishGameMessage={finishGameMessage}
      />
      {error && (
        <SnackBar
          message={error}
          severity="error"
          duration={2000}
          position={createPosition("top", "center")}
          onClose={resetError}
        />
      )}
    </>
  );
};

export default GameRoomContainer;
