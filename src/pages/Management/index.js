import React, { useEffect, useState } from "react";
import DotsLoading from "../../assets/animations/LoadingAnimation/DotsLoading";
import ChangeForgotPassword from "./ChangeForgotPassword";
import VerifyEmail from "./VerifyEmail";
import "./index.scss";

const Management = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    mode: "",
    lang: "",
    apiKey: "",
    actionCode: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const lang = params.get("lang");
    const apiKey = params.get("apiKey");
    const actionCode = params.get("oobCode");
    setState({
      mode,
      lang,
      apiKey,
      actionCode,
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <DotsLoading showLogo={true} />;
  }

  switch (state.mode) {
    case "resetPassword":
      return <ChangeForgotPassword actionCode={state.actionCode} />;
    case "verifyEmail":
      return <VerifyEmail actionCode={state.actionCode} />;
    default:
      return (
        <div className="page-404">
          <h1>Shhh...</h1>
          <h2>Don&apos;t tell anyone you were here.</h2>
        </div>
      );
  }
};

export default Management;
