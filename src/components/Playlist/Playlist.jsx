// Styles import
import styles from "./Playlist.module.css";
import { FaEdit } from "react-icons/fa";
// Components import
import Tracklist from "../Tracklist/Tracklist";
// Functional imports
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
   * 1. Dispatches updateName action with the new name value from the input field.
   *
   * @param {Event} e - The event object from the input field.
   *
   */
  const handleNameChange = (e) => {
    dispatch(updateName(e.target.value));
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
      <Tracklist tracks={tracks} isPlaylistTracks={true} />
      <div className={styles.actions}>
        <button
          className={styles.saveToSpotify}
          type="button"
          onClick={handleSaveToSpotify}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Save To Spotify"}
        </button>
      </div>
    </div>
  );
};

export default Playlist;
