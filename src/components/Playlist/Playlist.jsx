import React from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";

const Playlist = ({
  playlistName,
  playlistTracks,
  onNameChange,
  onRemove,
  onSave,
}) => {
  const handleNameChange = ({ target }) => {
    const sanitizedInput = target.value.replace(/[<>\/\\&"'`@#$%^*()+=~]/g, ""); // Remove malicious symbols
    onNameChange(sanitizedInput);
  };

  const isDisabled = playlistTracks.length === 0 || playlistName.trim() === "";

  return (
    <div className={styles.container}>
      <div className={styles.playlist}>
        <input
          value={playlistName}
          onChange={handleNameChange}
          placeholder={playlistName ? "" : "enter a playlist name"}
          maxLength="60"
          id="playlistName"
          autoComplete="off"
          list="off"
        />
        <Tracklist
          userSearchResults={playlistTracks}
          onRemove={onRemove}
          isRemoval
        />
        <button
          className={styles.saveToSpotify}
          onClick={onSave}
          disabled={isDisabled}
          title={
            isDisabled ? "Add tracks and a name to save your playlist" : ""
          }
        >
          Save To Spotify
        </button>
        {playlistName.trim() === "" && (
          <p className={styles.warning}>a playlist name is required.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
