import React from "react";

const PhoneLink = ({ linkTitle, linkUrl, textMargin }) => {
  const executeCall = () => {
    window.open(`tel:${linkUrl}`);
  };

  return (
    <button className="link__infoContainer" onClick={executeCall}>
      <p style={{ [textMargin]: "22px", padding: "0 2rem" }}>{linkTitle}</p>
    </button>
  );
};

export default PhoneLink;
