import styles from "./ContentArea.module.css";
// Component Imports
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

const ContentArea = () => {
  return (
      <section className={styles.contentArea}>
            <SearchResults />
            <Playlist />
      </section>
  )
}

export default ContentArea;