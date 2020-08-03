import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IRecipeModel } from "../../../../src/db/recipe";
import { IRecipe } from "../../../../src/types";
import apiClient from "../../apiClient";
import { RootState } from "../../app/store";
import history from "../../history";

//
// THUNKS
// ------

export const createRecipe = createAsyncThunk("users/createRecipe", async (recipe: IRecipe) => {
  const resp = await apiClient.createRecipe(recipe);
  return resp.data;
});

export const fetchRecipes = createAsyncThunk("users/fetchRecipes", async () => {
  const resp = await apiClient.fetchRecipes();
  return resp.data;
});

export const updateRecipe = createAsyncThunk(
  "users/updateRecipe",
  async (data: { recipeId: string; recipe: IRecipe }) => {
    const resp = await apiClient.updateRecipe(data.recipeId, data.recipe);
    return resp.data;
  }
);

export const deleteRecipe = createAsyncThunk("users/deleteRecipe", async (recipeId: string) => {
  const resp = await apiClient.deleteRecipe(recipeId);
  history.push("/recipes");
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
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      const createdRecipe = action.payload;
      state.recipes.push(createdRecipe);
      toast.success("Recipe successfully created");
    });
    builder.addCase(createRecipe.rejected, () => {
      toast.error("Failed to create recipe");
    });

    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
    builder.addCase(fetchRecipes.rejected, () => {
      toast.error("Failed to fetch recipes");
    });

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const updatedRecipe = action.payload;
      state.recipes = [...state.recipes.filter((r) => r.id !== updatedRecipe.id), updatedRecipe];
      toast.success("Recipe successfully updated");
    });
    builder.addCase(updateRecipe.rejected, () => {
      toast.error("Failed to update recipe");
    });

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const deletedRecipeId = action.payload;
      state.recipes = [...state.recipes.filter((r) => r.id !== deletedRecipeId)];
      toast.success("Recipe successfully deleted");
    });
    builder.addCase(deleteRecipe.rejected, () => {
      toast.error("Failed to delete recipe");
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
