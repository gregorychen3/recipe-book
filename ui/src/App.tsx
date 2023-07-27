import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AboutPage } from "./components/layout/AboutPage";
import { AppLayout } from "./components/layout/AppLayout";
import { PrivacyPolicyPage } from "./components/layout/PrivacyPolicyPage";
import { CreateRecipePage } from "./features/recipe/CreateRecipePage";
import { EditRecipePage } from "./features/recipe/EditRecipePage";
import { RecipePage } from "./features/recipe/RecipePage";
import { RecipesPage } from "./features/recipe/RecipesPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/recipes/:recipeId/edit" element={<EditRecipePage />} />
        <Route path="/recipes/:recipeId" element={<RecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/" element={<RecipesPage />} />
      </Route>
    </Routes>
  );
}
