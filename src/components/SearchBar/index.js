import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "../../assets/iconComponents/Outlined/SearchIcon";
import { Helmet } from "react-helmet";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom";
import "./styles.scss";
import SocialIcon from "./../PublicComponents/PublicProfileView/SocialIcon";

const {
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_SEARCH_API_KEY,
} = process.env;

const SearchBar = () => {
  const searchInputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const Hits = ({ hits }) => (
    <ol className="results_wrapper">
      {hits && hits.length > 0 ? (
        hits.map((hit) => (
          <Link key={hit.objectID} to={`/${hit.objectID}`}>
            <li className="results_list" key={hit.objectID}>
              <div className="profile_queryContainer">
                <div className="profile_queryContainerTop">
                  <div className="query_resultLeft">
                    <img src={hit.profileInfo.imageUrl} />
                  </div>
                  <div className="query_resultRight">
                    <h4>{hit.profileInfo.displayName}</h4>
                    <p>@{hit.objectID}</p>
                    {hit?.profileInfo?.social && (
                      <div className="social_icons">
                        {Object.values(hit.profileInfo.social).map((url, i) => {
                          return (
                            <SocialIcon
                              key={`${url}_${i}`}
                              socialName={
                                Object.keys(hit.profileInfo.social)[i]
                              }
                              socialUrl={url}
                              fill={"white"}
                            />
                          );
                        })}
                      </div>
                    )}
                    <p>{hit.profileInfo.bio}</p>
                  </div>
                </div>
                <div className="profile_queryContainerBottom"></div>
              </div>
            </li>
          </Link>
        ))
      ) : (
        <div className="no_results">
          <h1>No result</h1>
        </div>
      )}
    </ol>
  );

  const CustomHits = connectHits(Hits);

  const SearchBox = ({ currentRefinement, refine }) => (
    <div className="search_containerWrapper">
      <div className="search__containerItems">
        <div className="input__SearchContainer">
          <SearchIcon stroke={"black"} strokeWidth={3} height={20} />
          <input
            autoFocus
            placeholder="Search for someone"
            ref={searchInputRef}
            spellCheck="false"
            style={{
              blinkCaret: "1.1s step-end infinite",
              borderColor: "white",
            }}
            type="search"
            value={currentRefinement}
            onChange={(event) => refine(event.currentTarget.value)}
          />
          <div className="cover_xmark"></div>
        </div>
        <button onClick={() => history.goBack()}>Cancel</button>
      </div>
    </div>
  );

  const CustomSearchBox = connectSearchBox(SearchBox);

  const algoliaClient = algoliasearch(
    REACT_APP_ALGOLIA_APP_ID,
    REACT_APP_ALGOLIA_SEARCH_API_KEY
  );

  const searchClient = {
    search(requests) {
      if (requests[0].params.query === "") {
        return [];
      }
      return algoliaClient.search(requests);
    },
  };

  return (
    <div className="search__container">
      <InstantSearch indexName="public" searchClient={searchClient}>
        <CustomSearchBox />
        <CustomHits />
      </InstantSearch>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>
    </div>
  );
};

export default SearchBar;
