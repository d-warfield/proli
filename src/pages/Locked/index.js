import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase/utils";
import { useLocation, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import LockLottie from "../../assets/animations/LoadingAnimation/lock";

const Locked = () => {
  const [{ user }] = useStateValue();
  const history = useHistory();

  let data = useLocation();
  const handleFollow = async () => {
    if (user.uid) {
      await db.collection("private").doc(user.uid).collection("following").add({
        username: data.state.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    history.push(`/${data.state.id}`);
  };

  return (
    <div className="locked__page">
      <LockLottie />

      <h4>Subscribe to unlock</h4>

      <button onClick={handleFollow}>Unlock</button>
      <Link to={`/${data.state.id}`}>
        <button className="maybe__laterButton">Maybe later</button>
      </Link>
    </div>
  );
};

export default Locked;
