import React, { memo, useState, useEffect, useRef } from "react";
import styles from "./Track.module.css";
import pause from "../../assets/pause.svg";
import play from "../../assets/play.svg";
import playDisabled from "../../assets/play_disabled.svg";

const Track = memo(({ track, onAdd, onRemove, isRemoval }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayDisabled, setIsPlayDisabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create a new Audio object only if the preview_url is valid
    if (track.preview_url) {
      audioRef.current = new Audio(track.preview_url);
      audioRef.current.crossOrigin = "anonymous";

      // Add ended event listener to reset playing state
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current = null;
      setIsPlayDisabled(true);
    }

    // Cleanup audio resources on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
        audioRef.current.src = "";
        audioRef.current.load();
      }
    };
  }, [track.preview_url]);

  // Play/Pause the preview sample
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.currentTime = 0; // Reset time before playing
        audioRef.current.play();
      }
      setIsPlaying((prevState) => !prevState);
    }
  };

  // Render Play/Pause button associated with togglePlayPause
  const PlayPauseButton = () => (
    <img
      src={isPlaying ? pause : play}
      className={styles.previewButton}
      alt={isPlaying ? "Pause" : "Play"}
      onClick={togglePlayPause}
    />
  );

  // Render Play Disabled icon when no audio playback is available
  const PlayDisabled = () => (
    <img
      src={playDisabled}
      alt="Play disabled"
      className={`${styles.previewButton} ${styles.playDisabled}`}
      title="Preview not available"
    />
  );

  // Add/Remove track to the Playlist component
  const handleAction = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  // Render Add/Remove button associated with handleAction
  const ActionButton = () => (
    <button
      className={`${styles.trackAction} ${
        isRemoval ? styles.removeTrack : styles.addTrack
      }`}
      onClick={handleAction}
      type="button"
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
          {isPlayDisabled ? (
            <PlayDisabled />
          ) : (
            track.preview_url && <PlayPauseButton />
          )}
        </div>
        <div className={styles.trackInfo}>
          <h3>{track.name}</h3>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
      </div>
      <ActionButton />
    </div>
  );
});

export default Track;
