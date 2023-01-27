import { Modal, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { SocketContext } from "src/context";
import { ROUTE_NAMES } from "src/router/routeNames";
import stylesClasses from "src/pages/GameRoom/components/FinishGameModal/styles.module.scss";

interface FinishGameModal {
  message: string;
}

const FinishGameModal = ({ message }: FinishGameModal): JSX.Element => {
  const roomId = localStorage.getItem("roomId");
  const wsServer = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(ROUTE_NAMES.ROOMS);
    }, 2000);

    return () => {
      wsServer.emit("delete-room", roomId);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Modal className={stylesClasses.wrapper} open={true}>
      <div className={stylesClasses.modal}>
        <Typography variant="h4">{message}</Typography>
      </div>
    </Modal>
  );
};

export default FinishGameModal;
