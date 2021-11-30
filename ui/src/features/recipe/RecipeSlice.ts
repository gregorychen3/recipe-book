import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecipeModel } from "../../../../src/db/recipe";
import { RootState } from "../../app/store";

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
    putRecipes: (state, { payload }: PayloadAction<IRecipeModel[]>) => {
      payload.forEach((r) => {
        state.recipesById[r.id] = r;
      });
    },
    removeRecipe: (state, { payload }: PayloadAction<string>) => {
      delete state.recipesById[payload];
    },
  },
});

export const { putRecipe, putRecipes, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;

//
// SELECTORS
// ---------

export const selectRecipes = (state: RootState) => state.recipe.recipesById;
export const selectRecipe = (recipeId: string) => (state: RootState) => state.recipe.recipesById[recipeId];
