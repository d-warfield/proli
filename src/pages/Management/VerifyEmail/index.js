import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase/utils";
import { Redirect } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import DotsLoading from "../../../assets/animations/LoadingAnimation/DotsLoading";

const VerifyEmail = ({ actionCode }) => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await auth.applyActionCode(actionCode);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <DotsLoading showLogo={true} />;
  }

  if (!error) {
    dispatch({
      type: "TOGGLE_NOTIFICATION",
      payload: {
        hidden: false,
        success: true,
        message: "Email verified successfully!",
        timeout: 7500,
      },
    });
    if (user.uid) {
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/login" />;
  }
  if (error) {
    dispatch({
      type: "TOGGLE_NOTIFICATION",
      payload: {
        hidden: false,
        success: false,
        message: "Invalid authorization code.",
        timeout: 7500,
      },
    });
    return <Redirect to="/login" />;
  }
};

export default VerifyEmail;
