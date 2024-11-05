import React, { memo, useState, useRef } from "react";
import styles from "./Track.module.css";
import pause from "../../assets/pause.svg";
import play from "../../assets/play.svg";

const Track = memo(({ track, onAdd, onRemove, isRemoval }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(track.preview_url));

  // Play/Pause the preview sample.
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //  Render Play/Pause button associated with togglePlayPause.
  const renderPlayPauseButton = () => (
    <img
      src={isPlaying ? pause : play}
      className={styles.playPauseButton}
      alt={isPlaying ? "Pause" : "Play"}
      onClick={togglePlayPause}
    />
  );

  // Add/Remove track to the Playlist component.
  const passTrack = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  // Render Add/Remove button associated with passTrack.
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
        <div className={styles.coverContainer}>
          <img
            src={track.cover}
            className={styles.cover}
            alt={`${track.name} cover`}
          />
          {renderPlayPauseButton()}
        </div>
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
});

export default Track;
