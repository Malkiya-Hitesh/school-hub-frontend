// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import studentReducer from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
  },
});