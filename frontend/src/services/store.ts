import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";
import { basesSlice } from "./bases/slice";
import { eventsSlice } from "./events/slice";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

const rootReducer = combineSlices(userSlice, basesSlice, eventsSlice);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
