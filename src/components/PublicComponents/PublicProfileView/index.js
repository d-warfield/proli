import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useMedia } from "react-use";
import { db } from "../../../firebase/utils";
import { Helmet } from "react-helmet";
import { useStateValue } from "../../../StateProvider";
import firebase from "firebase/app";
import LinkOnPhone from "../../LinkOnPhone";

import LocationFilledIcon from "../../../assets/iconComponents/Filled/LocationFilledIcon";
import EditorIcon from "../../../assets/iconComponents/Filled/EditorIcon";

import SocialIcon from "./SocialIcon";
import HomepageLoading from "../../../assets/animations/LoadingAnimation/HomepageLoading";
import ProliIcon from "../../../assets/iconComponents/Outlined/Proli";
import ShareIcon from "../../../assets/iconComponents/Filled/ShareIcon";
import LinkOnPhoneOptions from "../../LinkOnPhoneOptions";
import ProfilePicturePlaceholder from "../../../assets/Icons/Bold/ProfilePicturePlaceholder.svg";

import SearchIcon from "../../../assets/iconComponents/Outlined/SearchIcon";

import FollowFilledIcon from "../../../assets/iconComponents/Filled/FollowFilledIcon";
import SearchBar from "../../SearchBar";

import "./styles.scss";

const PublicProfileView = () => {
  const [{ user }, dispatch] = useStateValue();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState([]);
  const [pages, setPages] = useState("");
  const [activePage, setActivePage] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isFollower, setIsFollower] = useState(false);
  const [newImageBorderRadius, setNewImageBorderRadius] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState("");
  const { username } = useParams();

  const addAnalytics = async (type, username, userId, linkId) => {
    if (username === user.username) return;
    if (!type || !username) return;
    try {
      const newAnalytics = {
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        type,
        username,
        ...(userId && { userId }),
        ...(linkId && { linkId }),
      };
      const newAnalyticsId = Math.random().toString(36).substr(2, 9);
      await db.collection("analytics").doc(newAnalyticsId).set(newAnalytics);
    } catch (err) {
      console.log(err);
    }
  };

  const isWideEnough = useMedia("(min-width: 1000px)");

  const data = useLocation();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const publicUser = await db.collection("public").doc(username).get();
      if (!publicUser.exists) {
        return setNotFound(true);
      }
      const { profileInfo, theme, pages, userId } = publicUser.data();
      addAnalytics("profileView", username, userId);
      setUserId(userId);
      setProfile(profileInfo);
      setPages(pages || []);
      if (pages && pages.length > 0) {
        setActivePage(pages[0].id);
      } else {
        setActivePage("default");
      }
      if (!data?.state?.selectedTheme) {
        setSelectedTheme(theme);
      }
      const userLinks = await db
        .collection("public")
        .doc(username)
        .collection("links")
        .orderBy("position", "asc")
        .get();

      const links = userLinks.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setLinks(links);

      if (data?.state?.selectedTheme) {
        setSelectedTheme({
          profile: {
            profileBorder: data.state.selectedTheme.profileBorder || "",
            profileTextColor: data.state.selectedTheme.profileTextColor || "",
            profileBackgroundColor:
              data.state.selectedTheme.profileBackgroundColor || "",
          },
          background: {
            backgroundColor: data.state.selectedTheme.backgroundColor || "",
            backgroundImage: data.state.selectedTheme.backgroundImage || "",
          },
          font: {
            fontFamily: data.state.selectedTheme.fontFamily || "",
            fontStyle: "regular",
          },
          button: {
            buttonBackgroundColor:
              data.state.selectedTheme.buttonBackgroundColor || "",
            buttonTextColor: data.state.selectedTheme.buttonTextColor || "",
            buttonBorder: data.state.selectedTheme.border || "",
            buttonBorderColor: data.state.selectedTheme.borderColor || "",
            buttonBoxShadowColor:
              data.state.selectedTheme.buttonBoxShadowColor || "",
            buttonBoxShadow: data.state.selectedTheme.boxShadow || "",
            buttonBackgroundImage:
              data.state.selectedTheme.buttonBackgroundImage || "",
            buttonBorderRadius:
              data.state.selectedTheme.buttonBorderRadius || "",
            buttonOutline: "none",
            buttonBackdropFilter: data.state.selectedTheme.backdropFilter || "",
          },
        });
      }
      if (user.uid) {
        const followingRef = db
          .collection("private")
          .doc(user.uid)
          .collection("following");
        const following = await followingRef
          .where("username", "==", username)
          .get();
        if (following.docs.length > 0) {
          setIsFollower(true);
        }
      }
      setLoading(false);
    })();
  }, [username]);

  const onLinkClick = async (linkId) => {
    await addAnalytics("linkClick", username, userId, linkId);
  };

  const handleSubscribe = () => {
    if (user.username) {
      db.collection("private").doc(user.uid).collection("following").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: username,
      });
      setProfile({
        ...profile,
        subscribers: profile.subscribers + 1,
      });
      setIsFollower(true);
    } else {
      history.push("/register");
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: false,
          message: "You need to have an account to subscribe!",
          timeout: 3000,
        },
      });
    }
  };

  const handleUnsubscribe = async () => {
    const unfollowRef = db
      .collection("private")
      .doc(user.uid)
      .collection("following")
      .where("username", "==", username);
    const querySnapshot = await unfollowRef.get();
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
      setProfile({
        ...profile,
        subscribers: profile.subscribers - 1,
      });
      setIsFollower(false);
    });
  };

  const backgroundStyle = {
    backgroundImage:
      selectedTheme && `url("${selectedTheme?.background?.backgroundImage}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      selectedTheme && `${selectedTheme.background.backgroundColor}`,
    WebkitOverflowScrolling: "touch",
  };

  const linkStyle = {
    backgroundImage:
      selectedTheme && `url("${selectedTheme.button.buttonBackgroundImage}")`,
    backgroundColor:
      selectedTheme && `${selectedTheme.button.buttonBackgroundColor}`,
    boxShadow:
      selectedTheme &&
      `${
        selectedTheme.button.buttonBoxShadow +
          " " +
          selectedTheme.button?.buttonBoxShadowColor || " black"
      }`,
    border: selectedTheme && `${selectedTheme.button.buttonBorder}`,
    borderColor: selectedTheme && `${selectedTheme.button.buttonBorderColor}`,
    borderRadius: selectedTheme && `${selectedTheme.button.buttonBorderRadius}`,
    color: selectedTheme ? `${selectedTheme.button.buttonTextColor}` : "white",
    fontFamily: selectedTheme ? `${selectedTheme.font.fontFamily}` : "Poppins",
    fontStyle: selectedTheme
      ? `${selectedTheme.font?.fontStyle === "italic"}`
      : "regular",

    backdropFilter: selectedTheme
      ? `${selectedTheme.button?.buttonBackdropFilter}`
      : undefined,
    WebkitBackdropFilter: selectedTheme
      ? `${selectedTheme.button?.buttonBackdropFilter}`
      : undefined,
  };

  const profileNameStyle = {
    fontFamily: selectedTheme ? `${selectedTheme.font.fontFamily}` : "Poppins",
    fontStyle: selectedTheme ? `${selectedTheme.font.fontStyle}` : "regular",
    color: selectedTheme
      ? `${selectedTheme.profile.profileTextColor}`
      : "white",
  };

  useEffect(() => {
    if (selectedTheme) {
      if (selectedTheme.button.buttonBorderRadius === "100px") {
        setNewImageBorderRadius("40px");
      } else {
        setNewImageBorderRadius(selectedTheme.button.buttonBorderRadius);
      }
    }
  }, [selectedTheme]);

  if (notFound) {
    return (
      <div className="profile_notFound">
        <ProliIcon fill={"white"} />
        <p>Profile not found</p>
        {!user.uid && (
          <button
            style={{ fontSize: "1.7rem", fontWeight: "600" }}
            onClick={() => history.push("/register")}
          >
            Create Account
          </button>
        )}
      </div>
    );
  }

  const handleSend = async (e) => {
    e.preventDefault();

    const message = `Hey! Check out ${profile.displayName}'s Proli profile.`;
    const url = `https://pro.li/${user.username}`;
    try {
      await navigator.share({
        text: message,
        title: "Check this link!",
        url: url,
      });
    } catch (err) {
      await navigator.clipboard.writeText(`${message} ${url}`);
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: true,
          message: "Copied to clipboard! :)",
          timeout: 3000,
        },
      });
    }
  };

  if (loading) {
    return <HomepageLoading />;
  }

  return (
    <div className="public__profileContainer">
      <LinkOnPhoneOptions
        show={status}
        onSidebarClick={() => setStatus(!status)}
      />

      <Helmet>
        <meta charSet="utf-8" />
        <title>Proli | {user.username}</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>
      {isWideEnough && <SearchBar />}
      <div className="public__phoneWrapper" style={backgroundStyle}>
        <div className="public_header">
          <div className="public_headerLeft">
            {!user.username && (
              <button onClick={() => history.push("/register")}>
                <ProliIcon fill={"white"} height={21} />
              </button>
            )}
          </div>

          <div className="public_headerControls">
            {!user.username && (
              <button
                className="register_onProfile"
                onClick={() => history.push("/register")}
              >
                Create Page
              </button>
            )}

            {user.username !== username ? (
              <React.Fragment>
                <button
                  className="header_buttonControl"
                  onClick={() => history.push("/search")}
                >
                  <SearchIcon fill={"white"} height={20} strokeWidth={3} />
                </button>
                <button className="header_buttonControl" onClick={handleSend}>
                  {" "}
                  <ShareIcon stroke={"white"} height={20} />
                </button>
              </React.Fragment>
            ) : (
              <button
                className="edit_button"
                onClick={() => history.push("/editor")}
              >
                <EditorIcon fill={"black"} />

                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="profile_backgroundImage">
          {profile?.imageUrl ? (
            <img alt="" src={profile?.imageUrl} />
          ) : (
            <div className="profile_picture_placeholder">
              <img src={ProfilePicturePlaceholder} />
            </div>
          )}
        </div>
        <div className="profile">
          <div className="profile_left">
            <h4 style={profileNameStyle}>{profile.displayName}</h4>
            <p style={profileNameStyle}>@{username}</p>
            <div className="profile_socialIcons">
              {profile.social &&
                Object.values(profile.social).map((url, i) => {
                  return (
                    <SocialIcon
                      key={`${url}_${i}`}
                      socialName={Object.keys(profile.social)[i]}
                      socialUrl={url}
                      fill={
                        selectedTheme
                          ? `${selectedTheme.profile.profileTextColor}`
                          : "white"
                      }
                    />
                  );
                })}
            </div>

            {profile?.location && (
              <div className="location_container">
                <LocationFilledIcon
                  fill={
                    selectedTheme
                      ? `${selectedTheme.profile.profileTextColor}`
                      : "white"
                  }
                  height={15}
                  width={15}
                />
                <p style={profileNameStyle}>{profile?.location}</p>
              </div>
            )}

            {selectedTheme && (
              <p className="bio_description" style={profileNameStyle}>
                {profile?.bio}
              </p>
            )}
          </div>
          <div className="profile_right">
            {user.username != username ? (
              <>
                {isFollower ? (
                  <button onClick={handleUnsubscribe} style={linkStyle}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={handleSubscribe} style={linkStyle}>
                    <FollowFilledIcon
                      height={20}
                      width={20}
                      fill={
                        selectedTheme
                          ? `${selectedTheme.button.buttonTextColor}`
                          : "white"
                      }
                    />
                    Follow
                  </button>
                )}
              </>
            ) : (
              <button
                disabled="true"
                onClick={handleSubscribe}
                style={linkStyle}
              >
                <FollowFilledIcon
                  height={20}
                  width={20}
                  fill={
                    selectedTheme
                      ? `${selectedTheme.button.buttonTextColor}`
                      : "white"
                  }
                />
                Follow
              </button>
            )}
          </div>
        </div>

        <div className="link__buttonContainerList">
          {pages.length > 1 && (
            <div className="page_scroll">
              {pages.map((page, index) => {
                return (
                  <button
                    className={`${page.id === activePage ? "active_page" : ""}`}
                    onClick={() => setActivePage(page.id)}
                    style={linkStyle}
                    key={index}
                  >
                    {page.name}
                  </button>
                );
              })}
            </div>
          )}
          {links
            .filter((link) => {
              if (
                !link.page &&
                activePage === "default" &&
                link.linkControl.active === true
              )
                return true;
              if (link.linkControl.active === true && activePage === link.page)
                return true;
            })
            .map((link) => (
              <div key={link.id} className="link__buttonContainer">
                <LinkOnPhone
                  onClick={onLinkClick}
                  linkTitle={link.linkInfo.linkTitle}
                  linkUrl={link.linkInfo.linkUrl}
                  affiliateCode={link.linkMedia.affiliateCode}
                  downloadUrl={link.linkMedia.downloadUrl}
                  mediaUrl={link.linkMedia.mediaUrl}
                  imageUrl={link.linkMedia.imageUrl}
                  imageBorderRadius={newImageBorderRadius}
                  linkOptionsColor={
                    selectedTheme
                      ? `${selectedTheme.button.buttonTextColor}`
                      : "white"
                  }
                  favicon={link.linkMedia.favicon}
                  isLocked={link.linkControl.isLocked}
                  isFollower={isFollower}
                  reverse={link.linkControl.reverse}
                  linkType={link.linkType}
                  active={link.linkControl.active}
                  linkId={link.id}
                  id={username}
                  key={link.id}
                  linkStyle={linkStyle}
                  onSidebarClick={() => setStatus(!status)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;
