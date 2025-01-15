import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

/*
 * Renders a list of tracks based on props received.
 *
 * Props:
 * - tracks: An array of track objects to display.
 * - isPlaylistTracks: A boolean indicating if the tracks are from the playlist.
 *
 */
const Tracklist = ({ tracks, isPlaylistTracks = false }) => {
  return (
    <div className={styles.tracklist}>
      {/* Map and display tracks from search results or playlist */}
      {tracks.map((track) => (
        <Track key={track.id} track={track} isInPlaylist={isPlaylistTracks} />
      ))}
    </div>
  );
};

export default Tracklist;
