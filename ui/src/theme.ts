import { createMuiTheme, Theme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: { main: "#009DDB" },
    secondary: { main: "#F09000" },
    error: { main: "#EC1600" },
    warning: { main: "#EBA300" },
    success: { main: "#00C78E" },
    background: { default: "#171717", paper: "#1E262E" },
    type: "dark",
  },
});

export const getThemedToastClass = (theme: Theme) => {
  return {
    "&.Toastify__toast--info": {
      backgroundColor: theme.palette.primary.main,
    },
    "&.Toastify__toast--success": {
      backgroundColor: theme.palette.success.main,
    },
    "&.Toastify__toast--warning": {
      backgroundColor: theme.palette.warning.main,
    },
    "&.Toastify__toast--error": {
      backgroundColor: theme.palette.error.main,
    },
    "&.Toastify__toast--default": {
      backgroundColor: theme.palette.background.paper,
    },
  };
};
