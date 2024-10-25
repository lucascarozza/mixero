import React from "react";

import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";

const Playlist = (props) => {
  const handleNameChange = ({ target }) => {
    const sanitizedInput = target.value.replace(/[<>\/\\&"'`@#$%^*()+=~]/g, ""); // Remove malicious symbols
    props.onNameChange(sanitizedInput);
  };

  const isDisabled =
    props.playlistTracks.length === 0 || props.playlistName.trim() === "";

  return (
    <div className={styles.container}>
      <div className={styles.playlist}>
        <input
          value={props.playlistName}
          onChange={handleNameChange}
          placeholder={props.playlistName ? "" : "enter a playlist name"}
          maxLength="60"
        />
        <Tracklist
          userSearchResults={props.playlistTracks}
          onRemove={props.onRemove}
          isRemoval
        />
        <button
          className={styles.saveToSpotify}
          onClick={props.onSave}
          disabled={isDisabled}
          title={
            isDisabled ? "Add tracks and a name to save your playlist" : ""
          }
        >
          Save To Spotify
        </button>
        {props.playlistName.trim() === "" && (
          <p className={styles.warning}>a playlist name is required.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
