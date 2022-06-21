import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./firebase/utils";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase/utils";
import Notification from "./components/Notification";
import NotificationAddPoints from "./components/NotificationAddPoints";

import ImageCrop from "./components/ImageCrop";
import "./App.scss";

import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import PublicProfileView from "./components/PublicComponents/PublicProfileView";
import SearchBar from "./components/SearchBar";
import ProfileDisplay from "./components/ProfileDisplay";
import Saved from "./components/Saved";
import Header from "./components/Header";
import HomepageLoading from "./assets/animations/LoadingAnimation/HomepageLoading";

import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import AffiliateCode from "./pages/AffiliateCode";
import Locked from "./pages/Locked";
import Channel from "./pages/Channel";
import Notifications from "./pages/Notifications";
import TermsAndConditions from "./pages/Legal/TermsAndConditions";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import ForgotPassword from "./pages/Management/ForgotPassword";
import Management from "./pages/Management";
import ProfileDetails from "./pages/ProfileDetails";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import AddBlock from "./pages/AddBlock";
import SendInvite from "./pages/SendInvite";
import Stats from "./pages/Stats";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

const App = () => {
  const [{ user, globalLoading, imageCrop }, dispatch] = useStateValue();

  const [newNotification, setNewNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      dispatch({
        type: "SET_GLOBAL_LOADING",
        payload: true,
      });
      if (authUser) {
        const { username } = (
          await db.collection("private").doc(authUser.uid).get()
        ).data();
        fetchLinks(username);
        const publicData = await db.collection("public").doc(username).get();
        if (publicData.exists) {
          const { profileInfo, theme, pages } = publicData.data();
          dispatch({
            type: "SET_USER",
            user: {
              uid: authUser.uid,
              username,
              profileInfo,
              theme,
            },
          });
          dispatch({
            type: "SET_PAGES",
            payload: pages || [],
          });
        }
      }
      dispatch({
        type: "SET_GLOBAL_LOADING",
        payload: false,
      });
    });
  }, []);

  const fetchLinks = (username) => {
    const links = {};
    db.collection("public")
      .doc(username)
      .collection("links")
      .orderBy("position", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const link = doc.data();
          if (link.page) {
            if (!links[link.page]) {
              links[link.page] = [];
            }
            links[link.page].push({ ...link, id: doc.id });
          } else {
            if (!links["default"]) {
              links["default"] = [];
            }
            links["default"].push({
              ...link,
              id: doc.id,
            });
          }
        });
        dispatch({
          type: "SET_ALL_LINKS",
          payload: links,
        });
      });
  };

  const fetchNotifications = async () => {
    let notifications = [];

    let ref = db
      .collection("private")
      .doc(user.uid)
      .collection("notifications");

    ref
      .orderBy("timestamp", "desc")
      .limit(20)
      .get()
      .then((snapshots) => {
        if (snapshots.docs.length > 0) {
          ref.orderBy("timestamp").onSnapshot(async (notification) => {
            notification.forEach((n) => {
              notifications = notifications.filter((x) => x.id !== n.id);
              notifications.push({ ...n.data(), id: n.id });
            });
            setNotifications(notifications);
          });
        }
      });
  };

  function getMoreNotifications() {
    if (user.uid) {
      let notifications = [];
      let ref = db
        .collection("private")
        .doc(user.uid)
        .collection("notifications");

      ref
        .orderBy("timestamp", "desc")
        .limit(20)
        .get()
        .then((snapshots) => {
          if (snapshots) {
            ref
              .orderBy("timestamp", "desc")
              .onSnapshot(async (notification) => {
                notification.forEach((n) => {
                  notifications = notifications.filter((x) => x.id !== n.id);
                  notifications.push({ ...n.data(), id: n.id });
                });
                setNotifications((draft) => [...draft, ...notifications]);
              });
          }
        });
    }
  }

  useEffect(() => {
    if (!user?.username) return;

    fetchNotifications(user.uid);
  }, [user?.uid]);

  useEffect(() => {
    (async () => {
      let seenAll = true;
      if (notifications.length > 0) {
        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].seen !== true) {
            seenAll = false;
            break;
          }
        }

        if (seenAll === true) {
          setNewNotification(false);
        } else {
          setNewNotification(true);
        }
      }
    })();
  }, [notifications]);

  if (globalLoading) {
    return (
      <div className="homepage_loading">
        <HomepageLoading />
      </div>
    );
  }

  return (
    <Router>
      {imageCrop && <ImageCrop />}

      <Notification />
      <NotificationAddPoints />
      <div className="app">
        <Route
          path={[
            "/affiliate-code",
            "/dashboard",
            "/editor",
            "/locked",
            "/saved",
            "/add-block",
            "/notifications",
            "/channel/:id",
            "/create-page",
            "/stats",
          ]}
          component={() => window.location.pathname !== "/search" && <Header />}
        />

        <div className="route__wrapper">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route
              exact
              path="/terms-and-conditions"
              component={TermsAndConditions}
            />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/affiliate-code" component={AffiliateCode} />

            <PrivateRoute
              exact
              path="/dashboard"
              authenticated={user?.uid}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/editor"
              authenticated={user?.uid}
              component={Editor}
            />
            <PrivateRoute
              exact
              path="/locked"
              authenticated={user?.uid}
              component={Locked}
            />

            <PrivateRoute
              exact
              path="/saved"
              authenticated={user?.uid}
              component={Saved}
            />

            <PrivateRoute
              exact
              path="/create-page"
              authenticated={user?.uid}
              component={CreatePage}
            />

            <PrivateRoute
              exact
              path="/edit-page"
              authenticated={user?.uid}
              component={EditPage}
            />

            <PrivateRoute
              exact
              path="/add-block"
              authenticated={user?.uid}
              component={AddBlock}
            />

            <PrivateRoute
              exact
              path="/send-invite"
              authenticated={user?.uid}
              component={SendInvite}
            />

            <PrivateRoute
              exact
              path="/stats"
              authenticated={user?.uid}
              component={Stats}
            />

            <PrivateRoute
              path="/notifications"
              authenticated={user?.uid}
              component={() => (
                <Notifications
                  notifications={notifications}
                  // markAllSeen={markAllSeen}
                  getMoreNotifications={getMoreNotifications}
                />
              )}
            />

            <Route
              exact
              path={["/search", "/dashboard"]}
              component={SearchBar}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/management" component={Management} />
            <Route exact path="/profile-details" component={ProfileDetails} />

            <Route
              exact
              path="/management/forgot-password"
              component={ForgotPassword}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/channel/:id" component={Channel} />
            <Route exact path="/:username" component={PublicProfileView} />
          </Switch>
          {user.uid && (
            <Route
              path={[
                "/affiliate-code",
                "/dashboard",
                "/editor",
                "/add-block",
                "/create-page",
                "/edit-page",
                "/locked",
                "/saved",
                "/notifications",

                "/create-page",
              ]}
              component={() =>
                !["/search", "/", "/saved", "/notifications"].includes(
                  window.location.pathname
                ) && <ProfileDisplay />
              }
            />
          )}
        </div>

        <Route
          path={[
            "/affiliate-code",
            "/dashboard",
            "/editor",
            "/locked",
            "/saved",
            "/notifications",
            "/stats",
            "/create-page",
            "/search",
            "/",
          ]}
          component={() =>
            !["/send-invite", "/login", "/register"].includes(
              window.location.pathname
            ) && (
              <Navigation
                key={window.location.pathname}
                newNotification={newNotification}
              />
            )
          }
        />
      </div>
    </Router>
  );
};

export default App;
