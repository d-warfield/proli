import React from "react";

const EmailLink = ({ linkTitle, linkUrl, textMargin }) => {
  const sendEmail = () => {
    window.location = `mailto:${linkUrl}`;
  };

  return (
    <button className="link__infoContainer" onClick={sendEmail}>
      <p style={{ [textMargin]: "22px", padding: "0 2rem" }}>{linkTitle}</p>
    </button>
  );
};

export default EmailLink;
