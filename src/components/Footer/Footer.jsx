import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p className={styles.copyright}>
        Powered by{" "}
        <a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spotify
        </a>
        .
        <br />
        &copy; {currentYear} Lucas Carozza. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
