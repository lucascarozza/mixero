import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticateUser, getToken } from "../api/authApi";

// This async thunk initiates the login process
export const initiateLogIn = createAsyncThunk(
  "auth/initiateLogIn",
  async () => {
    await authenticateUser();
  }
);

// This async thunk handles token exchange after auth
export const handleAuthCallback = createAsyncThunk(
  "auth/handleAuthCallback",
  async (code) => {
    const tokenData = await getToken(code);
    return tokenData;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("access_token"),
    refreshToken: localStorage.getItem("refresh_token"),
    expiresIn: localStorage.getItem("expires_in"),
    expires: localStorage.getItem("expires"),
    status: "idle",
    error: null,
  },
  reducers: {
    handleLogOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.expires = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateLogIn.pending, (state) => {
        state.status = "redirecting";
      })
      .addCase(handleAuthCallback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handleAuthCallback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        state.expires = new Date(
          new Date().getTime() + action.payload.expires_in * 1000
        ).toString();
      })
      .addCase(handleAuthCallback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { handleLogOut } = authSlice.actions;

export default authSlice.reducer;
