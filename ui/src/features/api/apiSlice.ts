import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Method } from "axios";
import { RootState } from "../../app/store";

export interface ActiveRequest {
  id: number;
  method: Method;
  url: string;
  data?: any;
}

export interface ApiState {
  requestsById: { [key: number]: ActiveRequest };
}

const initialState: ApiState = { requestsById: {} };

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

export const { reducer: apiReducer } = apiSlice;

//
// SELECTORS
// ---------

export const selectActiveRequests = (state: RootState) => state.api.requestsById;
