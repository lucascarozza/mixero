import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Top 50 Global on initial render
  useEffect(() => {
    fetchTop50Global();
  }, []);

  const fetchTop50Global = async () => {
    try {
      const result = await Spotify.getTop50Global();
      setSearchResults(result);
    } catch (error) {
      console.error("Error fetching Top 50 Global:", error);
    }
  };

  const addTrack = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map((t) => t.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  const search = (term) => {
    setSearchTerm(term);
    if (term) {
      Spotify.search(term)
        .then((result) => setSearchResults(result))
        .catch((error) => console.error("Error searching tracks:", error));
    } else {
      fetchTop50Global();
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className={styles.content}>
          <SearchBar onSearch={search} />
          <div className={styles.container}>
            <SearchResults
              userSearchResults={searchResults}
              searchTerm={searchTerm}
              onAdd={addTrack}
            />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
