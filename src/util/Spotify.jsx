let accessToken;
let tokenExpirationTime;

const clientId = "93b6af46a9c844dd9338c06740ed3a2b";
const redirectURL = "http://localhost:5173/";

const Spotify = {
  getAccessToken() {
    console.log("Checking access token...");

    if (accessToken && new Date().getTime() < tokenExpirationTime) {
      console.log("Using existing token:", accessToken);
      return accessToken;
    }

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenInURL && expiryTime) {
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);
      tokenExpirationTime = new Date().getTime() + expiresIn * 1000;

      window.setTimeout(() => {
        accessToken = "";
        console.log("Token expired");
      }, expiresIn * 1000);

      window.history.replaceState("Access token", null, "/");
      return accessToken;
    }

    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
    window.location.replace(redirect);
  },

  async search(term) {
    accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      console.error("Response error");
    }
    return jsonResponse.tracks.items.map((t) => ({
      id: t.id, // -----------------------> Track ID
      name: t.name, // -------------------> Track Name
      artist: t.artists[0].name, // ------> Track Artist
      album: t.album.name, // ------------> Track Album
      cover: t.album.images[1].url, // ---> Track Cover
      preview_url: t.preview_url, // -----> Track Preview
      uri: t.uri, // ---------------------> Track URI
    }));
  },

  async savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) return;

    const aToken = Spotify.getAccessToken();
    const savePlaylistHeader = { Authorization: `Bearer ${aToken}` };

    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: savePlaylistHeader,
    });
    const jsonResponse = await response.json();
    const userId = jsonResponse.id;

    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: savePlaylistHeader,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const playlistJsonResponse = await playlistResponse.json();
    const playlistId = playlistJsonResponse.id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: savePlaylistHeader,
      method: "POST",
      body: JSON.stringify({ uris: trackURIs }),
    });
  },
};

export default Spotify;
