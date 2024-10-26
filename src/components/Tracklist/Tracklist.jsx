import React from "react";
import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

const Tracklist = ({ userSearchResults, isRemoval, onAdd, onRemove }) => {
  return (
    <div className={styles.tracklist}>
      {userSearchResults.map((track) => (
        <Track
          key={track.id}
          track={track}
          isRemoval={isRemoval}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default Tracklist;
