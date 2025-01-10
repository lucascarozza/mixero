import { currentToken } from "./authApi";

/*
 * Refer to authApi.js for detailed instructions on setting up the
 * environment variables and .env file required for this project.
 *
 */
const apiEndpoint = import.meta.env.VITE_SPOTIFY_API_ENDPOINT;

/*
 * Saves a new playlist to the user's Spotify account and adds tracks to it.
 *
 * Steps:
 * 1. Retrieves the current access token from the currentToken object.
 * 2. Throws an error if the access token is not found.
 * 3. Sends a GET request to the Spotify API to get the current user's ID.
 * 4. Throws an error if user data is not found in the response.
 * 5. Sends a POST request to the Spotify API to create a new playlist.
 * 6. Throws an error if playlist data is not found in the response.
 * 7. Sends a POST request to the Spotify API to add tracks to the newly
 *    created playlist.
 * 8. Returns the response data from adding tracks to the playlist.
 *
 * @param {string} name - The name of the new playlist.
 * @param {Array<string>} uris - An array of track URIs to add to the playlist.
 * @returns {Promise<Object>} - A promise that resolves to the response data
 *                              from adding tracks to the playlist.
 *
 */
const createPlaylist = async (name, uris) => {
  const accessToken = currentToken.access_token;

  if (!accessToken) {
    throw new Error("Access token not found.");
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const userResponse = await fetch(`${apiEndpoint}me`, { headers });
    const userData = await userResponse.json();

    if (!userData) {
      throw new Error("Response error. User data not found.");
    }

    const userID = userData.id;

    // Create playlist
    const playlistResponse = await fetch(
      `${apiEndpoint}users/${userID}/playlists`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description: "Created with Mixero." }),
      }
    );

    const playlistData = await playlistResponse.json();

    if (!playlistData) {
      throw new Error("Response error. Playlist data not found.");
    }

    const playlistID = playlistData.id;

    // Add tracks to playlist
    const tracksResponse = await fetch(
      `${apiEndpoint}playlists/${playlistID}/tracks`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris }),
      }
    );

    const tracksData = await tracksResponse.json();
    return tracksData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default createPlaylist;
