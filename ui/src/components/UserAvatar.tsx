import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";

export function UserAvatar() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMd, setUserMd] = useState(undefined);

  console.log(userMd);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchUserMd = async () => {
      const domain = "dev-cuxf3af6zqwbel75.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const mdResp = await fetch(userDetailsByIdUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const md = await mdResp.json();
        setUserMd(md);
      } catch (e) {
        console.log(`${e}`);
      }
    };

    fetchUserMd();
  }, [getAccessTokenSilently, user]);

  return <Avatar alt={user?.name} src={user?.picture} />;
}
