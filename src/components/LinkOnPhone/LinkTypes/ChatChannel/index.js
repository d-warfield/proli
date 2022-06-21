import React from "react";
import "./styles.scss";

function ChatChannel() {
  return (
    <div>
      <div className="chat_bar">
        <div className="chat_input">
          <input type="text" />
        </div>
        <div className="send_button">
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatChannel;
