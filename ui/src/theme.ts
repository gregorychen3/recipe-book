import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#009DDB" },
    secondary: { main: "#F09000" },
    error: { main: "#EC1600" },
    warning: { main: "#EBA300" },
    success: { main: "#00C78E" },
    background: { default: "#171717", paper: "#1E262E" },
    mode: "dark",
  },
});

theme.components = {
  MuiTextField: {
    defaultProps: {
      variant: "standard",
      fullWidth: true,
      InputLabelProps: { shrink: true },
    },
  },
};
