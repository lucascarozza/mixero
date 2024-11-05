import React, { memo } from "react";
import styles from "./Header.module.css";

const Header = memo(() => (
  <header>
    <h1 className={styles.logo}>mixero</h1>
  </header>
));

export default Header;