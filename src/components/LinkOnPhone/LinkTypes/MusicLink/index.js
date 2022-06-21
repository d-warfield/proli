import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactPlayer from "react-player";

const MediaLink = ({ linkTitle }) => {
  const [iframeUrl, setIframeUrl] = useState("");
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

  useEffect(() => {
    if (linkTitle.includes("spotify")) {
      const choppedUrl = linkTitle.substring(25);
      const newUrl = "https://open.spotify.com/embed/" + choppedUrl;
      setIframeUrl(newUrl);
      if (linkTitle.includes(".com/show")) {
        setDimensions({ height: 152, width: targetRef.current.offsetWidth });
      } else if (linkTitle.includes(".com/episode/")) {
        setDimensions({ height: 152, width: targetRef.current.offsetWidth });
      } else {
        setDimensions({ height: 360, width: targetRef.current.offsetWidth });
      }
    } else {
      setDimensions({ height: 250, width: targetRef.current.offsetWidth });
    }
  }, [linkTitle]);

  return (
    <div
      ref={targetRef}
      className="music__container"
      style={{
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "0",
      }}
    >
      {linkTitle.includes("soundcloud") && (
        <ReactPlayer
          width={`${dimensions.width}px`}
          height={`${dimensions.height}px`}
          url={`${linkTitle}`}
        />
      )}

      {linkTitle.includes("spotify") && (
        <iframe
          title={iframeUrl}
          src={iframeUrl ? iframeUrl : null}
          width={`${dimensions.width}`}
          height={`${dimensions.height}`}
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default MediaLink;
