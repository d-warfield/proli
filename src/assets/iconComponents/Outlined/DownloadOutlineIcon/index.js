import React from "react";

const DownloadOutlineIcon = (props) => {
  return (
    <svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.1222 15.4361L12.1222 3.39511"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0382 12.5084L12.1222 15.4364L9.20621 12.5084"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.755 8.12802H17.688C19.723 8.12802 21.372 9.77702 21.372 11.813V16.697C21.372 18.727 19.727 20.372 17.697 20.372L6.55701 20.372C4.52201 20.372 2.87201 18.722 2.87201 16.687V11.802C2.87201 9.77302 4.51801 8.12802 6.54701 8.12802L7.48901 8.12802"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownloadOutlineIcon;
