import React from "react";

const CheckMarkFilledIcon = (props) => {
  return (
    <svg
      id="bold"
      enable-background="new 0 0 24 24"
      height={props.height || "24"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m12 0c-6.617 0-12 5.383-12 12s5.383 12 12 12 12-5.383 12-12-5.383-12-12-12zm6.082 9.457-6.5 6.5c-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-3.25-3.25c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.543 2.543 5.793-5.793c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414z" />
    </svg>
  );
};

export default CheckMarkFilledIcon;
