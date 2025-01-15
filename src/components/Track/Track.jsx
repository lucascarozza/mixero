// Styles imports
import styles from "./Track.module.css";
// Functional imports
import { useDispatch, useSelector } from "react-redux";
import { addTrack, removeTrack } from "../../features/playlistSlice";

/*
 * Renders and manages individual tracks.
 *
 * Functionalities:
 * 1. Displays track information.
 * 2. Allows the user to add or remove tracks from the playlist.
 * 3. Hides tracks in search results that are already in the playlist.
 *
 */
const Track = ({ track, isInPlaylist }) => {
  const dispatch = useDispatch();
  const playlistTracks = useSelector((state) => state.playlist.tracks);

  /*
   * Checks if the track is already in the playlist.
   *
   * @returns {boolean} - True if the track is in the playlist, false otherwise.
   *
   */
  const isTrackInPlaylist = playlistTracks.some((t) => t.uri === track.uri);

  /*
   * Handles the add/remove track actions.
   *
   * Steps:
   * 1. If the track is in the playlist, dispatches the removeTrack action.
   * 2. If the track is not in the playlist, dispatches the addTrack action.
   *
   */
  const handleTrackAction = () => {
    if (isInPlaylist) {
      dispatch(removeTrack(track));
    } else {
      dispatch(addTrack(track));
    }
  };

  /*
   * Hides tracks in search results that are already in the playlist.
   *
   * @returns {null} - If the track is already in the playlist and not in the playlist view.
   *
   */
  if (!isInPlaylist && isTrackInPlaylist) {
    return null;
  }

  return (
    <div className={styles.track} onClick={handleTrackAction}>
      <img className={styles.trackImage} src={track.image} alt={track.name} />
      <div className={styles.trackInfo}>
        <p>{track.name}</p>
        <p className={styles.trackArtist}>
          {track.artists} | {track.album}
        </p>
      </div>
      <button
        className={styles.trackAction}
        type="button"
        aria-label={isInPlaylist ? "Remove track" : "Add track"}
      >
        {isInPlaylist ? "-" : "+"}
      </button>
    </div>
  );
};

export default Track;
