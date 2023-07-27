import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AboutPage } from "./components/layout/AboutPage";
import { AppLayout } from "./components/layout/AppLayout";
import { PrivacyPolicyPage } from "./components/layout/PrivacyPolicyPage";
import { CreateRecipePage } from "./features/recipe/CreateRecipePage";
import { EditRecipePage } from "./features/recipe/EditRecipePage";
import { RecipePage } from "./features/recipe/RecipePage";
import { RecipesPage } from "./features/recipe/RecipesPage";
import { AuthGuard } from "./features/user/AuthGuard";

export function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/recipes/create"
          element={<AuthGuard component={CreateRecipePage} />}
        />
        <Route
          path="/recipes/:recipeId/edit"
          element={<AuthGuard component={EditRecipePage} />}
        />
        <Route
          path="/recipes/:recipeId"
          element={<AuthGuard component={RecipePage} />}
        />
        <Route
          path="/recipes"
          element={<AuthGuard component={RecipesPage} />}
        />
        <Route path="/about" element={<AuthGuard component={AboutPage} />} />
        <Route
          path="/privacy-policy"
          element={<AuthGuard component={PrivacyPolicyPage} />}
        />
        <Route path="/" element={<AuthGuard component={RecipesPage} />} />
      </Route>
    </Routes>
  );
}
