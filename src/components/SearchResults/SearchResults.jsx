import React, { memo } from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = memo(
  ({ userSearchResults, searchTerm, onAdd, playlistTracks }) => {
    // Filter out tracks that are already in the playlist
    const filteredSearchResults = userSearchResults.filter(
      (track) =>
        !playlistTracks.some((playlistTrack) => playlistTrack.id === track.id)
    );

    return (
      <div className={styles.container}>
        <div className={styles.searchResults}>
          {filteredSearchResults.length > 0 ? (
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
                userSearchResults={filteredSearchResults}
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
            <p className={styles.placeholder}>
              log in to Spotify to see tracks
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default SearchResults;
