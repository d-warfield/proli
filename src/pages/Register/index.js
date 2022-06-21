import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import DotsLoading from "../../assets/animations/LoadingAnimation/DotsLoading";
import { auth, functions } from "../../firebase/utils";
import ProliIcon from "../../assets/iconComponents/Outlined/Proli";
import "./styles.scss";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useStateValue();

  const { REACT_APP_RESOURCES_BASE_URL } = process.env;

  const createAccount = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      return dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: false,
          message: "Please fill all fields!",
          timeout: 4500,
        },
      });
    }

    setLoading(true);

    try {
      const register = functions.httpsCallable("registerUser");
      const status = await register({ username, password, email });
      const { data } = status;
      if (data.success) {
        await auth.signInWithEmailAndPassword(email, password);
        await auth.currentUser.sendEmailVerification();
        history.push("/dashboard");
      } else {
        setLoading(false);
        dispatch({
          type: "TOGGLE_NOTIFICATION",
          payload: {
            hidden: false,
            success: false,
            message: data.message,
            timeout: 6000,
          },
        });
      }
    } catch {
      setLoading(false);
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: false,
          message:
            "Oops.. Something went wrong. If this continues, please contact to support.",
          timeout: 6000,
        },
      });
    }
  };

  return (
    <div className="register">
      <div className="register_left">
        <img src={REACT_APP_RESOURCES_BASE_URL + "/homepage/burning-man.jpg"} />
      </div>
      <div className="register_right">
        <div className="register_header">
          <ProliIcon height={30} />
          <h5>Register</h5>
        </div>
        <div className="register__container">
          <form onSubmit={createAccount}>
            <input
              className="register_input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              spellCheck="false"
            />

            <input
              className="register_input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
              placeholder="Username"
              spellCheck="false"
            />

            <input
              className="register_input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              spellCheck="false"
            />

            <button
              onClick={createAccount}
              className="register__registerButton"
            >
              {loading ? <DotsLoading lottieColor="white" /> : "Create Account"}
            </button>
          </form>

          <div className="breaker">
            <div className="breaker_left"></div>
            <p>or</p>
            <div className="breaker_right"></div>
          </div>

          <button
            onClick={() => history.push("/login")}
            className="signin_button"
          >
            Login
          </button>
          <p>
            By clicking Create Account, you agree to our{" "}
            <button onClick={() => history.push("/terms-and-conditions")}>
              Terms
            </button>{" "}
            and have read our{" "}
            <button onClick={() => history.push("/privacy-policy")}>
              Privacy Policy.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
