import React from "react";
import TwitterIcon from "../../../../assets/iconComponents/SocialMedia/TwitterIcon";
import FacebookIcon from "../../../../assets/iconComponents/SocialMedia/FacebookIcon";
import DiscordIcon from "../../../../assets/iconComponents/SocialMedia/DiscordIcon";
import DribbbleIcon from "../../../../assets/iconComponents/SocialMedia/DribbbleIcon";
import SpotifyIcon from "../../../../assets/iconComponents/SocialMedia/SpotifyIcon";
import SnapchatIcon from "../../../../assets/iconComponents/SocialMedia/SnapchatIcon";
import GithubIcon from "../../../../assets/iconComponents/SocialMedia/GithubIcon";
import LinkedInIcon from "../../../../assets/iconComponents/SocialMedia/LinkedInIcon";
import InstagramIcon from "../../../../assets/iconComponents/SocialMedia/InstagramIcon";
import TikTokIcon from "../../../../assets/iconComponents/SocialMedia/TikTokIcon";

function SocialIcon({ socialUrl, socialName, fill }) {
  const handleSocialClick = () => {
    let url =
      (socialUrl.includes("https://") || socialUrl.includes("http://")) &&
      socialUrl;
    if (!url) {
      switch (socialName) {
        case "Snapchat":
          url = `https://snapchat.com/add/${socialUrl}`;
          break;
        case "Instagram":
          url = `https://instagram.com/${socialUrl}`;
          break;
        case "Twitter":
          url = `https://twitter.com/${socialUrl}`;
          break;
        case "TikTok":
          url = `https://tiktok.com/@${socialUrl}`;
          break;
        case "Facebook":
          url = `https://facebook.com/${socialUrl}`;
          break;
        case "Discord":
          url = socialUrl;
          break;
        case "Dribbble":
          url = `https://dribbble.com/${socialUrl}`;
          break;
        case "Github":
          url = `https://github.com/${socialUrl}`;
          break;
        case "Spotify":
          url = socialUrl;
          break;
        case "LinkedIn":
          url = `https://linkedin.com/in/${socialUrl}`;
          break;
        default:
          return <></>;
      }
    }
    window.open(url);
  };

  if (socialUrl === "https://" || !socialUrl) return <></>;

  const generateIcon = () => {
    switch (socialName) {
      case "Snapchat":
        return <SnapchatIcon height={16} fill={fill} />;
      case "Instagram":
        return <InstagramIcon height={16} fill={fill} />;
      case "Twitter":
        return <TwitterIcon height={16} fill={fill} />;
      case "TikTok":
        return <TikTokIcon height={16} fill={fill} />;
      case "Facebook":
        return <FacebookIcon height={16} fill={fill} />;
      case "Discord":
        return <DiscordIcon height={16} fill={fill} />;
      case "Dribbble":
        return <DribbbleIcon height={16} fill={fill} />;
      case "Github":
        return <GithubIcon height={16} fill={fill} />;
      case "Spotify":
        return <SpotifyIcon height={16} fill={fill} />;
      case "LinkedIn":
        return <LinkedInIcon height={16} fill={fill} />;
      default:
        return <></>;
    }
  };

  return <div onClick={handleSocialClick}>{generateIcon()}</div>;
}

export default SocialIcon;
