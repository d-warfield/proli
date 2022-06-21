const boxShadowValue = "0px 3px 8px #00000027";

const gradientDefaultFont = "Poppins";

const { REACT_APP_RESOURCES_BASE_URL } = process.env;

const Kush = [
  {
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",

    buttonBorderRadius: "18px",
    backgroundColor: "#4DC175",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/kush/kush-black.webp",
    buttonTextColor: "#1c1c1c",
    profileTextColor: "#1c1c1c",
    bottomNavButtonColor: "#957BF0",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(25px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
  {
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "18px",
    backgroundColor: "black",

    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/kush/kush-white.webp",

    buttonTextColor: "#1c1c1c",
    profileTextColor: "#1c1c1c",
    bottomNavButtonColor: "#E2A2DC",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(25px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
  {
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "18px",

    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/kush/kush-black.webp",

    buttonTextColor: "#1c1c1c",
    profileTextColor: "#1c1c1c",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(25px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
  {
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "18px",
    backgroundColor: "#4287f5",
    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/kush/kush-white.webp",

    buttonTextColor: "#1c1c1c",
    profileTextColor: "#1c1c1c",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(25px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
  {
    buttonBackgroundColor: "rgba(255, 255, 255, 0.473)",
    buttonBorderRadius: "18px",
    backgroundColor: "#ffc247",

    backgroundImage:
      REACT_APP_RESOURCES_BASE_URL + "/themes/default/kush/kush-black.webp",
    buttonTextColor: "#1c1c1c",
    profileTextColor: "#1c1c1c",
    boxShadow: `${boxShadowValue}`,
    fontFamily: `${gradientDefaultFont}`,
    backdropFilter: "blur(25px)",
    profileBackgroundColor: "rgba(255, 255, 255, 0.473)",
  },
];

export default Kush;
