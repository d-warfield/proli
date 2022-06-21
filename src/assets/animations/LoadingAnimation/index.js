import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Lottie/LoadingAnimation.json";

const ControlledLottie = () => {
  const [state] = useState({
    isStopped: false,
    isPaused: false,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="controlled">
      <Lottie
        options={defaultOptions}
        isStopped={state.isStopped}
        isPaused={state.isPaused}
      />
    </div>
  );
};

export default ControlledLottie;
