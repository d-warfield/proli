import React from "react";

const ThreeDotsOutlinedIcon = (props) => {
  return (
    <svg
      width={props.width || "42"}
      height={props.height || "42"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.52069 13.1974C6.85969 13.1974 6.32269 12.6604 6.32269 12.0004C6.32269 11.3404 6.85969 10.8024 7.52069 10.8024C8.18169 10.8024 8.71869 11.3404 8.71869 12.0004C8.71869 12.6604 8.18169 13.1974 7.52069 13.1974Z"
        fill={props.fill || "white"}
      />
      <path
        d="M12.0002 13.1974C11.3392 13.1974 10.8022 12.6604 10.8022 12.0004C10.8022 11.3404 11.3392 10.8024 12.0002 10.8024C12.6612 10.8024 13.1982 11.3404 13.1982 12.0004C13.1982 12.6604 12.6612 13.1974 12.0002 13.1974Z"
        fill={props.fill || "white"}
      />
      <path
        d="M16.4792 13.1974C15.8182 13.1974 15.2812 12.6604 15.2812 12.0004C15.2812 11.3404 15.8182 10.8024 16.4792 10.8024C17.1402 10.8024 17.6772 11.3404 17.6772 12.0004C17.6772 12.6604 17.1402 13.1974 16.4792 13.1974Z"
        fill={props.fill || "white"}
      />
    </svg>
  );
};

export default ThreeDotsOutlinedIcon;
