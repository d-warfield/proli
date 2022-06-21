import React, { useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import "./index.scss";

const Notification = () => {
  const [{ notification }, dispatch] = useStateValue();

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
    }, notification.timeout);
  }, [notification.hidden, notification.timeout, dispatch]);

  return (
    !notification.hidden && (
      <div
        onClick={() =>
          dispatch({
            type: "HIDE_NOTIFICATION",
          })
        }
        className={`notification ${notification.success ? "success" : "error"}`}
      >
        <p>{notification.success ? "Success!" : "Check Again :("}</p>
        <p>{notification.message}</p>
      </div>
    )
  );
};

export default Notification;
