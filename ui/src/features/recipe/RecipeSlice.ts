import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IRecipeModel } from "../../../../src/db/recipe";
import { IRecipe } from "../../../../src/types";
import apiClient from "../../apiClient";
import { RootState } from "../../app/store";

//
// THUNKS
// ------

export const fetchRecipes = createAsyncThunk("users/fetchRecipes", async () => {
  const resp = await apiClient.fetchRecipes();
  return resp.data;
});

export const updateRecipe = createAsyncThunk(
  "users/updateRecipe",
  async (data: { recipeId: string; recipe: IRecipe }) => {
    const resp = await apiClient.updateRecipe(data.recipeId, data.recipe);
    toast("Recipe successfully updated", { type: "success" });
    return resp.data;
  }
);

export const deleteRecipe = createAsyncThunk("users/deleteRecipe", async (recipeId: string) => {
  const resp = await apiClient.deleteRecipe(recipeId);
  toast("Recipe successfully deleted", { type: "success" });
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
      state.recipes = [...state.recipes.filter((r) => r.id !== updatedRecipe.id), updatedRecipe];
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const deletedRecipeId = action.payload;
      state.recipes = [...state.recipes.filter((r) => r.id !== deletedRecipeId)];
    });
  },
});

export default recipeSlice.reducer;

//
// SELECTORS
// ---------

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const selectRecipe = (recipeId: string) => (state: RootState) =>
  state.recipe.recipes.find((r) => r.id === recipeId);
