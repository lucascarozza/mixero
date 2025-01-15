import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createPlaylist from "../api/playlistApi";

/*
 * This async thunk saves the playlist to Spotify.
 *
 * Steps:
 * 1. Retrieves the current playlist state using getState.
 * 2. Extracts the track URIs from the playlist.
 * 3. Calls the createPlaylist function with the playlist name and track URIs.
 *
 * @returns {Promise<object>} - The response data from the createPlaylist function.
 * 
 */
export const savePlaylistToSpotify = createAsyncThunk(
  "playlist/savePlaylistToSpotify",
  async (_, { getState }) => {
    const { playlist } = getState();
    const uris = playlist.tracks.map((track) => track.uri);
    return await createPlaylist(playlist.name, uris);
  }
);

/*
 * Initial state of the playlist slice.
 *
 * Properties:
 * - name: The name of the playlist.
 * - tracks: An array of track objects in the playlist.
 * - status: The current status of the playlist creation process.
 * - error: Any error message related to the playlist creation process.
 * 
 */
const initialState = {
  name: "New Playlist",
  tracks: [],
  status: "idle",
  error: null,
};

// The playlist slice handles the playlist state management.
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    /*
     * Updates the name of the playlist.
     *
     * Steps:
     * 1. Sets the playlist name to the value provided in the action payload.
     * 
     */
    updateName: (state, action) => {
      state.name = action.payload;
    },
    /*
     * Adds a track to the playlist if it doesn't already exist.
     *
     * Steps:
     * 1. Checks if the track's URI is already in the playlist.
     * 2. If not, adds the track to the playlist.
     * 
     */
    addTrack: (state, action) => {
      if (!state.tracks.some((track) => track.uri === action.payload.uri)) {
        state.tracks.push(action.payload);
      }
    },
    /*
     * Removes a track from the playlist by its URI.
     *
     * Steps:
     * 1. Filters out the track with the matching URI from the playlist.
     * 
     */
    removeTrack: (state, action) => {
      state.tracks = state.tracks.filter(
        (track) => track.uri !== action.payload.uri
      );
    },
    // Clears the entire playlist and resets to the initial state.
    clearPlaylist: (state) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePlaylistToSpotify.pending, (state) => {
        // Sets the status to "loading" during the playlist save process.
        state.status = "loading";
      })
      .addCase(savePlaylistToSpotify.fulfilled, (state) => {
        /*
         * Updates the state upon successful playlist save.
         *
         * Steps:
         * 1. Resets to the initial state.
         * 2. Sets the status to "succeeded".
         * 
         */
        return {
          ...initialState,
          status: "succeeded",
        };
      })
      .addCase(savePlaylistToSpotify.rejected, (state, action) => {
        // Sets the status to "failed" and stores the error message if save fails.
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateName, addTrack, removeTrack, clearPlaylist } =
  playlistSlice.actions;
export default playlistSlice.reducer;
