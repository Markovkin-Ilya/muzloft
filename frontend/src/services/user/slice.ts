import { TUser, TRepetition } from "@utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkUserAuth,
  login,
  logout,
  register,
  update,
  addRepetition,
} from "./actions";
import { saveAuthTokens } from "@utils/tokenStorage";

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  authCheckError: string | null;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  authCheckError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setAuthCheckError: (state, action: PayloadAction<string | null>) => {
      state.authCheckError = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setRepetitions: (state, action: PayloadAction<TRepetition[]>) => {
      state.user = { ...state.user, repetitions: action.payload } as TUser;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectAuthCheckError: (state) => state.authCheckError,
    selectRepetitions: (state) => state.user?.repetitions ?? [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.authCheckError =
          action.error.message ?? "Unable to check authentication";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        saveAuthTokens(action.payload, action.payload.rememberMe);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        saveAuthTokens(action.payload, action.payload.rememberMe);
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(addRepetition.fulfilled, (state, action) => {
        state.user?.repetitions.unshift(action.payload);
      });
  },
});

export const { selectUser, selectIsAuthChecked, selectRepetitions } =
  userSlice.selectors;
export const { selectAuthCheckError } = userSlice.selectors;
export const { setAuthCheckError, setIsAuthChecked, setUser, setRepetitions } =
  userSlice.actions;
