import React from "react";
import "./styles.scss";

function DummyRectangle({ social, socialIcons }) {
  return (
    <div className="dummy_buttonContainer">
      <div className="dummy_buttonLeft">{socialIcons}</div>
      <div className="dummy_buttonRight">
        <p>{social}</p>
      </div>
    </div>
  );
}

export default DummyRectangle;
