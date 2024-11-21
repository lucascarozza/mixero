const Spotify = {
  getAccessToken() {
    console.log("Checking access token...");

    // Check if token is still valid.
    if (this.accessToken && new Date().getTime() < this.tokenExpirationTime) {
      return this.accessToken;
    }

    // Check local storage for token and its expiry time.
    const tokenInStorage = localStorage.getItem("spotify_access_token");
    const expiryTimeInStorage = localStorage.getItem("spotify_token_expiry");

    if (
      tokenInStorage &&
      expiryTimeInStorage &&
      new Date().getTime() < Number(expiryTimeInStorage)
    ) {
      this.accessToken = tokenInStorage;
      this.tokenExpirationTime = Number(expiryTimeInStorage);
      return this.accessToken;
    }

    // Extract token and expiry time from URL.
    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenInURL && expiryTime) {
      this.accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);
      this.tokenExpirationTime = new Date().getTime() + expiresIn * 1000;

      // Store token and expiry time in local storage.
      localStorage.setItem("spotify_access_token", this.accessToken);
      localStorage.setItem(
        "spotify_token_expiry",
        this.tokenExpirationTime.toString()
      );

      // Set timeout to clear token after expiration.
      window.setTimeout(() => {
        this.accessToken = "";
        localStorage.removeItem("spotify_access_token");
        localStorage.removeItem("spotify_token_expiry");
        console.log("Token expired");
      }, expiresIn * 1000);

      window.history.replaceState(null, null, "/");
      return this.accessToken;
    }

    return "";
  },

  login() {
    const redirect = `${import.meta.env.VITE_SPOTIFY_AUTH_URL}?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&response_type=token&scope=${import.meta.env.VITE_SCOPE}&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URL
    }`;
    window.location.replace(redirect);
  },

  async search(term) {
    const accessToken = this.getAccessToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/search?type=track&q=${term}`,
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

    const accessToken = this.getAccessToken();
    const savePlaylistHeader = { Authorization: `Bearer ${accessToken}` };

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/me`, {
      headers: savePlaylistHeader,
    });
    const jsonResponse = await response.json();
    const userId = jsonResponse.id;

    const playlistResponse = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/playlists`,
      {
        headers: savePlaylistHeader,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const playlistJsonResponse = await playlistResponse.json();
    const playlistId = playlistJsonResponse.id;

    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/playlists/${playlistId}/tracks`,
      {
        headers: savePlaylistHeader,
        method: "POST",
        body: JSON.stringify({ uris: trackURIs }),
      }
    );
  },

  async getTop50Global() {
    const accessToken = this.getAccessToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/playlists/${
        import.meta.env.VITE_PLAYLIST_URL
      }`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
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
