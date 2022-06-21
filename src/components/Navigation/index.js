import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { db } from "../../firebase/utils";
import { auth } from "../../firebase/utils";

import "./styles.scss";
import { useMedia } from "react-use";

import DocumentFilledIcon from "../../assets/iconComponents/Filled/DocumentFilledIcon";
import DocumentOutlinedIcon from "../../assets/iconComponents/Outlined/DocumentOutlinedIcon";

import HeartIcon from "../../assets/iconComponents/Filled/HeartIcon";
import HeartOutlinedIcon from "../../assets/iconComponents/Outlined/HeartOutlineIcon";

import EditorIcon from "../../assets/iconComponents/Filled/EditorIcon";
import EditorOutlineIcon from "../../assets/iconComponents/Outlined/EditorOutlineIcon";

import NotificationFilledIcon from "../../assets/iconComponents/Filled/NotificationFilledIcon";
import NotificationOutlineIcon from "../../assets/iconComponents/Outlined/NotificationOutlineIcon";

import SearchIcon from "../../assets/iconComponents/Outlined/SearchIcon";

import ProfilePicturePlaceholder from "./../../assets/Icons/Bold/ProfilePicturePlaceholder.svg";

import { useStateValue } from "./../../StateProvider";
import ProliIcon from "../../assets/iconComponents/Outlined/Proli";
import SettingsIcon from "../../assets/iconComponents/Filled/SettingsIcon";
import XmarkIcon from "../../assets/iconComponents/Filled/XmarkIcon";
import MessageFilledIcon from "../../assets/iconComponents/Filled/MessageFilledIcon";
import BookmarkIcon from "../../assets/iconComponents/Outlined/BookmarkIcon";

