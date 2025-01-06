import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <form className={styles.searchBar}>
      <button className={styles.searchButton} type="button">
        <FaSearch />
      </button>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search for a song, album or artist"
      ></input>
    </form>
  );
};

export default SearchBar;
