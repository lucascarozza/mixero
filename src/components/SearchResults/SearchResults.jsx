import React, { memo } from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = memo(({ userSearchResults, searchTerm, onAdd }) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchResults}>
        {userSearchResults.length > 0 ? (
          <div>
            <h3 className={styles.searchResultsTitle}>
              {searchTerm ? (
                <>
                  here's what we found for{" "}
                  <span className={styles.highlight}>{searchTerm}</span>
                </>
              ) : (
                "see what's trending on Spotify"
              )}
            </h3>

            <Tracklist
              userSearchResults={userSearchResults}
              isRemoval={false}
              onAdd={onAdd}
            />
            <p className={styles.searchResultsFooter}>
              couldn't find the song you're looking for?
              <br />
              try searching something different
            </p>
          </div>
        ) : (
          <p className={styles.placeholder}>tracks will appear here</p>
        )}
      </div>
    </div>
  );
});

export default SearchResults;
