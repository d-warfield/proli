import React from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";

import SearchIcon from "../../assets/iconComponents/Outlined/SearchIcon";
import { useStateValue } from "../../StateProvider";

import ProfileDetails from "../ProfileDetails";
import ProliIcon from "../../assets/iconComponents/Outlined/Proli";

function Homepage() {
  const [{ user }] = useStateValue();
  const history = useHistory();

  // const topTen = [
  //   {
  //     profileUsername: "Bro",
  //     profileImageUrl:
  //       "https://images.pexels.com/photos/3031397/pexels-photo-3031397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   },
  //   {
  //     profileUsername: "Sis",
  //     profileImageUrl:
  //       "https://images.pexels.com/photos/3031397/pexels-photo-3031397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   },
  //   {
  //     profileUsername: "Nugs",
  //     profileImageUrl:
  //       "https://images.pexels.com/photos/3031397/pexels-photo-3031397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   },
  //   {
  //     profileUsername: "Nugs",
  //     profileImageUrl:
  //       "https://images.pexels.com/photos/3031397/pexels-photo-3031397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   },
  //   {
  //     profileUsername: "Nugs",
  //     profileImageUrl:
  //       "https://images.pexels.com/photos/3031397/pexels-photo-3031397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   },
  // ];

  return (
    <div className="homepage">
      <div className="hompage_header">
        <div className="proli_iconHeader">
          <ProliIcon height={38} />
        </div>
        <div className="search_bar" onClick={() => history.push("/search")}>
          <SearchIcon height={22} stroke={"black"} strokeWidth={3} />

          <input placeholder="Search for a friend" />
        </div>
        {!user.uid && (
          <React.Fragment>
            <div className="login_controls">
              <button
                className="sign_inHomepage"
                onClick={() => history.push("/login")}
              >
                SIGN IN
              </button>

              <button onClick={() => history.push("/register")}>SIGN UP</button>
            </div>
          </React.Fragment>
        )}
      </div>

      <div className="homepage_container">
        {user.uid ? (
          <div className="homepage_containerLeft">
            {/* <div className="homepage_accounts">
              <h2>Top 10 Accounts Today</h2>
              <div className="featured_containerScroll">
                {topTen.map((top, index) => {
                  return (
                    <div
                      key={top.profileUsername + index}
                      className="featured_container"
                      onClick={() => history.push(`/${top.profileUsername}`)}
                    >
                      <img src={top.profileImageUrl} />
                      <div className="featured_containerText">
                        <h1>@{top.profileUsername}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="homepage_accounts solid">
              <h2>Top 10 Accounts Today</h2>
              <div className="featured_containerScroll">
                {topTen.map((top, index) => {
                  return (
                    <div
                      key={top.profileUsername + index}
                      className="featured_container"
                      onClick={() => history.push(`/${top.profileUsername}`)}
                    >
                      <img src={top.profileImageUrl} />
                      <div className="featured_containerText">
                        <h1>@{top.profileUsername}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="homepage_accounts solid">
              <h2>Top 10 Accounts Today</h2>
              <div className="featured_containerScroll">
                {topTen.map((top, index) => {
                  return (
                    <div
                      key={top.profileUsername + index}
                      className="featured_container"
                      onClick={() => history.push(`/${top.profileUsername}`)}
                    >
                      <img src={top.profileImageUrl} />
                      <div className="featured_containerText">
                        <h1>@{top.profileUsername}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>
        ) : (
          <React.Fragment>
            <div className="profile_detailsHomepage">
              <div className="profile_detailsText">
                <h1>
                  One <span>pro</span>file <span>li</span>nk for your all of
                  your content
                </h1>
                <p>
                  Put all of your links and content in one place for anyone to
                  discover
                </p>
                <button onClick={() => history.push("/register")}>
                  SIGN UP
                </button>
              </div>
              <ProfileDetails />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Homepage;
