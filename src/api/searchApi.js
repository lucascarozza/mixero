import { currentToken } from "./authApi";

/*
 * Refer to authApi.js for detailed instructions on setting up the
 * environment variables and .env file required for this project.
 *
 */
const apiEndpoint = import.meta.env.VITE_SPOTIFY_API_ENDPOINT;

/*
 * Searches for tracks on Spotify based on the provided search term.
 *
 * Steps:
 * 1. Retrieves the current access token from the currentToken object.
 * 2. Throws an error if the access token is not found.
 * 3. Sends a GET request to the Spotify search endpoint with the search term.
 * 4. Parses the response to JSON format.
 * 5. Throws an error if the response does not contain any data.
 * 6. Maps the response data to extract the necessary information, such as
 *    track ID, name, artists, album name, album cover image, and URI.
 *
 * @param {string} term - The search term to query tracks on Spotify.
 * @returns {Promise<Array>} - A promise that resolves to an array of track objects.
 *
 */
const search = async (term) => {
  const accessToken = currentToken.access_token;

  if (!accessToken) {
    throw new Error("Access token not found.");
  }

  return await fetch(`${apiEndpoint}search?q=${term}&type=track`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        throw new Error("Response error. No data found.");
      }
      return data.tracks.items.map((track) => ({
        id: track.id || "ID not found",
        name: track.name || "Name not found",
        artists:
          track.artists.map((artist) => artist.name).join(", ") ||
          "Artist not found",
        album: track.album.name || "Album not found",
        image: track.album.images[1].url || "Image not found",
        uri: track.uri || "URI not found",
      }));
    });
};

export default search;

export const logSearch = () => {
  console.log(search("tate"));
};
