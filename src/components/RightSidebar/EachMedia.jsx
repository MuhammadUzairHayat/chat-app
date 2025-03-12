import React, { useState } from "react";
import { useImgModal } from "../../context/ImageModal/imgModalContext";
import EachVideo from "./EachVideo";

const EachMedia = ({ message, type }) => {
  const { showModal } = useImgModal();
  const [isMagnify, setIsMagnify] = useState(false);
  return type === "image" ? (
    <img
      className={"rs-media-img cursor-zoom-in border-[1px] border-purple-800"}
      src={message?.img}
      alt=""
      onClick={() => showModal(message?.img)}
    />
  ) : (
    <EachVideo src={message?.video} />
  );
};

export default EachMedia;
