import React from "react";
import "../../styles.scss";

const DefaultLink = ({ linkTitle, onClick, textMargin }) => {
  return (
    <button className="link__infoContainer" onClick={onClick}>
      <p style={{ [textMargin]: "22px", padding: "0 2rem" }}>{linkTitle}</p>
    </button>
  );
};

export default DefaultLink;
