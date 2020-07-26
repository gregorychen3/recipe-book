import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" color="inherit">
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Greg and Ally's Recipe Book
        </Typography>
        <IconButton color="inherit">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
