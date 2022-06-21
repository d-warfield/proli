import React from "react";

const FriendLink = ({ linkTitle, linkUrl, textMargin }) => {
  return (
    <button
      className="link__infoContainer"
      onClick={() => (window.location = `http://${linkUrl}`)}
    >
      <p style={{ [textMargin]: "22px", padding: "0 2rem" }}>{linkTitle}</p>
    </button>
  );
};

export default FriendLink;
