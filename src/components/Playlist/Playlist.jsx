import React, { memo, useCallback, useState } from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";
import Spotify from "../../util/Spotify";

const Playlist = memo(
  ({ playlistName, playlistTracks, onNameChange, onRemove, onReset }) => {
    const [saveStatus, setSaveStatus] = useState(null);

    const handleNameChange = useCallback(
      ({ target }) => {
        const sanitizedInput = target.value.replace(
          /[<>\/\\&"'`@#$%^*()+=~]/g,
          ""
        ); // Remove malicious symbols
        onNameChange(sanitizedInput);
      },
      [onNameChange]
    );

    // Determine if the save button should be disabled
    const isDisabled =
      playlistTracks.length === 0 || playlistName.trim() === "";

    // Handle the "Save To Spotify" button click
    const handleSaveToSpotify = async () => {
      try {
        setSaveStatus("pending");
        await Spotify.savePlaylist(
          playlistName,
          playlistTracks.map((t) => t.uri)
        );
        setSaveStatus("success");
        onReset();
      } catch (error) {
        console.error("Error saving playlist to Spotify:", error);
        setSaveStatus("rejected");
      }
    };

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
          {playlistTracks.length > 0 ? (
            <Tracklist
              userSearchResults={playlistTracks}
              onRemove={onRemove}
              isRemoval={true}
            />
          ) : (
            <p className={styles.placeholder}>add tracks to get started</p>
          )}
          <button
            type="button"
            className={styles.saveToSpotify}
            onClick={handleSaveToSpotify}
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
          {saveStatus === "pending" && (
            <p className={styles.pending}>saving playlist to Spotify...</p>
          )}
          {saveStatus === "rejected" && (
            <p className={styles.warning}>
              sorry, something went wrong. try again later
            </p>
          )}
          {saveStatus === "success" && (
            <p className={styles.success}>
              playlist saved to your Spotify account 🎉
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Playlist;
