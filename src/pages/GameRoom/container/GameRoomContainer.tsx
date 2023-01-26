import { useContext, useEffect } from "react";
import { SocketContext } from "src/context";

const GameRoomContainer = () => {
  const wsServer = useContext(SocketContext);

  useEffect(() => {
    const roomId = localStorage.getItem("roomId");

    return () => {
      wsServer.emit("leave-room", roomId);
    };
  }, []);
  return <div>Game room</div>;
};

export default GameRoomContainer;
