import styles from "./SearchResults.module.css";
// Component imports
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = () => {
  return (
    <div className={styles.searchResults}>
      <p className={styles.searchTitle}>
        here's what we found for{" "}
        <span className={styles.highlight}>it's ok i'm ok</span>
      </p>
      <div className={styles.overflow}>
        <Tracklist />
      </div>
    </div>
  );
};

export default SearchResults;
