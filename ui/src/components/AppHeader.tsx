import { useAuth0 } from "@auth0/auth0-react";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Button,
  Hidden,
  LinearProgress,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { selectActiveRequests } from "../features/api/apiSlice";
import { GroupBy } from "../pages/RecipesPage";

const browseMenuOpts: { label: string; value: GroupBy }[] = [
  { label: "By Course", value: "course" },
  { label: "By Cuisine", value: "cuisine" },
  { label: "A-Z", value: "alphabetical" },
];

const AppTitle = styled(Typography)<TypographyProps>(() => ({
  flexGrow: 1,
  cursor: "pointer",
}));

export function AppHeader() {
  const nav = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isLoading = !_.isEmpty(useSelector(selectActiveRequests));

  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navToHome = () => nav("/");
  const handleGroupByChanged = (groupBy: GroupBy) => {
    nav(`/recipes?groupBy=${groupBy}`);
    handleClose();
  };

  const {
    user,
    isAuthenticated,
    isLoading: isAuth0Loading,
    logout,
  } = useAuth0();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleSignOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <AppBar position="absolute" color="inherit">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={navToHome}
          size="large"
          sx={{ mr: 2 }}
        >
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
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user?.name} src={user?.picture} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={handleSignOut}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
      {isLoading && <LinearProgress />}
    </AppBar>
  );
}
