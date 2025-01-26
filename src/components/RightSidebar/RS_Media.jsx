import React from "react";
import EachMedia from "./EachMedia";

const RS_Media = ({ assets, chatAbout, chatMessages }) => {
  return (
    <div className="rs-media">
      <h4>Media</h4>
      <div className="rs-media-items">
        {chatMessages && chatAbout.mediaCount !== 0 && chatAbout.mediaCount ? (
          chatMessages.map((message, index) => {
            return message.type === "image" && chatAbout.mediaCount ? (
              <EachMedia key={index} message={message} />
            ) : null;
          })
        ) : (
          <RS_Media assets={assets} />
        )}
      </div>
    </div>
  );
};

export default RS_Media;
