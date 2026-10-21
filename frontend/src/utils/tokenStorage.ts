import { deleteCookie, setCookie } from "./cookie";

const REFRESH_TOKEN_KEY = "refreshToken";

export type TStoredRefreshToken = {
  token: string;
  rememberMe: boolean;
};

export const getStoredRefreshToken = (): TStoredRefreshToken | null => {
  const persistentToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (persistentToken) {
    return { token: persistentToken, rememberMe: true };
  }

  const sessionToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  if (sessionToken) {
    return { token: sessionToken, rememberMe: false };
  }

  return null;
};

export const saveAuthTokens = (
  tokens: { accessToken: string; refreshToken: string },
  rememberMe: boolean,
) => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  setCookie("accessToken", tokens.accessToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  deleteCookie("accessToken");
};
