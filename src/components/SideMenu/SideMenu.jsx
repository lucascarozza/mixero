import styles from "./SideMenu.module.css";
import {
  FaHouse,
  FaList,
  FaRetweet,
  FaSpotify,
  FaQuestion,
} from "react-icons/fa6";

const SideMenu = () => {
  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <h1 className={styles.logo}>mixero</h1>

        <nav aria-label="Primary navigation">
          <ul className={styles.navList}>
            <li>
              <a href="#" className={styles.navLink}>
                <FaHouse aria-hidden="true" /> Home
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaList aria-hidden="true" /> Manage Playlists
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaRetweet aria-hidden="true" /> Convert Playlists
              </a>
            </li>
          </ul>
        </nav>

        <hr className={styles.divider} />

        <nav aria-label="Secondary navigation">
          <ul className={styles.navList}>
            <li>
              <a href="#" className={`${styles.navLink} ${styles.accountLink}`}>
                <FaSpotify aria-hidden="true" /> My Account
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaQuestion aria-hidden="true" /> Help
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SideMenu;
