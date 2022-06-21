import React from "react";
import { useStateValue } from "../../../../StateProvider";
import { db } from "../../../../firebase/utils";
import { uploadToBucket } from "../../../../helpers";
import "../styles.scss";

const DownloadDropdown = ({ downloadUrl, id, updateLink }) => {
  const [{ user }, dispatch] = useStateValue();

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      try {
        const url = await uploadToBucket(
          "downloadable",
          user,
          e.target.files[0],
          dispatch
        );
        db.collection("public")
          .doc(user.username)
          .collection("links")
          .doc(id)
          .update({
            "linkMedia.downloadUrl": url,
          });

        updateLink(id, "linkMedia", "downloadUrl", url);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="dropdown__container">
        {!downloadUrl ? (
          <React.Fragment>
            <input
              className="input__fileButton"
              type="file"
              onChange={handleChange}
              id="download"
            />
            <label className="upload__linkData" htmlFor="download">
              Add File
            </label>
          </React.Fragment>
        ) : (
          <div className="dropdown__containerFilled">
            <div className="dropdown__left">
              <img
                alt=""
                src={downloadUrl}
                style={{ margin: "0 1.5rem 0 0 " }}
              />
            </div>
            <div className="dropdown__right">
              <input
                className="input__fileButton"
                type="file"
                onChange={handleChange}
                id="download"
              />
              <label className="upload__linkData replace" htmlFor="download">
                Replace
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadDropdown;
