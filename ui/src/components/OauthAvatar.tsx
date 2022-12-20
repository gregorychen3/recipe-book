import { Avatar as MuiAvatar, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { googleLogout, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { clearUserTokenId, loadUserTokenId, selectUserTokenId } from "../features/user/userSlice";

// client id for local development
//const clientId = "733241561721-4u35j8dtjmkisfs479m9an9f6p6tep1s.apps.googleusercontent.com";

// client id for prod
const clientId = "733241561721-n27hobb24p9hak87q92kq90fmuobidhj.apps.googleusercontent.com";

export function Avatar() {
  const d = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector(selectUserTokenId);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      d(loadUserTokenId(tokenResponse.access_token));
      enqueueSnackbar("Successfully logged in", { variant: "success" });
    },
    onError: (errResp) => {
      d(clearUserTokenId());
      enqueueSnackbar(JSON.stringify(errResp), { variant: "error" });
    },
  });

  const handleLogout = () => {
    d(clearUserTokenId());
    enqueueSnackbar("Successfully logged out", { variant: "success" });
    googleLogout();
  };

  return user ? (
    <Tooltip title="Click to logout">
      <IconButton onClick={handleLogout} size="large">
        <MuiAvatar sx={{ width: 24, height: 24, backgroundColor: "primary.main" }} />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Log in to edit recipes">
      <IconButton onClick={() => login()} size="large">
        <MuiAvatar sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Tooltip>
  );
}

export function OauthAvatar() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Avatar />
    </GoogleOAuthProvider>
  );
}
