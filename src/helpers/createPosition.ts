import type { SnackbarOrigin } from "@mui/material";

type Vertical = "top" | "bottom";
type Horizontal = "left" | "center" | "right";

export const createPosition = (
  vertical: Vertical,
  horizontal: Horizontal
): SnackbarOrigin => ({
  vertical,
  horizontal,
});
