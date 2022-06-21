import React, { useState } from "react";
import { useStateValue } from "../../../StateProvider";
import { uploadToBucket } from "../../../helpers";
import { db, storage } from "../../../firebase/utils";
import ProfilePicturePlaceholder from "../../../assets/Icons/Bold/ProfilePicturePlaceholder.svg";
import LoadingAnimation from "../../../assets/animations/LoadingAnimation";

const {
  REACT_APP_FB_STORAGE_BUCKET,
  REACT_APP_RESOURCES_BASE_URL,
} = process.env;

export const ProfileData = () => {
  const [
    {
      user,
      user: { profileInfo },
    },
    dispatch,
  ] = useStateValue();
  const [loading, setLoading] = useState(false);

  const handleChange = async (image) => {
    setLoading(true);
    try {
      const url = await uploadToBucket("profile", user, image, dispatch);
      if (profileInfo?.imageUrl) {
        const newURL = `gs://${REACT_APP_FB_STORAGE_BUCKET}${profileInfo?.imageUrl.replace(
          REACT_APP_RESOURCES_BASE_URL,
          ""
        )}`;
        await storage.refFromURL(newURL).delete();
      }
      db.collection("public").doc(user.username).update({
        "profileInfo.imageUrl": url,
      });
      dispatch({
        type: "SET_PROFILE_INFO",
        payload: {
          type: "imageUrl",
          value: url,
        },
      });
      setLoading(false);
    } catch (err) {
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: false,
          message:
            "Oops.. Something went wrong while processing the image. Please contact support if this continues.",
          timeout: 6000,
        },
      });
      setLoading(false);
    }
  };

  return (
    <div className="profile__data">
      {loading ? (
        <div className="loading__animation">
          <LoadingAnimation />
        </div>
      ) : (
        <img
          alt=""
          key={user?.profileInfo?.imageUrl}
          src={user?.profileInfo?.imageUrl || ProfilePicturePlaceholder}
        />
      )}
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
              aspect: 4.5 / 5,
            },
          })
        }
        id="file"
      />
      <div className="name__input">
        <input
          type="text"
          placeholder="Display Name"
          spellCheck="false"
          onChange={(e) =>
            dispatch({
              type: "SET_PROFILE_INFO",
              payload: {
                type: "displayName",
                value: e.target.value,
              },
            })
          }
          onBlur={async (e) =>
            await db.collection("public").doc(user.username).update({
              "profileInfo.displayName": e.target.value,
            })
          }
          value={profileInfo?.displayName}
        />
        <label className="replace__buttonProfileEditor" htmlFor="file">
          Replace Picture
        </label>
      </div>
    </div>
  );
};
