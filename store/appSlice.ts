import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  operatingSystem: "",
  serverBaseUrl: "http://localhost:1337/api",
  serverAuthToken: "",
  isSideNavOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOperatingSystem(state, action) {
      state.operatingSystem = action.payload;
    },
    setServerBaseUrl(state, action) {
      state.serverBaseUrl = action.payload;
    },
    setServerAuthToken(state, action) {
      state.serverAuthToken = action.payload;
    },
    setIsSideNavOpen(state, action) {
      state.isSideNavOpen = action.payload;
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
  setOperatingSystem,
  setServerBaseUrl,
  setServerAuthToken,
} = appSlice.actions;
export const selectOperatingSystem = (state: any) => state.app.operatingSystem;
export const selectServerBaseUrl = (state: any) => state.app.serverBaseUrl;
export const selectServerAuthToken = (state: any) => state.app.serverAuthToken;
export const selectIsSideNavOpen = (state: any) => state.app.isSideNavOpen;

export default appSlice.reducer;
