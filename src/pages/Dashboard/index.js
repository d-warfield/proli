import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import PageList from "../../components/PageList";
import LinkList from "../../components/LinkList";
import DummyHeader from "../../components/DummyHeader";

import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase/utils";
import "./styles.scss";

const Dashboard = () => {
  const [{ user, page, links }, dispatch] = useStateValue();
  const [dropdownVisible] = useState(false);
  const history = useHistory();

  const deleteLink = (idToDelete) => {
    let filteredLinks = links[page].filter((link) => link.id !== idToDelete);
    dispatch({
      type: "SET_LINKS",
      payload: {
        links: filteredLinks,
        page,
      },
    });
  };

  const updateLink = async (id, attribute1, attribute2, value) => {
    let updatedLinks = await Promise.all(
      links[page].map((link) => {
        if (link.id === id) {
          link[attribute1][attribute2] = value;
          return link;
        } else return link;
      })
    );
    dispatch({
      type: "SET_LINKS",
      payload: {
        links: updatedLinks,
        page,
      },
    });
  };

  // reorder
  const reorder = (links, startIndex, endIndex) => {
    const result = Array.from(links);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // handle drag end
  const handleOnDragEnd = async (result) => {
    const reordered = reorder(
      links[page],
      result.source.index,
      result.destination.index
    );
    await dispatch({
      type: "SET_LINKS",
      payload: {
        links: reordered,
        page,
      },
    });

    db.collection("public")
      .doc(user.username)
      .collection("links")
      .where("page", "==", page)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (data) => {
          let index = reordered.findIndex((link) => link.id === data.id);
          await data.ref.update({
            position: index,
          });
        });
      });
  };

  return (
    <div className="dashboard">
      <DummyHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>
      <div className="dash__middle">
        <div className="add_blockButton">
          <button onClick={() => history.push("/add-block")}>Add Block</button>
        </div>
        <PageList />
        {!dropdownVisible && (
          <LinkList
            page={page}
            handleOnDragEnd={handleOnDragEnd}
            links={links[page]}
            deleteLink={deleteLink}
            updateLink={updateLink}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
