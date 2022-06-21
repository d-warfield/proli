import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import SettingsIcon from "../../assets/iconComponents/Outlined/SettingsIcon";
import PlusIcon from "../../assets/iconComponents/Outlined/PlusIcon";
import "./styles.scss";

const PageList = () => {
  const [{ page: activePage, pagesList }, dispatch] = useStateValue();
  const history = useHistory();
  const data = useLocation();

  useEffect(async () => {
    if (pagesList && pagesList.length > 0) {
      dispatch({
        type: "SET_PAGE",
        page: data?.state?.page || pagesList[0].id,
      });
    } else {
      dispatch({
        type: "SET_PAGE",
        page: "default",
      });
    }
  }, []);

  return (
    <div className="page_list">
      <div className="page_listLeft">
        <button
          onClick={() =>
            history.push({
              pathname: "/create-page",
              state: {
                pages: pagesList,
              },
            })
          }
        >
          <div className="add_page">
            <PlusIcon fill={"white"} height={10} />
            <p>Page</p>
          </div>
        </button>
      </div>
      <div className="page_listRight">
        {pagesList &&
          pagesList.map((page, index) => (
            <div
              key={index}
              className={`page_container ${
                page.id === activePage ? "active" : ""
              }`}
            >
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_PAGE",
                    page: page.id,
                  })
                }
              >
                <p>{page.name}</p>
              </button>
              <div className="page_breaker"></div>
              <button
                onClick={() =>
                  history.push({
                    pathname: "/edit-page",
                    state: page,
                  })
                }
              >
                <SettingsIcon
                  height={20}
                  fill={
                    page.id === activePage
                      ? "black"
                      : "var(--snap-darkmode-light-text)"
                  }
                />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PageList;
