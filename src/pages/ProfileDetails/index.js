import React, { useState, useRef, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import SpotifyIcon from "../../assets/iconComponents/SocialMedia/SpotifyIcon";
import FacebookIcon from "../../assets/iconComponents/SocialMedia/FacebookIcon";
import SnapchatIcon from "../../assets/iconComponents/SocialMedia/SnapchatIcon";
import DribbbleIcon from "../../assets/iconComponents/SocialMedia/DribbbleIcon";
import DiscordIcon from "../../assets/iconComponents/SocialMedia/DiscordIcon";

import { useTrail, animated, config } from "react-spring";
import DummyRectangle from "./DummyRectangle";
import ImageIcon2 from "../../assets/iconComponents/Outlined/ImageIcon2";
import PhoneIcon from "../../assets/iconComponents/Outlined/PhoneIcon";
import EmailIcon from "../../assets/iconComponents/Outlined/EmailIcon";
import AffiliateIcon from "../../assets/iconComponents/Outlined/AffiliateIcon";

import { Timeline } from "react-twitter-widgets";
import "./styles.scss";

const { REACT_APP_RESOURCES_BASE_URL } = process.env;

const ProfileDetails = () => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const history = useHistory();

  const social = ["Snapchat", "Spotify", "Dribbble", "Discord", "Facebook"];
  const socialIcons = [
    <SnapchatIcon key="snap" height={15} fill={"white"} />,
    <SpotifyIcon key="spotify" height={15} fill={"white"} />,
    <DribbbleIcon key="dribbble" height={15} fill={"white"} />,
    <DiscordIcon key="discord" height={15} fill={"white"} />,
    <FacebookIcon key="facebook" height={15} fill={"white"} />,
  ];

  const count = 5;
  const [active] = useState(true);
  const trail = useTrail(count, {
    config: config.gentle,
    opacity: active ? 1 : 0,
    y: active ? 0 : -100,
    from: {
      opacity: 0,
      y: -100,
    },
  });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth + 100,
        height: targetRef.current.offsetHeight + 100,
      });
    }
  }, []);

  return (
    <div className="profile_details">
      <div className="profile_detailsProfile">
        <h1>
          One <span>pro</span>file <span>li</span>nk for your all of your
          content
        </h1>
        <p>
          Put all of your links and content in one place for anyone to discover
        </p>
        <button onClick={() => history.push("/register")}>SIGN UP</button>
      </div>

      <div className="phone_container">
        <div className="profile_topHome">
          <div className="profile_left">
            <img
              alt=""
              src="https://images.pexels.com/photos/3031397/pexels-photo-3031397.jpeg?cs=srgb&dl=pexels-collis-3031397.jpg&fm=jpg"
            />
          </div>
          <div className="profile_right">
            <div className="dummy_profileText"></div>
            <div className="dummy_profileText"></div>
          </div>
        </div>
        <div style={{ minWidth: "100%" }}>
          {trail.map(({ opacity, y }, index) => {
            const currentSocial = social[index];
            const currentSocialIcons = socialIcons[index];

            return (
              <animated.div
                key={index}
                style={{
                  opacity,
                  transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
                }}
              >
                <div className="dummy_buttonsWrapper">
                  <DummyRectangle
                    social={currentSocial}
                    socialIcons={currentSocialIcons}
                  />
                </div>
              </animated.div>
            );
          })}
        </div>
      </div>

      <div className="dash_wrapper"></div>

      <div className="unique_url">
        <div className="unique_urlName">
          <p>prol.li/</p>
          <h6>yournamehere</h6>
        </div>
      </div>
      <div className="card_containerParent">
        <section className="card_container links">
          <h2 className="links">
            Add an <span className="links">unlimited</span> amount of links
          </h2>
          <div className="card">
            <div
              className="mini_phone"
              style={{
                backgroundColor: "#bbbbc5",
                backgroundImage: `url(${
                  REACT_APP_RESOURCES_BASE_URL +
                  "/themes/default/splatter/splatter-6.webp"
                })`,
              }}
            >
              <div className="mini_top">
                <div className="mini_left">
                  <img
                    alt=""
                    src={
                      REACT_APP_RESOURCES_BASE_URL +
                      "/homepage/black-white-man.webp"
                    }
                  />
                </div>
                <div className="mini_right">
                  <div className="mini_profileText"></div>
                  <div className="mini_profileText"></div>
                </div>
              </div>

              <div className="mini_bottom">
                <div className="dummy_wrapper">
                  <div className="dummy_linkLeft">
                    <img src="https://firebasestorage.googleapis.com/v0/b/dev-resources.pro.li/o/homepage%2Fblack-white-landscape.webp?alt=media&token=2b59bc0a-a028-4580-9884-07ea7e53a94c" />
                  </div>
                  <div className="dummy_linkRight">
                    <p>Landscapes</p>
                  </div>
                </div>
                <div
                  className="dummy_wrapper"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="dummy_linkLeft">
                    <img src="https://firebasestorage.googleapis.com/v0/b/dev-resources.pro.li/o/homepage%2Fblack-white-square.webp?alt=media&token=2bbc9913-75a7-4310-ac54-fedaf87a723b" />
                  </div>
                  <div className="dummy_linkRight">
                    <p>Portraits</p>
                  </div>
                </div>
                <div className="dummy_wrapper">
                  <div className="dummy_linkLeft">
                    <img src="https://firebasestorage.googleapis.com/v0/b/dev-resources.pro.li/o/homepage%2Fblack-white-urban.webp?alt=media&token=793311e6-f153-4d99-a19b-7366088326d4" />
                  </div>
                  <div className="dummy_linkRight">
                    <p>Urban</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card_container spotify">
          <h2 className="spotify">
            Add your <span>Spotify</span> playlist
          </h2>
          <div className="card">
            <div
              className="mini_phone"
              style={{
                backgroundColor: "#ff784b8a",
                backgroundImage: `url(${
                  REACT_APP_RESOURCES_BASE_URL +
                  "/themes/default/camo/camo-3.webp"
                })`,
              }}
            >
              <div className="mini_top">
                <div className="mini_left">
                  <img
                    alt=""
                    src={
                      REACT_APP_RESOURCES_BASE_URL +
                      "/homepage/black-white-woman.webp"
                    }
                  />
                </div>
                <div className="mini_right">
                  <div className="mini_profileText"></div>
                  <div className="mini_profileText"></div>
                </div>
              </div>
              <div className="mini_bottom">
                <img
                  src={REACT_APP_RESOURCES_BASE_URL + "/homepage/spotify.webp"}
                />
              </div>
            </div>{" "}
          </div>
        </section>
        <section className="card_container youtube">
          <h2 className="youtube">
            Add your <span className="youtube">Youtube</span> videos
          </h2>
          <div className="card">
            <div
              className="mini_phone"
              style={{
                backgroundImage: `url(${
                  REACT_APP_RESOURCES_BASE_URL +
                  "/themes/default/gradient/gradient-7.webp"
                })`,
              }}
            >
              <div className="mini_top">
                <div className="mini_left">
                  <img
                    alt=""
                    src={
                      REACT_APP_RESOURCES_BASE_URL + "/homepage/blue-woman.webp"
                    }
                  />
                </div>
                <div className="mini_right">
                  <div className="mini_profileText"></div>
                  <div className="mini_profileText"></div>
                </div>
              </div>
              <div className="mini_bottom">
                <img
                  src={REACT_APP_RESOURCES_BASE_URL + "/homepage/youtube.webp"}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="card_container twitch">
          <h2 className="twitch">
            Add your <span>Twitch</span> channel
          </h2>
          <div className="card">
            <div
              className="mini_phone"
              style={{
                backgroundColor: "grey",
                backgroundImage: `url(${
                  REACT_APP_RESOURCES_BASE_URL +
                  "/themes/default/gradient/gradient-5.webp"
                })`,
              }}
            >
              <div className="mini_top">
                <div className="mini_left">
                  <img
                    alt=""
                    src={
                      REACT_APP_RESOURCES_BASE_URL + "/homepage/woman-pink.webp"
                    }
                  />
                </div>
                <div className="mini_right">
                  <div className="mini_profileText"></div>
                  <div className="mini_profileText"></div>
                </div>
              </div>
              <div className="mini_bottom">
                <img
                  style={{ borderRadius: "2.5rem" }}
                  src={REACT_APP_RESOURCES_BASE_URL + "/homepage/fortnite.webp"}
                />
              </div>
            </div>{" "}
          </div>
        </section>

        <section className="card_container twitter">
          <h2 className="twitter">
            Add your <span>Twitter</span> timeline
          </h2>
          <div className="card">
            <div
              className="mini_phone"
              style={{
                backgroundImage: `url(${
                  REACT_APP_RESOURCES_BASE_URL +
                  "/themes/default/mind-waves/mindwaves-2.webp"
                })`,
              }}
            >
              <div className="mini_top">
                <div className="mini_left">
                  <img
                    alt=""
                    src={
                      REACT_APP_RESOURCES_BASE_URL +
                      "/homepage/woman-pink-purple.webp"
                    }
                  />
                </div>
                <div className="mini_right">
                  <div className="mini_profileText"></div>
                  <div className="mini_profileText"></div>
                </div>
              </div>
              <div className="mini_bottom" ref={targetRef}>
                <Timeline
                  dataSource={{
                    sourceType: "profile",
                    screenName: "kanyewest",
                  }}
                  options={{
                    height: "200",
                    width: dimensions ? `${dimensions.width}` : "400",
                    dataChrome: "noheader",
                  }}
                  noHeader="true"
                  noBorders="true"
                  noFooter="true"
                />{" "}
              </div>
            </div>{" "}
          </div>
        </section>
      </div>

      <section className="other_container ">
        <h1>You can even add these</h1>
        <div className="other_optionsWrapper">
          <div className="other_optionRight">
            <div className="other_option">
              <EmailIcon height={22} stroke={"white"} /> <h4>Email</h4>
              <p>Add an email so anyone can email you</p>
            </div>
            <div className="other_option">
              <AffiliateIcon height={22} stroke={"white"} /> <h4>Affiliate</h4>
              <p>Add your affiliate code and allow anyone to copy it easily</p>
            </div>
          </div>
          <div className="other_optionLeft">
            <div className="other_option">
              <PhoneIcon height={22} stroke={"white"} /> <h4>Phone</h4>
              <p>Add your number to accept calls</p>
            </div>
            <div className="other_option">
              <ImageIcon2 height={22} stroke={"white"} />{" "}
              <h4>Images & Video</h4>
              <p>Add both videos or image links</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileDetails;
