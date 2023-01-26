import { Button } from "@mui/material";
import { useState } from "react";
import CreateRoomModal from "src/pages/Rooms/components/CreateRoomModal";

interface RoomsLayoutProps {
  handleCreateRoom: (roomName: string) => void;
}

const RoomsLayout = ({ handleCreateRoom }: RoomsLayoutProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <Button onClick={handleToggleModal} variant="contained">
          Create room
        </Button>
      </div>
      <CreateRoomModal
        isOpen={isOpen}
        handleCreateRoom={handleCreateRoom}
        handleClose={handleToggleModal}
      />
    </>
  );
};

export default RoomsLayout;
