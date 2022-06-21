import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Lottie/LoadingBalls.json";
import ProliIcon from "../../iconComponents/Outlined/Proli";

const HomepageLoading = (props) => {
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
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="proli_icon"
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProliIcon height={100} width={40} />
      </div>

      <div
        className="proli_icon"
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          options={defaultOptions}
          height={props.height || 40}
          width={props.width || 100}
          isStopped={isStopped}
          isPaused={isPaused}
        />
      </div>
    </div>
  );
};

export default HomepageLoading;
