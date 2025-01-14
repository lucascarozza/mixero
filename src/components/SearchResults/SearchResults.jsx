import styles from "./SearchResults.module.css";
// Component imports
import Tracklist from "../Tracklist/Tracklist";
import { useSelector } from "react-redux";
import { selectTracks } from "../../features/searchSlice";

const SearchResults = () => {
  const tracks = useSelector(selectTracks);

  return (
    <div className={styles.searchResults}>
      {tracks.length > 0 ? (
        <>
          <p className={styles.searchTitle}>
            here's what we found for{" "}
            <span className={styles.highlight}>it's ok i'm ok</span>
          </p>
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
