import React from "react";

const ImageIcon = (props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.21 7.89979V16.0498C21.21 19.0698 19.32 21.1998 16.3 21.1998H7.65C4.63 21.1998 2.75 19.0698 2.75 16.0498V7.89979C2.75 4.87979 4.64 2.75079 7.65 2.75079H16.3C19.32 2.75079 21.21 4.87979 21.21 7.89979Z"
        stroke={props.stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.28131 16.4321L6.81031 14.8191C7.36131 14.2371 8.28631 14.2341 8.84231 14.8111L9.72731 15.7141C10.3243 16.3231 11.3173 16.2791 11.8583 15.6201L14.0873 12.9091C14.7273 12.1301 15.9013 12.0821 16.6023 12.8051L18.6783 14.9471"
        strokeWidth="1.2"
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3135 9.13419C10.3135 10.1022 9.52752 10.8882 8.55952 10.8882C7.59152 10.8882 6.80652 10.1022 6.80652 9.13419C6.80652 8.16619 7.59152 7.38019 8.55952 7.38019C9.52752 7.38019 10.3135 8.16619 10.3135 9.13419Z"
        strokeWidth="1.2"
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ImageIcon;
