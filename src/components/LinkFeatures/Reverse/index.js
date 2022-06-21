import React from "react";
import { db } from "../../../firebase/utils";
import { useStateValue } from "../../../StateProvider";
import SwapOutlineIcon from "../../../assets/iconComponents/Outlined/SwapOutlineIcon";
import { Button } from "@material-ui/core";
import "./styles.scss";

const Reverse = ({ id, reverse, updateLink }) => {
  const [{ user }] = useStateValue();

  const handleReverse = () => {
    if (user.username) {
      db.collection("public")
        .doc(user.username)
        .collection("links")
        .doc(id)
        .update({
          "linkControl.reverse": !reverse,
        });
      updateLink(id, "linkControl", "reverse", !reverse);
    }
  };

  return (
    <div className="link__featureButton">
      <Button
        disableRipple
        onClick={handleReverse}
        component="span"
        className="feature__iconButton"
      >
        <SwapOutlineIcon
          stroke={
            reverse === true ? "white" : "var(--snap-darkmode-light-text)"
          }
          height={22}
          width={22}
        />
      </Button>
    </div>
  );
};

export default Reverse;