const Navigation = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [settingsDesktop, setSettingsDesktop] = useState(true);
  const [hover, setHover] = useState(false);

  const isActivePage = (path) => window.location.pathname.includes(path);

  const data = useLocation();

  let { pathname } = useLocation();
  const isWideEnough = useMedia("(min-width: 1000px)");

  const pathnames = ["/dashboard", "/search", "/"];
  if (!user.uid && !pathnames.includes(pathname) && !isWideEnough) return null;

  if (!user.uid && pathname == "/" && !isWideEnough) return null;
  if (!user.uid && pathname == "/search" && !isWideEnough) return null;

  const setTheme = async () => {
    const { selectedTheme } = data.state;
    await db
      .collection("public")
      .doc(user.username)
      .update({
        theme: {
          profile: {
            profileBorder: selectedTheme.profileBorder || "",
            profileTextColor: selectedTheme.profileTextColor || "",
            profileBackgroundColor: selectedTheme.profileBackgroundColor || "",
          },
          background: {
            backgroundColor: selectedTheme.backgroundColor || "",
            backgroundImage: selectedTheme.backgroundImage || "",
          },
          font: {
            fontFamily: selectedTheme.fontFamily || "",
            fontStyle: "regular",
          },
          button: {
            buttonBackgroundColor: selectedTheme.buttonBackgroundColor || "",
            buttonTextColor: selectedTheme.buttonTextColor || "",
            buttonBorder: selectedTheme.border || "",
            buttonBorderColor: selectedTheme.borderColor || "",
            buttonBoxShadowColor: selectedTheme.buttonBoxShadowColor || "",
            buttonBoxShadow: selectedTheme.boxShadow || "",
            buttonBackgroundImage: selectedTheme.buttonBackgroundImage || "",
            buttonBorderRadius: selectedTheme.buttonBorderRadius || "",
            buttonOutline: "none",
            buttonBackdropFilter: selectedTheme.backdropFilter || "",
          },
        },
      });
    history.push(`/${user.username}`);
  };

  const handleSignOut = async () => {
    await auth.signOut();
    window.location = "/";
  };

  return (
    <div className="navigation">
      {data?.state?.type === "editor" ? (
        <div className="editor_popup">
          <div className="editor_popupContainer">
            <button onClick={() => history.goBack()}>Cancel</button>
            <button className="set_button" onClick={() => setTheme()}>
              Set
            </button>
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="proli_iconNav">
            {user.username ? (
              <React.Fragment>
                <div className="profile_navLeft">
                  <img
                    src={
                      user?.profileInfo?.imageUrl || ProfilePicturePlaceholder
                    }
                  />
                </div>
                <div className="profile_navRight">
                  <h1>{user.profileInfo.displayName}</h1>
                  <p>@{user.username}</p>
                </div>
              </React.Fragment>
            ) : (
              <ProliIcon />
            )}
          </div>

          <Link to="/">
            {data.pathname === "/" || data.pathname === "/search" ? (
              <div className="icon_containerActive">
                <SearchIcon fill={"white"} />
                <p>Explore</p>
              </div>
            ) : (
              <div className="icon_container">
                <SearchIcon stroke={"var(--snap-light-text)"} />
                <p style={{ color: "var(--snap-light-text)" }}>Explore</p>
              </div>
            )}
          </Link>

          <Link
            to="/dashboard"
            onMouseEnter={
              user.uid ? () => setHover(false) : () => setHover("dashboard")
            }
            onMouseLeave={
              user.uid ? () => setHover(false) : () => setHover(false)
            }
          >
            {isActivePage("/dashboard") ? (
              <div className="icon_containerActive">
                <DocumentFilledIcon fill={"white"} />
                <p>Dashboard</p>
              </div>
            ) : (
              <div className="icon_container">
                {hover === "dashboard" && (
                  <div className="no_userHoverContainer">
                    <div className="no_userHover">
                      <div className="triangle"></div>

                      <h1>Add Links</h1>
                      <p>
                        Add an links and other media content such as images,
                        videos, music playlists, and more.{" "}
                      </p>
                      <button>SIGN IN</button>
                    </div>
                  </div>
                )}
                <DocumentOutlinedIcon stroke={"var(--snap-light-text)"} />
                <p style={{ color: "var(--snap-light-text)" }}>Dashboard</p>
              </div>
            )}
          </Link>

          <Link
            to="/editor"
            onMouseEnter={
              user.uid ? () => setHover(false) : () => setHover("editor")
            }
            onMouseLeave={
              user.uid ? () => setHover(false) : () => setHover(false)
            }
          >
            {isActivePage("/editor") ? (
              <div className="icon_containerActive">
                <EditorIcon fill={"white"} />
                <p>Editor</p>
              </div>
            ) : (
              <div className="icon_container">
                {hover === "editor" && (
                  <div className="no_userHoverContainer">
                    <div className="no_userHover">
                      <div className="triangle"></div>

                      <h1>Custom Themes</h1>
                      <p>Choose from over 100+ premium themes.</p>
                      <button>SIGN IN</button>
                    </div>
                  </div>
                )}
                <EditorOutlineIcon stroke={"var(--snap-light-text)"} />
                <p style={{ color: "var(--snap-light-text)" }}>Editor</p>
              </div>
            )}
          </Link>

          <Link
            to="/notifications"
            className="mobile_nav"
            onMouseEnter={
              user.uid ? () => setHover(false) : () => setHover("notifications")
            }
            onMouseLeave={
              user.uid ? () => setHover(false) : () => setHover(false)
            }
          >
            {isActivePage("/notifications") ? (
              <div className="icon_containerActive ">
                <NotificationFilledIcon fill={"white"} />
                <p>Notifications</p>
              </div>
            ) : (
              <div className="icon_container">
                {hover === "notifications" && (
                  <div className="no_userHoverContainer">
                    <div className="no_userHover">
                      <div className="triangle"></div>

                      <h1>Notifications</h1>
                      <p>Receive notifications and message anyone.</p>
                      <button>SIGN IN</button>
                    </div>
                  </div>
                )}
                <NotificationOutlineIcon
                  stroke={"var(--snap-light-text)"}
                  strokeWidth={1.4}
                />
                <p style={{ color: "var(--snap-light-text)" }}>Notifications</p>
              </div>
            )}
          </Link>

          <Link
            to="/saved"
            className={!user.uid ? "mobile_navNoUser" : "mobile_nav"}
            onMouseEnter={
              user.uid ? () => setHover(false) : () => setHover("saved")
            }
            onMouseLeave={
              user.uid ? () => setHover(false) : () => setHover(false)
            }
          >
            {isActivePage("/saved") ? (
              <div className="icon_containerActive ">
                <HeartIcon fill={"white"} />
                <p>Saved</p>
              </div>
            ) : (
              <div className="icon_container">
                {hover === "saved" && (
                  <div className="no_userHoverContainer">
                    <div className="no_userHover">
                      <div className="triangle"></div>

                      <h1>Saved Lists</h1>
                      <p>Let anyone save your links or content.</p>
                      <button>SIGN IN</button>
                    </div>
                  </div>
                )}
                <HeartOutlinedIcon stroke={"var(--snap-light-text)"} />
                <p style={{ color: "var(--snap-light-text)" }}>Saved</p>
              </div>
            )}
          </Link>

          {user.uid && (
            <Link to={`${user.username}`} className="desktop_nav">
              <div className="icon_container">
                <img
                  alt=""
                  src={user?.profileInfo?.imageUrl || ProfilePicturePlaceholder}
                />
                <p>Profile</p>
              </div>
            </Link>
          )}
        </div>
      )}
      {user.uid && (
        <div className="settings_desktop">
          {settingsDesktop === true ? (
            <button onClick={() => setSettingsDesktop(false)}>
              <SettingsIcon
                fill={"var(--snap-darkmode-light-text)"}
                height={24}
              />
              <p style={{ color: "var(--snap-darkmode-light-text)" }}>
                Settings
              </p>
            </button>
          ) : (
            <div className="settings_desktopContainer">
              <button onClick={() => window.open("mailto:support@pro.li")}>
                <MessageFilledIcon />
                <p>Contact Us</p>
              </button>
              <button onClick={() => window.open("mailto:request@pro.li")}>
                <BookmarkIcon fill={"white"} />
                <p>Feature Request</p>
              </button>
              <button className="nav_logoutDesktop" onClick={handleSignOut}>
                <p>Logout</p>
              </button>
              <button
                onClick={() => setSettingsDesktop(true)}
                className="nav_xmarkDesktop"
              >
                <XmarkIcon fill={"white"} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
