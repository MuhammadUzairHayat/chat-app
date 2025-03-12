import React from "react";
import EachMedia from "./EachMedia";
import RS_NoMedia from "./RS_NoMedia";

const RS_Media = ({ assets, chatAbout, chatMessages }) => {
  return (
    <div className="rs-media">
      <h4>Media</h4>
      <div className="rs-media-items">
        {chatMessages && Number(chatAbout.mediaCount) !== 0 && chatAbout.mediaCount ? (
          // console.log(`chatMessages: `, chatMessages)
          // --- Rendering Each Media ----
          chatMessages.map((message, index) => {
            console.log(`message type: `, message.type, "  message media count: ", chatAbout.mediaCount);
            return message.type !== "text" && chatAbout.mediaCount ? (
              <EachMedia key={index} message={message} type={message.type}/>
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
