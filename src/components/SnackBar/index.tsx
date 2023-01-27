import { useState } from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";
import type { AlertColor, SnackbarOrigin } from "@mui/material";

interface SnackBarProps {
  message: string;
  className?: string;
  severity: AlertColor;
  duration: number;
  position: SnackbarOrigin;
  onClose?: () => void;
}

const SnackBar = ({
  message,
  className,
  severity,
  duration,
  position,
  onClose,
}: SnackBarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpenChange = (): void => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <MuiSnackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleOpenChange}
      anchorOrigin={position}
    >
      <Alert className={className} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default SnackBar;
