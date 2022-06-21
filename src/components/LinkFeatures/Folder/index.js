import React from "react";
import { Button } from "@material-ui/core";
import FolderIcon from "../../../assets/iconComponents/Outlined/FolderIcon";

const Folder = () => {
  return (
    <div className="link__featureButton">
      <Button disableRipple component="span" className="feature__iconButton">
        <FolderIcon />
      </Button>
    </div>
  );
};

export default Folder;
