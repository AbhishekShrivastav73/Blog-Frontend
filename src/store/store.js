import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import postReducer from "../reducers/postReducer";

export const store = configureStore({
  reducer: {
    auth : authReducer,
    post : postReducer
  },
});
