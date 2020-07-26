import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipeModel } from "../../../../src/db/recipe";
import apiClient from "../../apiClient";
import { RootState } from "../../app/store";

//
// THUNKS
// ------

export const fetchRecipes = createAsyncThunk("users/fetchRecipes", async () => {
  const recipes = await apiClient.fetchRecipes();
  return recipes.data;
});

//
// SLICE
// -----

interface State {
  recipes: IRecipeModel[];
}
const initialState: State = { recipes: [] };
export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
  },
});

export default recipeSlice.reducer;

//
// SELECTORS
// ---------

export const selectRecipes = (state: RootState) => state.recipe.recipes;
