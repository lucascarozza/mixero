// Styles imports
import styles from "./ContentArea.module.css";
// Component Imports
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

// Renders the main content area
const ContentArea = () => {
  return (
    <section className={styles.contentArea}>
      <div className={styles.mobileOnlyContainer}>
        <SearchResults />
      </div>
      <div className={styles.mobileOnlyContainer}>
        <Playlist />
      </div>
    </section>
  );
};

export default ContentArea;
