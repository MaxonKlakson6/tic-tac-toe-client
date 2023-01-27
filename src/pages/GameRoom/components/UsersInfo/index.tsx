import { Typography } from "@mui/material";

import type { Room } from "src/types/room";
import type { User } from "src/types/user";

interface UsersInfoProps {
  room: Room;
  user: User;
}

const UsersInfo = ({ room, user }: UsersInfoProps): JSX.Element => {
  return (
    <div>
      {room.users.map((userInRoom) => (
        <Typography key={userInRoom.id} variant="body1">
          {userInRoom.id === user.id
            ? `Your symbol ${user.symbol}`
            : `${userInRoom.name}: ${userInRoom.symbol}`}
        </Typography>
      ))}
    </div>
  );
};

export default UsersInfo;
