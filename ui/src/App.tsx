import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useApi } from "./app/hooks";
import { AppHeader } from "./components/AppHeader";
import { AboutPage } from "./pages/AboutPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { RecipePage } from "./pages/RecipePage";
import { RecipesPage } from "./pages/RecipesPage";

export function App() {
  const migrate = useApi("GET", `/api/recipes/migrate`);
  useEffect(() => {
    migrate();
  }, []);

  return (
    <Box display="flex">
      <CssBaseline />
      <AppHeader />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Switch>
            <Route path="/recipes/create">
              <CreateRecipePage />
            </Route>
            <Route path="/recipes/:recipeId/edit">
              <EditRecipePage />
            </Route>
            <Route path="/recipes/:recipeId">
              <RecipePage />
            </Route>
            <Route path="/recipes">
              <RecipesPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicyPage />
            </Route>
            <Route path="/">
              <Redirect to="/recipes" />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Box>
  );
}
