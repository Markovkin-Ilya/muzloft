import { TUser, TRepetition } from "@utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register, update, addRepetition } from "./actions";
import { setCookie } from "@utils/cookie";

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
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
    selectRepetitions: (state) => state.user?.repetitions ?? [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        setCookie("accessToken", action.payload.accessToken);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        setCookie("accessToken", action.payload.accessToken);
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
export const { setIsAuthChecked, setUser, setRepetitions } = userSlice.actions;
