import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

//
// SLICE
// -----

interface State {
  userTokenId?: string;
}
const initialState: State = { userTokenId: undefined };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserTokenId: (state, action: PayloadAction<string>) => {
      state.userTokenId = action.payload;
    },
    clearUserTokenId: (state) => {
      state.userTokenId = undefined;
    },
  },
});

export const { loadUserTokenId, clearUserTokenId } = userSlice.actions;

export default userSlice.reducer;

//
// SELECTORS
// ---------

export const selectUserTokenId = (state: RootState) => state.user.userTokenId;
