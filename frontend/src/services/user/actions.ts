import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  TLoginData,
} from "@utils/api";
import { getCookie, setCookie } from "@utils/cookie";
import { getUserApi } from "@utils/api";
import { TRepetition } from "@utils/types";
import { setIsAuthChecked, setUser } from "./slice";

export const login = createAsyncThunk(
  "user/login",
  async (loginData: TLoginData) => {
    return loginUserApi(loginData);
  },
);

export const logout = createAsyncThunk("user/logout", async () => {
  await logoutApi();
  localStorage.setItem("refreshToken", "");
  setCookie("accessToken", "");
});

export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { dispatch }) => {
    try {
      if (getCookie("accessToken")) {
        const userData = await getUserApi();
        dispatch(setUser(userData.user));
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  },
);

export const register = createAsyncThunk(
  "user/register",
  async (data: TRegisterData) => {
    return registerUserApi(data);
  },
);

export const update = createAsyncThunk(
  "user/update",
  async (data: TRegisterData) => {
    return updateUserApi(data);
  },
);

export const addRepetition = createAsyncThunk(
  "user/addRepetition",
  async (repetitionData: TRepetition) => repetitionData,
);
