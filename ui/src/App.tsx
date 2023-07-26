import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { AboutPage } from "./pages/AboutPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { RecipePage } from "./pages/RecipePage";
import { RecipesPage } from "./pages/RecipesPage";

import "./App.css";
import { LoginButton } from "./components/LoginButton";
import { LogoutButton } from "./components/LogoutButton";
import { Profile } from "./Profile";

export function App() {
  return (
    <Box display="flex">
      <CssBaseline />
      <AppHeader />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      >
        <Toolbar />
        <LoginButton />
        <LogoutButton />
        <Profile />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route
              path="/recipes/create"
              element={<CreateRecipePage />}
            ></Route>
            <Route
              path="/recipes/:recipeId/edit"
              element={<EditRecipePage />}
            ></Route>
            <Route path="/recipes/:recipeId" element={<RecipePage />}></Route>
            <Route path="/recipes" element={<RecipesPage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicyPage />}
            ></Route>
            <Route path="/" element={<Navigate to="/recipes" replace />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
