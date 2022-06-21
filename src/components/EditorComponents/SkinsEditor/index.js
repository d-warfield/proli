import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import themes from "./themes/index";
import Custom from "./Custom";
import { useMedia } from "react-use";

import "./styles.scss";

const SkinsEditor = ({ skinType }) => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const isWideEnough = useMedia("(min-width: 1000px)");

  const setSelectedTheme = (selectedTheme) => {
    if (isWideEnough) {
      dispatch({
        type: "SET_TEMP_THEME",
        payload: {
          profile: {
            profileBorder: selectedTheme.profileBorder || "",
            profileTextColor: selectedTheme.profileTextColor || "",
            profileBackgroundColor: selectedTheme.profileBackgroundColor || "",
          },
          background: {
            backgroundColor: selectedTheme.backgroundColor || "",
            backgroundImage: selectedTheme.backgroundImage || "",
          },
          font: {
            fontFamily: selectedTheme.fontFamily || "",
            fontStyle: "regular",
          },
          button: {
            buttonBackgroundColor: selectedTheme.buttonBackgroundColor || "",
            buttonTextColor: selectedTheme.buttonTextColor || "",
            buttonBorder: selectedTheme.border || "",
            buttonBorderColor: selectedTheme.borderColor || "",
            buttonBoxShadowColor: selectedTheme.buttonBoxShadowColor || "",
            buttonBoxShadow: selectedTheme.boxShadow || "",
            buttonBackgroundImage: selectedTheme.buttonBackgroundImage || "",
            buttonBorderRadius: selectedTheme.buttonBorderRadius || "",
            buttonOutline: "none",
            buttonBackdropFilter: selectedTheme.backdropFilter || "",
          },
        },
      });
    } else {
      (async () => {
        history.push({
          pathname: `/${user.username}`,
          state: {
            type: "editor",
            selectedTheme,
          },
        });
      })();
    }
  };

  return (
    <div className="themesContainer">
      {skinType === "still" && (
        <>
          {Object.keys(themes).map((type, i) => {
            return (
              <React.Fragment key={`${type}_${i}`}>
                <h6>{type}</h6>
                <div className="scroll__container">
                  {themes[type].map((theme, i) => (
                    <div
                      key={`gradient_${i}`}
                      className="skin__option"
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${theme.backgroundImage})`,
                          backgroundSize: "cover",
                          border: "none",
                          backgroundColor: `${theme.backgroundColor}`,
                        }}
                        className="dummy__buttonContainer"
                      >
                        <div
                          className="dummyButton"
                          style={{
                            backgroundColor: themes
                              ? `${theme.buttonBackgroundColor}`
                              : "white",
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: themes
                              ? `${theme.buttonBackgroundColor}`
                              : "white",
                          }}
                          className="dummyButton"
                        />
                        <div
                          style={{
                            backgroundColor: themes
                              ? `${theme.buttonBackgroundColor}`
                              : "white",
                          }}
                          className="dummyButton"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </>
      )}

      {skinType === "custom" && <Custom />}
    </div>
  );
};

export default SkinsEditor;
