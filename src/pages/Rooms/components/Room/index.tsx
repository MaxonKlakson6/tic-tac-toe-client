import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

interface RoomProps {
  id: string;
  name: string;
  usersCount: number;
  changeIdToJoin: (id: string) => void;
  createError: (error: string) => void;
  handleOpenModal: (modalName: "roomName" | "userName") => void;
}

const Room = ({
  id,
  name,
  usersCount,
  changeIdToJoin,
  createError,
  handleOpenModal,
}: RoomProps): JSX.Element => {
  const handleStartJoin = () => {
    if (usersCount === 2) {
      createError("Maximum 2 users in a room");
      return;
    }

    changeIdToJoin(id);
    handleOpenModal("userName");
  };

  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>
        <Typography>People in room: {usersCount}</Typography>
        <CardActions>
          <Button variant="outlined" onClick={handleStartJoin}>
            Join
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Room;
