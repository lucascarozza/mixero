import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.pageTitle}>
        <span className={styles.highlight}>Home </span>
        Create Spotify Playlists
      </h2>
    </section>
  );
};

export default Home;
