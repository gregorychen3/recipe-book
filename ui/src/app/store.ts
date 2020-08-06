import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../app/apiSlice";
import userReducer from "../app/userSlice";
import recipeReducer from "../features/recipe/RecipeSlice";

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    api: apiReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
