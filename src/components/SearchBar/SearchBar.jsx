import React, { useCallback, useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback(
    ({ target }) => {
      const sanitizedInput = target.value.replace(
        /[<>\/\\&"'`@#$%^*()+=~]/g,
        ""
      ); // Remove malicious symbols
      setTerm(sanitizedInput);
      onSearch(sanitizedInput);
    },
    [onSearch]
  );

  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        onChange={handleTermChange}
        placeholder={term ? "" : "search for a song, album or artist"}
        value={term}
        maxLength="60"
        id="name"
        autoComplete="off"
        list="off"
      />
    </div>
  );
};

export default SearchBar;
