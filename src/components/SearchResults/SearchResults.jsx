// Styles imports
import styles from "./SearchResults.module.css";
// Component imports
import Tracklist from "../Tracklist/Tracklist";
// Functional imports
import { useSelector } from "react-redux";
import { selectTerm, selectTracks } from "../../features/searchSlice";

/*
 * Renders the results of a search for songs, albums, or artists.
 *
 * Functionalities:
 * 1. Selects the tracks from the search slice state.
 * 2. Displays the search results if tracks are found.
 * 3. Provides messages to guide the user if no tracks are found.
 *
 */
const SearchResults = () => {
  const tracks = useSelector(selectTracks);
  const term = useSelector(selectTerm);

  return (
    <div className={styles.searchResults}>
      {tracks.length > 0 ? (
        <>
          <p className={styles.searchTitle}>
            here's what we found for{" "}
            <span className={styles.highlight}>{term}</span>
          </p>
          {/* Display search results tracks */}
          <Tracklist tracks={tracks} />
          <p className={styles.searchFooter}>
            still can't find the song you're looking for?
            <br /> try searching something different
          </p>
        </>
      ) : (
        <p className={styles.searchFooter}>search to begin</p>
      )}
    </div>
  );
};

export default SearchResults;
