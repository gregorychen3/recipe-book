import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import recipeReducer from "../features/recipe/RecipeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recipe: recipeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
