import { Typography } from "@mui/material";

import Board from "src/pages/GameRoom/components/Board";
import FinishGameModal from "src/pages/GameRoom/components/FinishGameModal";
import UsersInfo from "src/pages/GameRoom/components/UsersInfo";

import type { Room } from "src/types/room";
import type { User } from "src/types/user";
import stylesClasses from "src/pages/GameRoom/components/GameRoomLayout/styles.module.scss";

interface GameRoomLayoutProps {
  room: Room;
  user: User;
  finishGameMessage: string;
  handleChangeTurn: (index: number) => void;
}

const GameRoomLayout = ({
  room,
  user,
  finishGameMessage,
  handleChangeTurn,
}: GameRoomLayoutProps): JSX.Element => {
  return (
    <div className={stylesClasses.wrapper}>
      <div className={stylesClasses.centreBlock}>
        <Typography variant="h4">Turn: {room.turn}</Typography>
        <Board fields={room.fields} handleChangeTurn={handleChangeTurn} />
      </div>
      <UsersInfo room={room} user={user} />
      {finishGameMessage && <FinishGameModal message={finishGameMessage} />}
    </div>
  );
};

export default GameRoomLayout;
