import { createSlice } from "@reduxjs/toolkit";

const cityTab = createSlice({
  name: 'cityTab',
  initialState: {
    key: undefined,
    isShown: false,
    isMinimised: false,
  },
  reducers: {
    setCityTabById: (state, action) => {
      state.key = action.payload;
      state.isMinimised = false;
    },
    updateIsShown: (state) => {
      state.isShown = !state.isShown;
    },
    setIsShown: (state, action) => {
      state.isShown = action.payload;
    },
    updateIsMinimised: (state) => {
      state.isMinimised = !state.isMinimised;
    },
    setIsMinimised: (state, action) => {
      state.isMinimised = action.payload;
    },
  },
})

export const { setCityTabById: setCityTabByKey, updateIsShown, setIsShown, updateIsMinimised, setIsMinimised } = cityTab.actions;

export default cityTab.reducer;