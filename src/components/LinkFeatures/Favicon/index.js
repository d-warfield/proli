import React from "react";
import "./styles.scss";
import { useStateValue } from "../../../StateProvider";
import { db } from "../../../firebase/utils";
import PlusIcon from "../../../assets/iconComponents/Outlined/PlusIcon";

import { Button } from "@material-ui/core";

const Favicon = ({ id, favicon, updateLink }) => {
  const [{ user }] = useStateValue();

  return (
    <div className="link__featureButton">
      <Button
        disableRipple
        component="span"
        className="feature__iconButton"
        onClick={() => {
          db.collection("public")
            .doc(user.username)
            .collection("links")
            .doc(id)
            .update({
              "linkMedia.favicon": !favicon,
            });
          updateLink(id, "linkMedia", "favicon", !favicon);
        }}
      >
        <PlusIcon
          stroke={
            favicon === true ? "white" : "var(--snap-darkmode-light-text)"
          }
        />
      </Button>
    </div>
  );
};

export default Favicon;
