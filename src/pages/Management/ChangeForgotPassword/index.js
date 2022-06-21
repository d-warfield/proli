import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/utils";
import { useHistory } from "react-router-dom";
import Status from "../Status";
import DotsLoading from "../../../assets/animations/LoadingAnimation/DotsLoading";
import "./index.scss";

const ChangeForgotPassword = ({ actionCode }) => {
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [changeError, setChangeError] = useState({
    message: "",
  });

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const email = await auth.verifyPasswordResetCode(actionCode);
        setEmail(email);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    })();
  }, []);

  const changePassword = async () => {
    setChangeError({
      message: "",
    });
    setButtonLoading(true);
    try {
      await auth.confirmPasswordReset(actionCode, newPassword);
      setSuccess(true);
    } catch (err) {
      setChangeError({
        message: err.message,
      });
    }
    setButtonLoading(false);
  };

  const redirectToDashboard = async () => {
    await auth.signInWithEmailAndPassword(email, newPassword);
    history.push("/dashboard");
  };

  if (loading) {
    return <DotsLoading showLogo={true} lottieColor="black" />;
  }

  if (error) {
    return (
      <Status
        text="Invalid authorization code."
        buttonText="Go to home"
        success={false}
        destination="/"
      />
    );
  }

  return (
    <div className="change_forgot_password">
      <h2>Change password</h2>
      {!changeError.message ? (
        success ? (
          <div className="message success">
            <h6>Password changed sucessfully.</h6>
          </div>
        ) : (
          <h6>
            Please enter new password. You will be redirected to dashboard right
            after password change.
          </h6>
        )
      ) : (
        <div className="message failed">
          <h6>{changeError.message}</h6>
        </div>
      )}
      {success ? (
        <button onClick={redirectToDashboard}>Go to dashboard</button>
      ) : (
        <>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            spellCheck="false"
          />
          <button onClick={() => changePassword()}>
            {buttonLoading ? <DotsLoading /> : "Change Password"}
          </button>
        </>
      )}
    </div>
  );
};

export default ChangeForgotPassword;
