import { Button, LinearProgress, Menu, MenuItem, Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { selectShowLoading } from "../app/apiSlice";
import { GroupBy } from "../pages/RecipesPage";

const browseMenuOpts: { label: string; value: GroupBy }[] = [
  { label: "By Course", value: "course" },
  { label: "By Cuisine", value: "cuisine" },
  { label: "A-Z", value: "alphabetical" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  avatar: { width: theme.spacing(3), height: theme.spacing(3) },
}));

export default function AppHeader() {
  const classes = useStyles();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showLoading = useSelector(selectShowLoading);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navToHome = () => history.push("/");

  const handleGroupByChanged = (groupBy: GroupBy) => {
    history.push(`/recipes?groupBy=${groupBy}`);
    handleClose();
  };

  return (
    <AppBar position="absolute" color="inherit">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={navToHome} className={classes.menuButton}>
          <RestaurantIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap onClick={navToHome} className={classes.title}>
          Greg and Ally's Recipe Book
        </Typography>
        <Button onClick={handleMenu} color="inherit">
          Browse
          <ExpandMoreIcon fontSize="small" />
        </Button>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={!!anchorEl}
          onClose={handleClose}
        >
          {browseMenuOpts.map(({ label, value }) => (
            <MenuItem onClick={() => handleGroupByChanged(value)} key={value}>
              {label}
            </MenuItem>
          ))}
        </Menu>
        <Button color="inherit" component={RouterLink} to="/recipes/create">
          Add Recipe
        </Button>
        <Button color="inherit" component={RouterLink} to="/about">
          About
        </Button>
        <IconButton>
          <Avatar className={classes.avatar} />
        </IconButton>
      </Toolbar>
      <LinearProgress hidden={!showLoading} />
    </AppBar>
  );
}
