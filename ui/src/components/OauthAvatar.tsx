import { Avatar, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearUserTokenId, loadUserTokenId, selectUserTokenId } from "../app/userSlice";

// client id for local development
const clientId = "733241561721-4u35j8dtjmkisfs479m9an9f6p6tep1s.apps.googleusercontent.com";

// client id for prod
//const clientId = "733241561721-n27hobb24p9hak87q92kq90fmuobidhj.apps.googleusercontent.com";

export default function OauthAvatar() {
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
          <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled} size="large">
            <Avatar sx={{ width: 24, height: 24, backgroundColor: "primary.main" }} />
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
          <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled} size="large">
            <Avatar sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}
