import React from "react";

function TwitchLink({ linkTitle }) {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${linkTitle}&parent=${window.location.hostname}`}
      frameBorder="0"
      allowFullScreen={true}
      scrolling="no"
      height="200"
      width="100%"
    ></iframe>
  );
}

export default TwitchLink;
