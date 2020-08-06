import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { createRecipe, deleteRecipe, fetchRecipe, fetchRecipes, updateRecipe } from "../features/recipe/RecipeSlice";
import { RootState } from "./store";

//
// SLICE
// -----

interface State {
  inFlightRequests: { [requestId: string]: {} };
}
const initialState: State = { inFlightRequests: {} };
export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRecipe.pending, (state, action) => {
      state.inFlightRequests[action.meta.requestId] = {};
    });
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });
    builder.addCase(createRecipe.rejected, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });

    builder.addCase(fetchRecipes.pending, (state, action) => {
      state.inFlightRequests[action.meta.requestId] = {};
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });

    builder.addCase(fetchRecipe.pending, (state, action) => {
      state.inFlightRequests[action.meta.requestId] = {};
    });
    builder.addCase(fetchRecipe.fulfilled, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });
    builder.addCase(fetchRecipe.rejected, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });

    builder.addCase(updateRecipe.pending, (state, action) => {
      state.inFlightRequests[action.meta.requestId] = {};
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });
    builder.addCase(updateRecipe.rejected, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });

    builder.addCase(deleteRecipe.pending, (state, action) => {
      state.inFlightRequests[action.meta.requestId] = {};
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      delete state.inFlightRequests[action.meta.requestId];
    });
  },
});

export default apiSlice.reducer;

//
// SELECTORS
// ---------

export const selectShowLoading = (state: RootState) => !_.isEmpty(state.api.inFlightRequests);
