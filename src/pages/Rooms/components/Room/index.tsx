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
  handleOpenModal: (modalName: "roomName" | "userName") => void;
}

const Room = ({
  id,
  name,
  usersCount,
  changeIdToJoin,
  handleOpenModal,
}: RoomProps): JSX.Element => {
  const handleStartJoin = () => {
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
