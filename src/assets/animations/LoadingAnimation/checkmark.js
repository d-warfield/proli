import React, { useEffect } from "react";
import lottie from "lottie-web";
import animationData from "../../Lottie/Checkmark.json";

function CheckmarkLottie(props) {
  const elem = React.useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      animationData,
      loop: false,
      renderer: "svg",
      container: elem.current,
      autoplay: true,
    });

    anim.addEventListener("enterFrame", function (animation) {
      if (animation.currentTime > animation.totalTime - 20) {
        anim.pause();
      }
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div
      className="controlled"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div ref={elem} style={{ height: props.height, width: props.height }} />
    </div>
  );
}

export default CheckmarkLottie;
