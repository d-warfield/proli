import React, { useEffect, useState } from "react";
import { db } from "../../firebase/utils";
import { useStateValue } from "../../StateProvider";
import LinkOnPhone from "../../components/LinkOnPhone";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DotsLoading from "../../assets/animations/LoadingAnimation/DotsLoading";
import DeleteIcon from "../../assets/iconComponents/Outlined/DeleteIcon";
import "./styles.scss";

const Saved = () => {
  const [{ user }, dispatch] = useStateValue();
  const [savedLinks, setSavedLinks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLinks = {};
    (async () => {
      const saved = await db
        .collection("private")
        .doc(user.uid)
        .collection("saved")
        .get();
      saved.forEach((save) => {
        const link = save.data();
        if (!savedLinks[link.savedUser]) {
          savedLinks[link.savedUser] = {
            imageUrl: "",
            links: [],
            id: save.id,
          };
        }

        savedLinks[link.savedUser].links.push({
          savedLinkId: link.savedLinkId,
          timestamp: link.timestamp,
          id: link.id,
        });
      });
      const users = Object.keys(savedLinks);
      if (users.length > 0) {
        for (const savedUser of users) {
          const profile = await db.collection("public").doc(savedUser).get();
          if (profile.exists) {
            savedLinks[
              savedUser
            ].imageUrl = profile.data().profileInfo.imageUrl;
          }
          const links = await Promise.all(
            savedLinks[savedUser].links.map(async (data, index) => {
              const link = await db
                .collection("public")
                .doc(savedUser)
                .collection("links")
                .doc(data.savedLinkId)
                .get();

              if (link.exists) {
                return {
                  ...savedLinks[savedUser].links[index],
                  ...link.data(),
                  username: savedUser,
                };
              } else {
                const deleteRemovedLink = db
                  .collection("private")
                  .doc(user.uid)
                  .collection("saved")
                  .where("savedLinkId", "==", data.savedLinkId);
                deleteRemovedLink.get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                  });
                });
              }
            })
          );
          savedLinks[savedUser].links = links.filter((element) => {
            return element !== undefined;
          });
          if (savedLinks[savedUser].links.length < 1) {
            delete savedLinks[savedUser];
          }
        }
      }
      setSavedLinks(savedLinks);
      setLoading(false);
    })();
  }, []);

  const removeSavedLink = async (link) => {
    const savedRef = db
      .collection("private")
      .doc(user.uid)
      .collection("saved")
      .where("savedLinkId", "==", link.savedLinkId);
    const querySnapshot = await savedRef.get();
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });
    if (savedLinks[link.username].links.length <= 1) {
      const links = savedLinks;
      delete links[link.username];
      setSavedLinks(links);
    } else {
      setSavedLinks({
        ...savedLinks,
        [link.username]: {
          ...savedLinks[link.username],
          links: savedLinks[link.username].links.filter((savedLink) => {
            if (savedLink.savedLinkId === link.savedLinkId) return false;

            return true;
          }),
        },
      });
    }
    dispatch({
      type: "TOGGLE_NOTIFICATION",
      payload: {
        hidden: false,
        success: true,
        message: "Saved link successfully removed!",
        timeout: 3000,
      },
    });
  };

  if (loading) {
    return <DotsLoading lottieColor="white" showLogo={true} />;
  }

  return (
    <div className="saved">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Proli | Saved</title>
        <link rel="canonical" href="https://pro.li" />
      </Helmet>
      {Object.keys(savedLinks).length === 0 ? (
        <div className="empty_savedContainer">
          <h6>You haven&apos;t saved anything yet</h6>
          <Link to="/search" style={{ color: "white" }}>
            Search
          </Link>
        </div>
      ) : (
        Object.keys(savedLinks).map((user, index) => (
          <div
            key={`${user}_${index}`}
            className="link__savedContainer"
            style={{
              borderTop:
                index === 0
                  ? ""
                  : savedLinks[user].imageUrl !== ""
                  ? "1px solid var(--snap-light-background)"
                  : "",
            }}
          >
            <div className="link__savedContainerLeft">
              {savedLinks[user].imageUrl && (
                <Link to={`/${user}`}>
                  <img alt="" src={savedLinks[user].imageUrl} />
                  <h6>@{user}</h6>
                </Link>
              )}
            </div>
            {savedLinks[user].links.map((link, index) => {
              if (link.linkInfo) {
                return (
                  <div className="saved_container">
                    <div
                      key={link.linkInfo.linkTitle + index}
                      className="link__savedContainerRight"
                    >
                      <LinkOnPhone
                        key={link.linkInfo.linkTitle + index}
                        linkTitle={link.linkInfo.linkTitle}
                        linkUrl={link.linkInfo.linkUrl}
                        affiliateCode={link.linkMedia.affiliateCode}
                        downloadUrl={link.linkMedia.downloadUrl}
                        mediaUrl={link.linkMedia.mediaUrl}
                        imageUrl={link.linkMedia.imageUrl}
                        saved={true}
                        favicon={link.linkMedia.favicon}
                        isLocked={link.linkControl.isLocked}
                        linkType={link.linkType}
                        active={link.linkControl.active}
                        linkId={link.id}
                      />
                    </div>
                    <div className="saved_controls">
                      <button onClick={() => removeSavedLink(link)}>
                        <DeleteIcon stroke={"var(--snap-darkmode-light-text"} />
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default Saved;
