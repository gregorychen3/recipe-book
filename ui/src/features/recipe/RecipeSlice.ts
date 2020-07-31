import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipeModel } from "../../../../src/db/recipe";
import apiClient from "../../apiClient";
import { RootState } from "../../app/store";

//
// THUNKS
// ------

export const fetchRecipes = createAsyncThunk("users/fetchRecipes", async () => {
  const resp = await apiClient.fetchRecipes();
  return resp.data;
});

export const updateRecipe = createAsyncThunk("users/updateRecipe", async (recipe: IRecipeModel) => {
  const resp = await apiClient.updateRecipe(recipe._id, recipe);
  return resp.data;
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
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const updatedRecipe = action.payload;
      state.recipes = [...state.recipes.filter((r) => r._id !== updatedRecipe._id), updatedRecipe];
    });
  },
});

export default recipeSlice.reducer;

//
// SELECTORS
// ---------

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const selectRecipe = (recipeId: string) => (state: RootState) =>
  state.recipe.recipes.find((r) => r._id === recipeId);
