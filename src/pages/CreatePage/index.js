import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import DotsLoading from "../../assets/animations/LoadingAnimation/DotsLoading";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase/utils";
import "./styles.scss";

const CreatePage = () => {
  const [{ user, pagesList, links }, dispatch] = useStateValue();
  const [pageName, setPageName] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const inputRef = useRef(null);
  const data = useLocation();

  const handleAddPage = async () => {
    setLoading(true);
    const newPageId = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: "SET_PAGES",
      payload: [
        ...pagesList,
        {
          name: pageName,
          id: newPageId,
        },
      ],
    });
    await db
      .collection("public")
      .doc(user.username)
      .update({
        pages: firebase.firestore.FieldValue.arrayUnion({
          name: pageName,
          id: Math.random().toString(36).substr(2, 9),
        }),
      });
    if (data?.state?.pages && data.state.pages.length === 0) {
      const allLinks = [];
      db.collection("public")
        .doc(user.username)
        .collection("links")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (data) => {
            allLinks.push({
              ...data.data(),
              id: data.id,
              page: newPageId,
            });
            await data.ref.update({
              page: newPageId,
            });
          });
          dispatch({
            type: "SET_LINKS",
            payload: {
              page: newPageId,
              links: allLinks,
            },
          });
        });
      const newLinks = links;
      delete newLinks["default"];
      dispatch({
        type: "SET_ALL_LINKS",
        payload: newLinks,
      });
    }
    history.push({
      pathname: "/dashboard",
      state: {
        page: newPageId,
      },
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="create_page">
      <input
        autoFocus
        placeholder="Enter Page Name"
        ref={inputRef}
        spellCheck="false"
        style={{
          blinkCaret: "1.1s step-end infinite",
          borderColor: "white",
        }}
        onChange={(e) => setPageName(e.target.value)}
        value={pageName}
        maxLength="18"
      />
      <button
        className={!pageName && "disabled"}
        disabled={!pageName}
        onClick={handleAddPage}
      >
        {loading ? <DotsLoading lottieColor="black" /> : "Create Page"}
      </button>
      <button
        className="back_toDashboard"
        onClick={() => history.push("/dashboard")}
      >
        Cancel
      </button>
    </div>
  );
};

export default CreatePage;
