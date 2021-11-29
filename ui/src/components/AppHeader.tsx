import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Button, Hidden, LinearProgress, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography, { TypographyProps } from "@mui/material/Typography";
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

const AppTitle = styled(Typography)<TypographyProps>(() => ({
  flexGrow: 1,
  cursor: "pointer",
}));

export default function AppHeader() {
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
        <IconButton edge="start" color="inherit" onClick={navToHome} size="large" sx={{ mr: 2 }}>
          <RestaurantIcon />
        </IconButton>
        <Hidden smDown>
          <AppTitle variant="h6" color="inherit" noWrap onClick={navToHome}>
            Greg and Ally's Recipe Book
          </AppTitle>
        </Hidden>
        <div />
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
        <Hidden smDown>
          <Button color="inherit" component={RouterLink} to="/recipes/create">
            Add Recipe
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton component={RouterLink} to="/recipes/create" size="large">
            <AddIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton component={RouterLink} to="/about" size="large">
            <InfoIcon />
          </IconButton>
        </Hidden>
        <OauthAvatar />
      </Toolbar>
      <LinearProgress hidden={!showLoading} />
    </AppBar>
  );
}
