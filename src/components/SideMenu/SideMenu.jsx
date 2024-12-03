import styles from "./SideMenu.module.css";
import { FaHouse, FaRetweet, FaSpotify, FaQuestion } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <h1 className={styles.logo}>mixero</h1>

        <nav aria-label="Primary navigation">
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink}>
                <FaHouse aria-hidden="true" /> Home
              </Link>
            </li>
            <li>
              <Link to="/manage-playlists" className={styles.navLink}>
                <MdLibraryMusic aria-hidden="true" /> Manage Playlists
              </Link>
            </li>
            <li>
              <Link to="/convert-playlists" className={styles.navLink}>
                <FaRetweet aria-hidden="true" /> Convert Playlists
              </Link>
            </li>
          </ul>
        </nav>

        <hr className={styles.divider} />

        <nav aria-label="Secondary navigation">
          <ul className={styles.navList}>
            <li>
              <Link to="/account" className={`${styles.navLink} ${styles.accountLink}`}>
                <FaSpotify aria-hidden="true" /> My Account
              </Link>
            </li>
            <li>
              <Link to="/help" className={styles.navLink}>
                <FaQuestion aria-hidden="true" /> Help
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SideMenu;
