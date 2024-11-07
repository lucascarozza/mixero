import React, { useState, useEffect, useCallback, memo } from "react";
import styles from "./App.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

const App = memo(() => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch Top 50 Global playlist
  const fetchTop50Global = useCallback(async () => {
    try {
      const result = await Spotify.getTop50Global();
      setSearchResults(result);
    } catch (error) {
      console.error("Error fetching Top 50 Global:", error);
    }
  }, []);

  useEffect(() => {
    const token = Spotify.getAccessToken();
    console.log("Token from getAccessToken:", token);

    if (token) {
      setIsLoggedIn(true);
      fetchTop50Global();
    } else {
      setIsLoggedIn(false);
    }
  }, [fetchTop50Global]);

  const addTrack = useCallback(
    (track) => {
      if (!playlistTracks.some((t) => t.id === track.id)) {
        setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      }
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((t) => t.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const resetPlaylist = useCallback(() => {
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  }, []);

  const search = useCallback(
    (term) => {
      setSearchTerm(term);
      if (term) {
        Spotify.search(term)
          .then((result) => setSearchResults(result))
          .catch((error) => console.error("Error searching tracks:", error));
      } else {
        fetchTop50Global();
      }
    },
    [fetchTop50Global]
  );

  return (
    <div>
      <Header />
      <main>
        <div className={styles.content}>
          {isLoggedIn ? (
            <SearchBar onSearch={search} />
          ) : (
            <div className={styles.login}>
              <h3 className={styles.loginText}>
                log in to Spotify to start searching
              </h3>
              <button className={styles.loginButton} onClick={Spotify.login}>
                Log In To Spotify
              </button>
            </div>
          )}
          <div className={styles.container}>
            <SearchResults
              userSearchResults={searchResults}
              searchTerm={searchTerm}
              onAdd={addTrack}
              playlistTracks={playlistTracks}
            />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onReset={resetPlaylist}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
});

export default App;
