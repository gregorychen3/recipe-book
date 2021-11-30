import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Method } from "axios";
import { RootState } from "./store";

let nextRequestId = 0;
export const getNextRequestId = () => nextRequestId++;

//
// SLICE
// -----

export interface ActiveRequest {
  id: number;
  method: Method;
  url: string;
  data?: any;
}

interface State {
  requestsById: { [key: number]: ActiveRequest };
}

const initialState: State = { requestsById: {} };

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    putRequest: (state, { payload }: PayloadAction<ActiveRequest>) => {
      state.requestsById[payload.id] = payload;
    },
    removeRequest: (state, { payload }: PayloadAction<{ id: number }>) => {
      delete state.requestsById[payload.id];
    },
  },
});

export const { putRequest, removeRequest } = apiSlice.actions;
export default apiSlice.reducer;

//
// SELECTORS
// ---------

export const selectActiveRequests = (state: RootState) => state.api.requestsById;
