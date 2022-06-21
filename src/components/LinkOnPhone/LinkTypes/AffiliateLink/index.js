import React from "react";
import "../../styles.scss";

const AffiliateLink = ({ linkTitle, textMargin }) => {
  return (
    <button className="link__infoContainer">
      <p style={{ [textMargin]: "20px", padding: "0rem 3rem" }}>{linkTitle}</p>
    </button>
  );
};

export default AffiliateLink;
