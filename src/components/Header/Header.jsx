import styles from "./Header.module.css";
// Components imports
import SearchBar from "../SearchBar/SearchBar";
import { FaUser } from "react-icons/fa6";

import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); /* For testing purposes */

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>mixero</h1>
      <div className={styles.actions}>
        <SearchBar />
        <button
          className={`${styles.logInOutButton} ${isLoggedIn ? styles.loggedIn : styles.loggedOut}`}
          type="button"
          title="Log In with Spotify"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          value={isLoggedIn}
        >
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default Header;
