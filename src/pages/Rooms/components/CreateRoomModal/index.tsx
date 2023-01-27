import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button, Input, Modal } from "@mui/material";

import stylesClasses from "src/pages/Rooms/components/CreateRoomModal/styles.module.scss";

interface CreateRoomModalProps {
  isOpen: boolean;
  handleClose: (modalName: "roomName" | "userName") => void;
  createError: (error: string) => void;
  handleCreateRoom: (roomName: string) => void;
}

const CreateRoomModal = ({
  isOpen,
  handleClose,
  createError,
  handleCreateRoom,
}: CreateRoomModalProps): JSX.Element => {
  const [roomName, setRoomName] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedRoomName = roomName.trim();

    if (trimmedRoomName.length < 3) {
      createError("Require 3 symbols at least");
    } else {
      handleCreateRoom(roomName);
      handleClose("roomName");
    }
    setRoomName("");
  };

  return (
    <Modal
      className={stylesClasses.modalWindow}
      open={isOpen}
      onClose={() => handleClose("roomName")}
    >
      <form className={stylesClasses.wrapper} onSubmit={handleSubmit}>
        <Input
          placeholder="Write room name..."
          value={roomName}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CreateRoomModal;
