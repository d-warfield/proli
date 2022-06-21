import React from "react";

const ShareIcon = (props) => {
  return (
    <svg
      style={{ margin: "-.2rem 0 0 0" }}
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 512 512"
      fill={props.fill || "white"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512,253.001L295.204,36.204v144.388C132.168,180.592,0,312.76,0,475.796c59.893-109.171,178.724-165.462,295.204-151.033
      v145.034L512,253.001z"
        fill={props.fill || "white"}
      />
    </svg>
  );
};

export default ShareIcon;
