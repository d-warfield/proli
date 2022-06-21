import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { auth } from "../../firebase/utils";
import ArrowRightIcon from "../../assets/iconComponents/Filled/ArrowRightIcon";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import ProfileIcon from "../../assets/iconComponents/Filled/ProfileIcon";
import HeartIcon from "../../assets/iconComponents/Filled/HeartIcon";
import MessageFilledIcon from "../../assets/iconComponents/Filled/MessageFilledIcon";
import BookmarkIcon from "../../assets/iconComponents/Outlined/BookmarkIcon";
import ProfilePicturePlaceholder from "../../assets/Icons/Bold/ProfilePicturePlaceholder.svg";
import "./styles.scss";

const Sidebar = ({ toggleSidebar }) => {
  const [{ user }] = useStateValue();
  const [show, toggleShow] = useState(true);

  const history = useHistory();
  const { right } = useSpring({
    from: { right: "-100%" },
    right: show ? "0" : "-100%",
  });

  const handleSignOut = async () => {
    await auth.signOut();
    window.location = "/";
  };

  const changePage = (page) => {
    toggleShow(false);
    setTimeout(() => {
      toggleSidebar(false);
    }, 1000);
    if (page) {
      history.push(`/${page}`);
    }
  };

  return (
    <animated.div
      style={{
        right: right,
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        zIndex: 1,
      }}
      className="sidebar"
    >
      <div className="settings_header">
        <h4>Settings</h4>
        <button onClick={() => changePage()}>
          <ArrowRightIcon />
        </button>
      </div>
      <div
        className="profile_sidebar"
        onClick={() => changePage(user.username)}
      >
        <div className="profile_sidebarLeft">
          <img src={user.profileInfo.imageUrl || ProfilePicturePlaceholder} />
        </div>
        <div className="profile_sidebarRight">
          <h1>{user.profileInfo.displayName}</h1>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className="side_barOptions">
        <button onClick={() => changePage(user.username)}>
          <ProfileIcon fill={"white"} />
          <span>Profile</span>
        </button>
        <button onClick={() => changePage("saved")}>
          <HeartIcon />
          <span>Saved Links</span>
        </button>

        <button onClick={() => window.open("mailto:support@pro.li")}>
          <MessageFilledIcon />
          <span>Contact</span>
        </button>
        <button onClick={() => window.open("mailto:request@pro.li")}>
          <BookmarkIcon fill={"white"} />
          <span>Request Feature</span>
        </button>
      </div>
      <div className="logout_button">
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </animated.div>
  );
};

export default Sidebar;
