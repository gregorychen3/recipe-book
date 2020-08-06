import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../app/apiSlice";
import recipeReducer from "../features/recipe/RecipeSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    api: apiReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
