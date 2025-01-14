import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import searchReducer from "./features/searchSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

export default store;