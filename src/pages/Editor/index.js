import React, { useState } from "react";
import SkinsEditor from "../../components/EditorComponents/SkinsEditor";
import ButtonsEditor from "../../components/EditorComponents/ButtonsEditor";
import FontsEditor from "../../components/EditorComponents/FontsEditor";
import ProfileEditor from "../../components/EditorComponents/ProfileEditor";
import FilterIcon from "../../assets/iconComponents/Filled/FilterIcon";
import XmarkIcon from "../../assets/iconComponents/Filled/XmarkIcon";
import Color from "../../components/ColorPicker";
import "./styles.scss";
import { Helmet } from "react-helmet";
import DummyHeader from "../../components/DummyHeader";

const Editor = () => {
  const [editorType, setEditorType] = useState("skins");
  const [showOptions, setShowOptions] = useState(false);
  const [optionsType, setOptionsType] = useState("skins");
  const [skinType, setSkinType] = useState("still");
  const [type, setType] = useState("button.buttonBackgroundColor");
  const [fontStyle, setFontStyle] = useState("regular");

  const editor__buttonSelected = {
    backgroundColor: "white",
    border: "none",
    outline: "none",
    fontFamily: "Poppins",
    color: "black",
    padding: "12px 20px",
    borderRadius: "100px",
    marginRight: "10px",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "var(--main-box-shadow)",
    margin: "2rem .5rem",
  };

  const editor__button = {
    backgroundColor: "var(--snap-container)",
    border: "none",
    outline: "none",
    fontFamily: "Poppins",
    color: "var(--snap-darkmode-light-text)",
    padding: "12px 20px",
    borderRadius: "100px",
    marginRight: "10px",
    fontSize: "14px",
    boxShadow: "var(--main-box-shadow)",
    margin: "2rem .5rem",
  };

  const handleSkins = () => {
    setEditorType("skins");
    setOptionsType("skins");
  };

  const handleProfile = () => {
    setEditorType("profile");
    setOptionsType("profile");
  };

  const handleButtons = () => {
    setEditorType("buttons");
    setOptionsType("buttons");
  };

  const handleFonts = () => {
    setEditorType("fonts");
    setOptionsType("fonts");
  };

  const switchComponent = ({ editorType }) => {
    switch (editorType) {
      case "skins":
        return <SkinsEditor skinType={skinType} />;
      case "buttons":
        return <ButtonsEditor />;
      case "profile":
        return <ProfileEditor />;
      case "fonts":
        return <FontsEditor fontStyle={fontStyle} />;
      default:
        break;
    }
  };

  return (
    <div className="editor">
      <DummyHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Editor</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>
      <div className="editor_optionsContainer">
        <div className="custom__options">
          <button onClick={() => setShowOptions(!showOptions)}>
            {showOptions === false ? (
              <FilterIcon fill={"black"} width={20} height={20} />
            ) : (
              <div className="xmark">
                <XmarkIcon fill={"black"} width={14} height={14} />
              </div>
            )}
          </button>
        </div>
        <div className="editor__options">
          {showOptions && optionsType === "skins" && (
            <div className="header__buttonsContainer">
              <div className="custom__optionsButton">
                <button
                  className={
                    skinType === "still"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setSkinType("still")}
                >
                  Still
                </button>

                <button
                  className={
                    skinType === "custom"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setSkinType("custom")}
                >
                  Custom
                </button>
              </div>
              <div className="color__picker">
                <div className="color__pickerContainer">
                  <p>Choose Color</p>
                  <Color type={"background"} />
                </div>
              </div>
            </div>
          )}

          {showOptions && optionsType === "buttons" && (
            <div className="header__buttonsContainer">
              <div className="custom__optionsButton">
                <button
                  className={
                    type === "theme.button.buttonBackgroundColor"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setType("theme.button.buttonBackgroundColor")}
                >
                  Button
                </button>
                <button
                  className={
                    type === "theme.button.buttonTextColor"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setType("theme.button.buttonTextColor")}
                >
                  Text
                </button>
                <button
                  className={
                    type === "theme.button.buttonBorderColor"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setType("theme.button.buttonBorderColor")}
                >
                  Border
                </button>
                <button
                  className={
                    type === "theme.button.buttonBoxShadowColor"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setType("theme.button.buttonBoxShadowColor")}
                >
                  Shadow
                </button>
              </div>
              <div className="color__picker">
                <div className="color__pickerContainer">
                  <p>Choose Color</p>
                  <Color type={type} />
                </div>
              </div>
            </div>
          )}

          {showOptions && optionsType === "profile" && (
            <div className="header__buttonsContainer">
              <div className="custom__optionsButton">
                <button
                  className={
                    type === "theme.profile.profileTextColor"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setType("theme.profile.profileTextColor")}
                >
                  Name
                </button>
                <button
                  className={
                    type === "theme.profile.profileBorder"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setType("theme.profile.profileBorder")}
                >
                  Border
                </button>
              </div>
              <div className="color__picker">
                <div className="color__pickerContainer">
                  <p>Choose Color</p>
                  <Color type={type} />
                </div>
              </div>
            </div>
          )}

          {showOptions && optionsType === "fonts" && (
            <div className="header__buttonsContainer">
              <div className="custom__optionsButton">
                <button
                  className={
                    fontStyle === "regular"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setFontStyle("regular")}
                >
                  Regular
                </button>
                <button
                  className={
                    fontStyle === "italic"
                      ? "skins__optionButtonContainerButtonSelected"
                      : "skins__optionButtonContainerButton"
                  }
                  onClick={() => setFontStyle("italic")}
                >
                  Italic
                </button>
              </div>
            </div>
          )}

          {!showOptions && (
            <div className="main__optionsContainer">
              <button
                style={
                  editorType === "skins"
                    ? editor__buttonSelected
                    : editor__button
                }
                onClick={handleSkins}
              >
                Themes
              </button>
              <button
                style={
                  editorType === "profile"
                    ? editor__buttonSelected
                    : editor__button
                }
                onClick={handleProfile}
              >
                Profile
              </button>
              <button
                style={
                  editorType === "buttons"
                    ? editor__buttonSelected
                    : editor__button
                }
                onClick={handleButtons}
              >
                Buttons
              </button>

              <button
                style={
                  editorType === "fonts"
                    ? editor__buttonSelected
                    : editor__button
                }
                onClick={handleFonts}
              >
                Fonts
              </button>
            </div>
          )}
        </div>
      </div>

      {switchComponent({ editorType })}
    </div>
  );
};

export default Editor;
