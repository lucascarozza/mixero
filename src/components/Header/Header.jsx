import styles from "./Header.module.css";
// Components imports
import SearchBar from "../SearchBar/SearchBar";
import { FaUser } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleAuthCallback, initiateLogIn } from "../../features/authSlice";
import { code } from "../../api/authApi";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogIn = () => {
    dispatch(initiateLogIn());
  };

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

export default Header;
