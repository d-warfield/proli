import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./styles.scss";

import ThreeDotsOutlinedIcon from "../../assets/iconComponents/Outlined/ThreeDotsOutlinedIcon";

import DefaultLink from "./LinkTypes/DefaultLink";
import PhoneLink from "./LinkTypes/PhoneLink";
import EmailLink from "./LinkTypes/EmailLink";
import DownloadLink from "./LinkTypes/DownloadLink";
import AffiliateLink from "./LinkTypes/AffiliateLink";
import MediaLink from "./LinkTypes/MediaLink";
import FriendLink from "./LinkTypes/FriendLink";
import MusicLink from "./LinkTypes/MusicLink";
import TwitterLink from "./LinkTypes/TwitterLink";
import YoutubeLink from "./LinkTypes/YoutubeLink";
import TwitchLink from "./LinkTypes/TwitchLink";

const LinkOnPhone = ({
  linkTitle,
  linkUrl,
  mediaUrl,
  favicon,
  imageUrl,
  affiliateCode,
  downloadUrl,
  imageBorderRadius,
  linkOptionsColor,
  linkStyle,
  saved,
  linkType,
  active,
  isLocked,
  reverse,
  isFollower,
  linkId,
  id,
  onSidebarClick,
  onClick,
  disabled,
}) => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const [clickCount, setClickCount] = useState(0);
  const [mediaType, setMediaType] = useState(null);
  const [showLinkOptions, setShowLinkOptions] = useState("flex");
  const [faviconImage, setFaviconImage] = useState("");
  const [reverseLink, setReverseLink] = useState("");
  const [sideControl, setSideControl] = useState("right");
  const [newMargin, setNewMargin] = useState(null);
  const [textMargin, setTextMargin] = useState(null);

  useEffect(() => {
    if (reverse != null) {
      if (reverse === false) {
        setReverseLink("");
      } else {
        setReverseLink("row-reverse");
        setSideControl("left");
      }
    }
  }, [reverse]);

  const imageBorderRadiusStyle = {
    borderRadius: `${imageBorderRadius}`,
  };

  const reverseStyle = {
    flexDirection: `${reverseLink}`,
  };

  useEffect(() => {
    if (imageBorderRadius === "40px") {
      setNewMargin("0px 11px");
    } else {
      setNewMargin("0 2px");
    }
  }, [imageBorderRadius]);

  useEffect(() => {
    if (saved === true) {
      setShowLinkOptions("none");
    } else {
      setShowLinkOptions("flex");
    }
  }, [saved]);

  useEffect(() => {
    if (imageUrl) {
      const isVideo =
        imageUrl.includes("MP4") ||
        imageUrl.includes("mp4") ||
        imageUrl.includes("MOV") ||
        imageUrl.includes("mov");

      if (isVideo) {
        setMediaType("video");
      } else {
        setMediaType("image");
      }
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl) {
      if (reverse === false) {
        setTextMargin("marginRight");
      } else if (reverse === true) {
        setTextMargin("marginLeft");
      }
    }
  }, [reverse]);

  const handleRedirect = async () => {
    if (disabled) return;
    await onClick(linkId);
    if (linkType === "default" || linkType === "music") {
      window.location = linkUrl;
      setClickCount(clickCount + 1);
    }

    switch (linkType) {
      case "default":
        window.location = linkUrl;
        break;
      case "affiliate":
        history.push({
          pathname: "/affiliate-code",
          state: {
            affiliateCode: affiliateCode || null,
            linkUrl: linkUrl,
            id: id,
          },
        });
        break;
      case "email":
        window.location = `mailto:${linkUrl}`;
        break;
      case "phone":
        window.open(`tel:${linkUrl}`);
        break;
      case "media":
        if (linkUrl) {
          window.location = linkUrl;
        }
        break;

      default:
        break;
    }
  };

  const handleLinkOptions = async (e) => {
    e.preventDefault();

    const message = `Hey! Check the "${linkTitle}" link out on ${id}'s Proli profile.`;
    const url = `https://pro.li/${id}`;

    if (user.uid) {
      onSidebarClick();
      dispatch({
        type: "SET_LINK",
        payload: {
          id: id,
          linkTitle: linkTitle,
          savedUser: id,
          savedLinkId: linkId,
          text: message,
          title: "Check this link!",
          url: url,
          originUrl: linkUrl,
        },
      });
    }
  };

  useEffect(() => {
    if (favicon === true) {
      var parser = document.createElement("a");
      parser.href = `${"https://www."}${linkUrl}`;

      setFaviconImage(`${parser.href}favicon.ico`);
    } else {
      setFaviconImage(null);
    }
  }, [favicon, linkUrl]);

  return (
    <div className="link__wrapper notSelectable">
      {isLocked === true && isFollower === false ? (
        <Link
          to={{
            pathname: "/locked",
            state: { id: id, linkUrl: linkUrl },
          }}
        >
          <button className="locked__button" style={linkStyle}>
            <p>{linkTitle === "Enter Title" ? "Locked" : linkTitle}</p>
          </button>
          <div
            className="link_right"
            style={{
              borderRadius: `${imageBorderRadius}`,
              display: `${showLinkOptions}`,
              right: "0px",
              margin: `${newMargin}`,
            }}
          ></div>
        </Link>
      ) : (
        <div className="show_link">
          {linkType != "media" && (
            <div
              className="link__wrapperMain"
              style={Object.assign(
                {},
                linkStyle,
                reverseStyle,
                imageBorderRadiusStyle
              )}
            >
              {imageUrl && (
                <div className="link__left">
                  {mediaType === "video" ? (
                    <video
                      id="video-player"
                      autoPlay
                      loop
                      mute
                      // style={{ borderRadius: `${imageBorderRadius}` }}
                    >
                      <source src={imageUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      alt=""
                      src={imageUrl}
                      // style={{ borderRadius: `${imageBorderRadius}` }}
                    />
                  )}

                  <img
                    alt=""
                    src={faviconImage}
                    style={{ borderRadius: `${imageBorderRadius}` }}
                  />
                </div>
              )}

              <div className="link__middle" onClick={handleRedirect}>
                {active === true && linkType === "default" && (
                  <DefaultLink
                    linkUrl={linkUrl}
                    linkTitle={linkTitle}
                    imageUrl={imageUrl}
                    imageBorderRadius={imageBorderRadius}
                    textMargin={textMargin}
                  />
                )}
                {active === true && linkType === "phone" && (
                  <PhoneLink
                    linkUrl={linkUrl}
                    linkTitle={linkTitle}
                    imageUrl={imageUrl}
                    imageBorderRadius={imageBorderRadius}
                    textMargin={textMargin}
                  />
                )}

                {active === true && linkType === "email" && (
                  <EmailLink
                    linkUrl={linkUrl}
                    linkTitle={linkTitle}
                    imageUrl={imageUrl}
                    imageBorderRadius={imageBorderRadius}
                    textMargin={textMargin}
                  />
                )}

                {active === true && linkType === "affiliate" && (
                  <AffiliateLink
                    linkUrl={linkUrl}
                    linkTitle={linkTitle}
                    imageUrl={imageUrl}
                    imageBorderRadius={imageBorderRadius}
                    id={id}
                    textMargin={textMargin}
                  />
                )}

                {active === true && linkType === "download" && (
                  <DownloadLink
                    linkUrl={linkUrl}
                    linkTitle={linkTitle}
                    downloadUrl={downloadUrl}
                    imageUrl={imageUrl}
                    imageBorderRadius={imageBorderRadius}
                    textMargin={textMargin}
                  />
                )}

                {active === true && linkType === "friend" && (
                  <FriendLink
                    linkUrl={linkUrl}
                    linkTitle={linkTitle}
                    imageUrl={imageUrl}
                    imageBorderRadius={imageBorderRadius}
                    textMargin={textMargin}
                  />
                )}
                {active === true && linkType === "music" && (
                  <MusicLink
                    linkTitle={linkTitle}
                    imageBorderRadius={imageBorderRadius}
                  />
                )}

                {linkType === "twitter" && (
                  <div className="mediaLinkContainer">
                    {active === true && linkType === "twitter" && (
                      <TwitterLink
                        linkTitle={linkTitle}
                        imageBorderRadius={imageBorderRadius}
                      />
                    )}
                  </div>
                )}
                {linkType === "youtube" && (
                  <div className="mediaLinkContainer">
                    {active === true && linkType === "youtube" && (
                      <YoutubeLink
                        linkTitle={linkTitle}
                        imageBorderRadius={imageBorderRadius}
                      />
                    )}
                  </div>
                )}
                {linkType === "twitch_channel" && (
                  <div className="mediaLinkContainer">
                    {active === true && linkType === "twitch_channel" && (
                      <TwitchLink
                        linkTitle={linkTitle}
                        imageBorderRadius={imageBorderRadius}
                      />
                    )}
                  </div>
                )}
              </div>
              <div
                className="link_right"
                style={{
                  borderRadius: `${imageBorderRadius}`,
                  display: `${showLinkOptions}`,
                  [sideControl]: "0",
                  margin: `${newMargin}`,
                }}
              >
                <button onClick={handleLinkOptions}>
                  <ThreeDotsOutlinedIcon fill={linkOptionsColor} />
                </button>
              </div>
            </div>
          )}

          {linkType === "media" && (
            <div
              className="link__wrapperMain"
              style={Object.assign(
                {},
                linkStyle,
                reverseStyle,
                imageBorderRadiusStyle
              )}
            >
              <div className="link__middle" onClick={handleRedirect}>
                {linkType === "media" && (
                  <div className="mediaLinkContainer">
                    {active === true && linkType === "media" && (
                      <MediaLink
                        linkUrl={linkUrl}
                        linkTitle={linkTitle}
                        imageUrl={imageUrl}
                        favicon={favicon}
                        imageBorderRadius={imageBorderRadius}
                        mediaUrl={mediaUrl}
                      />
                    )}
                  </div>
                )}
              </div>
              <div
                className="link_right"
                style={{
                  borderRadius: `${imageBorderRadius}`,
                  display: `${showLinkOptions}`,
                  right: 0,
                  margin: `${newMargin}`,
                }}
              >
                <button onClick={handleLinkOptions}>
                  {" "}
                  <ThreeDotsOutlinedIcon fill={linkOptionsColor} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkOnPhone;
