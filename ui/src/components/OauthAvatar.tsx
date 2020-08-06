import { Avatar, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearUserTokenId, loadUserTokenId, selectUserTokenId } from "../app/userSlice";

// client id for local development
//const clientId = "733241561721-4u35j8dtjmkisfs479m9an9f6p6tep1s.apps.googleusercontent.com";

// client id for prod
const clientId = "733241561721-n27hobb24p9hak87q92kq90fmuobidhj.apps.googleusercontent.com";

const useStyles = makeStyles((theme) => ({
  avatar: { width: theme.spacing(3), height: theme.spacing(3) },
  avatarActive: { backgroundColor: theme.palette.primary.main },
}));

export default function OauthAvatar() {
  const classes = useStyles();
  const d = useDispatch();

  const user = useSelector(selectUserTokenId);
  const handleLoginSuccess = (resp: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (resp.code) {
      // TODO : if responseType is 'code', callback will return the authorization code that can be used to retrieve a refresh token from the server.
      resp = resp as GoogleLoginResponseOffline;
      return;
    }
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

  return user ? (
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={handleLogoutSuccess}
      onFailure={handleLogoutFailure}
      render={(renderProps) => (
        <Tooltip title="Click to logout">
          <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <Avatar className={clsx(classes.avatar, classes.avatarActive)} />
          </IconButton>
        </Tooltip>
      )}
    />
  ) : (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      isSignedIn
      cookiePolicy="single_host_origin"
      render={(renderProps) => (
        <Tooltip title="Log in to edit recipes">
          <span>
            <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <Avatar className={classes.avatar} />
            </IconButton>
          </span>
        </Tooltip>
      )}
    />
  );
}
