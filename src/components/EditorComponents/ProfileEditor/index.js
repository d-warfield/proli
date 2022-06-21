import React, { useState, useEffect } from "react";
import { useStateValue } from "../../../StateProvider";
import { db } from "../../../firebase/utils";
import { ProfileData } from "../Shared";

import LocationFilledIcon from "../../../assets/iconComponents/Filled/LocationFilledIcon";
import ProfileIcon from "../../../assets/iconComponents/Filled/ProfileIcon";
import SnapchatIcon from "../../../assets/iconComponents/SocialMedia/SnapchatIcon";
import TwitterIcon from "../../../assets/iconComponents/SocialMedia/TwitterIcon";
import DiscordIcon from "../../../assets/iconComponents/SocialMedia/DiscordIcon";
import FacebookIcon from "../../../assets/iconComponents/SocialMedia/FacebookIcon";
import SpotifyIcon from "../../../assets/iconComponents/SocialMedia/SpotifyIcon";
import DribbbleIcon from "../../../assets/iconComponents/SocialMedia/DribbbleIcon";
import GithubIcon from "../../../assets/iconComponents/SocialMedia/GithubIcon";
import LinkedInIcon from "../../../assets/iconComponents/SocialMedia/LinkedInIcon";
import InstagramIcon from "../../../assets/iconComponents/SocialMedia/InstagramIcon";
import TikTokIcon from "../../../assets/iconComponents/SocialMedia/TikTokIcon";

import "./styles.scss";

const socialMedia = [
  {
    name: "Discord",
    icon: <DiscordIcon height={18} fill={"white"} />,
  },
  {
    name: "Dribbble",
    icon: <DribbbleIcon height={18} fill={"white"} />,
  },
  {
    name: "Facebook",
    icon: <FacebookIcon height={18} fill={"white"} />,
  },
  {
    name: "Github",
    icon: <GithubIcon height={18} fill={"white"} />,
  },
  {
    name: "Instagram",
    icon: <InstagramIcon height={18} fill={"white"} />,
  },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon height={18} fill={"white"} />,
  },
  {
    name: "Snapchat",
    icon: <SnapchatIcon height={18} fill={"white"} />,
  },
  {
    name: "Spotify",
    icon: <SpotifyIcon height={18} fill={"white"} />,
  },
  {
    name: "TikTok",
    icon: <TikTokIcon height={18} fill={"white"} />,
  },
  {
    name: "Twitter",
    icon: <TwitterIcon height={18} fill={"white"} />,
  },
];

const ProfileEditor = () => {
  const [
    {
      user,
      user: { profileInfo },
    },
    dispatch,
  ] = useStateValue();

  return (
    <div className="themesContainer">
      <div className="profile__containerEditor">
        <ProfileData />
        <div className="personal_infoContainer">
          <h6>Bio</h6>
          <div className="profile_inputContainer">
            <LocationFilledIcon fill={"white"} />
            <input
              type="text"
              placeholder="Your Location"
              spellCheck={false}
              maxLength="45"
              onChange={(e) =>
                dispatch({
                  type: "SET_PROFILE_INFO",
                  payload: {
                    type: "location",
                    value: e.target.value,
                  },
                })
              }
              onBlur={async (e) =>
                db.collection("public").doc(user.username).update({
                  "profileInfo.location": e.target.value,
                })
              }
              value={profileInfo?.location}
            />
          </div>

          <div className="profile_inputContainer">
            <ProfileIcon height={20} fill={"white"} />

            <input
              type="text"
              placeholder="Enter Bio"
              spellCheck={false}
              maxLength="250"
              onChange={(e) =>
                dispatch({
                  type: "SET_PROFILE_INFO",
                  payload: {
                    type: "bio",
                    value: e.target.value,
                  },
                })
              }
              onBlur={async (e) =>
                db.collection("public").doc(user.username).update({
                  "profileInfo.bio": e.target.value,
                })
              }
              value={profileInfo?.bio}
            />
          </div>
        </div>

        <div className="personal_infoContainer">
          <h6>Social Links</h6>
          {socialMedia.map((social, index) => {
            return (
              <div key={`social_${index}`} className="profile_inputContainer">
                {social.icon}
                <input
                  type="text"
                  placeholder={
                    social.name === "Spotify" || social.name === "Discord"
                      ? `${social.name} link`
                      : `${social.name} username or link`
                  }
                  spellCheck="false"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_PROFILE_INFO",
                      payload: {
                        type: "social",
                        value: {
                          ...profileInfo?.social,
                          [social.name]: e.target.value,
                        },
                      },
                    })
                  }
                  onBlur={async (e) => {
                    const { value: link } = e.target;
                    await db
                      .collection("public")
                      .doc(user.username)
                      .update({
                        [`profileInfo.social.${social.name}`]: link,
                      });
                  }}
                  value={
                    profileInfo?.social && profileInfo?.social[social.name]
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
