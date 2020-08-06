import { Avatar, Button, LinearProgress, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import clsx from "clsx";
import React, { useState } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { selectShowLoading } from "../app/apiSlice";
import { clearUserTokenId, loadUserTokenId, selectUserTokenId } from "../app/userSlice";
import { GroupBy } from "../pages/RecipesPage";

const browseMenuOpts: { label: string; value: GroupBy }[] = [
  { label: "By Course", value: "course" },
  { label: "By Cuisine", value: "cuisine" },
  { label: "A-Z", value: "alphabetical" },
];

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1, cursor: "pointer" },
  avatar: { width: theme.spacing(3), height: theme.spacing(3) },
  avatarActive: { backgroundColor: theme.palette.primary.main },
}));

export default function AppHeader() {
  const classes = useStyles();
  const history = useHistory();
  const d = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showLoading = useSelector(selectShowLoading);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navToHome = () => history.push("/");

  const user = useSelector(selectUserTokenId);
  const handleLoginSuccess = (resp: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (resp.code) {
      // TODO : if responseType is 'code', callback will return the authorization code that can be used to retrieve a refresh token from the server.
      resp = resp as GoogleLoginResponseOffline;
      return;
    }
    toast.success("Login succeeded");
    d(loadUserTokenId((resp as GoogleLoginResponse).tokenId));
  };
  const handleLoginFailure = (err: any) => {
    d(clearUserTokenId());
    toast.error(`Failed to login: ${err.error}`);
  };
  const handleLogoutSuccess = () => {
    d(clearUserTokenId());
    toast.success("Logout succeeded");
  };
  const handleLogoutFailure = () => toast.error("Failed to logout");

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
        {user ? (
          <GoogleLogout
            clientId="733241561721-4u35j8dtjmkisfs479m9an9f6p6tep1s.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleLogoutSuccess}
            onFailure={handleLogoutFailure}
            render={(renderProps) => (
              <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <Avatar className={clsx(classes.avatar, classes.avatarActive)} />
              </IconButton>
            )}
          />
        ) : (
          <GoogleLogin
            clientId="733241561721-4u35j8dtjmkisfs479m9an9f6p6tep1s.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            isSignedIn
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
              <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <Avatar className={classes.avatar} />
              </IconButton>
            )}
          />
        )}
      </Toolbar>
      <LinearProgress hidden={!showLoading} />
    </AppBar>
  );
}
