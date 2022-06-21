import React from "react";

const PhoneIcon = (props) => {
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
        d="M2.99033 4.87254C3.30665 4.34878 5.0495 2.44376 6.29322 2.50127C6.665 2.53208 6.99364 2.75699 7.26067 3.01784C7.87379 3.61656 9.62897 5.88101 9.72859 6.35753C9.97096 7.52621 8.57833 8.1999 9.00454 9.37783C10.0911 12.0366 11.9634 13.9088 14.6233 14.9943C15.8003 15.4205 16.474 14.0279 17.6428 14.2713C18.1183 14.3709 20.3839 16.126 20.9826 16.7391C21.2425 17.0051 21.4684 17.3347 21.4992 17.7065C21.5454 19.0159 19.5222 20.7833 19.1278 21.0092C18.1974 21.6747 16.9834 21.6634 15.5035 20.9753C11.3739 19.2572 4.77426 12.7822 3.02422 8.49669C2.35461 7.02505 2.30839 5.80297 2.99033 4.87254Z"
        c
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.stroke}
      />
      <path
        opacity="0%"
        d="M4.38287 3.79431L5.85187 5.97331"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0%"
        d="M17.8643 18.0668L20.0523 19.7768"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PhoneIcon;
