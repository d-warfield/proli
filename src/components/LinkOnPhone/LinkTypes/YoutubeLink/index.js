import React, { useState, useRef, useLayoutEffect } from "react";
import ReactPlayer from "react-player/youtube";

function YoutubeLink({ linkTitle }) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);
  return (
    <div
      ref={targetRef}
      style={{
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ReactPlayer width={`${dimensions.width}px`} url={`${linkTitle}`} />
    </div>
  );
}

export default YoutubeLink;
