import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  operatingSystem: '',
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOperatingSystem(state, action) {
      state.operatingSystem = action.payload;
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

export const { setOperatingSystem } = appSlice.actions;
export const selectOperatingSystem = (state: any) => state.app.operatingSystem;
export default appSlice.reducer;
