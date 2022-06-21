import React from "react";
import { useHistory } from "react-router-dom";
import Success from "../../../assets/Icons/Bold/Success.svg";
import Error from "../../../assets/Icons/Bold/Error.svg";

import "./index.scss";

const Status = ({ success, text, destination, buttonText }) => {
  const history = useHistory();

  return (
    <div className="status">
      <img alt="" src={success ? Success : Error} />
      <h1>{text}</h1>
      <button onClick={() => history.push(destination)}>{buttonText}</button>
    </div>
  );
};

export default Status;
