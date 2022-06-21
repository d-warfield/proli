export const initialState = {
  user: {
    uid: null,
    username: "",
  },
  notification: {
    hidden: true,
    message: "",
    success: true,
    timeout: 0,
  },

  link: {
    id: "",
    savedUser: "",
    savedLinkId: "",
    text: "",
    title: "",
    url: "",
    originUrl: "",
    linkTitle: "",
  },

  addPointsNotification: {
    hidden: true,
    message: "",
    success: true,
    timeout: 0,
  },

  links: [],
  globalLoading: true,
  page: "default",
  pagesList: [],
  imageCrop: null,
  tempTheme: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_LOADING":
      return {
        ...state,
        globalLoading: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TEMP_THEME":
      return {
        ...state,
        tempTheme: action.payload,
      };
    case "SET_IMAGE_CROP":
      return {
        ...state,
        ...(action.payload?.imageFile && {
          imageCrop: {
            aspect: action.payload?.aspect,
            imageFile: action.payload?.imageFile,
            handleChange: action.payload?.handleChange,
          },
        }),
      };
    case "CLEAR_IMAGE_CROP":
      return {
        ...state,
        imageCrop: null,
      };
    case "SET_LINKS":
      return {
        ...state,
        links: {
          ...state.links,
          [action.payload.page]: action.payload.links,
        },
      };
    case "SET_ALL_LINKS":
      return {
        ...state,
        links: action.payload,
      };
    case "ADD_NEW_LINK":
      return {
        ...state,
        links: {
          ...state.links,
          [action.payload.page]: state.links[action.payload.page]
            ? [
                ...state.links[action.payload.page].map((link) => {
                  return {
                    ...link,
                    position: link.position + 1,
                  };
                }),
                { ...action.payload.link },
              ].sort((a, b) => a.position - b.position)
            : [action.payload.link],
        },
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SET_PAGES":
      return {
        ...state,
        pagesList: action.payload,
      };
    case "SET_PROFILE_INFO":
      return {
        ...state,
        user: {
          ...state.user,
          profileInfo: {
            ...state.user.profileInfo,
            [action.payload.type]: action.payload.value,
          },
        },
      };
    case "SET_PROFILE_BACKGROUND":
      return {
        ...state,
        user: {
          ...state.user,
          theme: {
            ...state.user.theme,
            background: action.background,
          },
        },
      };
    case "SET_THEME":
      return {
        ...state,
        user: {
          ...state.user,
          theme: action.payload,
        },
      };
    case "TOGGLE_NOTIFICATION":
      return {
        ...state,
        notification: {
          hidden: action.payload.hidden,
          message: action.payload.message,
          success: action.payload.success,
          timeout: action.payload.timeout,
        },
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        notification: {
          hidden: true,
          timeout: 0,
        },
      };

    case "TOGGLE_POINTS_NOTIFICATION":
      return {
        ...state,
        addPointsNotification: {
          hidden: action.payload.hidden,
          message: action.payload.message,
          success: action.payload.success,
          timeout: action.payload.timeout,
        },
      };
    case "HIDE_POINTS_NOTIFICATION":
      return {
        ...state,
        addPointsNotification: {
          hidden: true,
          timeout: 0,
        },
      };

    case "SET_LINK":
      return {
        ...state,
        link: {
          id: action.payload.id,
          linkTitle: action.payload.linkTitle,
          savedUser: action.payload.savedUser,
          savedLinkId: action.payload.savedLinkId,
          text: action.payload.text,
          title: action.payload.title,
          url: action.payload.url,
          originUrl: action.payload.originUrl,
        },
      };
    default:
      return state;
  }
};
export default reducer;
