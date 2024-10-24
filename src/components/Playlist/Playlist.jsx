import React from "react";

import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";

const Playlist = (props) => {
  const handleNameChange = ({ target }) => {
    props.onNameChange(target.value);
  };

  return (
    <div className={styles.Playlist}>
      <input defaultValue={"New Playlist"} onChange={handleNameChange} />
      <Tracklist
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={styles["Playlist-save"]} onClick={props.onSave}>Save To Spotify</button>
    </div>
  );
};

export default Playlist;
