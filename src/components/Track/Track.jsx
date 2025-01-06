import styles from "./Track.module.css";

const song = {
  name: "It's ok I'm ok",
  artist: "Tate McRae",
  album: "It's ok I'm ok - Single"
}

const Track = () => {
  return (
    <div className={styles.track}>
      <img className={styles.trackArt} src="itsokimok.jpeg"></img>
      <div className={styles.trackInfo}>
        <p>{song.name}</p>
        <p>{song.artist} | {song.album}</p>
      </div>
      <div className={styles.trackAction}>+</div>
    </div>
  );
};

export default Track;
