import { Button, Hidden, LinearProgress, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoIcon from "@material-ui/icons/Info";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { selectShowLoading } from "../app/apiSlice";
import { GroupBy } from "../pages/RecipesPage";
import OauthAvatar from "./OauthAvatar";

const browseMenuOpts: { label: string; value: GroupBy }[] = [
  { label: "By Course", value: "course" },
  { label: "By Cuisine", value: "cuisine" },
  { label: "A-Z", value: "alphabetical" },
];

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1, cursor: "pointer" },
  grow: { flexGrow: 1 },
}));

export default function AppHeader() {
  const classes = useStyles();
  const history = useHistory();

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
        <Hidden xsDown>
          <Typography component="h1" variant="h6" color="inherit" noWrap onClick={navToHome} className={classes.title}>
            Greg and Ally's Recipe Book
          </Typography>
        </Hidden>
        <div className={classes.grow} />
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
        <Hidden xsDown>
          <Button color="inherit" component={RouterLink} to="/recipes/create">
            Add Recipe
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton component={RouterLink} to="/recipes/create">
            <AddIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton component={RouterLink} to="/about">
            <InfoIcon />
          </IconButton>
        </Hidden>
        <OauthAvatar />
      </Toolbar>
      <LinearProgress hidden={!showLoading} />
    </AppBar>
  );
}
