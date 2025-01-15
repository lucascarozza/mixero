// Styles imports
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
// Functional imports
import { memo } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTracks } from "../../features/searchSlice";

/*
 * Renders and manages the search functionality for songs, albums, or artists.
 *
 * Functionalities:
 * 1. Allows the user to input a search term.
 * 2. Dispatches the fetchTracks action to search for tracks based on the input term.
 *
 */
const SearchBar = () => {
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  /*
   * Handles initiating the search process.
   *
   * Steps:
   * 1. Sanitizes the search term from the input field.
   * 2. Dispatches the fetchTracks action with the current search term.
   *
   */
  const handleSearch = () => {
    const sanitizedTerm = term.replace(/[^\w\s.,-]/gi, "").trim();
    dispatch(fetchTracks(sanitizedTerm));
  };

  // Triggers search when term changes and enables live search.
  useEffect(() => {
    if (term) {
      handleSearch();
    }
  }, [term]);

  return (
    <form
      className={styles.searchBar}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button className={styles.searchButton} type="button">
        <FaSearch />
      </button>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="search for a song, album or artist"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
      ></input>
    </form>
  );
};

export default memo(SearchBar);
