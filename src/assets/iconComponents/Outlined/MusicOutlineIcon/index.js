import React from "react";

const MusicOutlineIcon = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8714 16.8919C14.7999 17.4777 14.7788 18.0542 14.619 18.6505C14.3644 19.5005 13.6986 20.0204 12.9801 19.9994C12.6393 20.0078 12.1597 19.8003 11.8367 19.5288L8.06994 16.4695H5.97144C4.96058 16.4695 4.27791 15.7799 4.14011 14.6438C3.94446 13.2456 3.96234 10.7198 4.14011 9.29336C4.27791 8.30817 4.96058 7.53156 5.97144 7.53156H8.06994L11.7589 4.52464C12.0818 4.2511 12.6393 3.99327 12.9801 4.00061C13.6986 3.97965 14.3644 4.50054 14.619 5.34948C14.761 5.89237 14.7999 6.52331 14.8714 7.10918C15.0429 8.47901 15.0429 15.522 14.8714 16.8919Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7166 6.57394C19.6781 7.95677 20.2551 9.81183 20.2551 11.8765C20.2551 13.9412 19.6781 15.7952 18.7166 17.1781"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MusicOutlineIcon;
