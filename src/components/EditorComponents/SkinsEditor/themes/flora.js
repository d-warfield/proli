const boxShadowValue = "0px 3px 8px #00000027";

const gradientDefaultFont = "Poppins";

const { REACT_APP_RESOURCES_BASE_URL } = process.env;

const Flora = [
  {
    themeTitle: "Snow",
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "8px",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/flora/flora-1.webp",
    buttonTextColor: "white",
    profileTextColor: "white",
    bottomNavButtonColor: "#957BF0",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(13px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
  {
    themeTitle: "Sea",
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "8px",

    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/flora/flora-2.webp",
    buttonTextColor: "white",
    profileTextColor: "white",
    bottomNavButtonColor: "#E2A2DC",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(13px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
  {
    themeTitle: "Olive",
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "8px",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/flora/flora-3.webp",
    buttonTextColor: "white",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(13px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
];

export default Flora;
