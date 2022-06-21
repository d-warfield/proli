const boxShadowValue = "0px 3px 8px #00000027";

const { REACT_APP_RESOURCES_BASE_URL } = process.env;

const Camo = [
  {
    themeTitle: "Snow",
    border: "2px solid #404040",
    borderColor: "#404040",
    buttonBackgroundColor: "#404040",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/camo/camo-1.webp",
    buttonTextColor: "white",
    buttonBorderRadius: "18px",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: "Audiowide",
    bottomNavButtonColor: "#404040",
    backdropFilter: "blur(20px)",
  },
  {
    themeTitle: "Sea",
    border: "2px solid #384E81",
    borderColor: "#384E81",
    buttonBackgroundColor: "#384E81",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/camo/camo-2.webp",
    buttonTextColor: "white",
    buttonBorderRadius: "18px",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: "Audiowide",
    bottomNavButtonColor: "#384E81",
    backdropFilter: "blur(20px)",
  },
  {
    themeTitle: "Olive",
    border: "2px solid #2B3334",
    borderColor: "#2B3334",
    buttonBackgroundColor: "#2B3334",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/camo/camo-3.webp",
    buttonTextColor: "white",
    buttonBorderRadius: "18px",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: "Audiowide",
    bottomNavButtonColor: "#2B3334",
    backdropFilter: "blur(20px)",
  },
  {
    themeTitle: "Tan",
    border: "2px solid white",
    borderColor: "#8A6F54",
    buttonBackgroundColor: "transparent",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/camo/camo-4.webp",
    profileTextColor: "white",
    buttonBorderRadius: "18px",
    buttonTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: "Audiowide",
    backdropFilter: "blur(20px)",
  },
];

export default Camo;
