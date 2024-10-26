import React from "react";
import styles from "./Track.module.css";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const passTrack = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  const renderAction = () => (
    <button
      className={`${styles.trackAction} ${
        isRemoval ? styles.removeTrack : styles.addTrack
      }`}
      onClick={passTrack}
    >
      {isRemoval ? "–" : "+"}
    </button>
  );

  return (
    <div className={styles.track}>
      <div className={styles.trackContainer}>
        <img src={track.cover} alt={`${track.name} cover`} />
        <div className={styles.trackInfo}>
          <h3>{track.name}</h3>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
