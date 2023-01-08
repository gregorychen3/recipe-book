import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ReactRouter5Adapter } from "use-query-params/adapters/react-router-5";
import { QueryParamProvider } from "use-query-params";
import { App } from "./App";
import { store } from "./app/store";
import { reportWebVitals } from "./reportWebVitals";
import { theme } from "./theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter5Adapter}>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
