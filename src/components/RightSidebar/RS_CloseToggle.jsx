import React from "react";

const RS_CloseToggle = ({setRSisVisible, assets}) => {
  return (
    <button
      className="rs-close-toggle"
      onClick={() => setRSisVisible((prev) => !prev)}
    >
      {" "}
      <img src={assets.cross_icon} alt="" />
    </button>
  );
};

export default RS_CloseToggle;
