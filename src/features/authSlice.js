import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticateUser, getRefreshToken, getToken } from "../api/authApi";

/*
 * This async thunk initiates the login process.
 *
 * Steps:
 * 1. Calls the authenticateUser function to start the authentication flow.
 * 2. Calls the getRefreshToken function to retrieve and store the refresh token.
 * 
 */
export const initiateLogIn = createAsyncThunk(
  "auth/initiateLogIn",
  async () => {
    await authenticateUser();
    await getRefreshToken();
  }
);

/*
 * This async thunk handles token exchange after authentication.
 *
 * Steps:
 * 1. Calls the getToken function to exchange the authorization code for an access token.
 * 2. Returns the token data, which includes the access token, refresh token, and 
 *    expiration details.
 *
 * @param {string} code - The authorization code received from Spotify.
 * @returns {Promise<object>} - The token data containing the access token, refresh token,
 *                              and expiration details.
 * 
 */
export const handleAuthCallback = createAsyncThunk(
  "auth/handleAuthCallback",
  async (code) => {
    const tokenData = await getToken(code);
    return tokenData;
  }
);

/*
 * Initial state of the auth slice.
 *
 * Properties:
 * - accessToken: The current access token stored in localStorage.
 * - refreshToken: The current refresh token stored in localStorage.
 * - expiresIn: The token expiration time (in seconds) stored in localStorage.
 * - expires: The exact expiration date and time stored in localStorage.
 * - status: The current status of the authentication process.
 * - error: Any error message related to the authentication process.
 * 
 */
const initialState = {
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  expiresIn: localStorage.getItem("expires_in"),
  expires: localStorage.getItem("expires"),
  status: "idle",
  error: null,
};

// The auth slice handles the authentication state management.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /*
     * Resets the authentication state upon log out.
     *
     * Steps:
     * 1. Sets accessToken, refreshToken, expiresIn, and expires to null.
     * 2. Sets status to "idle" and error to null.
     * 
     */
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
        // Sets the status to "redirecting" during the login process.
        state.status = "redirecting";
      })
      .addCase(handleAuthCallback.pending, (state) => {
        // Sets the status to "loading" while handling the auth callback.
        state.status = "loading";
      })
      .addCase(handleAuthCallback.fulfilled, (state, action) => {
        /*
         * Updates the state with the new token information upon successful auth callback.
         *
         * Steps:
         * 1. Sets status to "succeeded".
         * 2. Updates accessToken, refreshToken, and expiresIn with the values from the 
         *    action payload.
         * 
         * 3. Calculates and sets the expiration date and time.
         */
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        state.expires = new Date(
          new Date().getTime() + action.payload.expires_in * 1000
        ).toString();
      })
      .addCase(handleAuthCallback.rejected, (state, action) => {
        // Sets the status to "failed" and stores the error message if the callback fails.
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { handleLogOut } = authSlice.actions;

export default authSlice.reducer;