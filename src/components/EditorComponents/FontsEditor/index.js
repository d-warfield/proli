import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { useStateValue } from "../../../StateProvider";
import { db } from "../../../firebase/utils";

const FontsEditor = ({ fontStyle }) => {
  const [{ user }] = useStateValue();
  const [selectedFont, setSelectedFont] = useState(null);
  const history = useHistory();

  const fontFamily = [
    "Poppins",
    "Spartan",
    "Times New Roman",
    "Chalkduster",
    "Impact",
    "Papyrus",
    "Rockwell",
    "Allerta Stencil",
    "Archivo Black",
    "Bellota",
    "Monaco",
    "Courier New",
    "Bradley Hand",
    "Jazz LET",
    "Indie Flower",
    "Architects Daughter",
    "Gochi Hand",
    "Gugi",
    "Fredericka the Great",
    "Comfortaa",
    "Abril Fatface",
    "Cormorant Garamond",
    "Audiowide",
    "Bonbon",
    "Bungee Hairline",
    "Bungee Inline",
    "Cabin Sketch",
    "Cagliostro",
    "Cedarville Cursive",
    "Codystar",
    "Josefin Slab",
    "Nerko One",
    "Prata",
    "Kumar One Outline",
    "Permanent Marker",
    "Poiret One",
    "Modak",
    "League Script",
    "Lexend Exa",
    "Limelight",
    "Megrim",
    "Monoton",
    "Nanum Pen Script",
    "Rubik",
    "Sacramento",
    "Special Elite",
    "Syne Mono",
    "Yeseva One",
    "Ribeye Marrow",
    "Rozha One",
    "Snowburst One",
    "Tangerine",
  ];

  const handleFontFamily = (e) => {
    setSelectedFont(e.target.id);
  };

  useEffect(() => {
    if (selectedFont != null && fontStyle === "regular") {
      db.collection("public")
        .doc(user.username)
        .update({
          "theme.font": {
            fontFamily: selectedFont,
            fontStyle: "regular",
          },
        });
      history.push({ pathname: `/${user.username}`, state: "editor" });
    } else if (selectedFont != null && fontStyle === "italic") {
      db.collection("public")
        .doc(user.username)
        .update({
          "theme.font": { fontFamily: selectedFont, fontStyle: "italic" },
        });
      history.push({ pathname: `/${user.username}`, state: "editor" });
    }
  }, [selectedFont]);

  return (
    <div className="themesContainer">
      <div className="fonts__container">
        {fontFamily.map((font) => (
          <div
            key={`${font}_${fontStyle}`}
            style={{
              paddingRight: "5px",
              paddingLeft: "5px",
              width: "33%",
            }}
          >
            <div className="font__selectorWrapper">
              <button
                style={{
                  fontFamily: font,
                  fontSize: "30px",
                  fontStyle,
                  color: "white",
                }}
                className="font__selector"
                id={font}
                onClick={handleFontFamily}
              >
                Abc
              </button>
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {font}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontsEditor;
