import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Timeline } from "react-twitter-widgets";
import "./styles.scss";

const TwitterLink = ({ linkTitle }) => {
  const [normalizedTwitterHandle, setNormalizedTwitterHandle] = useState(null);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (linkTitle) {
      let string = linkTitle.toString();
      const firstChar = string.substring(0, 1);
      if (firstChar === "@") {
        setNormalizedTwitterHandle(linkTitle.substring(1));
      } else {
        setNormalizedTwitterHandle(linkTitle);
      }
    }
  }, []);

  return (
    <div
      ref={targetRef}
      style={{
        backgroundColor: "black",
        width: "100%",
      }}
    >
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: `${normalizedTwitterHandle}`,
        }}
        options={{
          height: "400",
          width: dimensions ? `${dimensions.width}` : "400",
          dataChrome: "noheader",
        }}
        noHeader="true"
        noBorders="true"
        noFooter="true"
      />
    </div>
  );
};

export default TwitterLink;
