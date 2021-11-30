import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
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
});

export default apiSlice.reducer;

//
// SELECTORS
// ---------

export const selectShowLoading = (state: RootState) => !_.isEmpty(state.api.inFlightRequests);
