import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  operatingSystem: "",
  serverBaseUrl: "https://keycombo-web-app.azurewebsites.net/api",
  serverAuthToken:
    "78b46549b2cf15dd9497d192f238cf711542bf46075043830a1df2ae555d10eecee64fd2d48c6172b41b3cbeac62a7e2c22b5f36e41e5176a2878027d7d2fdc3a84c815e840e1ac58a35186e98d9f017841c00deded1e1cd879c03274631163c1098ae436a99cf9156a253d0caf762ed9062e7aa763656b85cc55d3e925b7955",
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
