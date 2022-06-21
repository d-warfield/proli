import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../../../StateProvider";
import { db } from "../../../../firebase/utils";
import { uploadToBucket } from "../../../../helpers";
import "./styles.scss";

const Custom = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const handleChange = async (image) => {
    try {
      const url = await uploadToBucket("background", user, image, dispatch);
      await db
        .collection("public")
        .doc(user.username)
        .update({
          "theme.background": {
            backgroundImage: url,
          },
        });
      history.push(`/${user.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="custom__wrapper">
      <div className="custom__containerParent">
        <div className="custom__container">
          <input
            className="input__fileButton"
            type="file"
            onChange={(e) =>
              e.target.files[0] &&
              dispatch({
                type: "SET_IMAGE_CROP",
                payload: {
                  handleChange,
                  imageFile: e.target.files[0],
                  aspect: 9 / 16,
                },
              })
            }
            id="fileForBackground"
          />
          <img alt="" src={user?.theme?.background?.backgroundImage} />
          <label
            className="custom__UploadButtonLabelInput"
            htmlFor="fileForBackground"
          ></label>
        </div>
        <label
          className="custom__UploadButtonLabel"
          htmlFor="fileForBackground"
        >
          Upload
        </label>
      </div>
      <div className="custom__containerParent">
        <div className="custom__container solid"></div>
        <label className="custom__UploadButtonLabel">Solid Color</label>{" "}
      </div>
    </div>
  );
};

export default Custom;
