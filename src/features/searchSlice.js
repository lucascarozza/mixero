import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import search from "../api/searchApi";

/*
 * This async thunk fetches tracks based on the search term.
 *
 * Steps:
 * 1. Calls the search function with the provided search term.
 * 2. Returns the tracks if the API call is successful.
 * 3. Rejects the request with an error message if the API call fails.
 *
 * @param {string} term - The search term to fetch tracks for.
 * @returns {Promise<Array>} - The list of tracks matching the search term.
 * 
 */
export const fetchTracks = createAsyncThunk(
  "search/fetchTracks",
  async (term, { rejectWithValue }) => {
    try {
      const tracks = await search(term);
      return tracks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/*
 * Initial state of the search slice.
 *
 * Properties:
 * - term: The current search term.
 * - tracks: An array of track objects matching the search term.
 * - status: The current status of the search process.
 * - error: Any error message related to the search process.
 * 
 */
const initialState = {
  term: "",
  tracks: [],
  status: "idle",
  error: null,
};

// The search slice handles the search state management.
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state, action) => {
        /*
         * Sets the status to "loading" during the search process.
         * Clears any previous error messages.
         * Updates the search term with the current one.
         * 
         */
        state.status = "loading";
        state.error = null;
        state.term = action.meta.arg;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        /*
         * Updates the state upon successful search.
         *
         * Steps:
         * 1. Sets the status to "succeeded".
         * 2. Updates the tracks array with the results from the search.
         * 
         */
        state.status = "succeeded";
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        /*
         * Sets the status to "failed" and stores the error message if the search fails.
         *
         * Steps:
         * 1. Sets the status to "failed".
         * 2. Updates the error property with the error message.
         * 
         */
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;

/*
 * Selectors to access various pieces of state from the search slice.
 *
 * Functions:
 * - selectTerm: Returns the current search term.
 * - selectTracks: Returns the array of tracks matching the search term.
 * - selectStatus: Returns the current status of the search process.
 * - selectError: Returns any error message related to the search process.
 * 
 */
export const selectTerm = (state) => state.search.term;
export const selectTracks = (state) => state.search.tracks;
export const selectStatus = (state) => state.search.status;
export const selectError = (state) => state.search.error;
