import { useAuth0 } from "@auth0/auth0-react";
import AddIcon from "@mui/icons-material/Add";
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
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectActiveRequests } from "../features/api/apiSlice";
import { UserAvatar } from "./UserAvatar";

const AppTitle = styled(Typography)<TypographyProps>(() => ({
  flexGrow: 1,
  cursor: "pointer",
}));

export function AppHeader() {
  const nav = useNavigate();

  const isLoading = !_.isEmpty(useAppSelector(selectActiveRequests));

  const navToHome = () => nav("/");

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleAvatarClicked = (e: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

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
        <Tooltip title={isAuthenticated ? "Open settings" : "Log in"}>
          <IconButton onClick={handleAvatarClicked} sx={{ p: 0 }}>
            <UserAvatar />
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
            <Typography textAlign="center" onClick={handleLogout}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
      {isLoading && <LinearProgress />}
    </AppBar>
  );
}
