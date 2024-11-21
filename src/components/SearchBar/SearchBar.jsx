import React, { memo, useCallback, useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = memo(({ onSearch }) => {
  const [term, setTerm] = useState("");

  // Memoize the handleTermChange function to avoid unnecessary re-creation
  const handleTermChange = useCallback(
    (event) => {
      const sanitizedInput = event.target.value.replace(
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
});

export default SearchBar;
