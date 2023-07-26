import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { auth0Config } from "../../auth0Config";

export const useTokenFn = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fn = useCallback(
    () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${auth0Config.domain}/api/v2/`,
          scope: "read:current_user",
        },
      }),
    [getAccessTokenSilently]
  );

  return fn;
};
