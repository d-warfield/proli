import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import NotificationOutlineIcon from "./../../assets/iconComponents/Outlined/NotificationOutlineIcon";
import "./styles.scss";
import Sidebar from "../Sidebar";
import MenuFilledIcon from "../../assets/iconComponents/Filled/MenuFilledIcon";

const Header = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(false);

  const handleCopy = () => {
    var tempInput = document.createElement("input");
    tempInput.value = `pro.li/${user?.username}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className="header">
      <div className="header_content">
        {status && <Sidebar toggleSidebar={setStatus} />}
        <div className="header_right">
          <button className="copy_userUrl" onClick={handleCopy}>
            {copied ? "Copied" : "Share"}
          </button>
          <p onClick={() => history.push(`/${user.username}`)}>
            pro.li/{user?.username}
          </p>
        </div>
        <div className="header_left">
          <button onClick={() => history.push("/notifications")}>
            <NotificationOutlineIcon
              stroke={"white"}
              width={23}
              height={23}
              strokeWidth={1.4}
              strokeHeight={1.4}
            />
          </button>
          <button onClick={() => setStatus((status) => !status)}>
            <MenuFilledIcon height={18} width={18} fill={"white"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
