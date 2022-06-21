import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import LinkFilledIcon from "../../assets/iconComponents/Filled/LinkFilledIcon";
import ImageIcon2 from "../../assets/iconComponents/Outlined/ImageIcon2";
import AffiliateIcon from "../../assets/iconComponents/Outlined/AffiliateIcon";
import EmailIcon from "../../assets/iconComponents/Outlined/EmailIcon";
import PhoneIcon from "../../assets/iconComponents/Outlined/PhoneIcon";
import TwitterOutlineIcon from "../../assets/iconComponents/Outlined/TwitterOutlineIcon";
import VideoIcon from "../../assets/iconComponents/Outlined/VideoIcon";
import YoutubeOutlineIcon from "../../assets/iconComponents/Outlined/YoutubeOutlineIcon";
import SearchIcon from "../../assets/iconComponents/Outlined/SearchIcon";
import SpotifyIcon from "../../assets/iconComponents/SocialMedia/SpotifyIcon";
import SoundCloudIcon from "../../assets/iconComponents/SocialMedia/SoundCloudIcon";

import XmarkIcon from "../../assets/iconComponents/Filled/XmarkIcon";
import TwitchIcon from "../../assets/iconComponents/SocialMedia/TwitchIcon";

import "./styles.scss";

const LinkButtonTypes = (props) => {
  const { linkTypeDropdown, setLinkTypeDropdown, page } = props;
  const [buttonType, setButtonType] = useState("all");
  const [query, setQuery] = useState("");
  const history = useHistory();

  const goToDashboard = () => {
    setTimeout(() => {
      history.push({
        pathname: "/dashboard",
        state: {
          page,
        },
      });
    }, 100);
  };

  const buttonTypeSelectedStyle = {
    padding: "1.8rem 2.6rem",
    margin: "0 1rem 0 0",
    backgroundColor: "white",
    color: "black",
    borderRadius: "10rem",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "1.7rem",
    border: "none",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.085)",
    lineHeight: "1",
  };

  const buttonTypeNotSelectedStyle = {
    padding: "1.8rem 2.6rem",
    margin: "0 1rem 0 0",
    backgroundColor: "var(--snap-container)",
    color: "var(--snap-darkmode-light-text)",
    borderRadius: "10rem",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: "1.7rem",
    border: "none",
    outline: "none",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.349)",
    lineHeight: "1",
  };

  const buttonTypes = [
    {
      linkType: "default",
      icon: <LinkFilledIcon stroke={"white"} />,
      title: "Link",
      description: "Add a link to anywhere",
      category: "none",
      backgroundColor: "black",
    },
    {
      linkType: "twitter",
      icon: <TwitterOutlineIcon height={22} fill={"white"} />,
      title: "Twitter",
      description: "Add a twitter timeline",
      category: "social",
      backgroundColor: "#03A3ED",
    },
    {
      linkType: "music",
      icon: <SpotifyIcon fill={"#22C95C"} />,
      title: "Spotify",
      description: "Add a playlist or album",
      category: "music",
      backgroundColor: "black",
    },
    {
      linkType: "music",
      icon: <SoundCloudIcon />,
      title: "SoundCloud",
      description: "Add a playlist or album",
      category: "music",
      backgroundColor: "#F85216",
    },
    {
      linkType: "media",
      icon: <ImageIcon2 stroke={"white"} />,
      title: "Image",
      description: "Add an image",
      category: "image",
      backgroundColor: "#9147FF",
    },
    {
      linkType: "media",
      icon: <VideoIcon stroke={"white"} />,
      title: "Video",
      description: "Add a video",
      category: "video",
      backgroundColor: "black",
    },
    {
      linkType: "youtube",
      icon: <YoutubeOutlineIcon fill={"white"} />,
      title: "Youtube",
      description: "Add a youtube video link",
      category: "video" || "social",
      backgroundColor: "#F80103",
    },
    {
      linkType: "email",
      icon: <EmailIcon stroke={"white"} />,
      title: "Email",
      description: "Add an email",
      category: "professional",
      backgroundColor: "#03A3ED",
    },
    {
      linkType: "phone",
      icon: <PhoneIcon stroke={"white"} />,
      title: "Phone",
      description: "Add a phone number",
      category: "professional",
      backgroundColor: "#22C95C",
    },
    {
      linkType: "twitch_channel",
      icon: <TwitchIcon fill={"white"} />,
      title: "Twitch",
      description: "Add a live twitch channel",
      category: "video" || "social",
      backgroundColor: "#9147FF",
    },
    {
      linkType: "affiliate",
      icon: <AffiliateIcon stroke={"white"} />,
      title: "Affiliate",
      description: "Add an affiliate code",
      category: "professional",
      backgroundColor: "black",
    },
  ];

  const buttonLinkTypes = [
    { buttonLinkType: "all" },
    { buttonLinkType: "music" },
    { buttonLinkType: "video" },
    { buttonLinkType: "image" },
    { buttonLinkType: "professional" },
  ];

  return (
    <>
      <div className="button_typesHeader">
        <button onClick={() => history.goBack()}>
          <XmarkIcon />
        </button>
        <div className="search_linksContainer">
          <SearchIcon stroke={"black"} height={20} strokeWidth={3} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="dropdown__wrapper">
        <div className="dropdown__wrapperLeft">
          <div className="button_typesWrapper">
            <div className="button_typesScroll">
              {buttonLinkTypes.map((button, index) => {
                return (
                  <button
                    key={index}
                    style={
                      buttonType == button.buttonLinkType
                        ? buttonTypeSelectedStyle
                        : buttonTypeNotSelectedStyle
                    }
                    onClick={() => setButtonType(button.buttonLinkType)}
                  >
                    {button.buttonLinkType}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="drop_downOptionContainer">
            {buttonType != "all" &&
              buttonTypes.map((button, index) => {
                if (button.category.includes(buttonType)) {
                  return (
                    <div className="drop-down-option" key={index}>
                      <button
                        className="option__button"
                        onClick={() => {
                          props.setLinkType(button.linkType);
                          setLinkTypeDropdown(!linkTypeDropdown);
                          goToDashboard();
                        }}
                      >
                        <div className="inner__buttonContainer">
                          <div
                            className="inner__iconContainer"
                            style={{
                              backgroundColor:
                                `${button.backgroundColor}` || "black",
                            }}
                          >
                            {button.icon}
                          </div>
                          <div className="inner__textContainer">
                            <h4>{button.title}</h4>
                            <p>{button.description}</p>
                          </div>
                        </div>
                      </button>{" "}
                    </div>
                  );
                }
              })}

            {buttonType === "all" && (
              <React.Fragment>
                {query == ""
                  ? buttonTypes.map((button, index) => {
                      return (
                        <div className="drop-down-option" key={index}>
                          <button
                            className="option__button"
                            onClick={() => {
                              props.setLinkType(button.linkType);
                              setLinkTypeDropdown(!linkTypeDropdown);
                              goToDashboard();
                            }}
                          >
                            <div className="inner__buttonContainer">
                              <div
                                className="inner__iconContainer"
                                style={{
                                  backgroundColor:
                                    `${button.backgroundColor}` || "black",
                                }}
                              >
                                {button.icon}
                              </div>
                              <div className="inner__textContainer">
                                <h4>{button.title}</h4>
                                <p>{button.description}</p>
                              </div>
                            </div>
                          </button>{" "}
                        </div>
                      );
                    })
                  : buttonTypes.map((button, index) => {
                      let lowercase = button.title.toLowerCase();
                      let queryLowerCase = query.toLowerCase();
                      if (lowercase.includes(queryLowerCase)) {
                        return (
                          <div className="drop-down-option" key={index}>
                            <button
                              className="option__button"
                              onClick={() => {
                                props.setLinkType(button.linkType);
                                setLinkTypeDropdown(!linkTypeDropdown);
                                goToDashboard();
                              }}
                            >
                              <div className="inner__buttonContainer">
                                <div
                                  className="inner__iconContainer"
                                  style={{
                                    backgroundColor:
                                      `${button.backgroundColor}` || "black",
                                  }}
                                >
                                  {button.icon}
                                </div>
                                <div className="inner__textContainer">
                                  <h4>{button.title}</h4>
                                  <p>{button.description}</p>
                                </div>
                              </div>
                            </button>{" "}
                          </div>
                        );
                      }
                    })}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkButtonTypes;
