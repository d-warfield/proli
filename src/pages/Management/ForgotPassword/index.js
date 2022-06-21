import React, { useState } from "react";
import { auth } from "../../../firebase/utils";
import { useHistory } from "react-router-dom";
import DotsLoading from "../../../assets/animations/LoadingAnimation/DotsLoading";
import "./index.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });

  const history = useHistory();

  const sendPasswordReset = async () => {
    setLoading(true);
    try {
      await auth.sendPasswordResetEmail(email);
      setEmail("");
      setMessage({
        text:
          "An email has been sent to the address you have provided. Please follow link in the email to complete your password reset request.",
      });
      setLoading(false);
    } catch (err) {
      const text =
        err.code === "auth/user-not-found"
          ? "We were unable to find this email from our database. Please make sure that the email address is correct."
          : "An unknown error has been encountered while sending the email. Please try again. If this continues, please contact support@pro.li";
      setLoading(false);
      setMessage({
        text,
        error: true,
      });
    }
  };

  function validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  return (
    <div className="forgot_password">
      <h5>Forgot password?</h5>

      {message.text ? (
        <div
          className={`message ${message.error === true ? "failed" : "success"}`}
        >
          <h6>{message.text}</h6>
        </div>
      ) : (
        <h6>
          Don&apos;t worry!
          <br />
          Enter your email address you used to register your Proli account and
          we&apos;ll send you an email that contains instructions to reset your
          password!
        </h6>
      )}

      <input
        className={`${email.length > 5 && !validEmail(email) ? "invalid" : ""}`}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        spellCheck="false"
      />

      <button
        disabled={!validEmail(email)}
        onClick={() => sendPasswordReset()}
        className={`${!validEmail(email) ? "disabled" : ""}`}
      >
        {loading ? <DotsLoading /> : "Reset Password"}
      </button>
      <p onClick={() => history.push("/login")}>Login</p>
    </div>
  );
};

export default ForgotPassword;
