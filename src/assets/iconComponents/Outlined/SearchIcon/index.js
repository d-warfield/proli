import React from "react";

const SearchIcon = (props) => {
  return (
    <svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11.7666"
        cy="11.7666"
        r="8.98856"
        stroke={props.stroke || "white"}
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0183 18.4851L21.5423 22"
        stroke={props.stroke || "white"}
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
