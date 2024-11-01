const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectURL = import.meta.env.VITE_REDIRECT_URL;
const spotifyAuthURL = import.meta.env.VITE_SPOTIFY_AUTH_URL;
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
const scope = import.meta.env.VITE_SCOPE;
const playlistURL = import.meta.env.VITE_PLAYLIST_URL;

let accessToken;
let tokenExpirationTime;

const Spotify = {
  getAccessToken() {
    console.log("Checking access token...");

    if (accessToken && new Date().getTime() < tokenExpirationTime) {
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

    const redirect = `${spotifyAuthURL}?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectURL}`;
    window.location.replace(redirect);
  },

  async search(term) {
    accessToken = Spotify.getAccessToken();
    const response = await fetch(`${apiBaseURL}/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      console.error("Response error");
    }
    return jsonResponse.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artists[0].name,
      album: t.album.name,
      cover: t.album.images[1].url,
      preview_url: t.preview_url,
      uri: t.uri,
    }));
  },

  async savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) return;

    const aToken = Spotify.getAccessToken();
    const savePlaylistHeader = { Authorization: `Bearer ${aToken}` };

    const response = await fetch(`${apiBaseURL}/me`, {
      headers: savePlaylistHeader,
    });
    const jsonResponse = await response.json();
    const userId = jsonResponse.id;

    const playlistResponse = await fetch(
      `${apiBaseURL}/users/${userId}/playlists`,
      {
        headers: savePlaylistHeader,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const playlistJsonResponse = await playlistResponse.json();
    const playlistId = playlistJsonResponse.id;

    await fetch(`${apiBaseURL}/playlists/${playlistId}/tracks`, {
      headers: savePlaylistHeader,
      method: "POST",
      body: JSON.stringify({ uris: trackURIs }),
    });
  },

  async getTop50Global() {
    accessToken = Spotify.getAccessToken();
    const response = await fetch(`${apiBaseURL}/playlists/${playlistURL}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const textResponse = await response.text();
    try {
      const jsonResponse = JSON.parse(textResponse);
      if (!jsonResponse) {
        console.error("Response error");
      }
      return jsonResponse.items.map((i) => ({
        id: i.track.id,
        name: i.track.name,
        artist: i.track.artists[0].name,
        album: i.track.album.name,
        cover: i.track.album.images[1].url,
        preview_url: i.track.preview_url,
        uri: i.track.uri,
      }));
    } catch (e) {
      console.error("Error parsing JSON response:", e);
      return [];
    }
  },
};

export default Spotify;
