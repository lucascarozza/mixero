import styles from "./SideMenu.module.css";
import { FaHouse, FaRetweet, FaSpotify, FaQuestion } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

const SideMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For testing purposes.

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <h1 className={styles.logo}>mixero</h1>

        <nav aria-label="Primary navigation">
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeNavLink : styles.navLink
                }
              >
                <FaHouse aria-hidden="true" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manage-playlists"
                className={({ isActive }) =>
                  isActive ? styles.activeNavLink : styles.navLink
                }
              >
                <MdLibraryMusic aria-hidden="true" /> Manage Playlists
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/convert-playlists"
                className={({ isActive }) =>
                  isActive ? styles.activeNavLink : styles.navLink
                }
              >
                <FaRetweet aria-hidden="true" /> Convert Playlists
              </NavLink>
            </li>
          </ul>
        </nav>

        <hr className={styles.divider} />

        <nav aria-label="Secondary navigation">
          <ul className={styles.navList}>
            <li>
              <button
                type="button"
                // For testing purposes.
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className={`${styles.navLink} ${
                  isLoggedIn ? styles.logOut : styles.logIn
                } `}
              >
                <FaSpotify aria-hidden="true" />{" "}
                {isLoggedIn ? "Log Out" : "Log In"}
              </button>
            </li>
            <li>
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  isActive ? styles.activeNavLink : styles.navLink
                }
              >
                <FaQuestion aria-hidden="true" /> Help
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SideMenu;
