import React from "react";

const SendIcon = (props) => {
  return (
    <svg
      width={props.width || "23"}
      height={props.height || "23"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8554 8.12111L10.1916 13.8227L3.56064 9.74147C2.69176 9.20657 2.86787 7.88697 3.8467 7.60287L19.5022 3.04743C20.3925 2.78978 21.2156 3.62446 20.949 4.51889L16.304 20.1582C16.013 21.1369 14.7082 21.3064 14.1809 20.4325L10.1916 13.8227"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
