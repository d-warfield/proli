import React, { useEffect } from "react";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import CheckmarkLottie from "../../assets/animations/LoadingAnimation/checkmark";

function AffiliateCode() {
  let data = useLocation();

  useEffect(() => {
    var tempInput = document.createElement("input");
    tempInput.value = data.state.affiliateCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }, [data.state.linkUrl]);

  return (
    <div className="affiliate_code">
      <CheckmarkLottie isStopped={false} height={85} />
      <h4>Copied</h4>

      <div className="copied_code">
        <p>{data.state.affiliateCode}</p>
      </div>
    </div>
  );
}

export default AffiliateCode;
