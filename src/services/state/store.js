import { configureStore } from "@reduxjs/toolkit";
import cityTabReducer from "./display/cityTabSlice";

export const store = configureStore({
  reducer: {
    cityTab: cityTabReducer,
  }
});