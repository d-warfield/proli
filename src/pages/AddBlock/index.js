import React, { useState } from "react";

import { Helmet } from "react-helmet";
import firebase from "firebase/app";

import LinkButtonTypes from "../../components/LinkButtonTypes";

import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase/utils";
import "./styles.scss";
import DummyHeader from "../../components/DummyHeader";

const AddBlock = () => {
  const [{ user, page }, dispatch] = useStateValue();
  const [dropdownVisible, toggleDropdown] = useState(false);

  const addLink = async (linkType) => {
    const newLink = {
      position: 0,
      page: page || "default",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      linkType: linkType,
      linkInfo: {
        linkTitle: "",
        linkUrl: "",
      },
      linkMedia: {
        imageUrl: "",
      },
      linkControl: {
        active: true,
        isLocked: false,
      },
    };

    await db
      .collection("public")
      .doc(user.username)
      .collection("links")
      .where("page", "==", page)
      .get()
      .then(async (querySnapshot) => {
        querySnapshot.forEach((data) => {
          data.ref.update({
            position: firebase.firestore.FieldValue.increment(1),
          });
        });

        const newLinkRef = await db
          .collection("public")
          .doc(user.username)
          .collection("links")
          .add(newLink);

        dispatch({
          type: "ADD_NEW_LINK",
          payload: {
            page,
            link: { ...newLink, id: newLinkRef.id },
          },
        });
      });
  };

  return (
    <div className="dashboard">
      <DummyHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Block</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>

      <div className="add_block">
        <LinkButtonTypes
          page={page}
          setLinkType={addLink}
          linkTypeDropdown={dropdownVisible}
          setLinkTypeDropdown={toggleDropdown}
        />
      </div>
    </div>
  );
};

export default AddBlock;
