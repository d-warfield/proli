import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Lottie/Lock.json";

const LockLottie = () => {
  const [isStopped] = useState(false);
  const [isPaused] = useState(false);

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
        height={200}
        width={200}
        isStopped={isStopped}
        isPaused={isPaused}
      />
    </div>
  );
};

export default LockLottie;
