import styles from "./Track.module.css";

const Track = ({ track }) => {
  return (
    <div className={styles.track}>
      <img className={styles.trackImage} src={track.image}></img>
      <div className={styles.trackInfo}>
        <p>{track.name}</p>
        <p className={styles.trackArtist}>{track.artists} | {track.album}</p>
      </div>
      <div className={styles.trackAction}>+</div>
    </div>
  );
};

export default Track;