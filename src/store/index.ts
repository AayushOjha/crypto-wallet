import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import walletReducer from "./walletSlice";

export const store = configureStore({
  reducer: {
    wallets: walletReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
