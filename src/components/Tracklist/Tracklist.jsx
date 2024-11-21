import React, { memo } from "react";
import { useTransition, animated } from "@react-spring/web";
import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

const Tracklist = memo(({ userSearchResults, isRemoval, onAdd, onRemove }) => {
  const transitions = useTransition(userSearchResults, {
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    config: {
      tension: 150,
      friction: 12,
    },
    trail: 100,
  });

  return (
    <div className={styles.tracklist}>
      {transitions((style, track) => (
        <animated.div style={style}>
          <Track
            key={track.id}
            track={track}
            isRemoval={isRemoval}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        </animated.div>
      ))}
    </div>
  );
});

export default Tracklist;
