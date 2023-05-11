import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  operatingSystem: "",
  serverBaseUrl: "http://localhost:1337/api",
  serverAuthToken:
    "e315f2ca496aeac21d7c6d9232a7ebc6ba20c5d8abb18dd5c4fcbfc1430bfecfeb448e2f86128b09421ecd0b306fa88f4ca62a6015a1491e09463de617fd8d2f13f8ea94c5ab955c7728111ddf1b919ef9c18e432af78963ce8de9bbb1bc9523adeefb1b3b54a5c792c8539322b89f5ee138f2a239ed0016b3a6bc3e95e13272",
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
