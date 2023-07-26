import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { auth0Config } from "./auth0Config";
import { AppHeader } from "./components/AppHeader";
import { AboutPage } from "./pages/AboutPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { RecipePage } from "./pages/RecipePage";
import { RecipesPage } from "./pages/RecipesPage";

export function App() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const ensureToken = () => {
      getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${auth0Config.domain}/api/v2/`,
          scope: "read:current_user",
        },
      }).then((token) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      });
    };

    ensureToken();

    const interval = setInterval(() => {
      ensureToken();
    }, 3600);

    return () => clearInterval(interval);
  }, [getAccessTokenSilently]);

  return (
    <Box display="flex">
      <CssBaseline />
      <AppHeader />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/recipes/create" element={<CreateRecipePage />} />
            <Route
              path="/recipes/:recipeId/edit"
              element={<EditRecipePage />}
            />
            <Route path="/recipes/:recipeId" element={<RecipePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/" element={<RecipesPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
