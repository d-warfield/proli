import React from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";

import CountUp from "react-countup";
import { useStateValue } from "../../StateProvider";

function SendInvite() {
  const [, dispatch] = useStateValue();
  const history = useHistory();

  const handleSend = async (e) => {
    e.preventDefault();

    const message = `Hey! Come create a Proli account! It's a new kind of profile where you can put your links and content in one place!`;
    const url = "https://pro.li/";
    try {
      await navigator.share({
        text: message,
        title: "Check this link!",
        url: url,
      });
    } catch (err) {
      await navigator.clipboard.writeText(`${message} ${url}`);
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
    <div className="send_invites">
      <div className="send_inviteTop">
        <button onClick={() => history.goBack()}>Back</button>
        <h1>Send Invite</h1>
      </div>
      <div className="credit_cardWrapper"></div>
      <div className="send_invitesContainer">
        <div className="invite_text">
          <h1>Invite Friends</h1>
          <p>Earn up to $40 worth of Proli credit</p>
        </div>

        <div className="reward">
          <CountUp start={0} end={5} delay={0} duration={1.5}>
            {({ countUpRef }) => (
              <div className="reward_count">
                <p>$</p>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
          <p>Reward per invite</p>
        </div>

        <button onClick={handleSend}>Send Invite</button>
      </div>
    </div>
  );
}

export default SendInvite;
