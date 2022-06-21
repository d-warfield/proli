import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import LinkOnPhone from "../../components/LinkOnPhone";

import LocationFilledIcon from "../../assets/iconComponents/Filled/LocationFilledIcon";

import SocialIcon from "../PublicComponents/PublicProfileView/SocialIcon";

import "./styles.scss";

const PublicProfileView = ({ username, tempTheme }) => {
  const [{ user, pagesList: pages, links: allLinks }] = useStateValue();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState([]);
  const [activePage, setActivePage] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [newImageBorderRadius, setNewImageBorderRadius] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const { profileInfo, theme } = user;
    setProfile(profileInfo);
    if (pages && pages.length > 0) {
      setActivePage(pages[0].id);
    } else {
      setActivePage("default");
    }
    if (tempTheme) {
      setSelectedTheme(tempTheme);
    } else {
      setSelectedTheme(theme);
    }
  }, []);

  useEffect(() => {
    setLinks(allLinks[activePage] || []);
  }, [activePage]);

  const backgroundStyle = {
    backgroundImage:
      selectedTheme && `url("${selectedTheme.background?.backgroundImage}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      selectedTheme && `${selectedTheme.background?.backgroundColor}`,
    WebkitOverflowScrolling: "touch",
  };

  const linkStyle = {
    backgroundImage:
      selectedTheme && `url("${selectedTheme.button?.buttonBackgroundImage}")`,
    backgroundColor:
      selectedTheme && `${selectedTheme.button?.buttonBackgroundColor}`,
    boxShadow:
      selectedTheme &&
      `${
        selectedTheme.button?.buttonBoxShadow +
          " " +
          selectedTheme.button?.buttonBoxShadowColor || " black"
      }`,
    border: selectedTheme && `${selectedTheme.button?.buttonBorder}`,
    borderColor: selectedTheme && `${selectedTheme.button?.buttonBorderColor}`,
    borderRadius:
      selectedTheme && `${selectedTheme.button?.buttonBorderRadius}`,
    color: selectedTheme ? `${selectedTheme.button?.buttonTextColor}` : "white",
    fontFamily: selectedTheme ? `${selectedTheme.font?.fontFamily}` : "Poppins",
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
    fontFamily: selectedTheme ? `${selectedTheme.font?.fontFamily}` : "Poppins",
    fontStyle: selectedTheme ? `${selectedTheme.font?.fontStyle}` : "regular",
    color: selectedTheme
      ? `${selectedTheme.profile?.profileTextColor}`
      : "white",
  };

  useEffect(() => {
    if (selectedTheme) {
      if (selectedTheme.button?.buttonBorderRadius === "100px") {
        setNewImageBorderRadius("40px");
      } else {
        setNewImageBorderRadius(selectedTheme.button?.buttonBorderRadius);
      }
    }
  }, [selectedTheme]);

  return (
    <div className="public__profileContainer">
      <div className="public__phoneWrapper" style={backgroundStyle}>
        <div className="public_header">
          <div className="public_headerLeft"></div>
          <div className="public_headerControls"></div>
        </div>

        <div className="profile_backgroundImage">
          <img alt="" src={profile?.imageUrl} />
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
                          ? `${selectedTheme.profile?.profileTextColor}`
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
                      ? `${selectedTheme.profile?.profileTextColor}`
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
        </div>

        <div className="link__buttonContainerList">
          {pages && pages.length > 1 && (
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
                  linkTitle={link.linkInfo.linkTitle}
                  linkUrl={link.linkInfo.linkUrl}
                  affiliateCode={link.linkMedia.affiliateCode}
                  downloadUrl={link.linkMedia.downloadUrl}
                  mediaUrl={link.linkMedia.mediaUrl}
                  imageUrl={link.linkMedia.imageUrl}
                  imageBorderRadius={newImageBorderRadius}
                  linkOptionsColor={
                    selectedTheme
                      ? `${selectedTheme.button?.buttonTextColor}`
                      : "white"
                  }
                  favicon={link.linkMedia.favicon}
                  isLocked={link.linkControl.isLocked}
                  reverse={link.linkControl.reverse}
                  linkType={link.linkType}
                  active={link.linkControl.active}
                  linkId={link.id}
                  id={username}
                  key={link.id}
                  linkStyle={linkStyle}
                  onClick={() => null}
                  disabled={true}
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
