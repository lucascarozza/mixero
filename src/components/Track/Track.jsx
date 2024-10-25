import React from "react";

import styles from "./Track.module.css";

const Track = (props) => {
  const passTrack = () => {
    props.onAdd(props.track);
  };

  const passTrackToRemove = () => {
    props.onRemove(props.track);
  };

  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button
          className={`${styles.trackAction} ${styles.removeTrack}`}
          onClick={passTrackToRemove}
        >
          –
        </button>
      );
    } else {
      return (
        <button
          className={`${styles.trackAction} ${styles.addTrack}`}
          onClick={passTrack}
        >
          +
        </button>
      );
    }
  };

  const handleClick = () => {
    if (props.isRemoval) {
      passTrackToRemove();
    } else {
      passTrack();
    }
  };

  return (
    <div className={styles.Track}>
      <div className={styles.trackContainer} onClick={handleClick}>
        <img src={props.track.cover} alt={`${props.track.name} cover`} />
        <div className={styles.trackInfo}>
          <h3>{props.track.name}</h3>
          <p>
            {props.track.artist} | {props.track.album}
          </p>
        </div>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
