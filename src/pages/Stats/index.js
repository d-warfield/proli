import React from "react";
import "./styles.scss";

import { useStateValue } from "../../StateProvider";
import { Helmet } from "react-helmet";

function Stats() {
  const [{ user }] = useStateValue();

  return (
    <div className="stats">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Stats</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>

      <div>
        <div className="analytics_container">
          <div className="analytics_data">
            <div className="analytics_title">
              <h1>Profile Views</h1>
            </div>
            <p>1,200</p>

            <div className="graph"></div>
          </div>
          <div className="analytics_data">
            <div className="analytics_title">
              <h1>Followers</h1>
            </div>

            <p>{user.profileInfo.subscribers}</p>

            <div className="graph"></div>
          </div>
          <div className="analytics_data">
            <div className="analytics_title">
              <h1>Top Referrers</h1>
            </div>

            <p>website #1</p>
            <p>website #2</p>
            <p>website #3</p>
            <p>website #4</p>
            <p>website #5</p>
          </div>

          <div className="analytics_square"></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
