import React from "react";
import { useStateValue } from "../../../StateProvider";
import { db } from "../../../firebase/utils";
import { Button } from "@material-ui/core";
import ImageIcon from "../../../assets/iconComponents/Filled/ImageIcon";
import { uploadToBucket } from "../../../helpers";
import "./styles.scss";

const Image = ({ id, updateLink, imageUrl }) => {
  const [{ user }, dispatch] = useStateValue();

  const handleChange = async (image) => {
    try {
      const url = await uploadToBucket(
        "link-decoration",
        user,
        image,
        dispatch
      );

      await db
        .collection("public")
        .doc(user.username)
        .collection("links")
        .doc(id)
        .update({
          "linkMedia.imageUrl": url,
        });

      updateLink(id, "linkMedia", "imageUrl", url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="link__featureButton">
      <input
        style={{ display: "none" }}
        id={"raised-button-file" + id}
        onChange={(e) =>
          e.target.files[0] &&
          dispatch({
            type: "SET_IMAGE_CROP",
            payload: {
              handleChange,
              imageFile: e.target.files[0],
              aspect: 16 / 9,
            },
          })
        }
        multiple
        type="file"
      />
      <label htmlFor={"raised-button-file" + id}>
        <Button disableRipple component="span" className="feature__iconButton">
          <ImageIcon
            stroke={
              imageUrl !== "" ? "white" : "var(--snap-darkmode-light-text)"
            }
          />
        </Button>
      </label>
    </div>
  );
};

export default Image;
