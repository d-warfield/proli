import React from "react";

const TwitchIcon = (props) => {
  return (
    <svg
      id="Bold"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      height={props.height || "22"}
      width={props.width || "22"}
      fill={props.fill || "black"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m.975 4.175v16.694h5.749v3.131h3.139l3.134-3.132h4.705l6.274-6.258v-14.61h-21.434zm3.658-2.09h17.252v11.479l-3.66 3.652h-5.751l-3.134 3.127v-3.127h-4.707z" />
      <path d="m10.385 6.262h2.09v6.26h-2.09z" />
      <path d="m16.133 6.262h2.091v6.26h-2.091z" />
    </svg>
  );
};

export default TwitchIcon;