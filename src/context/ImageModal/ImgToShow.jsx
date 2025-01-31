import React, { useState } from "react";
import { useImgModal } from "./imgModalContext";

const ImgToShow = ({ imageUrl }) => {
  const { showModal } = useImgModal();

  return (
    <div className="z-[1]">
      <div className="img-div">
        <img
          src={imageUrl}
          alt="Profile"
          onClick={() => {
            showModal(imageUrl);
          }}
          className={"rounded-md " + (showModal ? "cursor-zoom-in" : "")}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default ImgToShow;
