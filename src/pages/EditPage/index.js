import React, { useState, useEffect, useRef } from "react";
import TrashCan from "../../assets/Icons/Bold/TrashCan.svg";
import DotsLoading from "../../assets/animations/LoadingAnimation/DotsLoading";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase/utils";
import "./index.scss";

const EditPage = () => {
  const [{ user, pagesList, links }, dispatch] = useStateValue();
  const [newPageName, setNewPageName] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const inputRef = useRef(null);
  const data = useLocation();

  useEffect(() => {
    const { id, name } = data?.state;
    if (!id) {
      history.push("/dashboard");
    }
    setNewPageName(name);
    inputRef.current.focus();
  }, []);

  const handleRenamePage = async () => {
    if (newPageName === data?.state?.name) {
      return history.goBack();
    }
    setLoading(true);
    const newPagesList = pagesList.map((page) => {
      if (page.id === data?.state?.id) {
        return {
          id: page.id,
          name: newPageName,
        };
      }
      return page;
    });
    await db.collection("public").doc(user.username).update({
      pages: newPagesList,
    });
    dispatch({
      type: "SET_PAGES",
      payload: newPagesList,
    });
    history.push({
      pathname: "/dashboard",
      state: {
        page: data?.state?.id,
      },
    });
  };

  const handleDeletePage = async () => {
    const { id } = data?.state;
    setLoading(true);
    const newPagesList = pagesList.filter((page) => page.id !== id);

    await db
      .collection("public")
      .doc(user.username)
      .collection("links")
      .where("page", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (data) => {
          await data.ref.delete();
        });
      });
    await db.collection("public").doc(user.username).update({
      pages: newPagesList,
    });
    dispatch({
      type: "SET_PAGES",
      payload: newPagesList,
    });
    const newLinks = links;
    delete newLinks[data?.state?.id];
    dispatch({
      type: "SET_ALL_LINKS",
      payload: newLinks,
    });
    history.push({
      pathname: "/dashboard",
      state: {
        page: newPagesList[0] ? newPagesList[0].id : "default",
      },
    });
  };

  return (
    <div className="edit_page">
      <div className="new_name">
        <p>Page name</p>
        <input
          autoFocus
          placeholder="New name"
          ref={inputRef}
          spellCheck="false"
          style={{
            blinkCaret: "1.1s step-end infinite",
            borderColor: "white",
          }}
          onChange={(e) => setNewPageName(e.target.value)}
          value={newPageName}
          maxLength="18"
        />
      </div>
      <button
        className={`primary_button_white save_button ${
          !newPageName ? "disabled" : ""
        }`}
        onClick={() => handleRenamePage()}
        disabled={!newPageName || loading}
      >
        {loading ? <DotsLoading lottieColor="black" /> : "Save"}
      </button>
      {!loading && (
        <button className="delete_button" onClick={() => handleDeletePage()}>
          <img alt="" src={TrashCan} />
        </button>
      )}
    </div>
  );
};

export default EditPage;
