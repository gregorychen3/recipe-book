import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";

export function UserAvatar() {
  const { user } = useAuth0();

  return <Avatar alt={user?.name} src={user?.picture} />;
}
