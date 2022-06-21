import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";
import { db } from "../../../firebase/utils";
import "./styles.scss";

const ButtonsEditor = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();

  const handleButton = async (button) => {
    if (button.buttonBackgroundColor) {
      db.collection("public").doc(user.username).update({
        "theme.button.buttonBackgroundColor": button.buttonBackgroundColor,
      });
    }
    if (button.buttonBorder) {
      db.collection("public").doc(user.username).update({
        "theme.button.buttonBorder": button.buttonBorder,
      });
    }
    if (button.buttonBorderRadius) {
      db.collection("public").doc(user.username).update({
        "theme.button.buttonBorderRadius": button.buttonBorderRadius,
      });
    }
    if (button.buttonOutline) {
      db.collection("public").doc(user.username).update({
        "theme.button.buttonOutline": button.buttonOutline,
      });
    }
    if (button.buttonBoxShadow) {
      db.collection("public").doc(user.username).update({
        "theme.button.buttonBoxShadow": button.buttonBoxShadow,
      });
    }
    if (button.buttonBoxShadowColor) {
      db.collection("public").doc(user.username).update({
        "theme.button.buttonBoxShadowColor": button.buttonBoxShadowColor,
      });
    }
    history.push({ pathname: `/${user.username}`, state: "editor" });
  };

  const filledButtons = [
    {
      buttonBorderRadius: "100px",
      buttonBackgroundColor: "var(--snap-container)",
      buttonBoxShadow: "",
      buttonBoxShadowColor: "black",
    },
    {
      buttonBorderRadius: "14px",
      buttonBackgroundColor: "var(--snap-container)",
      buttonBoxShadow: "",
      buttonBoxShadowColor: "black",
    },
    {
      buttonBorderRadius: "8px",
      buttonBackgroundColor: "var(--snap-container)",
      buttonBoxShadow: "none",
      buttonBoxShadowColor: "",
    },
    {
      buttonBorderRadius: "0px",
      buttonBackgroundColor: "var(--snap-container)",
      buttonBoxShadow: "",
      buttonBoxShadowColor: "",
    },
  ];
  const outlinedButtons = [
    {
      buttonBorderRadius: "100px",
      buttonBackgroundColor: "transparent",
      buttonBoxShadow: "none",
      buttonBoxShadowColor: "",
    },
    {
      buttonBorderRadius: "14px",
      buttonBackgroundColor: "transparent",
      buttonBoxShadow: "none",
      buttonBoxShadowColor: "",
    },
    {
      buttonBorderRadius: "8px",
      buttonBackgroundColor: "transparent",
      buttonBoxShadow: "none",
      buttonBoxShadowColor: "",
    },
    {
      buttonBorderRadius: "0px",
      buttonBackgroundColor: "transparent",
      buttonBoxShadow: "none",
      buttonBoxShadowColor: "",
    },
  ];
  const softShadowButtons = [
    {
      buttonBorderRadius: "100px",
      buttonBoxShadow: "0px 2px 15px",
      buttonBoxShadowColor: "#909497",
      buttonBackgroundColor: "var(--snap-container)",
    },
    {
      buttonBorderRadius: "14px",
      buttonBoxShadow: "0px 2px 15px",
      buttonBoxShadowColor: "#909497",
      buttonBackgroundColor: "var(--snap-container)",
    },
    {
      buttonBorderRadius: "8px",
      buttonBoxShadow: "0px 2px 15px",
      buttonBoxShadowColor: "#909497",
      buttonBackgroundColor: "var(--snap-container)",
    },
    {
      buttonBorderRadius: "0px",
      buttonBoxShadow: "0px 2px 15px",
      buttonBoxShadowColor: "#909497",
      buttonBackgroundColor: "var(--snap-container)",
    },
  ];
  const hardShadowButtons = [
    {
      buttonBorderRadius: "100px",
      buttonBoxShadow: "6px 8px 2px",
      buttonBoxShadowColor: "black",
      buttonBackgroundColor: "var(--snap-container)",
    },
    {
      buttonBorderRadius: "14px",
      buttonBoxShadow: "6px 8px 2px",
      buttonBoxShadowColor: "black",
      buttonBackgroundColor: "var(--snap-container)",
    },
    {
      buttonBorderRadius: "8px",
      buttonBoxShadow: "6px 8px 2px",
      buttonBoxShadowColor: "black",
      buttonBackgroundColor: "var(--snap-container)",
    },
    {
      buttonBorderRadius: "0px",
      buttonBoxShadow: "6px 8px 2px",
      buttonBackgroundColor: "var(--snap-container)",
    },
  ];
  return (
    <div className="themesContainer button_style">
      <h6>Filled</h6>
      <div className="button__wrapper">
        {filledButtons.map((button, index) => (
          <button
            key={`filled_${index}`}
            onClick={() => handleButton(button)}
            style={{
              backgroundColor: `${button.buttonBackgroundColor}`,
              borderRadius: `${button.buttonBorderRadius}`,
              border: "none",
              outline: "none",
            }}
            className="buttonOption"
          />
        ))}
      </div>
      <h6>Outlined</h6>
      <div className="button__wrapper">
        {outlinedButtons.map((button, index) => (
          <button
            key={`outlined_${index}`}
            onClick={() => handleButton(button)}
            style={{
              backgroundColor: "transparent",
              borderRadius: `${button.buttonBorderRadius}`,
              border: "2px solid var(--snap-container)",
              outline: "none",
            }}
            className="buttonOption"
          />
        ))}
      </div>
      <h6>Soft Shadow</h6>
      <div className="button__wrapper">
        {softShadowButtons.map((button, index) => (
          <button
            key={`soft_${index}`}
            onClick={() => handleButton(button)}
            style={{
              backgroundColor: `${button.buttonBackgroundColor}`,
              borderRadius: `${button.buttonBorderRadius}`,
              border: "2px solid black",
              outline: "none",
              boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.397)",
            }}
            className="buttonOption"
          />
        ))}
      </div>
      <h6>Hard Shadow</h6>
      <div className="button__wrapper">
        {hardShadowButtons.map((button, index) => (
          <button
            key={`hard_${index}`}
            onClick={() => handleButton(button)}
            style={{
              backgroundColor: `${button.buttonBackgroundColor}`,
              borderRadius: `${button.buttonBorderRadius}`,
              border: "2px solid black",
              outline: "none",
              boxShadow: "6px 8px 2px black",
            }}
            className="buttonOption"
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonsEditor;
