import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { THEME_MODE } from "@/types/types";
import axios from "axios";

const initialState = {
  serverBaseUrl: "",
  serverAuthToken: "",
  isSideNavOpen: false,
  themeMode: null as THEME_MODE | null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setServerBaseUrl(state, action) {
      state.serverBaseUrl = action.payload;
    },
    setServerAuthToken(state, action) {
      state.serverAuthToken = action.payload;
    },
    setIsSideNavOpen(state, action) {
      state.isSideNavOpen = action.payload;
    },
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const {
  setIsSideNavOpen,
  setServerBaseUrl,
  setServerAuthToken,
  setThemeMode,
} = appSlice.actions;
export const selectOperatingSystem = (state: any) => state.app.operatingSystem;
export const selectServerBaseUrl = (state: any) => state.app.serverBaseUrl;
export const selectServerAuthToken = (state: any) => state.app.serverAuthToken;
export const selectIsSideNavOpen = (state: any) => state.app.isSideNavOpen;
export const selectThemeMode = (state: any) => state.app.themeMode;

export const selectAxiosInstance = (state: any) => {
  // create new axios instance with custom config and authToken
  const axiosInstance = axios.create({
    baseURL: state.app.serverBaseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.app.serverAuthToken}`,
    },
  });
  return axiosInstance;
};

export default appSlice.reducer;
