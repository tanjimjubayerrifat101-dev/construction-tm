import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminUser, IAuthState } from "./authTypes";

const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminAccessToken");
  }
  return null;
};

const getInitialUser = (): IAdminUser | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("adminUser");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const initialState: IAuthState = {
  user: getInitialUser(),
  token: getInitialToken(),
  isAuthenticated: Boolean(getInitialToken()),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: IAdminUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("adminAccessToken", action.payload.token);
        localStorage.setItem("adminUser", JSON.stringify(action.payload.user));
      }
    },
    updateUser: (state, action: PayloadAction<IAdminUser>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("adminUser", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminUser");
      }
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
