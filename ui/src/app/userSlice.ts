import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    loadUser: (state, action: PayloadAction<GoogleLoginResponse | GoogleLoginResponseOffline>) => {
      state.user = action.payload;
    },
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;

//
// SELECTORS
// ---------

export const selectUser = (state: RootState) => state.user.user;
