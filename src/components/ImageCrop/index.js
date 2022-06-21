import React, { useState, useCallback, useRef, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import Xmark from "../../assets/Icons/Bold/xmark.svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./index.scss";

const ImageCrop = () => {
  const [{ imageCrop }, dispatch] = useStateValue();
  const { aspect, imageFile, handleChange } = imageCrop;
  const imgRef = useRef(null);
  const [canvasRef, setCanvas] = useState(null);
  const [image, setEditableImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    aspect: aspect || 1 / 1,
    keepSelection: true,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const blobToFile = (blob, fileName) => {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
  };

  const returnFile = () => {
    handleChange(blobToFile(canvasRef, "image.png"));
    URL.revokeObjectURL(image);
    dispatch({
      type: "CLEAR_IMAGE_CROP",
    });
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (imageFile.type.split("/")[0] !== "image") {
      dispatch({
        type: "SET_IMAGE_CROP",
      });
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: false,
          message:
            "Oops.. Looks like you tried to upload something else than an image.",
          timeout: 6000,
        },
      });
    }
    const image = URL.createObjectURL(imageFile);
    setEditableImage(image);
  }, []);

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    canvas.toBlob((blob) => setCanvas(blob), "", 1);
  }, [completedCrop]);

  return (
    <div className="imagecrop-wrapper">
      <div className="imagecrop">
        <div className="imagecrop-header">
          <h2>Crop</h2>
          <img
            alt=""
            onClick={() => {
              URL.revokeObjectURL(image);
              dispatch({
                type: "CLEAR_IMAGE_CROP",
              });
            }}
            src={Xmark}
          />
        </div>
        <ReactCrop
          src={image}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          style={{
            borderRadius: "2rem",
          }}
        />
        <button
          className={`${
            (!completedCrop?.width || !completedCrop?.height) && "disabled"
          }`}
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => returnFile()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ImageCrop;
