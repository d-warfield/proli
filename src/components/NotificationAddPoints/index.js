import React, { useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import "./index.scss";

import CountUp from "react-countup";

const NotificationAddPoints = () => {
  const [{ addPointsNotification }, dispatch] = useStateValue();

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "HIDE_POINTS_NOTIFICATION",
      });
    }, addPointsNotification.timeout);
  }, [addPointsNotification.hidden, addPointsNotification.timeout, dispatch]);

  return (
    !addPointsNotification.hidden && (
      <div
        onClick={() =>
          dispatch({
            type: "HIDE_POINTS_NOTIFICATION",
          })
        }
        className={`addPointsNotification ${
          addPointsNotification.success ? "success" : "error"
        }`}
      >
        <h2>You earned Proli</h2>
        <CountUp start={0} end={5} delay={0} duration={3}>
          {({ countUpRef }) => (
            <div className="count_up">
              <p>+</p>
              <span ref={countUpRef} />
            </div>
          )}
        </CountUp>
      </div>
    )
  );
};

export default NotificationAddPoints;
