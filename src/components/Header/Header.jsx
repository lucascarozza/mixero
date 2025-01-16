// Styles imports
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa6";
// Components imports
import SearchBar from "../SearchBar/SearchBar";
// Functional imports
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  handleAuthCallback,
  initiateLogIn,
  initiateLogOut,
} from "../../features/authSlice";
// API imports
import { currentToken } from "../../api/authApi";

/*
 * Renders header with the logo, search bar, and login button.
 *
 * Functionalities:
 * 1. Displays the application's logo.
 * 2. Renders the search bar for searching songs, albums, or artists.
 * 3. Provides a button to log in with Spotify.
 *
 */
const Header = () => {
  const dispatch = useDispatch();

  const accessToken = currentToken.access_token;

  const handleLogIn = () => {
    dispatch(initiateLogIn());
  };

  const handleLogOut = () => {
    dispatch(initiateLogOut());
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>mixero</h1>
      <div className={styles.actions}>
        <SearchBar />
        <button
          className={
            accessToken
              ? `${styles.logInOutButton} ${styles.loggedIn}`
              : `${styles.logInOutButton} ${styles.loggedOut}`
          }
          type="button"
          title={accessToken ? "Log Out" : "Log In with Spotify"}
          onClick={accessToken ? handleLogOut : handleLogIn}
        >
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
