// Styles import
import styles from "./Playlist.module.css";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
// Components import
import Tracklist from "../Tracklist/Tracklist";

const Playlist = () => {
  return (
    <div className={styles.playlist}>
      <form className={styles.playlistName}>
        <FaEdit className={styles.editIcon} />
        <input className={styles.nameInput} type="text" placeholder="New Playlist"></input>
      </form>
      <Tracklist />
        <div className={styles.actions}>
          <button className={styles.saveToSpotify} type="button">Save To Spotify</button>
          <button className={styles.reset} type="button"><FaTrash /></button>
        </div>
    </div>
  );
};

export default Playlist;
