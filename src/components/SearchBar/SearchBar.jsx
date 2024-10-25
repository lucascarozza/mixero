import React, { useCallback, useState } from "react";

import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const passTerm = useCallback(() => {
    props.onSearch(term);
  }, [props.onSearch, term]);

  const handleTermChange = useCallback(
    ({ target }) => {
      const sanitizedInput = target.value.replace(
        /[<>\/\\&"'`@#$%^*()+=~]/g,
        ""
      ); // Remove malicious symbols
      setTerm(sanitizedInput);
      props.onSearch(sanitizedInput);
    },
    [props.onSearch]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        passTerm();
      }
    },
    [passTerm]
  );

  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        onChange={handleTermChange}
        onKeyDown={handleKeyPress}
        placeholder={term ? "" : "search for a song, album or artist"}
        value={term}
        maxLength="60"
      />
    </div>
  );
};

export default SearchBar;
