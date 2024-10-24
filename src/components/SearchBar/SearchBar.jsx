import React, { useCallback, useState } from "react";

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const passTerm = useCallback(() => {
    props.onSearch(term);
  }, [props.onSearch, term]);

  const handleTermChange = useCallback(({ target }) => {
    setTerm(target.value);
  }, []);

  return (
    <div className={styles.SearchBar}>
      <input
        type="search"
        placeholder="Search for a song, album or artist"
        onChange={handleTermChange}
      />
      <button className={styles.SearchButton} onClick={passTerm}>Search</button>
    </div>
  );
};

export default SearchBar;
