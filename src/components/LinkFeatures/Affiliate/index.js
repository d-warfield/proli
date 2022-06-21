import React from "react";
import { Button } from "@material-ui/core";
import AffiliateIcon from "../../../assets/iconComponents/Outlined/AffiliateIcon";

const Folder = ({ affiliateCode }) => {
  return (
    <div className="link__featureButton">
      <Button disableRipple component="span" className="feature__iconButton">
        <AffiliateIcon
          stroke={affiliateCode ? "white" : "var(--snap-darkmode-light-text)"}
          fill={affiliateCode ? "white" : "var(--snap-darkmode-light-text)"}
          width={22}
          height={22}
        />
      </Button>
    </div>
  );
};

export default Folder;
