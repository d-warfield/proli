import React from "react";
import { useStateValue } from "../../../../StateProvider";
import { db } from "../../../../firebase/utils";
import { uploadToBucket } from "../../../../helpers";
import "../styles.scss";

const MediaDropdown = ({ mediaUrl, id, updateLink }) => {
  const [{ user }, dispatch] = useStateValue();

  const handleChange = async (image) => {
    try {
      const url = await uploadToBucket("media", user, image, dispatch);
      db.collection("public")
        .doc(user.username)
        .collection("links")
        .doc(id)
        .update({
          "linkMedia.mediaUrl": url,
        });

      updateLink(id, "linkMedia", "mediaUrl", url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!mediaUrl ? (
        <div className="dropdown__container">
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
                  aspect: 16 / 9,
                },
              })
            }
            id="media"
          />
          <label className="upload__linkData replace" htmlFor="media">
            Add File
          </label>
        </div>
      ) : (
        <div className="dropdown__container">
          <div className="dropdown__left">
            <img alt="" src={mediaUrl} style={{ margin: "0 1.5rem 0 0" }} />
          </div>
          <div className="dropdown__right">
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
                    aspect: 16 / 9,
                  },
                })
              }
              id="media"
            />
            <label className="upload__linkData replace" htmlFor="media">
              Replace
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaDropdown;
