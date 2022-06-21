import React from "react";
import "./styles.scss";

const DownloadLink = ({ linkTitle, textMargin }) => {
  return (
    <div className="link__button">
      <a download={"download"} title="Download">
        Click to download
      </a>

      <div className="link__infoContainer">
        <div className="link__left">
          <div className="link__imageContainer"></div>
        </div>
        <div className="link__middle">
          <p style={{ [textMargin]: "22px", padding: "0 2rem" }}>{linkTitle}</p>
        </div>
        <div className="link__right">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DownloadLink;
