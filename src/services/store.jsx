import { configureStore } from "@reduxjs/toolkit";
import scrollReducer from "./scroll";

export const store = configureStore({
  reducer: { home: scrollReducer },
});
