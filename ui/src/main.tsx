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
import { theme } from "./theme";

import "./index.css";

const domain = "dev-cuxf3af6zqwbel75.us.auth0.com";
const clientId = "yXN9cXHPym1LpOkyrItZ2hl7gPD84EF7";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
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
