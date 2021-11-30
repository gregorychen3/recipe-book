import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History } from "history";
import { toast } from "react-toastify";
import { IRecipeModel } from "../../../../src/db/recipe";
import { IRecipe } from "../../../../src/types";
import apiClient from "../../apiClient";
import { RootState } from "../../app/store";

//
// THUNKS
// ------

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (data: { recipe: IRecipe; history: History }) => {
    const { recipe, history } = data;
    const resp = await apiClient.createRecipe(recipe);
    history.push(`/recipes/${resp.data.id}`);
    return resp.data;
  }
);

export const fetchRecipes = createAsyncThunk("recipe/fetchRecipes", async () => {
  const resp = await apiClient.fetchRecipes();
  return resp.data;
});

export const fetchRecipe = createAsyncThunk("recipe/fetchRecipe", async (recipeId: string) => {
  const resp = await apiClient.fetchRecipe(recipeId);
  return resp.data;
});

export const updateRecipe = createAsyncThunk(
  "recipe/updateRecipe",
  async (data: { recipeId: string; recipe: IRecipe; history: History }) => {
    const { recipeId, recipe, history } = data;
    const resp = await apiClient.updateRecipe(recipeId, recipe);
    history.push(`/recipes/${recipeId}`);
    return resp.data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (data: { recipeId: string; history: History }) => {
    const { recipeId, history } = data;
    const resp = await apiClient.deleteRecipe(recipeId);
    history.push("/recipes");
    return resp.data;
  }
);

//
// SLICE
// -----

interface State {
  recipesById: { [id: string]: IRecipeModel };
}

const initialState: State = { recipesById: {} };

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    putRecipe: (state, { payload }: PayloadAction<IRecipeModel>) => {
      state.recipesById[payload.id] = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      const createdRecipe = action.payload;
      state.recipesById[createdRecipe.id] = createdRecipe;
      toast.success("Recipe successfully created");
    });
    builder.addCase(createRecipe.rejected, (_, action) => {
      toast.error(`Failed to create recipe: ${action.error.message}`);
    });

    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      action.payload.forEach((r) => {
        state.recipesById[r.id] = r;
      });
    });
    builder.addCase(fetchRecipes.rejected, (_, action) => {
      toast.error(`Failed to fetch recipes: ${action.error.message}`);
    });

    builder.addCase(fetchRecipe.fulfilled, (state, action) => {
      const recipe = action.payload;
      state.recipesById[recipe.id] = recipe;
    });
    builder.addCase(fetchRecipe.rejected, (_, action) => {
      toast.error(`Failed to fetch recipe: ${action.error.message}`);
    });

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const updatedRecipe = action.payload;
      state.recipesById[updatedRecipe.id] = updatedRecipe;
      toast.success("Recipe successfully updated");
    });
    builder.addCase(updateRecipe.rejected, (_, action) => {
      toast.error(`Failed to update recipe: ${action.error.message}`);
    });

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      delete state.recipesById[action.payload.id];
      toast.success("Recipe successfully deleted");
    });
    builder.addCase(deleteRecipe.rejected, (_, action) => {
      toast.error(`Failed to delete recipe: ${action.error.message}`);
    });
  },
});

export const { putRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;

//
// SELECTORS
// ---------

export const selectRecipes = (state: RootState) => state.recipe.recipesById;
export const selectRecipe = (recipeId: string) => (state: RootState) => state.recipe.recipesById[recipeId];
