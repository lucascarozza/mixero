import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import searchReducer from "./features/searchSlice"
import playlistReducer from "./features/playlistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    playlist: playlistReducer,
  },
});

export default store;