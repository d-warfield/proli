import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase/utils";
import Toggle from "react-toggle";

import Lock from "../LinkFeatures/Lock";
import Image from "../LinkFeatures/Image";
import Folder from "../LinkFeatures/Folder";
import Affiliate from "../LinkFeatures/Affiliate";
import AddFriend from "../LinkFeatures/AddFriend";
import Reverse from "../LinkFeatures/Reverse";
import DeleteIcon from "../../assets/iconComponents/Outlined/DeleteIcon";
import DownloadDropwdown from "./DropdownOptions/DownloadDropdown";
import MediaDropwdown from "./DropdownOptions/MediaDropdown";
import AffiliateDropwdown from "./DropdownOptions/AffiliateDropdown";
import "./styles.scss";
import ThreeDotsOutlinedIcon from "../../assets/iconComponents/Outlined/ThreeDotsOutlinedIcon";

const LinkContainer = ({
  linkTitle,
  linkUrl,
  downloadUrl,
  friendUrl,
  imageUrl,
  affiliateCode,
  mediaUrl,
  isLocked,
  reverse,
  active,
  id,
  linkType,
  deleteLink,
  updateLink,
}) => {
  const [{ user }] = useStateValue();
  const [linkTitleEdit] = useState("");
  const [title, setTitle] = useState(linkTitle);
  const [url, setUrl] = useState(linkUrl);
  const [linkUrlEdit] = useState("");
  const [activeEdit, setActiveEdit] = useState(active);
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [mainPlaceholderValue, setMainPlaceholderValue] = useState("");

  useEffect(() => {
    if (active !== activeEdit) {
      setActiveEdit(active);
    }
  }, [active]);

  const switchComponent = ({ linkType }) => {
    let component;
    switch (linkType) {
      case "download":
        component = (
          <DownloadDropwdown
            id={id}
            updateLink={updateLink}
            downloadUrl={downloadUrl}
          />
        );
        break;

      case "media":
        component = (
          <MediaDropwdown id={id} mediaUrl={mediaUrl} updateLink={updateLink} />
        );
        break;

      case "affiliate":
        component = (
          <AffiliateDropwdown
            id={id}
            affiliateCode={affiliateCode}
            updateLink={updateLink}
          />
        );
        break;

      default:
        break;
    }
    return component;
  };

  useEffect(() => {
    if (linkType === "download") {
      if (!downloadUrl) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } else if (!downloadUrl) {
      return null;
    }
  }, [downloadUrl]);

  useEffect(() => {
    if (linkType === "media") {
      if (!mediaUrl) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } else if (!mediaUrl) {
      return null;
    }
  }, [mediaUrl]);

  useEffect(() => {
    if (linkType === "affiliate") {
      if (!affiliateCode) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } else if (!affiliateCode) {
      return null;
    }
  }, [mediaUrl]);

  useEffect(() => {
    if (linkType === "friend") {
      if (!friendUrl) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } else if (!friendUrl) {
      return null;
    }
  }, [friendUrl]);

  useEffect(() => {
    switch (linkType) {
      case "default":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("www.example.com");
        break;
      case "download":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("");
        break;
      case "youtube":
        setMainPlaceholderValue("Youtube Video Url");
        setPlaceholderValue("");
        break;
      case "twitch_channel":
        setMainPlaceholderValue("Twitch Username");
        setPlaceholderValue("");
        break;
      case "media":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("www.example.com");
        break;
      case "affiliate":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("www.example.com");
        break;
      case "email":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("you@gmail.com");
        break;
      case "phone":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("+1-202-847-5498");
        break;
      case "friend":
        setMainPlaceholderValue("Enter Title");
        setPlaceholderValue("");
        break;
      case "music":
        setMainPlaceholderValue("Enter Url");
        setPlaceholderValue("Enter Embed Code");
        break;
      case "twitter":
        setMainPlaceholderValue("@TwitterHandle");
        setPlaceholderValue("Enter Twitter Handle");
        break;
      default:
        break;
    }
  }, [linkType]);

  // toggle active or not active
  const handleToggle = async () => {
    setActiveEdit(!activeEdit);
    updateLink(id, "linkControl", "active", !activeEdit);
    await db
      .collection("public")
      .doc(user.username)
      .collection("links")
      .doc(id)
      .update({
        "linkControl.active": !activeEdit,
      });
  };

  const handleDelete = () => {
    db.collection("public")
      .doc(user.username)
      .collection("links")
      .doc(id)
      .delete();
    deleteLink(id);
  };

  return (
    <div className="link__container">
      <div className="link__containerMain">
        <div className="link_drag">
          <ThreeDotsOutlinedIcon fill={"var(--snap-darkmode-light-text)"} />
        </div>
        <div className="link__containerLeft">
          <div className="link__textWrapper">
            {linkType && (
              <div className="link__textContainer">
                <div className="link__title">
                  <input
                    type="text"
                    spellCheck="false"
                    placeholder={linkTitle ? linkTitle : mainPlaceholderValue}
                    onChange={async (e) => {
                      setTitle(e.target.value);
                    }}
                    onBlur={async (e) => {
                      updateLink(id, "linkInfo", "linkTitle", e.target.value);
                      await db
                        .collection("public")
                        .doc(user.username)
                        .collection("links")
                        .doc(id)
                        .update({
                          "linkInfo.linkTitle": e.target.value,
                        });
                    }}
                    value={title === "Enter Title" ? linkTitleEdit : title}
                  />
                </div>

                <div className="link__url">
                  {linkType === "phone" && (
                    <input
                      spellCheck="false"
                      type="text"
                      placeholder={placeholderValue}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        updateLink(id, "linkInfo", "linkUrl", e.target.value);
                      }}
                      onBlur={async (e) => {
                        const { value: link } = e.target;
                        const url =
                          link.includes("https://") || link.includes("http://")
                            ? link
                            : link;
                        await db
                          .collection("public")
                          .doc(user.username)
                          .collection("links")
                          .doc(id)
                          .update({
                            "linkInfo.linkUrl": url,
                          });
                      }}
                      value={url === "example.com" ? linkUrlEdit : url}
                    />
                  )}

                  {linkType === "default" && (
                    <input
                      spellCheck="false"
                      type="text"
                      placeholder={placeholderValue}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        updateLink(id, "linkInfo", "linkUrl", e.target.value);
                      }}
                      onBlur={async (e) => {
                        const { value: link } = e.target;
                        const url =
                          link.includes("https://") || link.includes("http://")
                            ? link
                            : "https://" + link;
                        await db
                          .collection("public")
                          .doc(user.username)
                          .collection("links")
                          .doc(id)
                          .update({
                            "linkInfo.linkUrl": url,
                          });
                      }}
                      value={url === "example.com" ? linkUrlEdit : url}
                    />
                  )}

                  {linkType === "affiliate" && (
                    <input
                      spellCheck="false"
                      type="text"
                      placeholder={placeholderValue}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        updateLink(id, "linkInfo", "linkUrl", e.target.value);
                      }}
                      onBlur={async (e) => {
                        const { value: link } = e.target;
                        const url =
                          link.includes("https://") || link.includes("http://")
                            ? link
                            : "https://" + link;
                        await db
                          .collection("public")
                          .doc(user.username)
                          .collection("links")
                          .doc(id)
                          .update({
                            "linkInfo.linkUrl": url,
                          });
                      }}
                      value={url === "example.com" ? linkUrlEdit : url}
                    />
                  )}

                  {linkType === "media" && (
                    <input
                      spellCheck="false"
                      type="text"
                      placeholder={placeholderValue}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        updateLink(id, "linkInfo", "linkUrl", e.target.value);
                      }}
                      onBlur={async (e) => {
                        const { value: link } = e.target;
                        const url =
                          link.includes("https://") || link.includes("http://")
                            ? link
                            : "https://" + link;
                        await db
                          .collection("public")
                          .doc(user.username)
                          .collection("links")
                          .doc(id)
                          .update({
                            "linkInfo.linkUrl": url,
                          });
                      }}
                      value={url === "example.com" ? linkUrlEdit : url}
                    />
                  )}

                  {linkType === "email" && (
                    <input
                      spellCheck="false"
                      type="text"
                      placeholder={placeholderValue}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        updateLink(id, "linkInfo", "linkUrl", e.target.value);
                      }}
                      onBlur={async (e) => {
                        await db
                          .collection("public")
                          .doc(user.username)
                          .collection("links")
                          .doc(id)
                          .update({
                            "linkInfo.linkUrl": e.target.value,
                          });
                      }}
                      value={url === "example.com" ? linkUrlEdit : url}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="link__featureContainer">
              {(mediaUrl || downloadUrl) && (
                <div
                  className="link__featureButtonWrapper"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Folder />
                </div>
              )}

              {friendUrl && (
                <div
                  className="link__featureButtonWrapper"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <AddFriend id={id} friendUrl={friendUrl} />
                </div>
              )}

              {affiliateCode && (
                <div
                  className="link__featureButtonWrapper"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <Affiliate id={id} affiliateCode={affiliateCode} />
                </div>
              )}

              <div className="link__featureButtonWrapper">
                <Lock
                  id={id}
                  isLocked={isLocked}
                  updateLink={updateLink}
                  height={28}
                  width={28}
                />
              </div>
              <div className="link__featureButtonWrapper">
                <Image
                  id={id}
                  updateLink={updateLink}
                  imageUrl={imageUrl}
                  title={title}
                />
              </div>
              <div className="link__featureButtonWrapper">
                {imageUrl && (
                  <Reverse
                    id={id}
                    updateLink={updateLink}
                    imageUrl={imageUrl}
                    title={title}
                    reverse={reverse}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="link__containerRight">
          <div className="switch__button">
            <label>
              <Toggle icons={false} checked={active} onChange={handleToggle} />
            </label>
          </div>
          <div className="trash__button" onClick={handleDelete}>
            <DeleteIcon
              stroke="var(--snap-darkmode-light-text)"
              className="trash__buttonIcon"
              fontSize="large"
            />
          </div>
        </div>
      </div>
      <div className="link__containerDropdown">
        {showDropdown && <div>{switchComponent({ linkType })}</div>}
      </div>
    </div>
  );
};

export default LinkContainer;
