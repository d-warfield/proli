import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/utils";
import { useStateValue } from "../../StateProvider";
import "./styles.scss";

const Container = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  margin: 0px;
  padding: 0;

  input[type="color"] {
    border: none;
    outline: none;
    border-radius: 8px;
    width: 50%;
    font-size: 12px;
    font-family: Poppins;
    padding: 0;
    -webkit-appearance: none;
    width: auto;
    height: auto;
    cursor: pointer;
    background-color: white;
    &::-webkit-color-swatch-wrapper {
      padding: 0;

      border: none;
      overflow: none;
    }
    &::-webkit-color-swatch {
      padding: 18px;
      border: none;
      border-radius: 8px;
      margin: 0px;
    }
  }

  input[type="text"] {
    border: 1px solid #dddddd;
    outline: none;
    border-radius: 8px;
    width: 50%;
    margin-left: 5px;
    padding-left: 12px;
    margin-top: 0px;
    font-size: 14px;
    font-family: Poppins;
  }
`;

const ColorPicker = (props) => {
  return (
    <Container>
      <div className="color__pickerWrapper">
        <input type="color" {...props} />
        <input type="text" {...props} />
      </div>
    </Container>
  );
};

const Color = ({ type }) => {
  const [{ user }, dispatch] = useStateValue();
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (type === "background") {
      setColor(user.theme.background.backgroundColor || "#000000");
    }
  }, []);

  const handleInput = () => {
    if (type === "background") {
      db.collection("public")
        .doc(user.username)
        .set(
          {
            theme: {
              background: {
                backgroundColor: color,
                backgroundImage: "",
              },
            },
          },
          { merge: true }
        );
      dispatch({
        type: "SET_PROFILE_BACKGROUND",
        background: {
          backgroundColor: color,
          backgroundImage: "",
        },
      });
    } else if (type) {
      db.collection("public")
        .doc(user.username)
        .update({
          [type]: color,
        });
    }
  };

  return (
    <ColorPicker
      onBlur={handleInput}
      onChange={(e) => setColor(e.target.value)}
      value={color}
    />
  );
};

export default Color;
