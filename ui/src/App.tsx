import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AboutPage } from "./components/layout/AboutPage";
import { AppHeader } from "./components/layout/AppHeader";
import { PrivacyPolicyPage } from "./components/layout/PrivacyPolicyPage";
import { CreateRecipePage } from "./features/recipe/CreateRecipePage";
import { EditRecipePage } from "./features/recipe/EditRecipePage";
import { RecipePage } from "./features/recipe/RecipePage";
import { RecipesPage } from "./features/recipe/RecipesPage";

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
