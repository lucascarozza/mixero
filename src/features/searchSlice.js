// searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import search from "../api/searchApi";

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

const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    tracks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.term = action.meta.arg;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracks = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;

export const selectTerm = (state) => state.search.term;
export const selectTracks = (state) => state.search.tracks;
export const selectStatus = (state) => state.search.status;
export const selectError = (state) => state.search.error;
