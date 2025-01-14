import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTracks } from "../../features/searchSlice";

const SearchBar = () => {
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchTracks(term));
  };

  return (
    <form
      className={styles.searchBar}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <button className={styles.searchButton} type="button">
        <FaSearch />
      </button>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search for a song, album or artist"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
      ></input>
    </form>
  );
};

export default SearchBar;
