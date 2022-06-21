import { storage } from "./firebase/utils";
const { REACT_APP_RESOURCES_BASE_URL } = process.env;

export const uploadToBucket = async (location, user, image, dispatch) => {
  const sizeInMB = (image.size / (1024 * 1024)).toFixed(2);
  if (sizeInMB > 6) {
    return dispatch({
      type: "TOGGLE_NOTIFICATION",
      payload: {
        hidden: false,
        success: false,
        message:
          "Oops.. This file size exceeds the 6MB limit. Please try again with a smaller image.",
        timeout: 5000,
      },
    });
  }
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const fileType = image.name.split(".").pop();
  await storage
    .ref(
      `users/${user.uid}/${
        location ? location + "/" : ""
      }${randomId}.${fileType}`
    )
    .put(image);
  return `${REACT_APP_RESOURCES_BASE_URL}/users/${user.uid}/${
    location ? location + "/" : ""
  }${randomId}.${fileType}`;
};
