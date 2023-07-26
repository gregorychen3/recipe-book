import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { App } from "./App";
import { store } from "./app/store";
import { auth0Config } from "./auth0Config";
import "./index.css";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0Config.audience,
        scope: auth0Config.scope,
      }}
    >
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <App />
              </SnackbarProvider>
            </ThemeProvider>
          </Provider>
        </QueryParamProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
