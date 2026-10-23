import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  TLoginData,
  TCreateOrderData,
  createOrderApi,
  getUserApi,
  refreshToken,
  ApiError,
} from "@utils/api";
import { getCookie } from "@utils/cookie";
import { clearAuthTokens, getStoredRefreshToken } from "@utils/tokenStorage";
import { TRepetition } from "@utils/types";
import { setAuthCheckError, setIsAuthChecked, setUser } from "./slice";

type TLoginRequest = TLoginData & { rememberMe: boolean };
type TRegisterRequest = TRegisterData & { rememberMe: boolean };

export const login = createAsyncThunk(
  "user/login",
  async ({ rememberMe, ...loginData }: TLoginRequest) => {
    const authData = await loginUserApi(loginData);
    return { ...authData, rememberMe };
  },
);

export const logout = createAsyncThunk("user/logout", async () => {
  await logoutApi();
  clearAuthTokens();
});

export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { dispatch }) => {
    dispatch(setIsAuthChecked(false));
    dispatch(setAuthCheckError(null));

    try {
      const accessToken = getCookie("accessToken");
      const storedRefreshToken = getStoredRefreshToken();

      if (!accessToken && !storedRefreshToken) {
        dispatch(setUser(null));
        return;
      }

      if (!accessToken) {
        await refreshToken();
      }

      const userData = await getUserApi();
      dispatch(setUser(userData.user));
    } catch (error) {
      if (error instanceof ApiError && [401, 403].includes(error.status)) {
        clearAuthTokens();
        dispatch(setUser(null));
        return;
      }
      throw error;
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  },
);

export const register = createAsyncThunk(
  "user/register",
  async ({ rememberMe, ...data }: TRegisterRequest) => {
    const authData = await registerUserApi(data);
    return { ...authData, rememberMe };
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

export const bookRepetition = createAsyncThunk(
  "user/bookRepetition",
  async (
    { order, repetition }: { order: TCreateOrderData; repetition: TRepetition },
    { dispatch },
  ) => {
    const response = await createOrderApi(order);
    const booked = { ...repetition, _id: response.order._id };
    await dispatch(addRepetition(booked));
    return booked;
  },
);
