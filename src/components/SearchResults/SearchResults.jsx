import React from "react";

import styles from "./SearchResults.module.css";

import Tracklist from "../Tracklist/Tracklist";

const SearchResults = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchResults}>
        {props.userSearchResults.length > 0 ? (
          <div>
            <h3 className={styles.searchResultsTitle}>
              here's what we found for{" "}
              <span className={styles.highlight}>{props.searchTerm}</span>
            </h3>
            <Tracklist
              userSearchResults={props.userSearchResults}
              isRemoval={false}
              onAdd={props.onAdd}
            />
          </div>
        ) : (
          <p className={styles.placeholder}>songs will appear here</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
