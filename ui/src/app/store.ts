import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { apiReducer } from "../features/api/apiSlice";
import counterReducer from "../features/counter/counterSlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    api: apiReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
