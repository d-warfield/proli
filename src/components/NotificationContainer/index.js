import React, { useState, useEffect } from "react";
import { db } from "./../../firebase/utils";
import { Link } from "react-router-dom";
import "./styles.scss";
import ProfilePicturePlaceholder from "./../../assets/Icons/Bold/ProfilePicturePlaceholder.svg";

const NotificationContainer = ({ notificationType, notificationFrom }) => {
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    (async () => {
      const doc = await db.collection("public").doc(notificationFrom).get();
      if (doc.exists) {
        const { profileInfo } = doc.data();
        setProfileImageUrl(profileInfo?.imageUrl);
      }
    })();
  }, [notificationFrom]);

  return (
    <Link to={`/${notificationFrom}`}>
      <div className="notification__container">
        <div className="notification__containerLeft">
          <img alt="" src={profileImageUrl || ProfilePicturePlaceholder} />
        </div>

        <div className="notification__containerRight">
          <div className="notification__follower">
            <h4>@{notificationFrom}</h4>
            {notificationType === "follower" && <p>Subscribed to your links</p>}
            {notificationType === "saved" && <p>Saved your link</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationContainer;
