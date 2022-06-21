const boxShadowValue = "0px 3px 8px #00000027";

const gradientDefaultFont = "Poppins";

const { REACT_APP_RESOURCES_BASE_URL } = process.env;

const Splatter = [
  {
    themeTitle: "Snow",
    buttonBackgroundColor: "transparent",
    buttonBorderRadius: "100px",
    border: "2px solid white",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/splatter/splatter-1.webp",
    backgroundColor: "#6600db",
    buttonTextColor: "white",
    profileTextColor: "white",
    bottomNavButtonColor: "#957BF0",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
  },
  {
    themeTitle: "Sea",
    buttonBackgroundColor: "transparent",
    buttonBorderRadius: "100px",
    border: "2px solid white",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/splatter/splatter-2.webp",
    backgroundColor: "#00cc3d",
    buttonTextColor: "white",
    profileTextColor: "white",
    bottomNavButtonColor: "#E2A2DC",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
  },
  {
    themeTitle: "Olive",
    buttonBackgroundColor: "transparent",
    buttonBorderRadius: "100px",
    border: "2px solid white",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/splatter/splatter-3.webp",

    backgroundColor: "#FECE2D",

    buttonTextColor: "white",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
  },
  {
    themeTitle: "Olive",
    buttonBackgroundColor: "transparent",
    buttonBorderRadius: "100px",
    border: "2px solid white",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/splatter/splatter-4.webp",
    backgroundColor: "#384cff",
    buttonTextColor: "white",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
  },
  {
    themeTitle: "Olive",
    buttonBackgroundColor: "transparent",
    buttonBorderRadius: "100px",
    border: "2px solid white",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/splatter/splatter-5.webp",
    backgroundColor: "#e6151f",
    buttonTextColor: "white",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
  },
  {
    themeTitle: "Olive",
    buttonBackgroundColor: "transparent",
    buttonBorderRadius: "100px",
    border: "2px solid white",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/splatter/splatter-6.webp",
    backgroundColor: "grey",
    buttonTextColor: "white",
    profileTextColor: "white",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
  },
];

export default Splatter;
