// Styles imports
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa6";
// Components imports
import SearchBar from "../SearchBar/SearchBar";
// Functional imports
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleAuthCallback, initiateLogIn } from "../../features/authSlice";
// API imports
import { code } from "../../api/authApi";

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

  /*
   * Handles the login process.
   *
   * Steps:
   * 1. Dispatches the initiateLogIn action to start the login flow.
   * 
   */
  const handleLogIn = () => {
    dispatch(initiateLogIn());
  };

  /*
   * useEffect hook to handle the authentication callback.
   *
   * Steps:
   * 1. Checks if the authentication code is available.
   * 2. If the code is available, dispatches the handleAuthCallback action with the code.
   *
   * Dependencies:
   * - dispatch: The dispatch function from Redux.
   * 
   */
  useEffect(() => {
    if (code) dispatch(handleAuthCallback(code));
  }, [dispatch])

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>mixero</h1>
      <div className={styles.actions}>
        <SearchBar />
        <button
          className={styles.logInOutButton}
          type="button"
          title="Log In with Spotify"
          onClick={handleLogIn}
        >
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
