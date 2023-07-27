import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

/*
 * React router layout route component. See https://reactrouter.com/en/main/start/concepts#layout-routes
 */
export function AppLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppHeader />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar sx={{ mb: 2 }} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
