import React from "react";
import { Button } from "@material-ui/core";
import AddFriendIcon from "../../../assets/iconComponents/Outlined/AddFriendIcon";

const AddFriend = ({ friendUrl }) => {
  return (
    <div className="link__featureButton">
      <Button disableRipple component="span" className="feature__iconButton">
        <AddFriendIcon
          stroke={friendUrl ? "white" : "var(--snap-darkmode-light-text)"}
        />
      </Button>
    </div>
  );
};

export default AddFriend;
