import { createSlice } from "@reduxjs/toolkit";

const cityTab = createSlice({
  name: 'cityTab',
  initialState: {
    isShown: false,
    id: -1,
  },
  reducers: {
    updateIsShown: (state) => {
      state.isShown = !state.isShown;
    },
    setIsShown: (state, action) => {
      state.isShown = action.payload;
    },
    setCityTabById: (state, action) => {
      state.id = action.payload;
    }
  },
})

export const { updateIsShown, setIsShown,setCityTabById } = cityTab.actions;

export default cityTab.reducer;