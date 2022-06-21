import React from "react";
import { useStateValue } from "../../StateProvider";
import NotificationContainer from "../../components/NotificationContainer";
import { Helmet } from "react-helmet";
import "./styles.scss";

const Notifications = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const { notifications } = props;

  const sendInvite = async () => {
    const message = `Hey! I just created a Proli account. What do you think of my profile? 😃 www.pro.li/${user.username}`;
    try {
      await navigator.share({
        text: message,
        title: "Check my Proli profile!",
      });
    } catch (err) {
      await navigator.clipboard.writeText(message);
      dispatch({
        type: "TOGGLE_NOTIFICATION",
        payload: {
          hidden: false,
          success: true,
          message: "Copied to clipboard! :)",
          timeout: 3000,
        },
      });
    }
  };

  return (
    <div className="notifications">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Proli | Notifications</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>
      {notifications?.length == 0 && (
        <div className="empty_savedContainer">
          <h6>You don&apos;t have any notifications</h6>
          <button onClick={sendInvite}>Invite friends</button>
        </div>
      )}
      {notifications?.map((notification, index) => (
        <NotificationContainer
          key={notification.notificationFrom + index}
          notificationType={notification.notificationType}
          notificationFrom={notification.notificationFrom}
          timestamp={notification.timestamp}
        />
      ))}
    </div>
  );
};

export default Notifications;
