import React from "react";
import "./styles.scss";

import { useMedia } from "react-use";

function DummyHeader() {
  const isWideEnough = useMedia("(min-width: 1000px)");
  if (!isWideEnough) return null;

  return <div className="dummy_header"></div>;
}

export default DummyHeader;
