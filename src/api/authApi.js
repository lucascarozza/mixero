/*
 * Environment Variables Setup Instructions:
 *
 * 1. Install dotenv and create a .env file in the root directory of the project.
 * 2. As this is a Vite project, all environment variables must be prefixed with VITE_.
 * 3. Add the following environment variables to your .env file:
 *    - VITE_SPOTIFY_CLIENT_ID=Your Spotify Web API Client ID
 *    - VITE_SPOTIFY_REDIRECT_URI=Your redirect URI (must be a localhost URL and/or HTTPS)
 *    - VITE_SPOTIFY_API_ENDPOINT=https://api.spotify.com/v1/
 *    - VITE_SPOTIFY_AUTH_ENDPOINT=https://accounts.spotify.com/authorize
 *    - VITE_SPOTIFY_TOKEN_ENDPOINT=https://accounts.spotify.com/api/token
 *    - VITE_SPOTIFY_AUTH_SCOPE=user-read-private user-read-email
 *
 * Obtain a Client ID at https://developer.spotify.com/ by creating a new app.
 *
 */
const authScope = import.meta.env.VITE_SPOTIFY_AUTH_SCOPE;
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const authEndpoint = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
const tokenEndpoint = import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT;

/*
 * Note: The original Authorization Code with PKCE Flow is from Spotify and is
 * available at https://github.com/spotify/web-api-examples/ under the Apache-2.0 License.
 * I have modified it as needed for this project and added comments explaining each
 * section of the code for better understanding.
 */

/*
 * Manages the current Spotify access token and refresh token.
 *
 * Properties:
 * - access_token: Retrieves the access token from localStorage.
 * - refresh_token: Retrieves the refresh token from localStorage.
 * - expires_in: Retrieves the token expiration time (in seconds) from localStorage.
 * - expires: Retrieves the exact expiration date and time from localStorage.
 *
 * Methods:
 * - save: Saves the access token, refresh token, and expiration details to localStorage.
 *
 */
export const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("expires_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

/*
 * Authenticates the user with Spotify using PKCE (Proof Key for Code Exchange).
 *
 * Steps:
 * 1. Generates a random string as the code verifier.
 * 2. Hashes the code verifier using SHA-256 to create the code challenge.
 * 3. Encodes the code challenge in base64 URL format.
 * 4. Constructs the Spotify authorization URL with the necessary query parameters.
 * 5. Stores the code verifier in localStorage for later use.
 * 6. Redirects the user to the Spotify authorization page to log in.
 *
 * The code verifier and code challenge are used to securely exchange an
 * authorization code for an access token.
 *
 */
export const authenticateUser = async () => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const codeVerifier = randomString;
  const data = new TextEncoder().encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const codeChallengeBase64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", codeVerifier);

  const authUrl = new URL(authEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: authScope,
    code_challenge_method: "S256",
    code_challenge: codeChallengeBase64,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

/*
 * Exchanges the authorization code for an access token.
 *
 * Steps:
 * 1. Retrieves the code verifier from localStorage.
 * 2. Sends a POST request to the Spotify token endpoint with the authorization
 *    code, client ID, redirect URI, and code verifier.
 * 3. Parses the response to extract the access token.
 *
 * The access token is used to make authenticated requests to the Spotify Web API.
 *
 * @param {string} code - The authorization code received from Spotify.
 * @returns {Promise<string>} - The access token.
 *
 */
export const getToken = async (code) => {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
};

/*
 * Refreshes the access token.
 *
 * Steps:
 * 1. Makes a POST request to the token endpoint with the required headers and body.
 * 2. The body includes the client ID, grant type (refresh_token), and the current refresh token.
 * 3. Parses and returns the JSON response from the server.
 * 4. Sets up a timer to refresh the access token 5 mins before expiry.
 */
export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const url = tokenEndpoint;
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  }
  const body = await fetch(url, payload);
  const response = await body.json();
  
  localStorage.setItem('access_token', response.accessToken);
  if (response.refreshToken) {
    localStorage.setItem('refresh_token', response.refreshToken);
  }

  const refreshTime = (response.expires_in - 300) * 1000;
  setTimeout(getRefreshToken, refreshTime);
}

/*
 * Parses the URL query parameters to retrieve the authorization code on page load.
 *
 * Steps:
 * 1. Creates a URLSearchParams object from the current window's URL query string.
 * 2. Retrieves the value of the "code" parameter, which contains the authorization
 * code from Spotify.
 *
 */
const args = new URLSearchParams(window.location.search);
export const code = args.get("code");

/*
 * If code is found, exchange it for an access token.
 *
 * Steps:
 * 1. Calls the getToken function to exchange the authorization code for an access
 *    token.
 * 2. Saves the access token, refresh token, and expiration details to localStorage
 *    using currentToken.save.
 * 3. Removes the authorization code from the URL to clean up the address bar.
 * 4. Updates the browser history to reflect the cleaned URL without reloading the
 *    page.
 *
 */
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updateUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updateUrl);
}