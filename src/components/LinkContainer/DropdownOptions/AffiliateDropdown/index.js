import React from "react";
import { useStateValue } from "../../../../StateProvider";
import { db } from "../../../../firebase/utils";
import "../styles.scss";
import "./styles.scss";

const AffiliateDropdown = ({ affiliateCode, id, updateLink }) => {
  const [{ user }] = useStateValue();

  return (
    <div>
      <div className="dropdown__container">
        {!affiliateCode ? (
          <div className="affiliate__inputContainer">
            <input
              autoFocus="false"
              type="text"
              spellCheck="false"
              onChange={(e) => {
                updateLink(id, "linkMedia", "affiliateCode", e.target.value);
              }}
              onBlur={async (e) =>
                await db
                  .collection("public")
                  .doc(user.username)
                  .collection("links")
                  .doc(id)
                  .update({
                    "linkMedia.affiliateCode": e.target.value,
                  })
              }
              value={affiliateCode}
              placeholder="Enter Code"
            />
          </div>
        ) : (
          <div className="affiliate__inputContainer">
            <input
              autoFocus="false"
              type="text"
              spellCheck="false"
              onChange={(e) => {
                updateLink(id, "linkMedia", "affiliateCode", e.target.value);
              }}
              onBlur={async (e) =>
                await db
                  .collection("public")
                  .doc(user.username)
                  .collection("links")
                  .doc(id)
                  .update({
                    "linkMedia.affiliateCode": e.target.value,
                  })
              }
              value={affiliateCode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateDropdown;
