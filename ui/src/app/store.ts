import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipe/RecipeSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
