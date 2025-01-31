import React from "react";
import EachMedia from "./EachMedia";
import RS_NoMedia from "./RS_NoMedia";

const RS_Media = ({ assets, chatAbout, chatMessages }) => {
  return (
    <div className="rs-media">
      <h4>Media</h4>
      <div className="rs-media-items">
        {chatMessages && chatAbout.mediaCount !== 0 && chatAbout.mediaCount ? (
          // --- Rendering Each Media ----
          chatMessages.map((message, index) => {
            return message.type === "image" && chatAbout.mediaCount ? (
              <EachMedia key={index} message={message} />
            ) : null;
          })
        ) : (
          // ---- No Media ----
          <RS_NoMedia assets={assets} />
        )}
      </div>
    </div>
  );
};

export default RS_Media;
