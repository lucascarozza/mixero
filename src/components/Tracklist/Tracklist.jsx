import styles from "./Tracklist.module.css";
// Component imports
import Track from "../Track/Track";

const Tracklist = () => {
  return (
    <div className={styles.tracklist}>
      <Track />
      <Track />
      <Track />
      <Track />
      <Track />
      <Track />
      <Track />
      <Track />
    </div>
  );
};

export default Tracklist;
