import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { apiReducer } from "../features/api/apiSlice";
import { recipeReducer } from "../features/recipe/recipeSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    recipe: recipeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
