import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { RootState } from "./store";

//
// SLICE
// -----

interface State {
  user?: GoogleLoginResponse | GoogleLoginResponseOffline;
}
const initialState: State = { user: undefined };
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
