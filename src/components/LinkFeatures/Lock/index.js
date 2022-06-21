import React from "react";
import { db } from "../../../firebase/utils";
import { useStateValue } from "../../../StateProvider";
import LockIcon from "../../../assets/iconComponents/Outlined/LockIcon";
import { Button } from "@material-ui/core";
import "./styles.scss";

const LinkFeatures = ({ id, isLocked, updateLink }) => {
  const [{ user }] = useStateValue();

  const handleLock = () => {
    if (user.username) {
      db.collection("public")
        .doc(user.username)
        .collection("links")
        .doc(id)
        .update({
          "linkControl.isLocked": !isLocked,
        });
      updateLink(id, "linkControl", "isLocked", !isLocked);
    }
  };

  return (
    <div className="link__featureButton">
      <Button
        disableRipple
        onClick={handleLock}
        component="span"
        className="feature__iconButton"
      >
        <LockIcon
          stroke={
            isLocked === true ? "white" : "var(--snap-darkmode-light-text)"
          }
          height={24}
          width={24}
        />
      </Button>
    </div>
  );
};

export default LinkFeatures;
