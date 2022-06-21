import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase/utils";
import DotsLoading from "../../assets/animations/LoadingAnimation/DotsLoading";
import "./styles.scss";
import ProliIcon from "../../assets/iconComponents/Outlined/Proli";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStateValue();

  const { REACT_APP_RESOURCES_BASE_URL } = process.env;

  const signIn = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/dashboard");
    } catch (e) {
      setLoading(false);
      const { message } = e;
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: false,
          message: message,
          timeout: 6000,
        },
      });
    }
  };

  // const signInWithGoogle = () => {
  //   const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  //   GoogleProvider.setCustomParameters({ prompt: "select_account" });
  //   auth.signInWithPopup(GoogleProvider);
  //   history.push("/dashboard");
  // };

  return (
    <div className="login">
      <div className="login_left">
        <img src={REACT_APP_RESOURCES_BASE_URL + "/homepage/burning-man.jpg"} />
      </div>
      <div className="login_right">
        <div className="login_header" onClick={() => history.push("/")}>
          <ProliIcon height={30} width={20} />
          <h5>Login</h5>
        </div>
        <div className="login_container">
          <form onSubmit={signIn}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              spellCheck="false"
              className="login_input"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              spellCheck="false"
              className="login_input"
            />
            <button type="submit" onClick={signIn} className="signin_button">
              {loading ? <DotsLoading lottieColor="white" /> : "Login"}
            </button>
          </form>

          <p onClick={() => history.push("/management/forgot-password")}>
            Forgot password?
          </p>

          <div className="breaker">
            <div className="breaker_left"></div>
            <p>or</p>
            <div className="breaker_right"></div>
          </div>

          <button
            onClick={() => history.push("/register")}
            className="register__registerButton"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
