import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearAuthHeader, setAuthHeader } from "../../app/hooks";
import { RootState } from "../../app/store";

interface UserState {
  userTokenId?: string;
}

const initialState: UserState = { userTokenId: undefined };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserTokenId: (state, action: PayloadAction<string>) => {
      state.userTokenId = action.payload;
      setAuthHeader(action.payload);
    },
    clearUserTokenId: (state) => {
      state.userTokenId = undefined;
      clearAuthHeader();
    },
  },
});

export const { loadUserTokenId, clearUserTokenId } = userSlice.actions;

export const { reducer: userReducer } = userSlice;

//
// SELECTORS
// ---------

export const selectUserTokenId = (state: RootState) => state.user.userTokenId;
