import React, { useState } from "react";
import { useImgModal } from "./imgModalContext";

const ImgToShow = ({ type, imageurl }) => {
  const { showModal } = useImgModal();

  return (
    <div className="z-[1]">
      <div className="img-div">
        {type === "image" ? (
          <img
            src={imageurl}
            alt="Profile"
            onClick={() => {
              showModal(imageurl);
            }}
            className={"rounded-md " + (showModal ? "cursor-zoom-in" : "")}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <video
            controls
            className={"rounded-md "}
            style={{ width: "100%", height: "100%" }}
          >
            <source src={imageurl} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default ImgToShow;
