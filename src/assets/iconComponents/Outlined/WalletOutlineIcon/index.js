import React from "react";

const WalletOutlineIcon = (props) => {
  return (
    <svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      stroke={props.stroke || "white"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6389 14.3958H17.5906C16.1042 14.3949 14.8994 13.1909 14.8985 11.7045C14.8985 10.218 16.1042 9.01413 17.5906 9.01321H21.6389"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0486 11.6429H17.7369"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.03561 7.53817H12.4346"
        stroke={props.stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WalletOutlineIcon;