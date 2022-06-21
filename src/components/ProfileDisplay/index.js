import React, { useState } from "react";
import { db } from "../../firebase/utils";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import PublicProfileView from "./phoneContent";
import "./styles.scss";

const ProfileDisplay = () => {
  const [{ user, tempTheme: selectedTheme }, dispatch] = useStateValue();
  const history = useHistory();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    var tempInput = document.createElement("input");
    tempInput.value = `pro.li/${user?.username}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const setTheme = async () => {
    const theme = {
      profile: {
        profileBorder: selectedTheme.profile?.profileBorder || "",
        profileTextColor: selectedTheme.profile?.profileTextColor || "",
        profileBackgroundColor:
          selectedTheme.profile?.profileBackgroundColor || "",
      },
      background: {
        backgroundColor: selectedTheme.background?.backgroundColor || "",
        backgroundImage: selectedTheme.background?.backgroundImage || "",
      },
      font: {
        fontFamily: selectedTheme.font?.fontFamily || "",
        fontStyle: "regular",
      },
      button: {
        buttonBackgroundColor:
          selectedTheme.button?.buttonBackgroundColor || "",
        buttonTextColor: selectedTheme.button?.buttonTextColor || "",
        buttonBorder: selectedTheme.button?.buttonBorder || "",
        buttonBorderColor: selectedTheme.button?.borderColor || "",
        buttonBoxShadowColor: selectedTheme.button?.buttonBoxShadowColor || "",
        buttonBoxShadow: selectedTheme.button?.boxShadow || "",
        buttonBackgroundImage:
          selectedTheme.button?.buttonBackgroundImage || "",
        buttonBorderRadius: selectedTheme.button?.buttonBorderRadius || "",
        buttonOutline: "none",
        buttonBackdropFilter: selectedTheme.button?.backdropFilter || "",
      },
    };
    await db.collection("public").doc(user.username).update({
      theme: theme,
    });
    dispatch({
      type: "SET_THEME",
      payload: theme,
    });
    dispatch({
      type: "SET_TEMP_THEME",
      payload: null,
    });
  };

  return (
    <div className="profile_display">
      <div className="profile_displayHeader">
        <button className="copy_userUrl" onClick={handleCopy}>
          {copied ? "Copied" : "Share"}
        </button>

        <p onClick={() => history.push(`/${user.username}`)}>
          pro.li/{user?.username}
        </p>
      </div>
      <div className="phone_displayContainer">
        <div className="phone_display">
          <PublicProfileView
            username={user.username}
            tempTheme={selectedTheme}
          />
        </div>
        {selectedTheme && (
          <div className="phone_displayButtons">
            <button
              onClick={() =>
                dispatch({
                  type: "SET_TEMP_THEME",
                  payload: null,
                })
              }
            >
              Cancel
            </button>
            <button className="set_button" onClick={setTheme}>
              Set
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;
