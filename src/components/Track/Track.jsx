import React, { useState, useRef } from "react";
import styles from "./Track.module.css";
import pause from "../../assets/pause.svg";
import play from "../../assets/play.svg";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(track.preview_url));

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const renderPlayPauseButton = () => (
    <img
      src={isPlaying ? pause : play}
      className={styles.playPauseButton}
      alt={isPlaying ? "Pause" : "Play"}
      onClick={togglePlayPause}
    />
  );
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
};

export default Track;
