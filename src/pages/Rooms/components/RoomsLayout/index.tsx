import { useState } from "react";
import { Button } from "@mui/material";

import CreateRoomModal from "src/pages/Rooms/components/CreateRoomModal";
import JoinRoomModal from "src/pages/Rooms/components/JoinRoomModal";
import Room from "src/pages/Rooms/components/Room";
import SnackBar from "src/components/SnackBar";

import { createPosition } from "src/helpers/createPosition";
import type { Room as RoomType } from "src/types/room";
import stylesClasses from "src/pages/Rooms/components/RoomsLayout/styles.module.scss";

interface RoomsLayoutProps {
  rooms: RoomType[];
  handleCreateRoom: (roomName: string) => void;
  changeIdToJoin: (id: string) => void;
  handleJoinRoom: (userName: string) => void;
}

const RoomsLayout = ({
  rooms,
  handleCreateRoom,
  changeIdToJoin,
  handleJoinRoom,
}: RoomsLayoutProps): JSX.Element => {
  const [modals, setModals] = useState({
    roomName: false,
    userName: false,
  });

  const [error, setError] = useState<string>("");

  const resetError = () => {
    setError("");
  };

  const handleChangeError = (error: string) => {
    setError(error);
  };

  const handleToggleModals = (modalName: "roomName" | "userName") => {
    setModals((prevState) => ({
      ...prevState,
      [modalName]: !modals[modalName],
    }));
  };

  return (
    <div>
      <Button
        className={stylesClasses.createRoomButton}
        onClick={() => handleToggleModals("roomName")}
        variant="contained"
      >
        Create room
      </Button>
      <div className={stylesClasses.roomsHolder}>
        {rooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            name={room.name}
            usersCount={room.users.length}
            changeIdToJoin={changeIdToJoin}
            createError={handleChangeError}
            handleOpenModal={handleToggleModals}
          />
        ))}
      </div>
      <CreateRoomModal
        isOpen={modals.roomName}
        handleCreateRoom={handleCreateRoom}
        createError={handleChangeError}
        handleClose={handleToggleModals}
      />
      <JoinRoomModal
        isOpen={modals.userName}
        handleJoinRoom={handleJoinRoom}
        handleClose={handleToggleModals}
      />
      {error && (
        <SnackBar
          message={error}
          severity={"error"}
          duration={2000}
          position={createPosition("top", "center")}
          onClose={resetError}
        />
      )}
    </div>
  );
};

export default RoomsLayout;
