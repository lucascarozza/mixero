// Styles import
import styles from "./Playlist.module.css";
import { FaEdit, FaSpotify } from "react-icons/fa";
// Components import
import Tracklist from "../Tracklist/Tracklist";
// Functional imports
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  savePlaylistToSpotify,
} from "../../features/playlistSlice";

/*
 * Renders and manages playlist creation and saving to Spotify.
 *
 * Functionalities:
 * 1. Allows the user to update the playlist name.
 * 2. Displays the list of tracks in the playlist.
 * 3. Provides a button to save the playlist to Spotify.
 *
 */
const Playlist = () => {
  const dispatch = useDispatch();
  const { name, tracks, status } = useSelector((state) => state.playlist);

  /*
   * Handles playlist name changes.
   *
   * Steps:
   * 1. Sanitizes the new name value from the input field.
   * 2. Dispatches updateName action with the sanitized value.
   *
   * @param {Event} e - The event object from the input field.
   *
   */
  const handleNameChange = (e) => {
    const sanitizedName = e.target.value.replace(/[^\w\s.,-]/gi, "");
    dispatch(updateName(sanitizedName));
  };

  /*
   * Handles exporting to Spotify.
   *
   * Steps:
   * 1. Dispatches savePlaylistToSpotify action to initiate the saving process.
   *
   */
  const handleSaveToSpotify = () => {
    dispatch(savePlaylistToSpotify());
  };

  return (
    <div className={styles.playlist}>
      <form
        className={styles.playlistName}
        name="Playlist Name"
        onSubmit={(e) => e.preventDefault()}
      >
        <FaEdit className={styles.editIcon} />
        <input
          className={styles.nameInput}
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="New Playlist"
        />
      </form>
      {/* Display playlist tracks */}
      {tracks.length === 0 ? (
        <div className={styles.noTracksPlaceholder}>
          <p>add tracks when you're to start
            <br />
            creating your new playlist
          </p>
        </div>
      ) : (
        <Tracklist tracks={tracks} isPlaylistTracks={true} />
      )}
      <div className={styles.actions}>
        <button
          className={styles.saveToSpotify}
          type="button"
          title={
            name.trim() === "" || tracks.length === 0
              ? "Save To Spotify Disabled"
              : "Save To Spotify"
          }
          onClick={handleSaveToSpotify}
          disabled={
            name.trim() === "" || tracks.length === 0 || status === "loading"
          }
        >
          <FaSpotify className={styles.spotifyIcon} />
          {status === "loading" ? "Saving..." : "Save To Spotify"}
        </button>
      </div>
      {name.trim() === "" && (
        <p className={styles.warning}>
          add a name to save your playlist
          <br />
          you can change it later on Spotify
        </p>
      )}
    </div>
  );
};

export default memo(Playlist);
