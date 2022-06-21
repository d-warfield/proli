import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Lottie/LoadingBalls.json";
import animationDataBlack from "../../Lottie/LoadingBallsBlack.json";
import ProliIcon from "../../iconComponents/Outlined/Proli";

const DotsLoading = (props) => {
  const [isStopped] = useState(false);
  const [isPaused] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:
      props.lottieColor === "black" ? animationDataBlack : animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (props.showLogo) {
    return (
      <div className="loading">
        {props.showLogo && <ProliIcon fill="#000000" height={100} width={40} />}
        <Lottie
          options={defaultOptions}
          height={props.height || 28}
          width={props.width || 100}
          isStopped={isStopped}
          isPaused={isPaused}
        />
      </div>
    );
  }
  return (
    <Lottie
      options={defaultOptions}
      height={props.height || 28}
      width={props.width || 100}
      isStopped={isStopped}
      isPaused={isPaused}
    />
  );
};

export default DotsLoading;
