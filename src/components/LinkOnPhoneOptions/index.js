import React from "react";
import { useSpring, animated } from "react-spring";
import "./styles.scss";
import { db } from "../../firebase/utils";
import { useStateValue } from "../../StateProvider";
import firebase from "firebase/app";
import DownloadOutlineIcon from "../../assets/iconComponents/Outlined/DownloadOutlineIcon";
import SendIcon from "../../assets/iconComponents/Outlined/SendIcon";

const LinkOnPhoneOptions = ({ show, onSidebarClick }) => {
  const [{ user, link }, dispatch] = useStateValue();

  const { bottom } = useSpring({
    from: { bottom: "-100%" },
    bottom: show ? "0" : "-100%",
    config: { duration: 110, tension: 170 },
  });

  const handleSave = async () => {
    if (user.uid) {
      await db.collection("private").doc(user.uid).collection("saved").add({
        savedUser: link.savedUser,
        savedLinkId: link.savedLinkId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: true,
          message: "Link Saved",
          timeout: 3000,
        },
      });
      onSidebarClick();
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const message = `Hey! Check the "${link.linkTitle}" link out on ${link.id}'s Proli profile.`;
    const url = `https://pro.li/${link.id}`;
    try {
      await navigator.share({
        text: message,
        title: "Check this link!",
        url: url,
      });
    } catch (err) {
      await navigator.clipboard.writeText(`${message} ${url}`);
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: true,
          message: "Copied to clipboard! :)",
          timeout: 3000,
        },
      });
    }
    onSidebarClick();
  };

  return (
    <animated.div
      style={{
        bottom: bottom,
        right: 0,
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 1,
      }}
      className="link_phoneOptions"
    >
      <div className="link_phoneOptionsContainer">
        <button onClick={handleSave}>
          {" "}
          <DownloadOutlineIcon
            stroke={"rgba(255, 255, 255, 0.815)"}
            height={22}
          />
          <span>Save</span>
        </button>
        <button onClick={handleSend}>
          {" "}
          <SendIcon stroke={"rgba(255, 255, 255, 0.815)"} height={22} />
          <span>Send to someone</span>
        </button>
      </div>

      <div className="close_linkOptions">
        <button onClick={onSidebarClick}>Close</button>
      </div>
    </animated.div>
  );
};

export default LinkOnPhoneOptions;
