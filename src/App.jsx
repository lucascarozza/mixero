import styles from "./App.module.css";
// Component imports
import ContentArea from "./components/ContentArea/ContentArea";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <ContentArea />
      <footer>
        <p>
          Powered by <a href="https://developer.spotify.com/" target="_blank" className={styles.highlight}>Spotify</a>. <br />
          &copy; 2025 Lucas Carozza. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
