import { getCookie } from "./cookie";
import { getStoredRefreshToken, saveAuthTokens } from "./tokenStorage";
import { TBase, TEvent, TUser, TOrder as TBookingOrder } from "./types";

const URL = process.env.API_URL;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const getResponseMessage = (body: unknown, status: number): string => {
  if (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof body.message === "string"
  ) {
    return body.message;
  }
  return `Request failed with status ${status}`;
};

const checkResponse = async <T>(res: Response): Promise<T> => {
  const body: unknown = await res.json();
  if (!res.ok) {
    throw new ApiError(res.status, getResponseMessage(body, res.status), body);
  }
  return body as T;
};

type TServerResponse<T> = {
  success: boolean;
} & T;

type TBasesResponse = TServerResponse<{ bases: TBase[] }>;
type TBaseResponse = TServerResponse<{ base: TBase }>;
type TEventsResponse = TServerResponse<{ events: TEvent[] }>;
type TEventResponse = TServerResponse<{ event: TEvent }>;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

const requestRefreshToken = async (): Promise<TRefreshResponse> => {
  const storedToken = getStoredRefreshToken();
  if (!storedToken) {
    throw new ApiError(401, "Refresh token is missing", null);
  }

  const refreshData = await fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: storedToken.token }),
  }).then((res) => checkResponse<TRefreshResponse>(res));

  if (!refreshData.success) {
    throw new ApiError(401, "Refresh token was rejected", refreshData);
  }
  if (
    typeof refreshData.refreshToken !== "string" ||
    !refreshData.refreshToken ||
    typeof refreshData.accessToken !== "string" ||
    !refreshData.accessToken
  ) {
    throw new ApiError(
      502,
      "Token refresh response is incomplete",
      refreshData,
    );
  }

  saveAuthTokens(refreshData, storedToken.rememberMe);
  return refreshData;
};

let refreshTokenPromise: Promise<TRefreshResponse> | null = null;

export const refreshToken = (): Promise<TRefreshResponse> => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = requestRefreshToken().finally(() => {
      refreshTokenPromise = null;
    });
  }
  return refreshTokenPromise;
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return undefined;
};

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit,
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if (getErrorMessage(err) === "jwt expired") {
      const refreshData = await refreshToken();
      const headers = new Headers(options.headers);
      headers.set("authorization", refreshData.accessToken);
      const res = await fetch(url, { ...options, headers });
      return await checkResponse<T>(res);
    }
    throw err;
  }
};

/*

export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((data) => {
    if (data?.success) return data.orders;
    return Promise.reject(data);
  });

export type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (data: string[]) =>
  fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    })
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumberApi = (number: number) =>
  fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TOrderResponse>(res));
*/
export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<Record<string, never>>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

type TVerifyResetCodeResponse = TServerResponse<{ resetToken: string }>;

export const verifyResetCodeApi = (data: { token: string }) =>
  fetch(`${URL}/password-reset/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TVerifyResetCodeResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordApi = (data: {
  password: string;
  resetToken: string;
}) =>
  fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<Record<string, never>>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () => {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new ApiError(401, "Access token is missing", null);
  }

  return fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    headers: {
      authorization: accessToken,
    },
  });
};

export type TUpdateUserData = {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
  region?: string;
  avatar?: string;
};

export const updateUserApi = (user: TUpdateUserData) =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken"),
    } as HeadersInit,
    body: JSON.stringify(user),
  });

export const logoutApi = () =>
  fetch(`${URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getStoredRefreshToken()?.token ?? null,
    }),
  }).then((res) => checkResponse<TServerResponse<Record<string, never>>>(res));

export const getBasesApi = () =>
  fetch(`${URL}/bases`)
    .then((res) => checkResponse<TBasesResponse>(res))
    .then((data) => {
      if (data.success) {
        return data.bases;
      }
      return Promise.reject(data);
    });

export const getBaseByIdApi = (baseId: string) =>
  fetch(`${URL}/bases/${encodeURIComponent(baseId)}`)
    .then((res) => checkResponse<TBaseResponse>(res))
    .then((data) => {
      if (data.success) {
        return data.base;
      }
      return Promise.reject(data);
    });

export const getEventsApi = () =>
  fetch(`${URL}/events`)
    .then((res) => checkResponse<TEventsResponse>(res))
    .then((data) => {
      if (data.success) {
        return data.events;
      }
      return Promise.reject(data);
    });

export const getEventByIdApi = (eventId: string) =>
  fetch(`${URL}/events/${encodeURIComponent(eventId)}`)
    .then((res) => checkResponse<TEventResponse>(res))
    .then((data) => {
      if (data.success) {
        return data.event;
      }
      return Promise.reject(data);
    });

export type TCreateOrderData = Omit<TBookingOrder, "_id">;

// Заглушка до появления бэкенда бронирования
export const createOrderApi = (
  order: TCreateOrderData,
): Promise<{ success: true; order: TBookingOrder }> =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          success: true,
          order: {
            ...order,
            _id: String(Math.floor(100000 + Math.random() * 900000)),
          },
        }),
      600,
    );
  });
