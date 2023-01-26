import { Button, Input, Modal } from "@mui/material";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import stylesClasses from "src/pages/Rooms/components/JoinRoomModal/styles.module.scss";

interface JoinRoomModalProps {
  isOpen: boolean;
  handleClose: (modalName: "userName" | "roomName") => void;
  handleJoinRoom: (userName: string) => void;
}
const JoinRoomModal = ({
  isOpen,
  handleClose,
  handleJoinRoom,
}: JoinRoomModalProps): JSX.Element => {
  const [userName, setUserName] = useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const trimmedUserName = userName.trim();

    if (trimmedUserName) {
      handleJoinRoom(trimmedUserName);
      handleClose("userName");
    }
    setUserName("");
  };

  return (
    <Modal
      className={stylesClasses.modalWindow}
      open={isOpen}
      onClose={() => handleClose("userName")}
    >
      <form className={stylesClasses.wrapper} onSubmit={handleSubmit}>
        <Input
          placeholder="Write your name..."
          value={userName}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Join
        </Button>
      </form>
    </Modal>
  );
};

export default JoinRoomModal;
