import React, { useState, useEffect } from "react";
import "./styles.scss";

const MediaLink = ({ mediaUrl }) => {
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    (async () => {
      if (mediaUrl) {
        const isVideo = await mediaUrl.includes("mp4");
        // const imageMedia = await mediaUrl.includes("jpeg" || "jpg" || "photo");
        if (isVideo) {
          return setMediaType("video");
        }
        setMediaType("image");
      }
    })();
  });

  return (
    <div className="media__container">
      {mediaType === "video" ? (
        <video
          style={{ maxWidth: "100%" }}
          controls
          autoPlay={true}
          loop
          mute="false"
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <img alt="" src={mediaUrl} style={{ maxWidth: "100%" }} />
      )}
    </div>
  );
};

export default MediaLink;
