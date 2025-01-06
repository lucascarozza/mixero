import styles from "./Header.module.css";
// Components imports
import SearchBar from "../SearchBar/SearchBar";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>mixero</h1>
      <div className={styles.actions}>
        <SearchBar />
        <button className={styles.logInOutButton}type="button">
            <FaUser />
        </button>
      </div>
    </header>
  );
};

export default Header;
