import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "./store";

//
// SLICE
// -----

interface State {}
const initialState: State = {};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;

//
// SELECTORS
// ---------

export const selectUser = (state: RootState) => !_.isEmpty(state.api.inFlightRequests);
