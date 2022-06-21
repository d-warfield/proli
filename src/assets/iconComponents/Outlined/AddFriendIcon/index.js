import React from "react";

const AddFriendIcon = (props) => {
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
        d="M9.87743 15.2062C6.03343 15.2062 2.75043 15.7872 2.75043 18.1152C2.75043 20.4422 6.01243 21.0452 9.87743 21.0452C13.7214 21.0452 17.0044 20.4632 17.0044 18.1362C17.0044 15.8092 13.7424 15.2062 9.87743 15.2062Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.87745 11.8859C12.4134 11.8859 14.4454 9.85288 14.4454 7.31788C14.4454 4.78188 12.4134 2.74988 9.87745 2.74988C7.34245 2.74988 5.30945 4.78188 5.30945 7.31788C5.30945 9.85288 7.34245 11.8859 9.87745 11.8859Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2041 8.66907V12.6791"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.25 10.674H17.16"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddFriendIcon;
